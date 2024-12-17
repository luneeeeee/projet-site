document.addEventListener("DOMContentLoaded", () => {
    console.log("Optimisations des performances en cours...");

    // **1. Préchargement des images critiques pour améliorer le LCP**
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

    // **2. Charger les scripts non essentiels après le rendu initial**
    requestIdleCallback(() => {
        const deferScripts = [
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"
        ];

        deferScripts.forEach(src => {
            const script = document.createElement("script");
            script.src = src;
            script.defer = true;
            document.body.appendChild(script);
            console.log(`Script différé chargé : ${src}`);
        });
    });

    // **3. Lazy Loading dynamique des images sans HTML**
    const lazyImages = document.querySelectorAll("img");
    lazyImages.forEach(img => {
        if (!img.hasAttribute("loading")) {
            img.setAttribute("loading", "lazy");
        }
    });

    // **4. Charger les CSS non critiques en différé**
    requestIdleCallback(() => {
        const nonCriticalCSS = [
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        ];

        nonCriticalCSS.forEach(href => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            link.media = "print";
            link.onload = () => link.media = "all";
            document.head.appendChild(link);
            console.log(`CSS non critique chargé : ${href}`);
        });
    });

    console.log("Optimisations appliquées avec succès !");
});
