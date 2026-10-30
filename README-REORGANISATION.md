# OCK Automotive — réorganisation consolidée

Cette copie réorganise le contenu de `asset.zip` selon l’architecture retenue. Les fichiers de l’archive source ne sont pas modifiés.

## Pages actives
- `index.html`, `catalogue.html`, `categorie.html`, `vehicule.html`, `acheter.html`, `louer.html`, `contact.html`
- `categorie.html?type=suv` est un exemple de catégorie dynamique.

## Éléments préservés
- Ressources d’images originales dans `img/`, documents complémentaires et Bootstrap.
- Formulaires les plus récents, pop-up et scripts provenant de `asset.zip` (prioritaires sur les versions anciennes).
- Toutes les anciennes pages automobiles et CSS conservés dans `archives/ancien-catalogue/` pour récupération de contenu. Leur rendu depuis ce sous-dossier n’est pas garanti sans adaptation des chemins relatifs.
- 30 marques préparées dans `asset/data/marques.js`, sans présumer de leur stock.
- `asset/data/localisation.js` est conservé **sans s final** pour rester compatible avec les formulaires.

## Backend / données
- `backend/`, `database/`, `admin/` sont des emplacements de développement. Les scripts PHP et la base MySQL ne constituent pas encore un backend fonctionnel.
- `database/schema.sql` est un schéma de départ, à examiner avant exécution.
- Le catalogue JS contient des descriptions historiques non vérifiées ; aucun prix ni disponibilité ne doivent être déduits automatiquement.

## Tester
1. Ouvrir le dossier via VS Code + Live Server.
2. Tester accueil, pop-up, menu, catalogue, catégories, fiches, formulaires, pays/villes, dates, réinitialisation.
3. Lire `VERIFICATIONS.md` pour les références qui nécessitent une validation manuelle.

## Déploiement
Ne publiez pas `archives/`, `database/`, `backend/config/`, `.env` ou les fichiers de développement dans le répertoire public du serveur. Une séparation entre dossier public et code privé sera nécessaire lors de la phase PHP.
