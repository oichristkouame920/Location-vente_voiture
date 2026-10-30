/* OCK Automotive — Catalogue des catégories et des 30 marques. */
(function () {
    "use strict";

    const listeVehicules = typeof VEHICULES !== "undefined" ? VEHICULES : [];
    const listeMarques = typeof MARQUES !== "undefined" ? MARQUES : [];
    const modelesProposes = typeof MODELES_A_DOCUMENTER !== "undefined" ? MODELES_A_DOCUMENTER : {};
    const miniatures = typeof MINIATURES_VEHICULES !== "undefined" ? MINIATURES_VEHICULES : {};

    const categoriesElement = document.getElementById("categories");
    const marquesElement = document.getElementById("marques");
    const compteurElement = document.getElementById("compteur-marques");
    const rechercheElement = document.getElementById("recherche-marque");
    const boutonsGammes = document.querySelectorAll("[data-gamme]");
    const selectionElement = document.getElementById("selection-marque");
    const titreSelection = document.getElementById("nom-marque-selection");
    const vehiculesSelection = document.getElementById("vehicules-marque");
    const fermerSelection = document.getElementById("fermer-selection");

    if (!categoriesElement || !marquesElement || !rechercheElement) {
        return;
    }

    const categories = {
        suv: { titre: "SUV & crossovers", resume: "Confort et polyvalence, au quotidien comme sur route." },
        berline: { titre: "Berlines", resume: "Des lignes élégantes pour vos déplacements." },
        coupe: { titre: "Coupés", resume: "Des silhouettes affirmées et expressives." },
        pickup: { titre: "Pick-up", resume: "Des véhicules adaptés aux besoins polyvalents." },
        sport: { titre: "Sportives", resume: "Des modèles au caractère dynamique." }
    };

    const nomsGammes = {
        generaliste: "Généraliste",
        americaine: "Américaine",
        prestige: "Premium / prestige"
    };

    const nombreCategories = new Set(listeVehicules.map(function (v) {
        return v.categorie;
    })).size;

    document.getElementById("nombre-categories").textContent = nombreCategories;
    document.getElementById("nombre-marques").textContent = listeMarques.length;
    document.getElementById("nombre-vehicules").textContent = listeVehicules.length;

    function creerElement(tag, classe, texte) {
        const element = document.createElement(tag);
        if (classe) element.className = classe;
        if (texte !== undefined) element.textContent = texte;
        return element;
    }

    function creerImage(chemin, description) {
        const image = document.createElement("img");
        image.src = miniatures[chemin] || chemin;
        image.width = 780;
        image.height = 520;
        image.alt = description;
        image.loading = "lazy";
        image.decoding = "async";
        return image;
    }

    function afficherCategories() {
        categoriesElement.replaceChildren();
        const imagesCategorie = {
            suv: "img/marques/hyundai.webp",
            berline: "img/marques/volkswagen.webp",
            coupe: "img/marques/dodge.webp",
            pickup: "img/marques/ford.webp",
            sport: "img/marques/porsche.webp"
        };
        Object.keys(categories).forEach(function (cle) {
            const historiques = listeVehicules.filter(function (vehicule) {
                return vehicule.categorie === cle;
            });
            const references = (typeof VEHICULES_ILLUSTRATIFS !== "undefined" ? VEHICULES_ILLUSTRATIFS : []).filter(function (vehicule) {
                return vehicule.categorie === cle;
            });
            if (!historiques.length && !references.length) return;

            const carte = creerElement("article", "ock-card ock-category-card");
            const image = creerImage(imagesCategorie[cle] || (historiques[0] || references[0]).image, "Photographie illustrative : " + categories[cle].titre);
            image.className = "ock-category-image";
            carte.appendChild(image);
            const contenu = creerElement("div", "ock-card-content");
            contenu.appendChild(creerElement("span", "ock-category-kicker", "EXPLORER · " + categories[cle].titre.toUpperCase()));
            contenu.appendChild(creerElement("h3", "", categories[cle].titre));
            contenu.appendChild(creerElement("p", "", categories[cle].resume));
            contenu.appendChild(creerElement("p", "ock-category-counter", historiques.length + " fiches historiques · " + references.length + " modèles illustratifs"));
            const lien = creerElement("a", "ock-button", "Découvrir les modèles →");
            lien.href = "categorie.html?type=" + encodeURIComponent(cle);
            contenu.appendChild(lien);
            carte.appendChild(contenu);
            categoriesElement.appendChild(carte);
        });
    }

    let gammeActive = "toutes";

    function normaliser(texte) {
        return String(texte).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function afficherFichesMarque(nom) {
        const fiches = listeVehicules.filter(function (v) {
            return v.marque === nom;
        });
        if (!fiches.length) return;

        titreSelection.textContent = nom;
        vehiculesSelection.replaceChildren();
        fiches.slice(0, 6).forEach(function (vehicule) {
            const carte = creerElement("article", "ock-card");
            carte.appendChild(creerImage(vehicule.image, vehicule.modele));
            const contenu = creerElement("div", "ock-card-content");
            contenu.appendChild(creerElement("h3", "", vehicule.modele));
            contenu.appendChild(creerElement("p", "", "Catégorie : " + (categories[vehicule.categorie]?.titre || vehicule.categorie)));
            const lien = creerElement("a", "ock-button", "Voir la fiche →");
            lien.href = "vehicule.html?id=" + encodeURIComponent(vehicule.id);
            contenu.appendChild(lien);
            carte.appendChild(contenu);
            vehiculesSelection.appendChild(carte);
        });
        selectionElement.hidden = false;
        selectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function afficherMarques() {
        const recherche = normaliser(rechercheElement.value.trim());
        const resultat = listeMarques.filter(function (marque) {
            return (gammeActive === "toutes" || marque.gamme === gammeActive)
                && normaliser(marque.nom).includes(recherche);
        });

        marquesElement.replaceChildren();
        compteurElement.textContent = resultat.length + " marque(s) affichée(s) sur " + listeMarques.length;

        if (!resultat.length) {
            marquesElement.appendChild(creerElement("p", "ock-empty", "Aucune marque ne correspond à votre recherche."));
            return;
        }

        resultat.forEach(function (marque) {
            const nombre = listeVehicules.filter(function (v) {
                return v.marque === marque.nom;
            }).length;
            const carte = creerElement("article", "ock-brand-card");
            const photoMarque = typeof IMAGES_MARQUES !== "undefined" ? IMAGES_MARQUES[marque.nom] : null;
            const imageHistorique = listeVehicules.find(function (v) { return v.marque === marque.nom && v.image; });
            const visuelDisponible = photoMarque || (imageHistorique && imageHistorique.image);
            if (visuelDisponible) {
                const visuel = creerImage(visuelDisponible, "Véhicule illustrant " + marque.nom);
                visuel.className = "ock-brand-photo";
                carte.appendChild(visuel);
            } else {
                const attente = creerElement("div", "ock-brand-visual-placeholder");
                attente.setAttribute("role", "img");
                attente.setAttribute("aria-label", "Visuel de la marque à ajouter");
                attente.appendChild(creerElement("span", "ock-brand-monogram", marque.nom.slice(0, 2).toUpperCase()));
                attente.appendChild(creerElement("span", "ock-brand-visual-caption", "Visuel à venir"));
                carte.appendChild(attente);
            }
            carte.appendChild(creerElement("span", "ock-brand-type", nomsGammes[marque.gamme] || "Automobile"));
            carte.appendChild(creerElement("h3", "", marque.nom));
            carte.appendChild(creerElement("p", "ock-brand-status", nombre ? nombre + " fiches historiques à vérifier" : "Modèles à documenter"));

            const exemples = modelesProposes[marque.nom] || [];
            if (exemples.length) {
                const detail = creerElement("p", "ock-brand-examples", "Exemples : " + exemples.join(" · "));
                carte.appendChild(detail);
            }

            if (!nombre && photoMarque) {
                const refModele = (typeof VEHICULES_ILLUSTRATIFS !== "undefined" ? VEHICULES_ILLUSTRATIFS : []).find(v => v.marque === marque.nom);
                if (refModele) {
                    const lienModele = creerElement("a", "ock-brand-link", "Explorer un modèle illustratif →");
                    lienModele.href = "vehicule.html?id=" + encodeURIComponent(refModele.id);
                    carte.appendChild(lienModele);
                }
            }
            if (nombre) {
                const bouton = creerElement("button", "ock-brand-link", "Voir les modèles →");
                bouton.type = "button";
                bouton.addEventListener("click", function () {
                    afficherFichesMarque(marque.nom);
                });
                carte.appendChild(bouton);
            }
            marquesElement.appendChild(carte);
        });
    }

    boutonsGammes.forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            gammeActive = bouton.dataset.gamme;
            boutonsGammes.forEach(function (autre) {
                const actif = autre === bouton;
                autre.classList.toggle("is-active", actif);
                autre.setAttribute("aria-pressed", String(actif));
            });
            afficherMarques();
        });
    });

    rechercheElement.addEventListener("input", afficherMarques);
    fermerSelection.addEventListener("click", function () {
        selectionElement.hidden = true;
        document.getElementById("titre-marques").scrollIntoView({ behavior: "smooth" });
    });

    afficherCategories();
    afficherMarques();
})();
