document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const translateToggle = document.getElementById('translate-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const translateToggleMobile = document.getElementById('translate-toggle-mobile');

    // Establecer tema oscuro por defecto
    document.body.classList.add('dark-theme');

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');

        // Actualizar el icono del botón
        const themeIcon = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        if (themeToggle) themeToggle.innerHTML = themeIcon;
        if (themeToggleMobile) themeToggleMobile.innerHTML = themeIcon;
    }

    function toggleTranslate() {
        const isSpanish = document.body.classList.contains('spanish');
        document.body.classList.toggle('spanish');

        // Cambiar la bandera
        const newFlag = isSpanish ? './assets/spanish.png' : './assets/english.png';
        const flagAlt = isSpanish ? 'Translate to Spanish' : 'Traducir al inglés';
        
        const flagHTML = `<img src="${newFlag}" alt="${flagAlt}" id="flag-image">`;
        if (translateToggle) translateToggle.innerHTML = flagHTML;
        if (translateToggleMobile) translateToggleMobile.innerHTML = flagHTML;

        // Traducir el contenido, incluyendo el menú hamburguesa
        document.querySelectorAll('[data-es]').forEach(element => {
            const spanishText = element.getAttribute('data-es');
            const englishText = element.getAttribute('data-en') || element.textContent;
            
            if (!isSpanish) {
                element.setAttribute('data-en', element.textContent);
                element.textContent = spanishText;
            } else {
                element.textContent = englishText;
            }
        });

        // Traducir los aria-labels
        document.querySelectorAll('[aria-label][data-es]').forEach(element => {
            const spanishAriaLabel = element.getAttribute('data-es');
            const englishAriaLabel = element.getAttribute('data-en-aria') || element.getAttribute('aria-label');
            
            if (!isSpanish) {
                element.setAttribute('data-en-aria', element.getAttribute('aria-label'));
                element.setAttribute('aria-label', spanishAriaLabel);
            } else {
                element.setAttribute('aria-label', englishAriaLabel);
            }
        });

        // Guardar el idioma actual en el almacenamiento local
        localStorage.setItem('language', !isSpanish ? 'es' : 'en');
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    if (translateToggle) translateToggle.addEventListener('click', toggleTranslate);
    if (translateToggleMobile) translateToggleMobile.addEventListener('click', toggleTranslate);

    // Establecer el icono inicial de traducción (bandera española)
    const initialFlagIcon = './assets/spanish.png';
    const initialFlagHTML = `<img src="${initialFlagIcon}" alt="Translate to Spanish" id="flag-image">`;
    if (translateToggle) translateToggle.innerHTML = initialFlagHTML;
    if (translateToggleMobile) translateToggleMobile.innerHTML = initialFlagHTML;

    // Aplicar el idioma guardado al cargar la página
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'es') {
        toggleTranslate();
    }
});
