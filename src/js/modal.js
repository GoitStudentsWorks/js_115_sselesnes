document.addEventListener('DOMContentLoaded', () => {
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