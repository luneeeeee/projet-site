document.addEventListener("DOMContentLoaded", () => {
    console.log("Optimisations JS en cours...");

    // **1. Préchargement dynamique des images critiques**
    const criticalImages = [
        "assets/images/femmeparapluie-2-large.webp", // Image principale LCP
        "assets/images/pont.webp" // Exemple d'autres images critiques
    ];

    criticalImages.forEach((src) => {
        const img = new Image();
        img.src = src;
        console.log(`Préchargement de l'image critique : ${src}`);
    });

    // **2. Chargement différé des scripts non critiques**
    const deferScripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"
    ];

    deferScripts.forEach((src) => {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        document.body.appendChild(script);
        console.log(`Script différé ajouté : ${src}`);
    });

    // **3. Réduction de la charge JS en différant les calculs complexes**
    setTimeout(() => {
        console.log("Démarrage des opérations différées après le rendu initial...");
        
        // Exemple d'optimisation additionnelle (traitement différé des images)
        document.querySelectorAll("img").forEach(img => {
            if (!img.complete) {
                img.loading = "lazy"; // Ajout lazy loading si non chargé
            }
        });
        
    }, 3000); // Attente de 3 secondes après le chargement principal

    // **4. Préparation au rendu rapide du contenu visible**
    requestAnimationFrame(() => {
        console.log("Priorisation du rendu pour les contenus visibles...");
        document.querySelectorAll("img").forEach(img => {
            img.style.visibility = "visible";
        });
    });

    console.log("Toutes les optimisations JS sont terminées !");
});
