document.addEventListener("DOMContentLoaded", () => {
    console.log("Optimisations des performances en cours...");

    // **1. Préchargement des images critiques pour prioriser le LCP**
    const criticalImages = [
        "assets/images/femmeparapluie-2-large.webp" // Image principale du LCP
    ];

    criticalImages.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = src;
        link.as = "image";
        document.head.appendChild(link);
        console.log(`Image critique préchargée : ${src}`);
    });

    // **2. Charger les scripts non critiques de manière plus différée avec requestIdleCallback**
    if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
            const deferScripts = [
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"
            ];

            deferScripts.forEach((src) => {
                const script = document.createElement("script");
                script.src = src;
                script.defer = true;
                document.body.appendChild(script);
                console.log(`Script non critique chargé en différé : ${src}`);
            });
        });
    } else {
        // Fallback pour les navigateurs sans requestIdleCallback
        setTimeout(() => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js";
            script.defer = true;
            document.body.appendChild(script);
            console.log("Script non critique chargé avec setTimeout.");
        }, 3000);
    }

    // **3. Appliquer le Lazy Loading intelligemment pour toutes les images**
    requestIdleCallback(() => {
        const lazyImages = document.querySelectorAll("img");
        lazyImages.forEach((img) => {
            if (!img.hasAttribute("loading")) {
                img.setAttribute("loading", "lazy");
            }
        });
        console.log("Lazy Loading appliqué dynamiquement aux images.");
    });

    // **4. Charger les CSS non critiques après le rendu principal**
    requestIdleCallback(() => {
        const nonCriticalCSS = [
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        ];

        nonCriticalCSS.forEach((href) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            link.media = "print";
            link.onload = () => (link.media = "all");
            document.head.appendChild(link);
            console.log(`CSS non critique chargé : ${href}`);
        });
    });

    // **5. Forcer la priorité des ressources critiques**
    requestAnimationFrame(() => {
        document.querySelectorAll("img").forEach((img) => {
            img.style.visibility = "visible";
        });
        console.log("Visibilité forcée pour le rendu rapide des images.");
    });

    console.log("Toutes les optimisations JS sont terminées !");
});
