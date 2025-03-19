/**
 * Favicon Handler
 * Verifies and manages the favicon functionality
 */
document.addEventListener('DOMContentLoaded', function () {
    // Check if favicons are loaded correctly
    function checkFavicon() {
        const favicons = [
            'favicon.ico',
            'favicon-16x16.png',
            'favicon-32x32.png',
            'apple-touch-icon.png'
        ];

        let faviconBase = 'images/favicon/';
        let missingFavicons = [];

        favicons.forEach(icon => {
            const img = new Image();
            img.src = faviconBase + icon;

            img.onerror = function () {
                console.warn('Favicon não encontrado: ' + faviconBase + icon);
                missingFavicons.push(icon);
            };
        });

        // Log helpful message if favicons are missing
        if (missingFavicons.length > 0) {
            console.warn('Alguns favicons estão faltando. Certifique-se de que os seguintes arquivos existem na pasta images/favicon/:', missingFavicons);
        }
    }

    // Set theme color in favicon for dark mode
    function updateFaviconForTheme() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const themeColor = document.querySelector('meta[name="theme-color"]');

        if (themeColor) {
            themeColor.setAttribute('content', isDarkMode ? '#212529' : '#0d6efd');
        }
    }

    // Listen for theme changes
    document.addEventListener('themeChanged', function (e) {
        updateFaviconForTheme();
    });

    // Run initial checks
    checkFavicon();
    updateFaviconForTheme();
});
