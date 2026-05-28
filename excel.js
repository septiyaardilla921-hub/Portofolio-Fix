document.addEventListener('DOMContentLoaded', () => {

    // URL APPS SCRIPT
    const APPS_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbywsKpMZikaIO2dK0pMHINKsHY9YoRBKgd1AkvGb9Pz1QzvRIcyYs4Tm_qIFdZJP6O4/exec';
    // FORM
    const contactForm =
    document.getElementById('contact-form');

    const submitBtn =
    document.getElementById('cf-submit-btn');

    if (contactForm && submitBtn) {

        contactForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            // AMBIL DATA FORM
            const formData = {

                nama:
                contactForm.nama.value.trim(),

                email:
                contactForm.email.value.trim(),

                kontak:
                contactForm.kontak.value.trim(),

                subjek:
                contactForm.subjek.value.trim(),

                pesan:
                contactForm.pesan.value.trim(),
            };

            // VALIDASI
            if (
                !formData.nama ||
                !formData.pesan
            ) {

                alert(
                'Nama dan pesan wajib diisi.'
                );

                return;
            }

            // LOADING BUTTON
            submitBtn.disabled = true;

            submitBtn.innerHTML =
            'Sending...';

            try {

                // KIRIM KE APPS SCRIPT
                await fetch(APPS_SCRIPT_URL, {

                    method: 'POST',

                    mode: 'no-cors',

                    body: new URLSearchParams({

                        nama: formData.nama,
                        email: formData.email,
                        kontak: formData.kontak,
                        subjek: formData.subjek,
                        pesan: formData.pesan,

                    }),

                });

                // BERHASIL
                submitBtn.innerHTML =
                'Message Sent!';

                contactForm.reset();

            } catch (error) {

                console.error(error);

                alert(
                'Gagal mengirim pesan.'
                );

            }

            // RESET BUTTON
            setTimeout(() => {

                submitBtn.disabled = false;

                submitBtn.innerHTML =
                'Send Message';

            }, 3000);

        });

    }

});