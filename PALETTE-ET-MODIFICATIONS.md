# OCK Automotive - version Bordeaux & Beige

Cette livraison est une **recoloration** du dossier fourni, et non une refonte fonctionnelle.

## Palette
- Bordeaux : `#571B30`
- Bordeaux secondaire : `#68263D`
- Ivoire : `#FAF6F0`
- Beige : `#E9D6BC`
- Anthracite : `#292326`
- Accent doux lisible sur fond clair : `#94546A`

## Changements
- Feuille `asset/css/style.css` : couleurs de l'accueil, du hero, navigation, sections, cartes, boutons et pied de page.
- Anciennes feuilles CSS : remplacement des anciens bleus, des tons vifs et du jaune pur.
- Nouvelle feuille `asset/css/palette-legacy.css` chargée sur les anciennes pages pour une palette de base cohérente.
- Aucun JS ni HTML structurel change ; seul le chargement du CSS partagé a ete ajoute sur les anciennes pages.
- Bootstrap conserve tel quel.

## Remarques
- Le projet contient encore de nombreuses pages HTML anciennes qui feront l'objet de la reduction prevue ulterieurement.
- Les anciens liens et chemins potentiellement casses n'ont pas ete reconstruits dans cette etape de colorimetrie.
- Les polices externes de la page d'accueil necessitent Internet.
- Le dossier `.git` a ete exclu de cette archive pour eviter de transporter l'historique Git ; conserve ton depot d'origine intact.
- Teste avec Live Server sur ordinateur et mobile, surtout le contraste du texte sur l'image hero.
