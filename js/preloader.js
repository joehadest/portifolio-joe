document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar-preloader');
    const loaderText = document.querySelector('.loader-text');

    // Checar se é dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

    // Adiciona classe para animação inicial
    preloader.classList.add('preloader-reveal');

    // Aplicar tema escuro se preferência do usuário
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        preloader.classList.add('preloader-dark-mode');
    }

    // Ajusta texto para telas menores
    if (isMobile) {
        loaderText.innerHTML = "CARREGANDO";
    }

    // Detectar orientação do dispositivo
    function checkOrientation() {
        if (window.innerHeight < 480 && window.innerWidth > window.innerHeight) {
            preloader.classList.add('landscape');
        } else {
            preloader.classList.remove('landscape');
        }
    }

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    // Função para detectar se o dispositivo tem conexão lenta
    let isSlowConnection = false;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
        isSlowConnection = connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g' || connection.saveData;
        if (isSlowConnection) {
            preloader.classList.add('slow-connection');
        }
    }

    // Velocidade de carregamento - mais lento para conexões lentas para evitar saltos
    const progressSpeed = isSlowConnection ? 40 : (isMobile ? 15 : 20);
    let loadingProgress = 0;

    // Função para simular o progresso de carregamento
    function simulateProgress() {
        // Iniciar com um "salto" para dar feedback imediato ao usuário
        loadingProgress = 10;
        progressBar.style.width = '10%';

        const interval = setInterval(function () {
            // Incremento baseado no tipo de dispositivo
            const increment = isMobile ? 1.8 : 1;

            if (loadingProgress < 100) {
                loadingProgress += increment;

                // Limitamos a 99% para esperar o carregamento real completo
                if (loadingProgress > 99) loadingProgress = 99;

                progressBar.style.width = loadingProgress + '%';

                // Atualiza o texto para mostrar a porcentagem em dispositivos maiores
                if (!isMobile && loadingProgress % 10 === 0) {
                    loaderText.innerHTML = `CARREGANDO ${Math.floor(loadingProgress)}%`;
                }
            } else {
                clearInterval(interval);

                // Quando atingir 100%, aguarda menos tempo em mobile
                setTimeout(function () {
                    preloader.classList.add('fade-out');

                    setTimeout(function () {
                        document.body.classList.remove('preloader-active');
                        preloader.style.display = 'none';
                    }, isMobile ? 300 : 500);
                }, isMobile ? 200 : 400);
            }
        }, progressSpeed);
    }

    // Detectar se a página está sendo carregada do cache
    const pageLoadedFromCache = performance && performance.navigation &&
        (performance.navigation.type === 1 || // Page refresh
            performance.navigation.type === 2);  // Back/forward navigation

    // Iniciar o progresso simulado com delay menor para celulares ou para páginas do cache
    setTimeout(simulateProgress, (isMobile || pageLoadedFromCache) ? 100 : 300);

    // Garantir que o preloader seja removido quando a página estiver totalmente carregada
    window.addEventListener('load', function () {
        // Verificar se o preloader ainda está visível (pode ter sido removido pelo simulateProgress)
        if (preloader && preloader.style.display !== 'none') {
            loadingProgress = 100;
            progressBar.style.width = '100%';

            setTimeout(function () {
                preloader.classList.add('fade-out');
                document.body.classList.remove('preloader-active');

                setTimeout(function () {
                    preloader.style.display = 'none';
                }, isMobile ? 300 : 500);
            }, isMobile ? 100 : 300);
        }
    });

    // Failsafe: Se algo der errado, garantir que o preloader desapareça
    const maxTimeout = isMobile ? 5000 : 8000;
    setTimeout(function () {
        if (preloader && preloader.style.display !== 'none') {
            console.log('Preloader failsafe activated');
            progressBar.style.width = '100%';
            preloader.classList.add('fade-out');

            setTimeout(function () {
                document.body.classList.remove('preloader-active');
                preloader.style.display = 'none';
            }, 500);
        }
    }, maxTimeout);

    // Lidar com visibilidade da página (se o usuário trocar de guia)
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible' && preloader && loadingProgress < 100) {
            // Acelerar o carregamento quando o usuário voltar para a guia
            loadingProgress = Math.min(loadingProgress + 15, 99);
            progressBar.style.width = loadingProgress + '%';
        }
    });
});
