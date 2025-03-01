document.addEventListener('DOMContentLoaded', function () {
    // Selecionar o botão de alternar tema
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    // Verificar preferência salva do usuário
    function getPreferredTheme() {
        // Verificar se há uma preferência salva
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        // Verificar preferência do sistema
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Aplicar tema
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    // Alternar tema
    function toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Aplicar novo tema
        applyTheme(newTheme);

        // Salvar preferência
        localStorage.setItem('theme', newTheme);

        // Animar a transição
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);

        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: newTheme }
        }));
    }

    // Adicionar evento de clique ao botão
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Aplicar tema inicial
    applyTheme(getPreferredTheme());

    // Atualizar o tema quando a preferência do sistema mudar
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Animação para o botão de tema
    themeToggleBtn.addEventListener('mouseenter', function () {
        this.classList.add('rotate-effect');
    });

    themeToggleBtn.addEventListener('mouseleave', function () {
        this.classList.remove('rotate-effect');
    });

    // Adicionar classe para indicar que o tema foi carregado
    document.documentElement.classList.add('theme-loaded');
});
