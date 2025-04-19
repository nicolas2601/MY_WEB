/**
 * Archivo para manejar el formulario de contacto usando EmailJS
 * Permite enviar correos electrónicos sin necesidad de backend
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el formulario de contacto existe en la página
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Inicializar EmailJS con tu clave pública
        // IMPORTANTE: Reemplaza "TU_CLAVE_PUBLICA_AQUI" con tu clave pública real de EmailJS.
        // Puedes obtenerla en tu cuenta de EmailJS > Account > API Keys.
        emailjs.init("KGXORJXBD5OISg81s");
        
        // Manejar el envío del formulario
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Mostrar indicador de carga
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Obtener los valores del formulario
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            
            // Preparar los parámetros para EmailJS
            emailjs.send('service_olry6gl', 'service_olry6gl', {
    name: name,
    title: 'Nicolas',
    from_email: email,
    message: message,
    reply_to: email
})
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Mostrar mensaje de éxito
                    showFormMessage('success', 'Tu mensaje ha sido enviado correctamente. ¡Gracias por contactarme!');
                    
                    // Limpiar el formulario
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    
                    // Mostrar mensaje de error
                    showFormMessage('error', 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.');
                })
                .finally(function() {
                    // Restaurar el botón
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
        });
        
        // Función para mostrar mensajes de éxito o error
        function showFormMessage(type, message) {
            // Crear o seleccionar el contenedor de mensajes
            let messageContainer = document.getElementById('form-message');
            
            if (!messageContainer) {
                messageContainer = document.createElement('div');
                messageContainer.id = 'form-message';
                contactForm.parentNode.insertBefore(messageContainer, contactForm.nextSibling);
            }
            
            // Configurar el mensaje
            messageContainer.className = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
            messageContainer.textContent = message;
            
            // Animar el mensaje con anime.js
            anime({
                targets: messageContainer,
                opacity: [0, 1],
                translateY: [-20, 0],
                easing: 'easeOutExpo',
                duration: 800
            });
            
            // Ocultar el mensaje después de 5 segundos
            setTimeout(function() {
                anime({
                    targets: messageContainer,
                    opacity: [1, 0],
                    translateY: [0, -20],
                    easing: 'easeInExpo',
                    duration: 800,
                    complete: function() {
                        messageContainer.remove();
                    }
                });
            }, 5000);
        }
        
        // Validación de formulario en tiempo real
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateInput(this);
                }
            });
        });
        
        function validateInput(input) {
            const value = input.value.trim();
            
            // Eliminar mensajes de error previos
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('invalid-feedback')) {
                errorElement.remove();
            }
            
            // Validar según el tipo de campo
            if (input.id === 'contact-name') {
                if (value === '') {
                    showError(input, translations[currentLanguage].contacto_error_nombre || 'Por favor ingresa tu nombre');
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            } else if (input.id === 'contact-email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(input, translations[currentLanguage].contacto_error_email || 'Por favor ingresa un email válido');
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            } else if (input.id === 'contact-message') {
                if (value === '') {
                    showError(input, translations[currentLanguage].contacto_error_mensaje || 'Por favor ingresa tu mensaje');
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            }
        }
        
        function showError(input, message) {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            errorDiv.textContent = message;
            
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
    }
});

currentLanguage = 'es';