document.addEventListener("DOMContentLoaded", () => {
    // 1. Charger les CSS non critiques de manière asynchrone
    const loadCSS = (href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.media = "print";
        link.onload = () => link.media = "all";
        document.head.appendChild(link);
    };

    // Exemple : Charger Cloudflare CSS en différé
    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

    // 2. Ajouter les attributs width et height pour les images dynamiquement
    const setImageDimensions = () => {
        document.querySelectorAll("img").forEach(img => {
            if (!img.hasAttribute("width") || !img.hasAttribute("height")) {
                const imgClone = new Image();
                imgClone.src = img.src;
                imgClone.onload = () => {
                    img.setAttribute("width", imgClone.naturalWidth);
                    img.setAttribute("height", imgClone.naturalHeight);
                };
            }
        });
    };

    setImageDimensions();

    // 3. Optimiser le Lazy Loading des images
    const lazyImages = document.querySelectorAll("img[data-src]");
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src");
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => observer.observe(img));
    } else {
        // Fallback pour les navigateurs anciens
        lazyImages.forEach(img => img.src = img.dataset.src);
    }
});
