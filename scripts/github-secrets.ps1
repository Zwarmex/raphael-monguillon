<#
.SYNOPSIS
    Remplit les secrets GitHub Actions du repo a partir de github-secrets.env.

.DESCRIPTION
    Lit github-secrets.env (a la racine du repo, jamais commite) et envoie chaque
    valeur a GitHub avec `gh secret set`. Le repo cible est detecte avec gh.

    Format du fichier (voir github-secrets.env.example) :
        NOM=valeur            valeur sur une ligne
        NOM=@chemin           contenu d'un fichier (cle SSH, .env...), relatif a la racine du repo
        NOM=                  ignore : le secret existant sur GitHub est conserve
        # commentaire

.EXAMPLE
    .\scripts\github-secrets.ps1 -DryRun
    Affiche ce qui serait envoye, sans rien ecrire.

.EXAMPLE
    .\scripts\github-secrets.ps1
#>
param(
    [string]$File = 'github-secrets.env',
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding $false
[Console]::OutputEncoding = $utf8

$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root

if (-not (Test-Path $File)) { throw "$File introuvable. Copie github-secrets.env.example en $File et remplis-le." }

# Garde-fou : le fichier contient des secrets, il ne doit jamais partir dans git
$ErrorActionPreference = 'Continue'
git check-ignore -q $File 2>$null
$ignored = $LASTEXITCODE -eq 0
$Repo = gh repo view --json nameWithOwner --jq .nameWithOwner 2>$null
$ErrorActionPreference = 'Stop'
if (-not $ignored) { throw "$File n'est pas ignore par git : ajoute-le au .gitignore avant de continuer." }
if (-not $Repo) { throw "Repo GitHub introuvable (gh non connecte ? gh auth login)." }

# --- Lecture du fichier -----------------------------------------------------------
$Secrets = [ordered]@{}
$lineNo = 0
foreach ($line in [IO.File]::ReadAllLines((Resolve-Path $File).Path, $utf8)) {
    $lineNo++
    $line = $line.Trim()
    if (-not $line -or $line.StartsWith('#')) { continue }
    if ($line -notmatch '^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$') { throw "$File ligne $lineNo invalide : attendu NOM=valeur" }
    $name = $Matches[1]
    $value = $Matches[2]
    if ($value -match '^"(.*)"$' -or $value -match "^'(.*)'$") { $value = $Matches[1] }
    $Secrets[$name] = $value
}
if (-not $Secrets.Count) { throw "$File ne contient aucun secret." }

# --- Plan ---------------------------------------------------------------------------
Write-Host "`nRepo : $Repo`n" -ForegroundColor Cyan
$ToSet = [ordered]@{}
foreach ($s in $Secrets.GetEnumerator()) {
    if ($s.Value -eq '' -or $s.Value -eq '@') {
        Write-Host ("  {0,-20} ignore (vide, secret existant conserve)" -f $s.Key) -ForegroundColor DarkGray
        continue
    }
    if ($s.Value.StartsWith('@')) {
        $path = $s.Value.Substring(1)
        if (-not (Test-Path $path)) { throw "$($s.Key) : fichier introuvable : $path" }
        $content = [IO.File]::ReadAllText((Resolve-Path $path).Path, $utf8)
        Write-Host ("  {0,-20} <- fichier {1} ({2} lignes)" -f $s.Key, $path, ($content -split "`n").Count)
    }
    else {
        $content = $s.Value
        Write-Host ("  {0,-20} <- valeur ({1} caracteres)" -f $s.Key, $content.Length)
    }
    # Fins de ligne Unix : un \r dans un .env ou une cle SSH casse le deploiement
    $content = $content -replace "`r`n", "`n"
    if ($s.Key -like '*KEY' -and $content.StartsWith('-----BEGIN') -and -not $content.EndsWith("`n")) { $content += "`n" }
    $ToSet[$s.Key] = $content
}

if ($DryRun) { Write-Host "`n-DryRun : rien n'a ete envoye." -ForegroundColor Yellow; return }

$answer = Read-Host "`nEnvoyer ces $($ToSet.Count) secrets vers $Repo ? Ceux qui existent seront remplaces (o/N)"
if ($answer -notmatch '^[oOyY]') { Write-Host 'Annule.'; return }

# --- Envoi ------------------------------------------------------------------------
# Valeur passee sur stdin avec les octets exacts : pas de valeur en argument
# (visible dans la liste des processus) ni de CRLF ajoute par PowerShell 5.1.
function Set-GhSecret([string]$Name, [string]$Value) {
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = (Get-Command gh).Source
    $psi.Arguments = "secret set $Name -R $Repo"
    $psi.UseShellExecute = $false
    $psi.RedirectStandardInput = $true
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $p = [System.Diagnostics.Process]::Start($psi)
    $bytes = $utf8.GetBytes($Value)
    $p.StandardInput.BaseStream.Write($bytes, 0, $bytes.Length)
    $p.StandardInput.Close()
    $null = $p.StandardOutput.ReadToEnd()
    $err = $p.StandardError.ReadToEnd()
    $p.WaitForExit()
    if ($p.ExitCode -ne 0) { throw "gh secret set $Name : $err" }
}

Write-Host ''
foreach ($s in $ToSet.GetEnumerator()) {
    Set-GhSecret $s.Key $s.Value
    Write-Host ("  {0,-20} ok" -f $s.Key) -ForegroundColor Green
}
Write-Host "`nTermine. Pense a supprimer les fichiers de cles copies en local si tu n'en as plus besoin." -ForegroundColor Cyan
