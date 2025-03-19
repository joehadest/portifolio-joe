/**
 * Favicon Fallback Handler
 * Provides a fallback for the favicon.ico file if it doesn't exist
 */
document.addEventListener('DOMContentLoaded', function () {
    // Check if favicon.ico exists and provide fallback if it doesn't
    function checkFaviconIco() {
        const faviconIco = document.querySelector("link[rel='shortcut icon']");
        if (!faviconIco) {
            // Create a fallback favicon if the icon isn't defined
            const fallbackFavicon = document.createElement('link');
            fallbackFavicon.rel = 'shortcut icon';
            fallbackFavicon.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>J</text></svg>';
            document.head.appendChild(fallbackFavicon);

            console.warn('Favicon.ico não encontrado. Usando favicon SVG gerado como fallback.');
        }
    }

    // Run check
    checkFaviconIco();
});
