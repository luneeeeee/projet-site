document.addEventListener("DOMContentLoaded", () => {
    console.log("Optimisations JS pour atteindre 100 % en cours...");

    // **1. Préchargement strict de l'image LCP pour prioriser son rendu**
    const lcpImage = "assets/images/femmeparapluie-2-large.webp";
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.href = lcpImage;
    preloadLink.as = "image";
    document.head.appendChild(preloadLink);
    console.log(`Préchargement de l'image critique : ${lcpImage}`);

    // **2. Activation du Lazy Loading pour toutes les images**
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
        if (!img.hasAttribute("loading")) {
            img.setAttribute("loading", "lazy");
        }
    });
    console.log("Lazy Loading activé pour toutes les images.");

    // **3. Chargement différé des scripts non critiques**
    window.addEventListener("load", () => {
        const nonCriticalScripts = [
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"
        ];
        nonCriticalScripts.forEach((src) => {
            const script = document.createElement("script");
            script.src = src;
            script.defer = true;
            document.body.appendChild(script);
            console.log(`Script non critique chargé : ${src}`);
        });
    });

    // **4. Retarder l'exécution des tâches non essentielles après le rendu principal**
    window.requestIdleCallback(() => {
        console.log("Exécution des tâches non essentielles...");

        // Par exemple : Nettoyage supplémentaire, monitoring, etc.
        const analyticsScript = document.createElement("script");
        analyticsScript.src = "https://example.com/analytics.js"; // Exemple fictif
        analyticsScript.defer = true;
        document.body.appendChild(analyticsScript);
        console.log("Script d'analytique chargé en arrière-plan.");
    });

    // **5. Assurer une stabilité visuelle en ajoutant les dimensions des images manquantes**
    images.forEach((img) => {
        if (!img.hasAttribute("width") || !img.hasAttribute("height")) {
            const tempImg = new Image();
            tempImg.src = img.src;
            tempImg.onload = () => {
                img.setAttribute("width", tempImg.naturalWidth);
                img.setAttribute("height", tempImg.naturalHeight);
                console.log(`Dimensions ajoutées à l'image : ${img.src}`);
            };
        }
    });

    console.log("Optimisations JS appliquées avec succès !");
});
