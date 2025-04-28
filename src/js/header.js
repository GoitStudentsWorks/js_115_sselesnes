document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.querySelector('.theme-switch__checkbox');
    const html = document.documentElement;
    
    if (!themeSwitch) {
        console.warn('Theme switch element not found');
        return;
    }
    
    try {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const setTheme = (isDark) => {
            try {
                html.setAttribute('data-theme', isDark ? 'dark' : 'light');
                themeSwitch.checked = isDark;
            } catch (error) {
                console.error('Error setting theme:', error);
            }
        };

        setTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

        themeSwitch.addEventListener('change', () => {
            try {
                const isDark = themeSwitch.checked;
                setTheme(isDark);
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            } catch (error) {
                console.error('Error changing theme:', error);
            }
        });

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            try {
                if (!localStorage.getItem('theme')) {
                    setTheme(e.matches);
                }
            } catch (error) {
                console.error('Error handling system theme change:', error);
            }
        });

    } catch (error) {
        console.error('Error in theme initialization:', error);
    }
}); 