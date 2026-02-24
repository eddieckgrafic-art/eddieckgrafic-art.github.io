document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Sticky Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    });

    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 3. Particles System
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 50;

    // Only generate on desktop/tablet to save performance
    if (window.innerWidth > 768) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            // Random animation delay and duration
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // 4. Scroll Reveal (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Counters Animation
    const counters = document.querySelectorAll('.counter');
    const counterOptions = { threshold: 0.5 };

    const animateCounter = (element, target, duration = 2000) => {
        const increment = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, counterOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // 6. Flip Cards Mobile Fix
    // En mobile, el hover no siempre funciona igual. Agregamos un click para girar.
    const serviceCards = document.querySelectorAll('.service-card-flip');
    if (window.innerWidth < 1024) {
        serviceCards.forEach(card => {
            card.addEventListener('click', function () {
                const inner = this.querySelector('.service-card-inner');
                if (inner.style.transform === 'rotateY(180deg)') {
                    inner.style.transform = 'rotateY(0deg)';
                } else {
                    inner.style.transform = 'rotateY(180deg)';
                }
            });
        });
    }

    // 7. Form Submission — Envío real a n8n via Webhook (JSON)
    const WEBHOOK_URL = 'https://eddiekcorrea.app.n8n.cloud/webhook/6610fba1-f6e1-4277-b17a-e3c06558c63f';
    // API KEY de ImgBB para subir imágenes y obtener URL pública gratuita
    // Puedes obtener una gratis en: https://api.imgbb.com/ (Si está vacía, se enviará en formato Base64)
    const IMGBB_API_KEY = 'TU_IMGBB_API_KEY_AQUI';

    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = quoteForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Mostrar estado de carga inicial
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Procesando...';
            btn.disabled = true;
            btn.style.opacity = '0.8';

            try {
                // 1. Manejar la subida de la imagen para convertirla a URL Pública
                let logoUrl = 'No adjuntado';
                const logoFile = document.getElementById('logoUpload').files[0];

                if (logoFile) {
                    if (IMGBB_API_KEY && IMGBB_API_KEY !== 'TU_IMGBB_API_KEY_AQUI') {
                        // Subir a ImgBB para obtener URL pública real y corta
                        btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Subiendo imagen...';
                        const imageFormData = new FormData();
                        imageFormData.append('image', logoFile);

                        const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                            method: 'POST',
                            body: imageFormData
                        });

                        const uploadData = await uploadRes.json();
                        if (uploadData.success) {
                            logoUrl = uploadData.data.url; // URL pública de ImgBB
                        } else {
                            throw new Error('Error al subir a ImgBB');
                        }
                    } else {
                        // Respaldo sin API Key: Convertir a formato Base64 (Data URI)
                        // A n8n también le sirve para procesar/descargar la foto
                        btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Convirtiendo...';
                        logoUrl = await new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result);
                            reader.onerror = reject;
                            reader.readAsDataURL(logoFile);
                        });
                    }
                }

                btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Enviando...';

                // 2. Recopilar todos los campos del formulario en un objeto JSON
                const formData = {
                    nombre_completo: document.getElementById('name').value.trim(),
                    empresa_o_equipo: document.getElementById('company').value.trim(),
                    contacto_whatsapp: document.getElementById('whatsapp').value.trim(),
                    cantidad_estimada: document.getElementById('quantity').value,
                    tipo_de_prenda: document.getElementById('type').value,
                    archivo_logo: logoUrl,
                    fecha_envio: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
                    origen: window.location.href
                };

                // 3. Enviar a n8n
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // n8n devuelve 200 o 2xx si todo está bien
                if (response.ok) {
                    // Éxito: mostrar confirmación visual
                    btn.innerHTML = '<i class="ph ph-check-circle"></i> ¡Solicitud Enviada!';
                    btn.style.background = 'var(--success)';
                    btn.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.4)';
                    quoteForm.reset();
                    // Restaurar nombre del logo si fue cambiado
                    const logoSpan = document.querySelector('.file-upload-content span');
                    if (logoSpan) { logoSpan.textContent = 'Sube tu logo (Opcional)'; logoSpan.style.color = ''; }
                } else {
                    // Respuesta de error del servidor
                    throw new Error(`Error del servidor: ${response.status}`);
                }

            } catch (error) {
                // Error de red u otro fallo
                btn.innerHTML = '<i class="ph ph-warning-circle"></i> Error al enviar. Intenta de nuevo.';
                btn.style.background = '#dc2626';
                btn.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.4)';
                console.error('Error al enviar a webhook:', error);
            } finally {
                btn.disabled = false;
                btn.style.opacity = '1';
                // Restaurar botón después de 4 segundos
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.boxShadow = '';
                }, 4000);
            }
        });
    }

    // 8. Logo upload preview name
    const logoUpload = document.getElementById('logoUpload');
    if (logoUpload) {
        logoUpload.addEventListener('change', function (e) {
            const fileName = e.target.files[0]?.name;
            const textSpan = this.nextElementSibling.querySelector('span');
            if (fileName) {
                textSpan.textContent = fileName;
                textSpan.style.color = 'var(--primary-400)';
            }
        });
    }
});
