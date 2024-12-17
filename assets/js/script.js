document.addEventListener("DOMContentLoaded", () => {
    console.log("Optimisation avancée des performances en cours...");

    // **1. Préchargement de l'image LCP pour la prioriser**
    const criticalImages = [
        "assets/images/femmeparapluie-2-large.webp" // Image LCP principale
    ];

    criticalImages.forEach(src => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = src;
        link.as = "image";
        document.head.appendChild(link);
        console.log(`Préchargement de l'image critique : ${src}`);
    });

    // **2. Lazy Loading optimisé pour les images**
    const lazyImages = document.querySelectorAll("img");
    lazyImages.forEach(img => {
        if (!img.hasAttribute("loading")) {
            img.setAttribute("loading", "lazy");
        }
    });

    // **3. Charger les scripts non critiques après le rendu visuel**
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            const deferScripts = [
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"
            ];

            deferScripts.forEach(src => {
                const script = document.createElement("script");
                script.src = src;
                script.defer = true;
                document.body.appendChild(script);
                console.log(`Script non critique chargé : ${src}`);
            });
        });
    } else {
        // Fallback pour navigateurs sans requestIdleCallback
        setTimeout(() => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js";
            script.defer = true;
            document.body.appendChild(script);
            console.log("Script non critique chargé avec fallback.");
        }, 3000);
    }

    // **4. Améliorer la fluidité des animations/rendu avec requestAnimationFrame**
    requestAnimationFrame(() => {
        console.log("Priorisation du rendu visuel en cours...");
        document.querySelectorAll("img").forEach(img => {
            img.style.visibility = "visible"; // Forcer la visibilité rapide
        });
    });

    // **5. Optimiser les dimensions manquantes pour éviter les Layout Shifts**
    document.querySelectorAll("img").forEach(img => {
        if (!img.hasAttribute("width") || !img.hasAttribute("height")) {
            const tempImg = new Image();
            tempImg.src = img.src;
            tempImg.onload = () => {
                img.setAttribute("width", tempImg.naturalWidth);
                img.setAttribute("height", tempImg.naturalHeight);
                console.log(`Dimensions ajoutées : ${img.src}`);
            };
        }
    });

    console.log("Toutes les optimisations JS ont été appliquées !");
});
