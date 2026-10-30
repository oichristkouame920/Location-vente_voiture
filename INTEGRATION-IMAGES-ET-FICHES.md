# OCK Automotive — intégration des visuels et fiches

- 20 images WebP ajoutées dans `img/marques/` ; toutes les photos d’origine sont conservées.
- `asset/data/images-marques.js` associe les illustrations aux marques.
- `asset/data/vehicules-illustratifs.js` ajoute 20 fiches modèles de référence **non disponibles à la vente**.
- `asset/data/fiches-structurees.js` remplace à l’affichage les descriptions historiques trop compactes par des rubriques lisibles ; les textes d’origine restent dans `vehicules.js`.
- Les valeurs inconnues sont signalées, non inventées. Une seule fiche technique commerciale externe a pu être vérifiée en détail : Peugeot 3008 en Côte d’Ivoire (https://www.peugeot.ci/fr/gamme/peugeot-cote-divoire-cfao-motors/nouveau-3008). Les autres modèles restent à compléter à partir de leur année, finition et marché.
- Images générées = illustrations uniquement ; les voitures ne sont pas réputées disponibles.
- Aucun identifiant, mot de passe ou dépôt `.git` inclus dans l’archive de livraison.
- Les fichiers originaux ne sont pas supprimés ; la copie du projet source n’a pas été modifiée.
- Tester localement avec Live Server : `catalogue.html` → marque → fiche, `categorie.html` → fiche, achat/location, popup et pays/ville.
