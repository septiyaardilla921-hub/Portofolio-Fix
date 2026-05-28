document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────────
    // MOBILE NAVIGATION
    // ─────────────────────────────────────────────
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    const overlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('nav a');
    const menuIcon = menuBtn?.querySelector('i');

    // Cek apakah elemen tersedia
    if (!menuBtn || !nav || !overlay) return;

    // ─────────────────────────────────────────────
    // OPEN / CLOSE MENU
    // ─────────────────────────────────────────────
    const openNav = () => {
        nav.classList.add('open');
        overlay.classList.add('show');
        document.body.classList.add('nav-open');

        // Ganti icon
        if (menuIcon) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        }

        menuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeNav = () => {
        nav.classList.remove('open');
        overlay.classList.remove('show');
        document.body.classList.remove('nav-open');

        // Kembalikan icon
        if (menuIcon) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }

        menuBtn.setAttribute('aria-expanded', 'false');
    };

    const toggleNav = () => {
        const isOpen = nav.classList.contains('open');

        if (isOpen) {
            closeNav();
        } else {
            openNav();
        }
    };

    // ─────────────────────────────────────────────
    // EVENT LISTENERS
    // ─────────────────────────────────────────────

    // Klik tombol menu
    menuBtn.addEventListener('click', toggleNav);

    // Klik overlay
    overlay.addEventListener('click', closeNav);

    // Klik link menu
    navLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Tombol ESC untuk close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeNav();
        }
    });

    // Auto close saat resize desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeNav();
        }
    });

});
