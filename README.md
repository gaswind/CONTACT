# Carte de contact QR — avec suivi discret des scans

## Déploiement sur Netlify (gratuit)

1. Va sur https://app.netlify.com et crée un compte (pas de carte bancaire requise).
2. Clique sur **"Add new site" → "Deploy manually"**.
3. Fais glisser le dossier `carte-contact-netlify` (celui-ci en entier, dézippé) dans la zone de dépôt.
4. Netlify te donne une URL du type `https://nom-aleatoire.netlify.app`. Tu peux la renommer dans **Site settings → Change site name**.

## Configurer tes informations de contact

Dans le tableau de bord Netlify de ton site : **Site settings → Environment variables → Add a variable**, ajoute :

| Variable | Exemple |
|---|---|
| `CONTACT_NAME` | Jean Dupont |
| `CONTACT_ROLE` | Consultant |
| `CONTACT_ORG` | Ma Société |
| `CONTACT_PHONE` | +33600000000 |
| `CONTACT_EMAIL` | jean@masociete.fr |
| `ADMIN_PIN` | choisis un code que toi seul connais |

Après avoir ajouté les variables, va dans **Deploys** et clique sur **Trigger deploy → Deploy site** pour qu'elles soient prises en compte.

## Récupérer ton QR code

Le lien à encoder dans le QR est :

```
https://TON-SITE.netlify.app/scan
```

Scanner ce lien télécharge/ouvre directement la fiche contact (comme avant), tout en loggant discrètement la date, la ville approximative (via l'IP) et le type d'appareil.

Génère l'image du QR avec n'importe quel générateur gratuit (ex. qr-code-generator.com, ou l'appli Raccourcis sur iPhone) en collant cette URL.

## Consulter les scans

Va sur :

```
https://TON-SITE.netlify.app/admin.html
```

Entre le code que tu as mis dans `ADMIN_PIN`. Tu verras le nombre total de scans, les scans du jour, la ville la plus fréquente, et le détail (date, ville approx., appareil).

## Ce qui est stocké

- Date et heure du scan
- Ville et pays approximatifs (déduits de l'IP, pas de GPS précis)
- Type d'appareil (mobile / tablette / ordinateur)

Rien qui identifie nommément la personne. Le stockage utilise Netlify Blobs (inclus gratuitement, pas de base de données à configurer).
