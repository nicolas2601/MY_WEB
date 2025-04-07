// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Cargar las traducciones
    let currentLanguage = 'es'; // Idioma por defecto
    
    // Función para cambiar el idioma
    function changeLanguage(lang) {
        currentLanguage = lang;
        document.documentElement.lang = lang;
        
        // Actualizar todos los elementos con atributo data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Si es un elemento de entrada o un botón, actualizar el valor
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else if (element.tagName === 'BUTTON') {
                    element.textContent = translations[lang][key];
                } else {
                    // Para otros elementos, actualizar el contenido HTML
                    element.innerHTML = translations[lang][key];
                }
            }
        });
        
        // Actualizar clases activas en los botones de idioma
        document.querySelectorAll('.language-selector a').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(lang + '-lang').classList.add('active');
        
        // Guardar preferencia en localStorage
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Configurar los botones de cambio de idioma
    const esLangBtn = document.getElementById('es-lang');
    const enLangBtn = document.getElementById('en-lang');
    
    if (esLangBtn && enLangBtn) {
        esLangBtn.addEventListener('click', function(e) {
            e.preventDefault();
            changeLanguage('es');
        });
        
        enLangBtn.addEventListener('click', function(e) {
            e.preventDefault();
            changeLanguage('en');
        });
    }
    
    // Cargar idioma preferido del usuario si existe
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
    // Efecto parallax para la sección hero
    const parallaxSection = document.querySelector('.parallax-section');
    if (parallaxSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            parallaxSection.style.backgroundPosition = `50% ${scrollPosition * 0.5}px`;
        });
    }
    // Navegación suave al hacer clic en los enlaces del menú
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Animación de las barras de habilidades
    const skillSections = document.querySelector('.skills');
    const skillLevels = document.querySelectorAll('.skill-level');
    let skillsAnimated = false;

    // Función para animar las barras de habilidades cuando están en el viewport
    function animateSkillBars() {
        if (skillsAnimated) return; // Evitar que la animación se repita
        
        const sectionPosition = skillSections.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(sectionPosition < screenPosition) {
            skillLevels.forEach((skill, index) => {
                // Guardar el ancho original
                const targetWidth = skill.style.width;
                // Resetear el ancho a 0
                skill.style.width = '0';
                
                // Animar con un pequeño retraso escalonado para cada barra
                setTimeout(() => {
                    skill.style.width = targetWidth;
                }, 100 * index);
            });
            
            skillsAnimated = true; // Marcar como animado para no repetir
        }
    }

    // Ejecutar la animación al cargar la página y al hacer scroll
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);

    // Efecto de revelación para las secciones al hacer scroll
    const revealElements = document.querySelectorAll('.section-title, .about-content, .timeline-item, .skill-category, .project-card, .contact-content');

    function revealOnScroll() {
        for(let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if(elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    }

    // Agregar clase para la animación CSS
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });

    // Ejecutar la revelación al cargar la página y al hacer scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Cambiar estilo del header al hacer scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    function toggleHeaderStyle() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Añadir clase scrolled cuando se hace scroll hacia abajo
        if(scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar header según dirección del scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scroll hacia abajo y más allá de 200px
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba o en la parte superior
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }

    // Ejecutar el cambio de estilo al cargar la página y al hacer scroll
    toggleHeaderStyle();
    window.addEventListener('scroll', toggleHeaderStyle);

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Aquí normalmente enviarías los datos a un servidor
            // Por ahora, solo mostraremos un mensaje de éxito
            alert(`¡Gracias ${name} por tu mensaje! Te contactaré pronto.`);
            
            // Limpiar el formulario
            contactForm.reset();
        });
    }

    // Efecto de partículas en el fondo para la sección hero
    const createParticles = () => {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        heroSection.appendChild(particlesContainer);
        
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posición aleatoria
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Tamaño aleatorio - algunos más grandes para variedad
            const size = Math.random() * 8 + 2;
            
            // Velocidad aleatoria - un poco más rápido
            const speedX = Math.random() * 0.7 - 0.35;
            const speedY = Math.random() * 0.7 - 0.35;
            
            // Opacidad aleatoria
            const opacity = Math.random() * 0.6 + 0.3;
            
            // Color aleatorio - variaciones de morado
            const hue = 260 + Math.random() * 40; // Entre 260 y 300 (tonos de morado)
            const saturation = 70 + Math.random() * 30; // Entre 70% y 100%
            const lightness = 70 + Math.random() * 20; // Entre 70% y 90%
            
            // Aplicar estilos
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
            particle.style.boxShadow = `0 0 ${size/2}px hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity/2})`;
            
            // Guardar velocidad como atributos de datos
            particle.dataset.speedX = speedX;
            particle.dataset.speedY = speedY;
            
            particlesContainer.appendChild(particle);
        }
        
        // Animar partículas
        function animateParticles() {
            const particles = document.querySelectorAll('.particle');
            
            particles.forEach(particle => {
                const speedX = parseFloat(particle.dataset.speedX);
                const speedY = parseFloat(particle.dataset.speedY);
                
                let posX = parseFloat(particle.style.left);
                let posY = parseFloat(particle.style.top);
                
                posX += speedX;
                posY += speedY;
                
                // Mantener las partículas dentro del contenedor
                if (posX > 100) posX = 0;
                if (posX < 0) posX = 100;
                if (posY > 100) posY = 0;
                if (posY < 0) posY = 100;
                
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    };
    
    createParticles();
    
    // Efecto de typing para el texto del hero
    const initTypeEffect = () => {
        const element = document.querySelector('.hero-text h3');
        if (!element) return;
        
        const text = element.textContent;
        element.textContent = '';
        element.classList.remove('animate__fadeIn');
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    };
    
    setTimeout(initTypeEffect, 1000);
    
    // Añadir estilos CSS adicionales para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        header.scrolled {
            background-color: rgba(26, 32, 44, 0.95);
            padding: 15px 0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .hero-content {
            animation: fadeIn 1s ease-out;
        }
        
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
        }
        
        .particle {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
        }
        
        .hero .container {
            position: relative;
            z-index: 2;
        }
        
        .social-icon:hover {
            transform: translateY(-5px) rotate(360deg);
            transition: transform 0.5s ease;
        }
        
        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        .project-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
});


// Función para enviar correo electrónico
function sendEmail() {
    emailjs.send("service_id", "template_id", {
        from_name: document.getElementById('contacto_nombre').value,
        message: document.getElementById('contacto_mensaje').value,
        reply_to: document.getElementById('contacto_email').value
    }).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
}

// Evento para el envío del formulario
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto
    sendEmail(); // Llamar a la función para enviar el correo
});