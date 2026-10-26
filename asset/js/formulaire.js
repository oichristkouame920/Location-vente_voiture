// Récupération des éléments

const formulaire = document.querySelector(".vehicle-form");

const checkbox = document.getElementById("confidentialite");

const bouton = document.querySelector(".btn-submit");


// Vérification des éléments

if (formulaire && checkbox && bouton) {

    // Gestion de l'état du bouton

    function gererBouton() {

        bouton.disabled = !checkbox.checked;

    }

    // Initialisation

    gererBouton();

    // Détection des changements

    checkbox.addEventListener("change", gererBouton);

    // Réinitialisation

    formulaire.addEventListener("reset", function () {

        setTimeout(gererBouton, 0);

    });

    // Soumission

    formulaire.addEventListener("submit", function (event) {

        // Aucune soumission réelle pour le moment

        event.preventDefault();

        if (!checkbox.checked) {

            gererBouton();

            alert(
                "Veuillez accepter les conditions " +
                "d'utilisation."
            );

            return;

        }

        alert(
            "Formulaire validé ! " +
            "Aucune demande n'a encore été envoyée."
        );

    });

}