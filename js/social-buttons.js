document.addEventListener('DOMContentLoaded', function () {
    const socialButtons = document.querySelectorAll('.social-buttons .icon-hover');

    // Adicionar eventos de efeito de inclinação (tilt) aos botões sociais
    socialButtons.forEach(button => {
        button.addEventListener('mousemove', function (e) {
            // Obter a posição do mouse relativa ao botão
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calcular a rotação com base na posição do mouse
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10; // Valores menores para efeito mais sutil
            const rotateY = -(x - centerX) / 20;

            // Aplicar a transformação
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

            // Mover o ícone de forma mais sutil
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = `translateX(${(x - centerX) / 10}px)`;
            }
        });

        button.addEventListener('mouseleave', function () {
            // Resetar transformações ao sair do botão
            this.style.transform = '';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });

        // Adicionar efeito de ondulação ao clicar (ripple effect)
        button.addEventListener('click', function (e) {
            // Remover ripples antigos
            const ripples = this.querySelectorAll('.ripple');
            ripples.forEach(ripple => ripple.remove());

            // Criar elemento de ondulação
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            // Posicionar e dimensionar a ondulação
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            // Remover a ondulação após a animação
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Detectar se a página está em modo escuro para ajustar os botões
    const checkDarkMode = () => {
        const isDarkMode = document.body.classList.contains('dark-theme');
        if (isDarkMode) {
            document.querySelectorAll('.btn-outline-dark').forEach(btn => {
                btn.classList.add('dark-mode-adjusted');
            });
        } else {
            document.querySelectorAll('.btn-outline-dark').forEach(btn => {
                btn.classList.remove('dark-mode-adjusted');
            });
        }
    };

    // Verificar inicialmente
    checkDarkMode();

    // Verificar quando o tema mudar
    document.addEventListener('themeChanged', checkDarkMode);
});
