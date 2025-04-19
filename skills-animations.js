/**
 * Animaciones para la sección de habilidades usando anime.js
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar que anime.js esté cargado
    if (typeof anime === 'undefined') {
        console.error('Anime.js no está cargado. Por favor, verifica la importación.');
        return;
    }

    // Animación para los logos de tecnologías
    function animateTechLogos() {
        // Seleccionar todos los logos de tecnologías
        const techLogos = document.querySelectorAll('.tech-logo');
        
        if (techLogos.length === 0) return;
        
        // Crear la animación para cada logo
        techLogos.forEach((logo) => {
            // Configurar el observador de intersección para animar cuando sea visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animar el logo cuando entre en el viewport
                        anime({
                            targets: logo.querySelector('img'),
                            scale: [0.5, 1],
                            opacity: [0, 1],
                            rotateZ: ['-10deg', '0deg'],
                            duration: 800,
                            easing: 'easeOutElastic(1, .5)'
                        });
                        
                        // Animar la barra de habilidad
                        const skillBar = logo.querySelector('.skill-level');
                        if (skillBar) {
                            const width = skillBar.style.getPropertyValue('--width');
                            skillBar.style.width = '0';
                            
                            setTimeout(() => {
                                anime({
                                    targets: skillBar,
                                    width: width,
                                    duration: 1000,
                                    easing: 'easeInOutQuart',
                                    delay: 300
                                });
                            }, 200);
                        }
                        
                        // Dejar de observar después de animar
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            // Comenzar a observar el logo
            observer.observe(logo);
        });
    }
    
    // Animación para las categorías de habilidades
    function animateSkillCategories() {
        const categories = document.querySelectorAll('.skill-category');
        
        if (categories.length === 0) return;
        
        // Animar cada categoría con un retraso escalonado
        anime({
            targets: categories,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(150),
            easing: 'easeOutQuad'
        });
    }
    
    // Función para animar cuando la sección de habilidades entre en el viewport
    function setupSkillsAnimation() {
        const skillsSection = document.getElementById('habilidades');
        
        if (!skillsSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animar las categorías primero
                    animateSkillCategories();
                    
                    // Luego animar los logos con un pequeño retraso
                    setTimeout(animateTechLogos, 300);
                    
                    // Dejar de observar después de animar
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Comenzar a observar la sección de habilidades
        observer.observe(skillsSection);
    }
    
    // Iniciar las animaciones
    setupSkillsAnimation();
});