document.addEventListener('DOMContentLoaded', () => {
    const initialState = {
        theme: document.documentElement.getAttribute('data-theme'),
        checked: document.querySelector('.theme-switch__checkbox')?.checked
    };

    const rollbackChanges = () => {
        document.documentElement.setAttribute('data-theme', initialState.theme || 'light');
        if (themeSwitch) {
            themeSwitch.checked = initialState.checked || false;
        }
        localStorage.removeItem('theme');
        console.warn('Theme changes rolled back to initial state');
    };

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
                rollbackChanges();
            }
        };

        setTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

        themeSwitch.addEventListener('change', () => {
            try {
                const isDark = themeSwitch.checked;
                setTheme(isDark);
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            } catch (error) {
                console.error('Error toggling theme:', error);
                rollbackChanges();
            }
        });

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            try {
                if (!localStorage.getItem('theme')) {
                    setTheme(e.matches);
                }
            } catch (error) {
                console.error('Error handling media query change:', error);
                rollbackChanges();
            }
        });

    } catch (error) {
        console.error('Critical error in theme initialization:', error);
        rollbackChanges();
    }

    try {
        const burgerMenu = document.querySelector('.burger-menu');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileClose = document.querySelector('.mobile-close');
        const body = document.body;

        if (!burgerMenu || !mobileMenu || !mobileClose) {
            console.warn('Not all mobile menu elements found');
            return;
        }

        burgerMenu.addEventListener('click', () => {
            try {
                mobileMenu.classList.add('is-open');
                burgerMenu.classList.add('is-open');
                body.classList.add('menu-open');
            } catch (error) {
                console.error('Error opening menu:', error);
            }
        });

        mobileClose.addEventListener('click', () => {
            try {
                mobileMenu.classList.remove('is-open');
                burgerMenu.classList.remove('is-open');
                body.classList.remove('menu-open');
            } catch (error) {
                console.error('Error closing menu:', error);
            }
        });

        const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                try {
                    mobileMenu.classList.remove('is-open');
                    burgerMenu.classList.remove('is-open');
                    body.classList.remove('menu-open');
                } catch (error) {
                    console.error('Error closing menu on link click:', error);
                }
            });
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                try {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    } else {
                        console.warn(`Element with id ${targetId} not found`);
                    }
                } catch (error) {
                    console.error('Error during smooth scroll:', error);
                }
            });
        });

    } catch (error) {
        console.error('Critical error in mobile menu initialization:', error);
    }
}); 