# COM'ON Holding – Site Web React

## Prérequis
- [Node.js](https://nodejs.org/) version 18 ou plus (télécharger sur nodejs.org)

## Installation & Démarrage

Ouvrez un terminal dans le dossier `comon-holding`, puis :

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Le site s'ouvre automatiquement sur **http://localhost:5173**

## Ajouter les logos des filiales

Placez les logos dans le dossier `public/logos/` :
- `public/logos/assurances.png`
- `public/logos/vati-co.png`
- `public/logos/services.png`
- `public/logos/distri-agri.png`
- `public/logos/agro.png`
- `public/logos/sigeced.png`
- `public/logos/cmet.png`

Puis dans chaque fichier `src/pages/NomFiliale.jsx`, ajoutez la prop `logo="/logos/nom.png"`.

## Mettre en production (hébergement)

```bash
npm run build
```

Un dossier `dist/` est créé. Envoyez son contenu sur votre hébergeur web.

## Structure du projet

```
comon-holding/
├── public/
│   └── logos/          ← Logos des filiales ici
├── src/
│   ├── components/
│   │   ├── Emblem.jsx        ← Emblème SVG du logo
│   │   ├── Navbar.jsx        ← Barre de navigation
│   │   ├── Footer.jsx        ← Pied de page
│   │   └── FilialePage.jsx   ← Template filiale réutilisable
│   ├── pages/
│   │   ├── Home.jsx          ← Page d'accueil Holding
│   │   ├── Assurances.jsx
│   │   ├── VatiCo.jsx
│   │   ├── Services.jsx
│   │   ├── DistriAgri.jsx
│   │   ├── Agro.jsx
│   │   ├── Sigeced.jsx
│   │   └── Cmet.jsx
│   ├── App.jsx               ← Routeur principal
│   ├── main.jsx
│   └── index.css             ← Variables et styles globaux
├── package.json
└── vite.config.js
```
