/**
 * Favicon Fallback Handler
 * Provides a fallback for the favicon.ico file if it doesn't exist
 */
document.addEventListener('DOMContentLoaded', function () {
    // Check if favicon.ico exists and provide fallback if it doesn't
    function checkFaviconIco() {
        // Verifica se há um favicon definido
        const faviconIco = document.querySelector("link[rel='shortcut icon']");

        // Cria um elemento de favicon inline para garantir que tenha sempre um favicon
        const fallbackFavicon = document.createElement('link');
        fallbackFavicon.rel = 'shortcut icon';
        fallbackFavicon.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2248%22 fill=%22%230d6efd%22/><text x=%2250%22 y=%2270%22 font-family=%22Arial%22 font-size=%2270%22 font-weight=%22bold%22 text-anchor=%22middle%22 fill=%22white%22>J</text></svg>';

        // Se não houver favicon ou se estiver no GitHub Pages, adiciona o fallback
        if (!faviconIco || window.location.hostname.includes('github.io')) {
            document.head.appendChild(fallbackFavicon);
            console.info('Usando favicon SVG inline para garantir que o ícone seja exibido em qualquer ambiente.');
        }
    }

    // Run check
    checkFaviconIco();
});
