document.addEventListener("DOMContentLoaded", () => {
    // **Lazy Loading pour les images**
    const lazyImages = document.querySelectorAll("img[data-src]");
    if ('IntersectionObserver' in window) {
        let observer = new IntersectionObserver((entries, observer) => {
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
        lazyImages.forEach(img => img.src = img.dataset.src);
    }

    // **Chargement asynchrone des polices**
    const fontAwesome = document.createElement("link");
    fontAwesome.rel = "stylesheet";
    fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
    fontAwesome.media = "print";
    fontAwesome.onload = () => fontAwesome.media = "all";
    document.head.appendChild(fontAwesome);

    // **Préchargement des ressources critiques**
    const preloadLinks = [
        { rel: "preload", href: "assets/images/femmeparapluie-2-large.webp", as: "image" },
        { rel: "preload", href: "assets/css/style.css", as: "style" }
    ];

    preloadLinks.forEach(linkInfo => {
        const link = document.createElement("link");
        link.rel = linkInfo.rel;
        link.href = linkInfo.href;
        link.as = linkInfo.as;
        document.head.appendChild(link);
    });

    console.log("Optimisation des performances en cours...");
});