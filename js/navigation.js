document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os pontos de navegação
    const navDots = document.querySelectorAll('.nav-dot');

    // Ativa o ponto de navegação com base na seção visível
    function activateNavDot() {
        // Obtém a posição de rolagem
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Obtém todas as seções
        const sections = document.querySelectorAll('section');

        // Verifica qual seção está visível
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove a classe ativa de todos os pontos
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                });

                // Adiciona a classe ativa ao ponto correspondente
                const activeNavDot = document.querySelector(`.nav-dot[href="#${sectionId}"]`);
                if (activeNavDot) {
                    activeNavDot.classList.add('active');
                }
            }
        });
    }

    // Ativa o ponto de navegação ao rolar
    window.addEventListener('scroll', activateNavDot);

    // Suaviza a rolagem ao clicar nos pontos de navegação
    navDots.forEach(dot => {
        dot.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcula a posição do elemento
                const targetPosition = targetElement.offsetTop;

                // Faz a rolagem suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Atualiza o URL sem recarregar a página
                history.pushState(null, null, targetId);
            }
        });
    });

    // Verifica qual seção está visível ao carregar a página
    activateNavDot();

    // Configura o botão de voltar ao topo
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Mostra/oculta o botão de voltar ao topo
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
    }
});
