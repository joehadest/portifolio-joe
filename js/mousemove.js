document.addEventListener('DOMContentLoaded', function () {
    // Detectar se é dispositivo móvel - desativar o cursor se for
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 992;

    if (isMobile) {
        document.body.classList.add('mobile-device');
        return; // Não inicializar cursor em dispositivos móveis
    }

    // Elementos para o cursor personalizado
    const cursor = document.querySelector('.custom-cursor');

    if (!cursor) return; // Se não existir o elemento, sair da função

    // Otimização: usar variáveis para posição do mouse e aplicar diretamente com transform
    let mouseX = -100;
    let mouseY = -100;

    // Eliminar a suavização que causa delay - aplicar posição diretamente
    function updateCursorPosition(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Aplicar a transformação diretamente usando transform para melhor desempenho
        // Isso elimina o delay entre o movimento do mouse e o cursor personalizado
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }

    // Usar o evento pointermove que é mais eficiente e tem melhor desempenho que mousemove
    document.addEventListener('pointermove', updateCursorPosition);

    // Corrigir estilo do cursor para eliminar o transform -50% que causa posicionamento incorreto
    cursor.style.transform = 'translate(-100px, -100px)';
    cursor.style.top = '0';
    cursor.style.left = '0';
    cursor.style.margin = '0';
    cursor.style.pointerEvents = 'none';

    // Mostra o cursor após um breve atraso para evitar piscar na carga inicial
    setTimeout(() => {
        cursor.style.opacity = '1';
        document.body.classList.add('cursor-ready');
    }, 300);

    // Tratamento para links e botões - expandir cursor ao passar por cima
    const hoverables = document.querySelectorAll('a, button, .hoverable, input[type="submit"], .nav-link, [role="button"]');

    hoverables.forEach(hoverable => {
        hoverable.addEventListener('mouseenter', function () {
            cursor.classList.add('active');
        });

        hoverable.addEventListener('mouseleave', function () {
            cursor.classList.remove('active');
        });
    });

    // Efeito ao clicar
    document.addEventListener('mousedown', function () {
        cursor.classList.add('active');
    });

    document.addEventListener('mouseup', function () {
        cursor.classList.remove('active');
    });

    // Ocultar cursor quando sair da janela
    document.addEventListener('mouseleave', function () {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function () {
        cursor.style.opacity = '1';
    });

    // Efeito de rotação 3D para cards - otimizado para evitar delay
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length) {
        projectCards.forEach(card => {
            card.addEventListener('mousemove', function (e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = ((x - centerX) / centerX) * 5; // Reduzido para 5 graus para movimento mais suave
                const rotateX = -((y - centerY) / centerY) * 5; // Valor negativo para orientação correta

                // Aplicar transformação diretamente sem usar requestAnimationFrame
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = '';
                this.style.transition = 'transform 0.5s ease';
            });

            card.addEventListener('mouseenter', function () {
                this.style.transition = 'none'; // Remove a transição ao entrar para movimento instantâneo
            });
        });
    }

    // Efeito de paralaxe que segue o movimento do mouse
    document.addEventListener('mousemove', function (e) {
        const moveElements = document.querySelectorAll('.follow-mouse');
        if (!moveElements.length) return;

        let x = e.clientX;
        let y = e.clientY;

        // Calcular a posição do mouse em relação ao centro da tela
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calcular o deslocamento em relação ao centro
        const moveX = (x - centerX) / 50;
        const moveY = (y - centerY) / 50;

        moveElements.forEach(element => {
            // Aplicar transformação baseada na posição do mouse
            element.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
    });

    // Efeito de rotação 3D para cards em hover - otimizado para performance
    const cards = document.querySelectorAll('.project-card');

    if (cards.length) {
        cards.forEach(card => {
            let rafId = null;
            let isHovering = false;

            function animateCard(e) {
                if (!isHovering) return;

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calcular as rotações baseadas na posição do mouse
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // A rotação será maior quanto mais longe do centro
                const rotateY = ((x - centerX) / centerX) * 8; // -8 a 8 graus
                const rotateX = -((y - centerY) / centerY) * 8; // -8 a 8 graus

                // Aplicar transformação 3D
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                rafId = requestAnimationFrame(() => animateCard(e));
            }

            card.addEventListener('mouseenter', function (e) {
                isHovering = true;
                // Remover qualquer transição para movimento suave
                card.style.transition = 'none';
                animateCard(e);
            });

            card.addEventListener('mousemove', animateCard);

            card.addEventListener('mouseleave', function () {
                isHovering = false;
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s ease'; // Adiciona transição suave ao sair
            });
        });
    }

    // Adicionar efeito de profundidade para imagens com parallax
    const parallaxImages = document.querySelectorAll('.img-distort');

    if (parallaxImages.length) {
        parallaxImages.forEach(img => {
            let rafId = null;
            let isHovering = false;

            function animateImage(e) {
                if (!isHovering) return;

                const rect = img.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calcular as posições para efeito parallax
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Deslocamento sutil para criar efeito 3D
                const moveX = (x - centerX) / 15;
                const moveY = (y - centerY) / 15;

                img.style.transform = `perspective(1000px) translate3d(${moveX}px, ${moveY}px, 0) scale(1.05)`;

                rafId = requestAnimationFrame(() => animateImage(e));
            }

            img.addEventListener('mouseenter', function (e) {
                isHovering = true;
                img.style.transition = 'none';
                animateImage(e);
            });

            img.addEventListener('mousemove', animateImage);

            img.addEventListener('mouseleave', function () {
                isHovering = false;
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
                img.style.transform = 'perspective(1000px) translate3d(0, 0, 0) scale(1)';
                img.style.transition = 'transform 0.5s ease';
            });
        });
    }

    // Efeito de texto revelador ao scrollar
    const revealTexts = document.querySelectorAll('.reveal-text');

    function checkReveal() {
        revealTexts.forEach(text => {
            const textTop = text.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Quando o texto estiver visível na janela
            if (textTop < windowHeight - 50) {
                text.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Verificar uma vez ao carregar a página
});