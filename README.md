# Raphaël Monguillon, chaudronnerie & métallerie

Site vitrine (Next.js 16, Tailwind CSS 4) d'un artisan chaudronnier métallier à Arlanc (63).

```bash
npm install
npm run dev
```

## Direction artistique : « la planche de traçage »

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
