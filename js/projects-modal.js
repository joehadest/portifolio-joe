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

    // Remove the detail buttons event listeners
    /*
    // Initialize all project detail buttons
    const detailButtons = document.querySelectorAll('.project-overlay .btn');

    detailButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // ...existing code...
        });
    });
    */

    // Instead, add click events to the entire project card
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Make the project image container clickable to see the demo
        const imgContainer = card.querySelector('.project-img-container');
        imgContainer.style.cursor = 'pointer';

        imgContainer.addEventListener('click', function () {
            const demoLink = card.querySelector('.btn-outline-primary');
            if (demoLink) {
                window.open(demoLink.href, '_blank', 'noopener,noreferrer');
            }
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

// Remove the Project Details Handler section as it's no longer needed
/*
// Project Details Handler
document.addEventListener('DOMContentLoaded', function () {
    // Get all detail buttons
    const detailButtons = document.querySelectorAll('.detail-btn');
    const projectModal = document.getElementById('projectModal');
    const projectModalContent = document.getElementById('projectModalContent');
    const modalTitle = document.querySelector('#projectModal .modal-title');
    const viewLiveBtn = document.getElementById('viewLiveBtn');
    const viewCodeBtn = document.getElementById('viewCodeBtn');

    // Project details data
    const projectDetails = {
        'lava-rapido': {
            title: 'Lava Rápido Profissional',
            description: `
                <div class="row">
                    <div class="col-md-6">
                        <img src="./images/lava-rapido.png" class="img-fluid rounded mb-3" alt="Lava Rápido">
                    </div>
                    <div class="col-md-6">
                        <h5>Sobre o Projeto</h5>
                        <p>Site completo para um serviço de Lava Rápido profissional especializado em carros e motos.</p>
                        
                        <h6>Características</h6>
                        <ul>
                            <li>Design moderno e responsivo</li>
                            <li>Sistema de agendamento online</li>
                            <li>Exibição de serviços disponíveis</li>
                            <li>Avaliações de clientes</li>
                            <li>Interface para desktop e dispositivos móveis</li>
                        </ul>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-md-6">
                        <h6>Serviços</h6>
                        <ul>
                            <li>Lavagem de Carros (R$50)</li>
                            <li>Lavagem de Motos (R$30)</li>
                            <li>Pintura de Escapamento para Motos (R$50)</li>
                        </ul>
                        <p>Todos os serviços incluem produtos Vonixx.</p>
                    </div>
                    <div class="col-md-6">
                        <h6>Tecnologias Utilizadas</h6>
                        <div class="d-flex flex-wrap">
                            <span class="badge bg-primary m-1 p-2"><i class="fab fa-react me-1"></i> React.js</span>
                            <span class="badge bg-info m-1 p-2"><i class="fab fa-css3 me-1"></i> CSS3 com animações</span>
                            <span class="badge bg-success m-1 p-2"><i class="fas fa-route me-1"></i> React Router</span>
                            <span class="badge bg-secondary m-1 p-2"><i class="fas fa-mobile-alt me-1"></i> Design mobile-first</span>
                        </div>
                    </div>
                </div>
            `,
            liveUrl: 'https://lava-rapido.vercel.app/',
            codeUrl: 'https://github.com/joehadest/lava-rapido'
        },
        // Você pode adicionar detalhes para outros projetos aqui no mesmo formato
    };

    // Adicionar ouvinte de evento para cada botão de detalhes
    detailButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            // Encontrar qual projeto foi clicado - pegando o alt da imagem mais próxima
            const projectCard = this.closest('.project-card');
            const projectImg = projectCard.querySelector('img');
            const projectTitle = projectCard.querySelector('.card-title').textContent;
            const projectAlt = projectImg.alt.toLowerCase().replace(/\s+/g, '-');

            // Atualizar o modal com os detalhes do projeto
            if (projectDetails[projectAlt]) {
                modalTitle.textContent = projectDetails[projectAlt].title;
                projectModalContent.innerHTML = projectDetails[projectAlt].description;
                viewLiveBtn.href = projectDetails[projectAlt].liveUrl;
                viewCodeBtn.href = projectDetails[projectAlt].codeUrl;

                // Exibir ou ocultar o botão de demo conforme disponibilidade
                viewLiveBtn.style.display = projectDetails[projectAlt].liveUrl ? 'inline-block' : 'none';
            } else {
                // Fallback para projetos sem detalhes específicos
                modalTitle.textContent = projectTitle;
                projectModalContent.innerHTML = '<p>Detalhes completos não disponíveis para este projeto.</p>';

                // Encontrar links dentro do card para o modal
                const demoLink = projectCard.querySelector('a[class*="btn-outline-primary"]');
                const codeLink = projectCard.querySelector('a[class*="btn-outline-secondary"]');

                viewLiveBtn.href = demoLink ? demoLink.href : '#';
                viewCodeBtn.href = codeLink ? codeLink.href : '#';
                viewLiveBtn.style.display = demoLink ? 'inline-block' : 'none';
            }

            // Exibir o modal
            const bsModal = new bootstrap.Modal(projectModal);
            bsModal.show();
        });
    });
});
*/
