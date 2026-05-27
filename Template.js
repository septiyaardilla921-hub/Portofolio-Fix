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

    const APPS_SCRIPT_URL =
'https://script.google.com/macros/s/AKfycbz1jb6vGS2Hwqc6Q7ocsqI3Y2_V-Qxih1o5UmLiA77TugbXIVCcaf4Kfa2l_qI2Pc6L/exec';

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('cf-submit-btn');

if (contactForm && submitBtn) {

    const defaultBtnHTML =
    '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';

    contactForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const formData = {
            nama: contactForm.nama.value.trim(),
            email: contactForm.email.value.trim(),
            kontak: contactForm.kontak.value.trim(),
            subjek: contactForm.subjek.value.trim(),
            pesan: contactForm.pesan.value.trim(),
        };

        // VALIDASI
        if (
            !formData.nama ||
            !formData.pesan ||
            (!formData.email && !formData.kontak)
        ) {

            alert(
                'Harap isi Nama, Pesan, dan minimal Email atau WhatsApp.'
            );

            return;
        }

        // LOADING
        submitBtn.disabled = true;

        submitBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

        try {

            const response = await fetch(APPS_SCRIPT_URL, {

                method: 'POST',

                body: new URLSearchParams({
                    nama: formData.nama,
                    email: formData.email,
                    kontak: formData.kontak,
                    subjek: formData.subjek || '-',
                    pesan: formData.pesan,
                }),

            });

            const result = await response.text();

            console.log(result);

            // SUCCESS
            submitBtn.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> Terkirim!';

            submitBtn.classList.add('success');

            contactForm.reset();

            setTimeout(() => {

                submitBtn.disabled = false;

                submitBtn.innerHTML = defaultBtnHTML;

                submitBtn.classList.remove('success');

            }, 3000);

        } catch (error) {

            console.error(error);

            alert(
                'Gagal mengirim pesan. Periksa koneksi atau Apps Script.'
            );

            submitBtn.disabled = false;

            submitBtn.innerHTML = defaultBtnHTML;
        }
    });
}