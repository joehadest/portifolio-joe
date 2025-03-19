/**
 * Favicon Handler
 * Verifies and manages the favicon functionality
 */
document.addEventListener('DOMContentLoaded', function () {
    // Detect if running on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');

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

                // Se estiver no GitHub Pages, tente com caminho alternativo
                if (isGitHubPages) {
                    const repoName = window.location.pathname.split('/')[1];
                    const altPath = `/${repoName}/images/favicon/${icon}`;
                    console.log(`Tentando caminho alternativo para GitHub Pages: ${altPath}`);

                    const altImg = new Image();
                    altImg.src = altPath;
                    altImg.onload = function () {
                        console.log(`Favicon encontrado no caminho alternativo: ${altPath}`);
                    };
                }
            };
        });

        // Log helpful message if favicons are missing
        if (missingFavicons.length > 0) {
            console.warn('Alguns favicons estão faltando. Certifique-se de que os seguintes arquivos existem na pasta images/favicon/:', missingFavicons);

            // Se estiver no GitHub Pages, exiba dica específica
            if (isGitHubPages) {
                console.info('Dica para GitHub Pages: Certifique-se de que os caminhos estão corretos considerando o nome do repositório na URL.');
            }
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
