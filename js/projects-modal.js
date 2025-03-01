document.addEventListener('DOMContentLoaded', function () {
    // Dados detalhados dos projetos
    const projectsData = {
        "barbearia": {
            title: "Sistema de Barbearia",
            description: "Um sistema web completo para gerenciamento de barbearias, permitindo agendamentos online, gerenciamento de clientes e controle de serviços.",
            features: [
                "Agendamento online com seleção de serviço, barbeiro e horário",
                "Perfil de cliente com histórico de atendimentos",
                "Dashboard administrativo com relatórios de desempenho",
                "Sistema de avaliações e comentários",
                "Notificações por e-mail e SMS"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Bootstrap"],
            challenge: "O maior desafio foi criar um algoritmo de agendamento que evitasse conflitos de horários e otimizasse a agenda dos profissionais."
        },
        "cardapio-digital": {
            title: "Cardápio Digital com Banco de Dados",
            description: "Um sistema avançado de cardápio digital com banco de dados, ideal para restaurantes e estabelecimentos de alimentação.",
            features: [
                "Interface do usuário intuitiva e responsiva",
                "Painel administrativo para gerenciar produtos e categorias",
                "Sistema de busca e filtros por tipo de produto",
                "Integração com sistema de pedidos",
                "Analytics para análise dos itens mais populares"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Firebase"],
            challenge: "A sincronização em tempo real entre o cardápio e o sistema de pedidos foi um desafio considerável, resolvido com tecnologia de WebSockets."
        },
        "estoque": {
            title: "Sistema de Gestão de Estoque",
            description: "Aplicação web para controle de estoque de peças e produtos, com recursos de rastreamento e alertas.",
            features: [
                "Controle detalhado de entrada e saída de produtos",
                "Alertas automáticos para estoque baixo",
                "Gestão de fornecedores",
                "Relatórios gerenciais e gráficos estatísticos",
                "Histórico de movimentações com auditoria"
            ],
            technologies: ["React", "Node.js", "Express", "MongoDB", "Bootstrap"],
            challenge: "Desenvolver um sistema de previsão de demanda baseado no histórico de consumo para otimizar o gerenciamento de estoque."
        },
        "cardapio": {
            title: "Cardápio Digital Simples",
            description: "Uma solução leve e rápida de cardápio digital sem necessidade de banco de dados, ideal para pequenos negócios.",
            features: [
                "Layout responsivo para qualquer dispositivo",
                "Categorização simples de produtos",
                "Design personalizável conforme a identidade visual do cliente",
                "Alta performance e carregamento rápido",
                "Exportação para formato PDF"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
            challenge: "Criar uma solução que fosse simultaneamente simples para o cliente gerenciar, mas com aparência profissional para o usuário final."
        },
        "page-vendas": {
            title: "Página de Vendas de Websites",
            description: "Landing page profissional para venda de serviços de desenvolvimento web, com alto índice de conversão.",
            features: [
                "Design otimizado para conversão",
                "Animações e efeitos visuais persuasivos",
                "Formulários de captura de leads",
                "Integração com sistemas de email marketing",
                "Depoimentos dinâmicos e social proof"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "GSAP Animation"],
            challenge: "Equilibrar elementos visuais atraentes com velocidade de carregamento, garantindo que a página mantivesse alta conversão sem perder performance."
        },
        "carta": {
            title: "Carta de Amor Virtual",
            description: "Uma experiência interativa e romântica para enviar mensagens de amor com efeitos visuais e animações emotivas.",
            features: [
                "Animações personalizadas que reagem às interações do usuário",
                "Componentes de áudio para criar ambiente romântico",
                "Opção de personalização da mensagem",
                "Link compartilhável para enviar a pessoa amada",
                "Recursos responsivos para qualquer dispositivo"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "Canvas", "Web Audio API"],
            challenge: "Criar uma experiência que transmitisse emoção genuína através de uma interface digital, com animações suaves e transições elegantes."
        }
    };

    // Initialize all project detail buttons
    const detailButtons = document.querySelectorAll('.project-overlay .btn');

    detailButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the parent project card
            const projectCard = this.closest('.project-card');

            // Get project details
            const projectTitle = projectCard.querySelector('.card-title').textContent;
            const projectDescription = projectCard.querySelector('.card-text').textContent;
            const projectImage = projectCard.querySelector('.card-img-top').src;

            // Get links if they exist
            let demoLink = projectCard.querySelector('.btn-outline-primary')?.href || '#';
            let codeLink = projectCard.querySelector('.btn-outline-secondary')?.href || '#';

            // Create modal content
            const modalId = 'projectDetailModal';
            let modal = document.getElementById(modalId);

            // Create modal if it doesn't exist
            if (!modal) {
                const modalHTML = `
                <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content bg-dark text-light">
                            <div class="modal-header border-secondary">
                                <h5 class="modal-title text-light"></h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <img class="img-fluid rounded project-modal-img" alt="">
                                        <div class="d-flex flex-wrap mt-3 project-tech-badges">
                                            <!-- Badges de tecnologias serão inseridas aqui -->
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <h4 class="text-light">Descrição</h4>
                                        <p class="project-modal-description text-light-50"></p>
                                        
                                        <div class="mt-4">
                                            <h5 class="text-light">Principais Recursos</h5>
                                            <ul class="project-features text-light-50">
                                                <!-- Features serão inseridas aqui -->
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer border-secondary">
                                <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">Fechar</button>
                                <a href="#" class="btn btn-primary demo-link" target="_blank" rel="noopener noreferrer">Ver Demo</a>
                                <a href="#" class="btn btn-outline-primary code-link" target="_blank" rel="noopener noreferrer">Ver Código</a>
                            </div>
                        </div>
                    </div>
                </div>`;

                document.body.insertAdjacentHTML('beforeend', modalHTML);
                modal = document.getElementById(modalId);
            }

            // Update modal content
            modal.querySelector('.modal-title').textContent = projectTitle;
            modal.querySelector('.project-modal-description').textContent = projectDescription;
            modal.querySelector('.project-modal-img').src = projectImage;

            // Buscar dados detalhados do projeto pelo ID
            const projectId = getProjectId(projectTitle);
            const projectDetails = projectsData[projectId];

            // Preencher badges de tecnologias se disponível
            const techBadgesContainer = modal.querySelector('.project-tech-badges');
            techBadgesContainer.innerHTML = '';

            if (projectDetails && projectDetails.technologies) {
                projectDetails.technologies.forEach(tech => {
                    const badgeClass = tech.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const badge = document.createElement('span');
                    badge.className = `tech-badge ${badgeClass} me-2 mb-2`;
                    badge.textContent = tech;
                    techBadgesContainer.appendChild(badge);
                });
            }

            // Preencher features se disponível
            const featuresList = modal.querySelector('.project-features');
            featuresList.innerHTML = '';

            if (projectDetails && projectDetails.features) {
                projectDetails.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
            } else {
                featuresList.innerHTML = '<li>Detalhes não disponíveis</li>';
            }

            // Update links
            const demoButton = modal.querySelector('.demo-link');
            const codeButton = modal.querySelector('.code-link');

            if (demoLink && demoLink !== '#') {
                demoButton.href = demoLink;
                demoButton.style.display = 'inline-block';
            } else {
                demoButton.style.display = 'none';
            }

            if (codeLink && codeLink !== '#') {
                codeButton.href = codeLink;
                codeButton.style.display = 'inline-block';
            } else {
                codeButton.style.display = 'none';
            }

            // Show modal
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();

            // Adicionar classe escura ao fundo do modal quando aberto
            modal.addEventListener('shown.bs.modal', function () {
                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.classList.add('bg-dark');
                    modalBackdrop.style.opacity = '0.9';
                }
            });
        });
    });

    // Função auxiliar para obter o ID do projeto baseado no título
    function getProjectId(title) {
        // Converter título para lowercase e remover caracteres especiais
        const normalizedTitle = title.toLowerCase()
            .replace(/sistema de |cardápio |página de |carta de amor /g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

        // Mapeamento manual para casos específicos
        const titleMap = {
            'barbearia': 'barbearia',
            'cardapio-digital': 'cardapio-digital',
            'estoque': 'estoque',
            'cardapio-simples': 'cardapio',
            'pagina-vendas': 'page-vendas',
            'carta-virtual': 'carta'
        };

        return titleMap[normalizedTitle] || normalizedTitle;
    }

    // Garantir que todos os links externos abram em nova aba
    document.addEventListener('click', function (e) {
        // Verificar se é um link externo
        if (e.target.tagName === 'A' && e.target.getAttribute('href') &&
            e.target.getAttribute('href').indexOf('http') === 0 &&
            !e.target.getAttribute('target')) {
            // Adicionar target="_blank" e rel="noopener noreferrer"
            e.target.setAttribute('target', '_blank');
            e.target.setAttribute('rel', 'noopener noreferrer');
        }
    });
});
