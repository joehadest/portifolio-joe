document.addEventListener('DOMContentLoaded', function () {
    // Função para aplicar efeito de digitação nos textos com classe 'typing-text'
    function setupTypingEffect() {
        const typingTexts = document.querySelectorAll('.typing-effect');

        typingTexts.forEach((element) => {
            // Guardar o texto original
            const text = element.textContent;
            element.textContent = '';

            // Verificar se o elemento está no viewport para iniciar a animação
            function checkIfInView() {
                const rect = element.getBoundingClientRect();
                const isInView = (rect.top <= window.innerHeight) && (rect.bottom >= 0);

                if (isInView) {
                    // Iniciar digitação
                    let index = 0;

                    function typeChar() {
                        if (index < text.length) {
                            element.textContent += text.charAt(index);
                            index++;
                            setTimeout(typeChar, 100);
                        }
                    }

                    typeChar();

                    // Remover o evento de scroll depois que começar a digitar
                    window.removeEventListener('scroll', checkIfInView);
                }
            }

            // Verificar inicialmente e adicionar evento de scroll
            checkIfInView();
            window.addEventListener('scroll', checkIfInView);
        });
    }

    // Efeito de rolagem infinita para as skills (marquee)
    function setupSkillsMarquee() {
        const skillsContainer = document.querySelector('.skills-marquee');

        if (skillsContainer) {
            const skills = skillsContainer.querySelectorAll('.skill-tag');
            const containerWidth = skillsContainer.offsetWidth;
            const totalSkillsWidth = Array.from(skills).reduce((total, skill) => total + skill.offsetWidth + 20, 0);

            // Duplicar skills se necessário para criar efeito de rolagem infinita
            if (totalSkillsWidth < containerWidth * 2) {
                const skillsClone = Array.from(skills).map(skill => skill.cloneNode(true));
                skillsClone.forEach(skill => skillsContainer.appendChild(skill));
            }
        }
    }

    // Efeito de aparecimento gradual ao rolar
    function setupScrollAppear() {
        const elements = document.querySelectorAll('.scroll-appear');

        function checkPosition() {
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                let positionFromTop = elements[i].getBoundingClientRect().top;

                if (positionFromTop - window.innerHeight <= 0) {
                    element.classList.add('appear');
                }
            }
        }

        window.addEventListener('scroll', checkPosition);
        checkPosition();
    }

    // Efeito de rolagem para navegação suave
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // ajuste para altura da navbar
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Adicionar efeito de zoom ao clicar nas imagens dos projetos
    function setupProjectImageZoom() {
        const projectImages = document.querySelectorAll('.project-img-container img');

        projectImages.forEach(img => {
            img.addEventListener('click', function () {
                // Criar overlay para a imagem ampliada
                const overlay = document.createElement('div');
                overlay.classList.add('image-zoom-overlay');

                // Criar container para a imagem
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-zoom-container');

                // Clonar e ampliar a imagem
                const enlargedImg = this.cloneNode();
                enlargedImg.classList.add('enlarged-image');

                // Botão para fechar
                const closeButton = document.createElement('button');
                closeButton.innerHTML = '&times;';
                closeButton.classList.add('image-zoom-close');

                // Montar e adicionar ao DOM
                imageContainer.appendChild(enlargedImg);
                imageContainer.appendChild(closeButton);
                overlay.appendChild(imageContainer);
                document.body.appendChild(overlay);

                // Adicionar classe para exibir com animação
                setTimeout(() => {
                    overlay.classList.add('active');
                }, 10);

                // Fechar ao clicar no botão ou fora da imagem
                overlay.addEventListener('click', function (e) {
                    if (e.target === overlay || e.target === closeButton) {
                        overlay.classList.remove('active');
                        setTimeout(() => {
                            document.body.removeChild(overlay);
                        }, 300);
                    }
                });
            });
        });
    }

    // Inicializar todos os efeitos
    setupTypingEffect();
    setupSkillsMarquee();
    setupScrollAppear();
    setupSmoothScroll();
    setupProjectImageZoom();

    // Removido o código relacionado aos testemunhos
});
