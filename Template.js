document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────────
    // MOBILE NAVIGATION
    // ─────────────────────────────────────────────
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    const overlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('nav a');
    const menuIcon = menuBtn?.querySelector('i');

    if (menuBtn && nav && overlay) {

        const toggleNav = () => {
            const isOpen = nav.classList.toggle('open');

            overlay.classList.toggle('show', isOpen);
            document.body.classList.toggle('nav-open', isOpen);

            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars', !isOpen);
                menuIcon.classList.toggle('fa-xmark', isOpen);
            }

            menuBtn.setAttribute('aria-expanded', isOpen);
        };

        const closeNav = () => {
            nav.classList.remove('open');
            overlay.classList.remove('show');
            document.body.classList.remove('nav-open');

            if (menuIcon) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }

            menuBtn.setAttribute('aria-expanded', 'false');
        };

        // Toggle menu
        menuBtn.addEventListener('click', toggleNav);

        // Close when overlay clicked
        overlay.addEventListener('click', closeNav);

        // Close when nav link clicked
        navLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });

        // Auto close on desktop resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeNav();
            }
        });
    }
