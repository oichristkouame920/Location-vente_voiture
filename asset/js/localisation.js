
/* ==========================================
   OCK AUTOMOTIVE
   GESTION LOCALE DES PAYS ET DES VILLES
========================================== */

// ==========================================
// 1. RÉCUPÉRATION DES ÉLÉMENTS HTML
// ==========================================

const paysSelect = document.getElementById("pays");

const villeSelect = document.getElementById("ville");


// ==========================================
// 2. VÉRIFICATION DES ÉLÉMENTS
// ==========================================

if (
    paysSelect &&
    villeSelect &&
    typeof localisations !== "undefined"
) {

    // ======================================
    // 3. CHARGEMENT DES PAYS
    // ======================================

    function chargerPays() {

        // Nettoyer les anciennes options
        paysSelect.replaceChildren(
            new Option("Choisir un pays", "")
        );

        // Récupérer les noms des pays
        const pays = Object.keys(localisations);

        // Trier les pays alphabétiquement
        pays.sort(function (a, b) {

            return a.localeCompare(b, "fr");

        });

        // Ajouter chaque pays au select
        pays.forEach(function (paysActuel) {

            const option = new Option(
                paysActuel,
                paysActuel
            );

            paysSelect.add(option);

        });

    }


    // ======================================
    // 4. CHARGEMENT DES VILLES
    // ======================================

    function chargerVilles() {

        const paysChoisi = paysSelect.value;

        // Réinitialiser la liste des villes
        villeSelect.replaceChildren(
            new Option("Choisir une ville", "")
        );

        // Désactiver la liste par défaut
        villeSelect.disabled = true;

        // Vérifier que le pays existe
        if (
            !paysChoisi ||
            !Object.hasOwn(localisations, paysChoisi)
        ) {

            villeSelect.options[0].textContent =
                "Choisir d'abord un pays";

            return;

        }

        // Récupérer les villes du pays
        const villes = localisations[paysChoisi];

        // Trier les villes sans modifier les données
        const villesTriees = [...villes].sort(
            function (a, b) {

                return a.localeCompare(b, "fr");

            }
        );

        // Ajouter les villes au select
        villesTriees.forEach(function (ville) {

            const option = new Option(
                ville,
                ville
            );

            villeSelect.add(option);

        });

        // Activer la liste si des villes existent
        villeSelect.disabled = villesTriees.length === 0;

    }


    // ======================================
    // 5. CHANGEMENT DE PAYS
    // ======================================

    paysSelect.addEventListener(
        "change",
        chargerVilles
    );


    // ======================================
    // 6. RÉINITIALISATION DU FORMULAIRE
    // ======================================

    const formulaire = paysSelect.closest("form");

    if (formulaire) {

        formulaire.addEventListener(
            "reset",
            function () {

                // Attendre la réinitialisation HTML
                setTimeout(function () {

                    chargerVilles();

                }, 0);

            }
        );

    }


    // ======================================
    // 7. INITIALISATION
    // ======================================

    chargerPays();

    chargerVilles();

}
