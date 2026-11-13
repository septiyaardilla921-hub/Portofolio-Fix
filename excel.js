
document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // GOOGLE APPS SCRIPT URL
    // =====================================

    const APPS_SCRIPT_URL =
        'https://script.google.com/macros/s/AKfycbyWQ-Tu1XJOVP2QGjMOt3fnaB3E2aNKJRS3S9B-VZHe0Ysfwz0MGCHjpYrQKIAzT5pj/exec';


    // =====================================
    // FORM ELEMENT
    // =====================================

    const contactForm =
        document.getElementById('contact-form');

    const submitBtn =
        document.getElementById('cf-submit-btn');


    if (!contactForm || !submitBtn) {
        console.error('Contact form atau tombol submit tidak ditemukan.');
        return;
    }


    // =====================================
    // FORM SUBMISSION
    // =====================================

    contactForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        // AMBIL DATA FORM
        const formData = {

            nama: contactForm.elements.namedItem('nama')?.value.trim() || '',

            email: contactForm.elements.namedItem('email')?.value.trim() || '',

            kontak: contactForm.elements.namedItem('kontak')?.value.trim() || '',

            subjek: contactForm.elements.namedItem('subjek')?.value.trim() || '',

            pesan: contactForm.elements.namedItem('pesan')?.value.trim() || ''

        };


        // VALIDASI
        if (!formData.nama || !formData.pesan) {

            alert('Nama dan pesan wajib diisi.');
            return;

        }


        // SIMPAN TEKS TOMBOL AWAL
        const originalButtonText = submitBtn.innerHTML;

        // LOADING BUTTON
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';


        try {

            // KIRIM DATA KE GOOGLE APPS SCRIPT
            await fetch(APPS_SCRIPT_URL, {

                method: 'POST',

                mode: 'no-cors',

                body: new URLSearchParams(formData)

            });


            // STATUS PENGIRIMAN
            // no-cors tidak dapat membaca respons Apps Script.
            // Status ini bukan konfirmasi penyimpanan atau email.

            submitBtn.innerHTML = 'Request Sent';

            contactForm.reset();


        } catch (error) {

            console.error('Submission Error:', error);

            alert('Terjadi kesalahan saat mengirim pesan.');

            submitBtn.innerHTML = 'Send Message';

        }


        // KEMBALIKAN TOMBOL
        setTimeout(() => {

            submitBtn.disabled = false;

            submitBtn.innerHTML = originalButtonText;

        }, 3000);

    });

});
