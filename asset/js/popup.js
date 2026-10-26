
/* ==========================================
   OCK AUTOMOTIVE
   POP-UP DE BIENVENUE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // 1. RÉCUPÉRATION DES ÉLÉMENTS
    // ======================================

    const popup = document.getElementById("welcome-popup");

    const boutonFermer = document.getElementById("welcome-close");

    const boutonContinuer = document.getElementById("welcome-continue");

    if (!popup || !boutonFermer || !boutonContinuer) {
        return;
    }

    let dernierElementActif = null;


    // ======================================
    // 2. OUVERTURE
    // ======================================

    function ouvrirPopup() {

        dernierElementActif = document.activeElement;

        popup.hidden = false;

        document.body.style.overflow = "hidden";

        requestAnimationFrame(function () {

            popup.classList.add("is-visible");

        });

        boutonFermer.focus();

    }


    // ======================================
    // 3. FERMETURE
    // ======================================

    function fermerPopup() {

        popup.classList.remove("is-visible");

        document.body.style.overflow = "";

        setTimeout(function () {

            popup.hidden = true;

            if (dernierElementActif) {
                dernierElementActif.focus();
            }

        }, 350);

    }


    // ======================================
    // 4. ÉVÉNEMENTS DES BOUTONS
    // ======================================

    boutonFermer.addEventListener(
        "click",
        fermerPopup
    );

    boutonContinuer.addEventListener(
        "click",
        fermerPopup
    );


    // ======================================
    // 5. CLIC À L'EXTÉRIEUR
    // ======================================

    popup.addEventListener("click", function (event) {

        if (event.target === popup) {

            fermerPopup();

        }

    });


    // ======================================
    // 6. NAVIGATION CLAVIER
    // ======================================

    document.addEventListener("keydown", function (event) {

        if (popup.hidden) {
            return;
        }

        if (event.key === "Escape") {

            fermerPopup();
            return;

        }

        if (event.key === "Tab") {

            const elements = Array.from(
                popup.querySelectorAll(
                    'a[href], button:not([disabled])'
                )
            );

            const premier = elements[0];

            const dernier = elements[elements.length - 1];

            if (!premier || !dernier) {
                return;
            }

            if (
                event.shiftKey &&
                document.activeElement === premier
            ) {

                event.preventDefault();
                dernier.focus();

            } else if (
                !event.shiftKey &&
                document.activeElement === dernier
            ) {

                event.preventDefault();
                premier.focus();

            }

        }

    });


    // ======================================
    // 7. AFFICHAGE À CHAQUE CHARGEMENT
    // ======================================

    ouvrirPopup();

});
