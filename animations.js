/**
 * Archivo de animaciones para el portafolio
 * Utiliza Anime.js para crear animaciones atractivas y profesionales
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar que anime.js esté cargado
    if (typeof anime === 'undefined') {
        console.error('Anime.js no está cargado. Por favor, verifica la importación.');
        return;
    }

    // ===== ANIMACIONES DE ENTRADA =====
    
    // Animación del header
    anime({
        targets: 'header .navbar-brand, header .nav-item',
        opacity: [0, 1],
        translateY: [-20, 0],
        delay: anime.stagger(100),
        easing: 'easeOutExpo',
        duration: 1200
    });

    // Animación del hero
    anime({
        targets: '.hero-text h2',
        opacity: [0, 1],
        translateY: [-30, 0],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: 300
    });

    anime({
        targets: '.hero-text h3',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: 600
    });

    anime({
        targets: '.hero-text p',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: 900
    });

    anime({
        targets: '.cta-buttons .btn',
        opacity: [0, 1],
        translateY: [-20, 0],
        delay: anime.stagger(200, {start: 1200}),
        easing: 'easeOutExpo',
        duration: 1200
    });

    anime({
        targets: '.hero-image',
        opacity: [0, 1],
        translateX: [50, 0],
        easing: 'easeOutExpo',
        duration: 1500,
        delay: 500
    });

    // ===== ANIMACIONES AL SCROLL =====
    
    // Función para animar elementos cuando entran en el viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const delay = target.dataset.delay || 0;
                    const animation = target.dataset.animation || 'fadeIn';
                    
                    switch(animation) {
                        case 'fadeIn':
                            anime({
                                targets: target,
                                opacity: [0, 1],
                                translateY: [20, 0],
                                easing: 'easeOutExpo',
                                duration: 1000,
                                delay: delay
                            });
                            break;
                        case 'fadeInLeft':
                            anime({
                                targets: target,
                                opacity: [0, 1],
                                translateX: [-50, 0],
                                easing: 'easeOutExpo',
                                duration: 1000,
                                delay: delay
                            });
                            break;
                        case 'fadeInRight':
                            anime({
                                targets: target,
                                opacity: [0, 1],
                                translateX: [50, 0],
                                easing: 'easeOutExpo',
                                duration: 1000,
                                delay: delay
                            });
                            break;
                        case 'zoomIn':
                            anime({
                                targets: target,
                                opacity: [0, 1],
                                scale: [0.5, 1],
                                easing: 'easeOutExpo',
                                duration: 1000,
                                delay: delay
                            });
                            break;
                    }
                    
                    // Desconectar el observer después de animar
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Iniciar animaciones al scroll
    animateOnScroll();

    // ===== ANIMACIONES DE TIMELINE =====
    
    // Animación para el timeline de experiencia y educación
    function animateTimeline() {
        anime({
            targets: '.timeline-item',
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(200),
            easing: 'easeOutExpo',
            duration: 1000,
            begin: function(anim) {
                // Animar las líneas del timeline después de que aparezcan los items
                setTimeout(() => {
                    anime({
                        targets: '.timeline-dot',
                        scale: [0, 1],
                        opacity: [0, 1],
                        easing: 'easeOutElastic(1, .5)',
                        duration: 600,
                        delay: anime.stagger(300)
                    });
                }, 500);
            }
        });
    }
    
    // Observer para el timeline
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const timelineSections = document.querySelectorAll('.timeline');
    timelineSections.forEach(section => {
        timelineObserver.observe(section);
    });

    // ===== ANIMACIONES DE HABILIDADES =====
    
    // Animación para las barras de habilidades
    function animateSkills() {
        anime({
            targets: '.skill-level',
            width: function(el) {
                return el.getAttribute('style').replace('--width: ', '').replace('%;', '');
            },
            easing: 'easeInOutQuart',
            duration: 1000,
            delay: anime.stagger(100),
            direction: 'normal',
            begin: function(anim) {
                // Resetear el ancho a 0 antes de animar
                document.querySelectorAll('.skill-level').forEach(el => {
                    const width = el.getAttribute('style').replace('--width: ', '').replace('%;', '');
                    el.style.width = '0%';
                    el.dataset.width = width;
                });
            }
        });
    }
    
    // Observer para las habilidades
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ===== ANIMACIONES DE PROYECTOS =====
    
    // Animación para las tarjetas de proyectos
    function animateProjects() {
        anime({
            targets: '.project-card',
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.9, 1],
            delay: anime.stagger(200),
            easing: 'easeOutExpo',
            duration: 1200
        });
    }
    
    // Observer para los proyectos
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjects();
                projectsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        projectsObserver.observe(projectsSection);
    }

    // ===== ANIMACIONES DE HOVER =====
    
    // Animación de hover para botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Animación de hover para tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -15,
                boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // ===== ANIMACIONES DECORATIVAS =====
    
    // Animación de partículas en el hero
    function createParticles() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        heroSection.appendChild(particlesContainer);
        
        // Crear partículas
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particlesContainer.appendChild(particle);
            
            // Posición aleatoria
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Tamaño aleatorio
            const size = Math.random() * 6 + 2;
            
            // Color aleatorio - usar la paleta de colores del sitio
            const colors = ['#00BFFF', '#39FF14', '#6522a4', '#a855f7'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Aplicar estilos iniciales
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.opacity = 0;
            
            // Animar cada partícula
            anime({
                targets: particle,
                opacity: [0, 0.6, 0],
                translateX: () => anime.random(-50, 50) + 'px',
                translateY: () => anime.random(-50, 50) + 'px',
                scale: [1, anime.random(1, 1.5)],
                easing: 'easeOutExpo',
                duration: () => anime.random(3000, 8000),
                delay: anime.random(0, 2000),
                complete: function(anim) {
                    // Reiniciar animación
                    const particle = anim.animatables[0].target;
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.top = `${Math.random() * 100}%`;
                    
                    anime({
                        targets: particle,
                        opacity: [0, 0.6, 0],
                        translateX: () => anime.random(-50, 50) + 'px',
                        translateY: () => anime.random(-50, 50) + 'px',
                        scale: [1, anime.random(1, 1.5)],
                        easing: 'easeOutExpo',
                        duration: () => anime.random(3000, 8000),
                        delay: 0,
                        complete: anim.complete
                    });
                }
            });
        }
    }
    
    // Iniciar animación de partículas
    createParticles();

    // ===== ANIMACIÓN DE TYPING =====
    
    // Efecto de typing para el texto del hero
    function typeEffect() {
        const element = document.querySelector('.hero-text h3');
        if (!element) return;
        
        const text = element.textContent;
        element.innerHTML = '';
        element.style.opacity = 1;
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Añadir cursor parpadeante al final
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.innerHTML = '|';
                element.appendChild(cursor);
                
                // Animar cursor
                anime({
                    targets: '.typing-cursor',
                    opacity: [1, 0],
                    duration: 800,
                    easing: 'easeInOutQuad',
                    loop: true
                });
            }
        }, 50);
    }
    
    // Iniciar efecto de typing después de un breve retraso
    setTimeout(typeEffect, 1500);

    // ===== ANIMACIÓN DE SCROLL SUAVE =====
    
    // Navegación suave al hacer clic en los enlaces del menú
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    anime({
                        targets: 'html, body',
                        scrollTop: offsetTop,
                        duration: 800,
                        easing: 'easeInOutQuad'
                    });
                }
            }
        });
    });

    // ===== ANIMACIÓN DEL FORMULARIO DE CONTACTO =====
    
    // Animación para los campos del formulario
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formFields = contactForm.querySelectorAll('input, textarea');
        
        anime({
            targets: formFields,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100),
            easing: 'easeOutExpo',
            duration: 800,
            autoplay: false
        });
        
        // Observer para el formulario
        const formObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime.running[0].play();
                    formObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        formObserver.observe(contactForm);
        
        // Animación de envío del formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            let isValid = true;
            formFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    
                    // Animar campo inválido
                    anime({
                        targets: field,
                        translateX: [0, -10, 10, -10, 10, 0],
                        duration: 600,
                        easing: 'easeInOutSine'
                    });
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Mostrar animación de carga
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
                submitBtn.disabled = true;
                
                // Simular envío (aquí se integraría con EmailJS o Formspree)
                setTimeout(() => {
                    // Mostrar mensaje de éxito con animación
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success mt-3';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito! Te contactaré pronto.';
                    successMessage.style.opacity = 0;
                    contactForm.appendChild(successMessage);
                    
                    anime({
                        targets: successMessage,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        easing: 'easeOutExpo',
                        duration: 800
                    });
                    
                    // Resetear formulario
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Ocultar mensaje después de un tiempo
                    setTimeout(() => {
                        anime({
                            targets: successMessage,
                            opacity: [1, 0],
                            translateY: [0, -20],
                            easing: 'easeInExpo',
                            duration: 800,
                            complete: function() {
                                successMessage.remove();
                            }
                        });
                    }, 5000);
                }, 2000);
            }
        });
    }
});