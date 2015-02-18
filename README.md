# MesCours

Une petite application qui utilise l'[API REST des cours](https://github.com/KIClubinfo/EDTAPI) pour afficher les prochains cours.

## Starter Guide

Il vous faudra `npm` (`apt-get install npm` ?)

```bash
# Install npm + bower dependencies and then build
npm install
# Launch the watcher + livereload
npm start
# http://localhost:8000
```

Vous avez maintenant [un petit serveur qui tourne en local](http://localhost:8000) pour tester et développer.
Et qui s'autoreload à chaque modification des sources.

## Déploiement

### Pour déployer sur les Github Pages :

```bash
npm run deploy
```

### Pour déployer vers les applications mobiles

```bash
cd mobile
cordova platform add android
cordova run android
```

Remplacez Android par la plateforme visée.
