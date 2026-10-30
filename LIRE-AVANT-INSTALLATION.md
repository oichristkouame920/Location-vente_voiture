# OCK Automotive - Correctif catalogue 30 marques

## Installation
Copier le contenu de ce dossier dans la racine du projet OCK Automotive, en conservant les sous-dossiers. Remplacer les quatre fichiers existants `catalogue.html`, `asset/css/catalogue.css`, `asset/js/catalogue.js` et `asset/data/marques.js`. Les fichiers `asset/data/modeles-a-documenter.js` et `asset/data/miniatures.js` sont nouveaux, comme `img/miniatures/`.

Ne pas remplacer `asset/data/vehicules.js`, les photographies d'origine, `categorie.html` ou `vehicule.html`.

## Ce qui a été corrigé
- Répertoire des 30 marques avant les quatre catégories existantes, filtre par famille et recherche.
- Modèles exemplaires proposés pour les marques sans fiches. Pas de prix, stock ou disponibilité inventés.
- Images WebP légères pour le catalogue uniquement; photos sources préservées.
- Chaque vignette garde un cadre fixe et `object-fit: cover`.

## Dépannage
Lancer avec Live Server. Faire Ctrl+F5 après la copie pour rafraîchir l'ancien JavaScript/CSS. Les quatre scripts en fin de `catalogue.html` doivent exister et être dans l'ordre : vehicules.js, marques.js, modeles-a-documenter.js, miniatures.js, catalogue.js.

## Limitations
Les nouvelles marques n'ont pas de fiches automobiles vérifiées. Les modèles affichés sont des pistes d'enrichissement, pas des annonces. Les autres pages (`categorie.html`, `vehicule.html`) n'utilisent pas encore les miniatures de ce patch. Préparer de vraies annonces demandera images/licences, année, version, prix et stock vérifiés.
