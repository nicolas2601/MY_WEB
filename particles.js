/**
 * Archivo para crear animaciones de partículas en el fondo
 * Utiliza Anime.js para crear un efecto visual atractivo
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar que anime.js esté cargado
    if (typeof anime === 'undefined') {
        console.error('Anime.js no está cargado. Por favor, verifica la importación.');
        return;
    }

    // Crear partículas para la sección hero
    const particlesContainer = document.querySelector('.particles-container');
    
    if (particlesContainer) {
        // Número de partículas basado en el ancho de la pantalla
        const particleCount = window.innerWidth < 768 ? 30 : 60;
        
        // Crear partículas
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer);
        }
        
        // Animar partículas
        animateParticles();
    }
    
    // Función para crear una partícula
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño aleatorio
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Color aleatorio (entre azul eléctrico y verde neón)
        const hue = Math.random() > 0.7 ? '140' : '195'; // 70% azul, 30% verde
        const saturation = Math.floor(Math.random() * 20 + 80); // 80-100%
        const lightness = Math.floor(Math.random() * 20 + 50); // 50-70%
        particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        // Añadir al contenedor
        container.appendChild(particle);
        
        return particle;
    }
    
    // Función para animar las partículas
    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            // Valores iniciales aleatorios
            const translateX = anime.random(-50, 50);
            const translateY = anime.random(-50, 50);
            const rotate = anime.random(-360, 360);
            const scale = anime.random(0.8, 1.5);
            const duration = anime.random(3000, 8000);
            
            // Animar cada partícula
            anime({
                targets: particle,
                translateX: translateX,
                translateY: translateY,
                rotate: rotate,
                scale: scale,
                opacity: [particle.style.opacity, anime.random(0.1, 0.5)],
                duration: duration,
                easing: 'easeInOutQuad',
                complete: function(anim) {
                    // Reiniciar animación con nuevos valores aleatorios
                    anime({
                        targets: particle,
                        translateX: anime.random(-50, 50),
                        translateY: anime.random(-50, 50),
                        rotate: anime.random(-360, 360),
                        scale: anime.random(0.8, 1.5),
                        opacity: anime.random(0.1, 0.5),
                        duration: anime.random(3000, 8000),
                        easing: 'easeInOutQuad',
                        complete: function() {
                            // Crear un bucle infinito de animación
                            animateParticle(particle);
                        }
                    });
                }
            });
        });
    }
    
    // Función para animar una partícula individual en bucle
    function animateParticle(particle) {
        anime({
            targets: particle,
            translateX: anime.random(-50, 50),
            translateY: anime.random(-50, 50),
            rotate: anime.random(-360, 360),
            scale: anime.random(0.8, 1.5),
            opacity: anime.random(0.1, 0.5),
            duration: anime.random(3000, 8000),
            easing: 'easeInOutQuad',
            complete: function() {
                animateParticle(particle);
            }
        });
    }
    
    // Efecto de movimiento de partículas con el ratón
    if (particlesContainer) {
        document.querySelector('.hero').addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const particles = document.querySelectorAll('.particle');
            
            particles.forEach(particle => {
                const offsetX = (mouseX - 0.5) * 20;
                const offsetY = (mouseY - 0.5) * 20;
                
                anime({
                    targets: particle,
                    translateX: `+=${offsetX}`,
                    translateY: `+=${offsetY}`,
                    duration: 3000,
                    easing: 'easeOutElastic(1, .5)'
                });
            });
        });
    }
});