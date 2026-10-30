const TYPES = {suv:"SUV et crossovers",berline:"Berlines",coupe:"Coupés",pickup:"Pick-up",sport:"Sportives"};
const type = new URLSearchParams(location.search).get("type");
const liste = [...VEHICULES, ...(typeof VEHICULES_ILLUSTRATIFS !== "undefined" ? VEHICULES_ILLUSTRATIFS : [])].filter(v => v.categorie === type);
const resultat = document.getElementById("resultats");
const marque = document.getElementById("marque");
const recherche = document.getElementById("recherche");
document.getElementById("titre").textContent = TYPES[type] || "Catégorie introuvable";
[...new Set(liste.map(v => v.marque))].sort().forEach(function (nom) {
    marque.add(new Option(nom,nom));
});
function afficher() {
    resultat.replaceChildren();
    const filtres = liste.filter(function (v) {
        return (!marque.value || v.marque === marque.value) &&
            (v.modele + " " + v.marque).toLocaleLowerCase("fr").includes(recherche.value.toLocaleLowerCase("fr").trim());
    });
    document.getElementById("compteur").textContent = filtres.length + " véhicule(s) référencé(s)";
    if (!filtres.length) {
        const texte = document.createElement("p");
        texte.className = "ock-empty";
        texte.textContent = "Aucun véhicule ne correspond à votre recherche.";
        resultat.append(texte);
    }
    filtres.forEach(function (v) {
        const carte = document.createElement("article");
        carte.className = "ock-card";
        const img = document.createElement("img");
        img.src = encodeURI((typeof MINIATURES_VEHICULES !== "undefined" && MINIATURES_VEHICULES[v.image]) || v.image);
        img.width = 780;
        img.height = 520;
        img.alt = v.marque + " " + v.modele;
        img.loading = "lazy";
        const cont = document.createElement("div");
        cont.className = "ock-card-content";
        const titre = document.createElement("h2");
        titre.textContent = v.marque + " · " + v.modele;
        const info = document.createElement("p");
        info.textContent = v.descriptionCourte || (v.statut === "illustration" ? "Modèle de référence — illustration non contractuelle." : "Fiche historique à compléter selon la finition.");
        const notice = document.createElement("span");
        notice.className = "ock-vehicle-label";
        notice.textContent = v.statut === "illustration" ? "MODÈLE ILLUSTRATIF" : "FICHE À VÉRIFIER";
        cont.prepend(notice);
        const lien = document.createElement("a");
        lien.href = "vehicule.html?id=" + encodeURIComponent(v.id);
        lien.className = "ock-button";
        lien.textContent = "Voir la fiche →";
        cont.append(titre,info,lien);
        carte.append(img,cont);
        resultat.append(carte);
    });
}
marque.addEventListener("change",afficher);
recherche.addEventListener("input",afficher);
afficher();
