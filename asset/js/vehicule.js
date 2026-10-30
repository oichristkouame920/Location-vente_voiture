/* OCK Automotive — fiche structurée, sans blocs historiques mélangés. */
(function () {
    "use strict";
    const id = new URLSearchParams(window.location.search).get("id");
    const references = typeof VEHICULES_ILLUSTRATIFS !== "undefined" ? VEHICULES_ILLUSTRATIFS : [];
    const v = [...VEHICULES, ...references].find(item => item.id === id);
    const zone = document.getElementById("fiche");
    if (!zone) return;
    if (!v) {
        const note = document.createElement("p");
        note.className = "ock-notice";
        note.textContent = "Fiche introuvable. Consultez le catalogue.";
        zone.append(note);
        return;
    }
    const base = (typeof FICHES_STRUCTUREES !== "undefined" ? FICHES_STRUCTUREES[v.id] : null) || v;
    const estIllustratif = v.statut === "illustration";
    const titre = v.modele.startsWith(v.marque) ? v.modele : v.marque + " " + v.modele;
    document.title = titre + " | OCK Automotive";
    document.getElementById("retour").href = "categorie.html?type=" + encodeURIComponent(v.categorie);
    function element(tag, classe, valeur) {
        const e = document.createElement(tag);
        if (classe) e.className = classe;
        if (valeur !== undefined) e.textContent = valeur;
        return e;
    }
    const root = element("article", "ock-spec-layout");
    const photo = element("img", "ock-spec-image");
    photo.src = encodeURI(v.image);
    photo.alt = titre + (estIllustratif ? " — illustration générée" : "");
    photo.loading = "eager";
    root.append(photo);
    const contenu = element("div", "ock-spec-body");
    contenu.append(element("p", "ock-spec-eyebrow", v.marque + " · " + v.categorie.toUpperCase()));
    contenu.append(element("h1", "", titre));
    contenu.append(element("p", "ock-spec-lead", base.descriptionCourte || "Informations du modèle à documenter."));
    if (estIllustratif) contenu.append(element("p", "ock-spec-notice", "Image générée à titre illustratif. Cette fiche ne constitue pas une annonce de véhicule disponible."));
    const box = element("section", "ock-spec-section");
    box.append(element("h2", "", "Caractéristiques principales"));
    const grid = element("div", "ock-spec-grid");
    Object.entries(base.caracteristiques || {}).forEach(([nom,valeur]) => {
        const item = element("div", "ock-spec-attribute");
        item.append(element("span", "", nom.charAt(0).toUpperCase() + nom.slice(1)));
        item.append(element("strong", "", String(valeur)));
        grid.append(item);
    });
    if (!grid.children.length) {
        grid.append(element("p", "ock-muted", "Les caractéristiques de cette version sont en cours de documentation."));
    }
    box.append(grid);
    contenu.append(box);

    const guide = element("section", "ock-spec-section");
    guide.append(element("h2", "", "Informations complémentaires"));
    const autres = element("div", "ock-spec-grid");
    const informations = [
        ["Marque", v.marque],
        ["Modèle", v.modele],
        ["Type de véhicule", ({suv:"SUV / Crossover",berline:"Berline / compacte",coupe:"Coupé",pickup:"Pick-up",sport:"Sportive"})[v.categorie] || v.categorie],
        ["Année et finition", "À confirmer pour le véhicule concerné"],
        ["Énergie et boîte", "Selon version / marché"],
        ["Prix et disponibilité", "Sur demande — non vérifiés"]
    ];
    informations.forEach(function ([libelle, valeur]) {
        const bloc = element("div", "ock-spec-attribute");
        bloc.append(element("span", "", libelle));
        bloc.append(element("strong", "", valeur));
        autres.append(bloc);
    });
    guide.append(autres);
    contenu.append(guide);
    if (Array.isArray(base.pointsForts) && base.pointsForts.length) {
        const section = element("section", "ock-spec-section");
        section.append(element("h2", "", "Points à découvrir"));
        const liste = element("ul", "ock-spec-list");
        base.pointsForts.forEach(point => liste.append(element("li", "", point)));
        section.append(liste);
        contenu.append(section);
    }
    const note = element("p", "ock-spec-footnote", "Année, finition, prix et disponibilité : à confirmer. Les caractéristiques peuvent varier selon le marché et la version.");
    contenu.append(note);
    if (base.sourceTechnique) {
        const a = element("a", "ock-spec-source", "Consulter la fiche officielle du constructeur ↗");
        a.href=base.sourceTechnique; a.target="_blank"; a.rel="noopener noreferrer";
        contenu.append(a);
    }
    if (!estIllustratif) {
        const actions = element("div", "ock-actions");
        [["Demander un achat", "acheter.html"],["Demander une location", "louer.html"]].forEach(([label,route]) => {
            const a = element("a", "ock-button", label);
            a.href = route + "?vehicule=" + encodeURIComponent(v.id);
            actions.append(a);
        });
        contenu.append(actions);
    }
    root.append(contenu); zone.append(root);
})();
