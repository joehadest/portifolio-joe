document.addEventListener('DOMContentLoaded', function () {
    // Seleção de elementos
    const sections = document.querySelectorAll('section[id]');
    const navDots = document.querySelectorAll('.nav-dot');

    // Função para ativar o dot correspondente à seção visível
    function activateNavDot() {
        // Obter a posição atual de rolagem com compatibilidade entre navegadores
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Calcular qual seção está visível
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150; // Ajuste para melhor visibilidade
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remover classe ativa de todos os dots
                navDots.forEach(dot => dot.classList.remove('active'));

                // Adicionar classe ativa ao dot correspondente
                document.querySelector(`.nav-dot[data-section="${sectionId}"]`).classList.add('active');

                // Atualizar URL sem recarregar a página (opcional)
                if (history.replaceState) {
                    history.replaceState(null, null, `#${sectionId}`);
                }
            }
        });
    }

    // Navegação suave ao clicar nos dots
    navDots.forEach(dot => {
        dot.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Scroll suave para a seção
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });

                // Atualizar dots ativos
                navDots.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Ativar dot correspondente ao carregar a página
    activateNavDot();

    // Ativar dot correspondente ao rolar a página
    window.addEventListener('scroll', activateNavDot);

    // Efeito visual para dots ao passar o mouse
    navDots.forEach(dot => {
        dot.addEventListener('mouseenter', function () {
            // Criar efeito de pulsar
            this.style.animation = 'pulse 1s infinite';
        });

        dot.addEventListener('mouseleave', function () {
            // Remover animação
            this.style.animation = '';
        });
    });

    // Lidar com navegação por teclado (acessibilidade)
    navDots.forEach(dot => {
        dot.setAttribute('tabindex', '0');

        dot.addEventListener('keydown', function (e) {
            // Ativar ao pressionar Enter ou Espaço
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Detectar quando a rolagem para (para animações vinculadas à rolagem)
    let isScrolling;
    window.addEventListener('scroll', function () {
        // Limpar o timeout anterior
        window.clearTimeout(isScrolling);

        // Definir um timeout para executar após a rolagem parar
        isScrolling = setTimeout(function () {
            // Qualquer código para executar quando a rolagem parar
            const activeDot = document.querySelector('.nav-dot.active');
            if (activeDot) {
                activeDot.classList.add('pulse');

                setTimeout(() => {
                    activeDot.classList.remove('pulse');
                }, 1000);
            }
        }, 66); // Ajustar o tempo conforme necessário
    }, false);
});
