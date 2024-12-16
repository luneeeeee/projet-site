document.addEventListener("DOMContentLoaded", () => {
    // **1. Lazy Loading des images (ajout dynamique)**
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        if (!img.hasAttribute("loading")) {
            img.setAttribute("loading", "lazy");
        }
    });

    // **2. Ajout dynamique des attributs width et height pour éviter le layout shift**
    const setImageDimensions = () => {
        document.querySelectorAll("img").forEach(img => {
            if (!img.hasAttribute("width") || !img.hasAttribute("height")) {
                const tempImg = new Image();
                tempImg.src = img.src;
                tempImg.onload = () => {
                    img.setAttribute("width", tempImg.naturalWidth);
                    img.setAttribute("height", tempImg.naturalHeight);
                };
            }
        });
    };

    setImageDimensions();

    // **3. Charger les ressources CSS externes non critiques en différé**
    const loadDeferredCSS = () => {
        const links = [
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        ];

        links.forEach(href => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            link.media = "print";
            link.onload = () => link.media = "all";
            document.head.appendChild(link);
        });
    };

    loadDeferredCSS();

    console.log("Optimisations JS appliquées avec succès !");
});
