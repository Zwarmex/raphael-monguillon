# Fer & Feu, métallerie et chaudronnerie

Site vitrine (Next.js 16, Tailwind CSS 4) de Fer & Feu, l'entreprise de Raphaël Monguillon, métallier chaudronnier à Arlanc (63).

- `/` : le site Fer & Feu (nuit d'atelier, acier brossé, feu de forge).
- `/propositions` : les autres directions explorées (planche de traçage, forge, plaque constructeur, catalogue), non indexées.

## Photos à fournir

Le site fonctionne sans photo (dessins au trait), mais il sera bien plus fort avec les vraies :

- `public/photos/artisan.jpg` : portrait à l'atelier (format vertical). Utilisé automatiquement dès qu'il est déposé.
- Réalisations : déposer les images dans `public/realisations/` puis renseigner `photo` pour chaque entrée de `realisations` dans `lib/site.ts` (par exemple `"/realisations/protection-murale.jpg"`).

```bash
npm install
npm run dev
```

## Mise en ligne (staging puis prod)

Même chaîne que norde.be : `.github/workflows/deploy.yml`.

1. **Push sur `staging`** : lint et types, puis image Docker construite sur GitHub et poussée sur
   `ghcr.io/zwarmex/raphael-monguillon`, puis déploiement sur le serveur de préproduction
   (Tailscale + SSH) dans `/srv/apps/feretfeu`, conteneur `feretfeu-staging` sur le réseau `reseau_proxy`.
2. **Prod** (plus tard) : décommenter `master` dans le workflow et remplir les secrets de prod.

Le staging n'est jamais indexé (`SITE_ENV=preprod` : robots.txt fermé, `noindex` partout).

### Secrets GitHub (repo Zwarmex/raphael-monguillon)

Remplir `github-secrets.env` à partir de `github-secrets.env.example`, puis :

```powershell
.\scripts\github-secrets.ps1 -DryRun
.\scripts\github-secrets.ps1
```

| Secret | Contenu |
| --- | --- |
| `TS_OAUTH_CLIENT_ID`, `TS_OAUTH_SECRET` | client OAuth Tailscale avec le tag `tag:github-actions` (les mêmes que norde.be) |
| `SSH_USER`, `SSH_PORT` | `deploy` et `22222` |
| `DEV_SSH_HOST`, `DEV_SSH_KEY` | serveur de staging (nom MagicDNS) et clé privée de déploiement |
| `ENV_FILE_PREPROD` | fichier au format de `.env.example`, avec `SITE_ENV=preprod` |
| `SSH_HOST`, `SSH_KEY`, `ENV_FILE_PROD` | idem pour la prod, avec `SITE_ENV=production` |

`GITHUB_TOKEN` est fourni par GitHub (push et pull de l'image), rien à créer.

### Sur le serveur, une seule fois

Dans Nginx Proxy Manager, créer un proxy host `staging.<domaine>` vers `feretfeu-staging`, port `3000`,
certificat Let's Encrypt. Conseillé : une Access List (mot de passe) sur le staging.

## Ancienne direction : « la planche de traçage » (désormais dans /propositions/planche)

Le chaudronnier part d'un plan et d'un développé de tôle : le site en reprend le langage.

| Rôle | Nom | Valeur |
| --- | --- | --- |
| Fond | Zinc | `#E7E8E4` |
| Surfaces | Tôle | `#D6D8D3` |
| Texte | Graphite | `#1B1E21` |
| Texte secondaire | Acier | `#4B5157` |
| Accent unique | Minium (apprêt antirouille) | `#B3371A` |
| Section contact | Forge | `#141618` |
| Filets | Couleurs de revenu de l'acier | paille → bronze → pourpre → bleu |

- Typographie : **Archivo** seule, en trois largeurs (étendue pour les titres, normale pour le texte, étroite pour les annotations).
- Image principale : un vrai développé de trémie carré-rond, calculé par triangulation dans `lib/trace.ts`, qui se dessine une fois au chargement (désactivé si l'utilisateur réduit les animations).
- Toutes les couleurs de texte passent le contraste WCAG AA.

## À compléter avant la mise en ligne

Tout est centralisé dans [`lib/site.ts`](lib/site.ts) :

1. **Numéro de téléphone** (`site.phone`). Tant qu'il contient des `X`, il n'est pas publié dans les données structurées.
2. **Nom de domaine** (`site.url`, ou la variable `NEXT_PUBLIC_SITE_URL`).
3. **Mentions légales** (`site.legal` : raison sociale, SIRET, adresse, e-mail). Obligatoires pour un professionnel.
4. Variables d'environnement du formulaire : `SMTP_USER`, `SMTP_PASS`, `SMTP_MAIL_TO` (et en option `SMTP_HOST`, `SMTP_PORT`, par défaut Gmail sur le port 465).

Après la mise en ligne : déclarer le site dans Google Search Console (envoyer `/sitemap.xml`) et créer ou relier la fiche **Google Business Profile**, qui pèse le plus en référencement local.

## SEO et accessibilité en place

- Titre, description, URL canonique, Open Graph et Twitter, image de partage générée (`app/opengraph-image.tsx`).
- `robots.txt`, `sitemap.xml`, manifeste, icônes.
- Données structurées `HomeAndConstructionBusiness` (adresse, zone desservie, prestations, FAQ).
- En-têtes de sécurité (HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- Lien d'évitement, repères de page, hiérarchie de titres, focus visible, zones cliquables d'au moins 44 px, formulaire avec étiquettes, erreurs annoncées et focus sur le premier champ en erreur. Audit axe-core : 0 violation (WCAG 2.2 AA).
