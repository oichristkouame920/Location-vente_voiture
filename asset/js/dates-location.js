
/* ==========================================
   OCK AUTOMOTIVE
   CONTRÔLE DES DATES DE LOCATION
========================================== */

(function () {

    // ======================================
    // 1. RÉCUPÉRATION DES ÉLÉMENTS
    // ======================================

    const formulaire = document.getElementById("location-form");

    const debut = document.getElementById("date-debut");

    const fin = document.getElementById("date-fin");

    const ville = document.getElementById("ville");


    // ======================================
    // 2. VÉRIFICATION DES ÉLÉMENTS
    // ======================================

    if (!formulaire || !debut || !fin) {
        return;
    }


    // ======================================
    // 3. RÉCUPÉRER LA DATE DU JOUR
    // ======================================

    function dateLocale() {

        const maintenant = new Date();

        const annee = maintenant.getFullYear();

        const mois = String(
            maintenant.getMonth() + 1
        ).padStart(2, "0");

        const jour = String(
            maintenant.getDate()
        ).padStart(2, "0");

        return `${annee}-${mois}-${jour}`;

    }


    // ======================================
    // 4. VÉRIFIER LES DATES
    // ======================================

    function actualiserDates() {

        const aujourdHui = dateLocale();

        // Empêcher une date de début passée
        debut.min = aujourdHui;

        if (debut.value) {

            // Calculer le lendemain
            const lendemain = new Date(
                `${debut.value}T12:00:00`
            );

            lendemain.setDate(
                lendemain.getDate() + 1
            );

            const annee = lendemain.getFullYear();

            const mois = String(
                lendemain.getMonth() + 1
            ).padStart(2, "0");

            const jour = String(
                lendemain.getDate()
            ).padStart(2, "0");

            // La date de fin doit être après le début
            fin.min = `${annee}-${mois}-${jour}`;

        } else {

            fin.min = aujourdHui;

        }


        // ==================================
        // 5. MESSAGES DE VALIDATION
        // ==================================

        if (
            debut.value &&
            debut.value < aujourdHui
        ) {

            debut.setCustomValidity(
                "La date de début ne peut pas être passée."
            );

        } else {

            debut.setCustomValidity("");

        }


        if (
            fin.value &&
            debut.value &&
            fin.value <= debut.value
        ) {

            fin.setCustomValidity(
                "La date de fin doit être après la date de début."
            );

        } else {

            fin.setCustomValidity("");

        }

    }


    // ======================================
    // 6. SURVEILLER LES CHANGEMENTS
    // ======================================

    debut.addEventListener(
        "change",
        actualiserDates
    );

    fin.addEventListener(
        "change",
        actualiserDates
    );


    // ======================================
    // 7. RÉINITIALISER LE FORMULAIRE
    // ======================================

    formulaire.addEventListener("reset", function () {

        setTimeout(function () {

            actualiserDates();

            // Réinitialiser la ville
            if (ville) {

                ville.replaceChildren(
                    new Option(
                        "Choisir d'abord un pays",
                        ""
                    )
                );

                ville.disabled = true;

            }

        }, 0);

    });


    // ======================================
    // 8. INITIALISATION
    // ======================================

    actualiserDates();

})();
