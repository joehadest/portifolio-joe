// Ativar o scrollspy do Bootstrap
document.addEventListener('DOMContentLoaded', function () {
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar'
    });

    // Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: 'mobile' // Desativa em dispositivos móveis para melhor performance
    });

    // Inicializar Particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#0d6efd"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#0d6efd",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Remover qualquer manipulação do cursor personalizado que possa estar causando conflitos
    // A lógica completa do cursor estará apenas no arquivo mousemove.js

    // Detectar dispositivo móvel para ajustes específicos
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

    if (isMobile) {
        // Ajustes específicos para dispositivos móveis
        document.body.classList.add('mobile-device');

        // Retirar efeitos de hover que podem causar problemas em touch
        document.querySelectorAll('.hover-effect').forEach(element => {
            element.classList.remove('hover-effect');
        });

        // Reduzir intensidade de partículas para melhorar performance
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.particles.number.value = 30;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }

    // Inicializar as partículas de fundo
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: isMobile ? 30 : 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#0d6efd'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#0d6efd',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: isMobile ? 2 : 4,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: !isMobile, // Desativa em mobile para economia de recursos
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 3
                    },
                }
            },
            retina_detect: true
        });
    }

    // Animações das barras de progresso
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-bar');

    function checkScroll() {
        let triggerBottom = window.innerHeight / 5 * 4;
        let skillsTop = skillsSection.getBoundingClientRect().top;

        if (skillsTop < triggerBottom) {
            progressBars.forEach(progressBar => {
                let width = progressBar.getAttribute('data-width');
                progressBar.style.width = width;
            });
        }
    }

    window.addEventListener('scroll', checkScroll);

    // Garantir que as barras de progresso sejam animadas corretamente
    function checkProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');

        progressBars.forEach(progressBar => {
            // Verificar se o elemento já tem a largura definida
            if (progressBar.style.width === '0%' || !progressBar.style.width) {
                // Obter a largura do atributo data-width
                const width = progressBar.getAttribute('data-width');
                console.log(`Animando barra: ${width}`); // Log para debug

                // Garantir que a animação seja suave
                progressBar.style.transition = 'width 1.5s ease-in-out';

                // Aplicar a largura desejada
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
            }
        });
    }

    // Chamar a função quando a página carregar e quando a seção de Skills entrar na viewport
    document.addEventListener('DOMContentLoaded', function () {
        // Verificar se a seção de skills está visível para animar as barras
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            function checkScrollPosition() {
                const rect = skillsSection.getBoundingClientRect();
                const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;

                if (isInViewport) {
                    checkProgressBars();
                    window.removeEventListener('scroll', checkScrollPosition);
                }
            }

            window.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition(); // Verificar na carga inicial da página
        }
    });

    // Animação de digitação para o título principal
    const textElement = document.querySelector('.hero h1');
    if (textElement) {
        const text = textElement.textContent;
        textElement.textContent = "";

        let charIndex = 0;
        function typeEffect() {
            if (charIndex < text.length) {
                textElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 100);
            }
        }

        // Delay inicial antes de iniciar a animação de digitação
        setTimeout(() => {
            typeEffect();
        }, 1000);
    }

    // Efeito parallax para hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Contador para números impressionantes (pode ser usado em uma seção de estatísticas)
    function animateCounter(element, start, end, duration) {
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, start, end, duration);
            element.textContent = Math.floor(run);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                element.textContent = end;
            }
        }

        function ease(t, b, c, d) {
            return c * (t / d) + b;
        }

        requestAnimationFrame(animation);
    }

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        animateCounter(counter, 0, target, 2000);
    });

    // Adicionar classes ativas aos links da navegação ao rolar
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });

    // Animação suave ao clicar em links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Formulário de contato com efeito de elementos flutuantes
    const contactForm = document.querySelector('form');
    if (contactForm) {
        const formElements = contactForm.querySelectorAll('.form-floating');

        formElements.forEach((element, index) => {
            element.style.transitionDelay = `${index * 0.1}s`;
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Animação ao enviar o formulário
            const btn = this.querySelector('button');
            btn.innerHTML = '<span><i class="fas fa-circle-notch fa-spin"></i> Enviando...</span>';
            btn.disabled = true;

            // Simulação de envio (substitua por seu código real de envio)
            setTimeout(() => {
                btn.innerHTML = '<span><i class="fas fa-check"></i> Enviado!</span>';
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-success');

                setTimeout(() => {
                    btn.innerHTML = '<span>Enviar Mensagem</span>';
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-primary');
                    btn.disabled = false;
                    this.reset();
                }, 2000);
            }, 2000);
        });
    }

    // Mudança de tema claro/escuro (opcional)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');

            // Salva a preferência do usuário
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });

        // Verifica preferência salva do usuário
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            if (currentTheme === 'dark') {
                document.body.classList.add('dark-theme');
            }
        } else if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-theme');
        }
    }

    // Animação para os contadores
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        counters.forEach(counter => {
            const target = +counter.dataset.target;
            let count = 0;
            const updateCount = () => {
                const increment = target / speed;
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Elemento para verificar quando está no viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Chamar animação de contadores quando estiverem visíveis
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        window.addEventListener('scroll', function () {
            if (isInViewport(aboutSection)) {
                animateCounters();
                // Remover o listener após animar uma vez
                window.removeEventListener('scroll', this);
            }
        });
    }

    // Botão de tema escuro/claro
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        // Verificar se há preferência salva
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggleBtn.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // Botão de voltar ao topo
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
    }

    // Otimização para toque em dispositivos móveis
    if (isMobile) {
        // Aumentar área clicável para links em mobile
        document.querySelectorAll('a, button').forEach(element => {
            element.classList.add('mobile-touchable');
        });

        // Remover delay de clique em mobile
        document.addEventListener('touchstart', function () { }, { passive: true });
    }

    // Impedir rolagem da página quando modal estiver aberto
    const preventScrollForModals = function () {
        const modals = document.querySelectorAll('.modal');

        modals.forEach(modal => {
            modal.addEventListener('show.bs.modal', function () {
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = '17px'; // Compensar largura da barra de rolagem
            });

            modal.addEventListener('hidden.bs.modal', function () {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            });
        });
    };

    // Executar após carregamento completo para pegar modais dinâmicos
    window.addEventListener('load', preventScrollForModals);
});
