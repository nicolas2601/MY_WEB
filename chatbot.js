/**
 * Chatbot simple para el portafolio
 * Responde preguntas básicas sobre habilidades y experiencia
 */

document.addEventListener('DOMContentLoaded', function() {
    // Crear el HTML del chatbot
    const chatbotHTML = `
        <div class="chatbot-container" id="chatbot">
            <div class="chatbot-header">
                <h3><i class="fas fa-robot me-2"></i>Asistente Virtual</h3>
                <button id="chatbot-toggle" class="btn-close"></button>
            </div>
            <div class="chatbot-body" id="chatbot-messages">
                <div class="message bot-message">
                    <div class="message-content">
                        <p>¡Hola! Soy el asistente virtual de Nicolás. ¿En qué puedo ayudarte?</p>
                    </div>
                </div>
            </div>
            <div class="chatbot-footer">
                <input type="text" id="chatbot-input" placeholder="Escribe tu pregunta aquí..." class="form-control">
                <button id="chatbot-send" class="btn btn-primary"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
        <button id="chatbot-launcher" class="btn btn-primary rounded-circle">
            <i class="fas fa-comment"></i>
        </button>
    `;

    // Insertar el HTML del chatbot en el body
    const chatbotContainer = document.createElement('div');
    chatbotContainer.innerHTML = chatbotHTML;
    document.body.appendChild(chatbotContainer);

    // Referencias a elementos del DOM
    const chatbot = document.getElementById('chatbot');
    const chatbotLauncher = document.getElementById('chatbot-launcher');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    // Ocultar el chatbot inicialmente
    chatbot.style.display = 'none';

    // Mostrar/ocultar el chatbot al hacer clic en el botón launcher
    chatbotLauncher.addEventListener('click', function() {
        chatbot.style.display = 'flex';
        chatbotLauncher.style.display = 'none';
        // Animar la entrada del chatbot
        anime({
            targets: chatbot,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutExpo'
        });
        chatbotInput.focus();
    });

    // Ocultar el chatbot al hacer clic en el botón de cerrar
    chatbotToggle.addEventListener('click', function() {
        // Asegurarse de que el launcher esté visible antes de la animación
        chatbotLauncher.style.display = 'flex'; // Usar flex si el launcher usa flex
        anime({
            targets: chatbot,
            translateY: [0, 50],
            opacity: [1, 0],
            duration: 300, // Reducir duración para respuesta más rápida
            easing: 'easeInQuad',
            complete: function() {
                chatbot.style.display = 'none';
            }
        });
        // Animar el launcher para que aparezca suavemente
        anime({
            targets: chatbotLauncher,
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 300,
            delay: 100, // Pequeño retraso para que aparezca después de que el chat se oculte
            easing: 'easeOutQuad'
        });
    });

    // Enviar mensaje al presionar Enter
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Enviar mensaje al hacer clic en el botón de enviar
    chatbotSend.addEventListener('click', sendMessage);

    // Función para enviar mensaje
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;

        // Agregar mensaje del usuario
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Simular tiempo de respuesta
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 600);
    }

    // Función para agregar un mensaje al chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender + '-message');
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;

        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Animar la entrada del mensaje
        anime({
            targets: messageElement,
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutExpo'
        });
    }

    // Diccionario de respuestas para el chatbot
    const respuestas = {
        hola: "¡Hola! ¿En qué puedo ayudarte hoy?",
        saludos: "¡Hola! ¿En qué puedo ayudarte hoy?",
        buenos_dias: "¡Buenos días! ¿En qué puedo ayudarte hoy?",
        buenas_tardes: "¡Buenas tardes! ¿En qué puedo ayudarte hoy?",
        experiencia: "Nicolás tiene experiencia como Programador Web Junior en Accasoft ERP, donde desarrolló páginas web con HTML, CSS y JavaScript, programó en Python, Java y C#, y gestionó bases de datos MySQL.",
        trabajo: "Nicolás tiene experiencia como Programador Web Junior en Accasoft ERP, donde desarrolló páginas web con HTML, CSS y JavaScript, programó en Python, Java y C#, y gestionó bases de datos MySQL.",
        laboral: "Nicolás tiene experiencia como Programador Web Junior en Accasoft ERP, donde desarrolló páginas web con HTML, CSS y JavaScript, programó en Python, Java y C#, y gestionó bases de datos MySQL.",
        educacion: "Nicolás es estudiante de Ingeniería de Sistemas en la Universidad Autónoma de Bucaramanga. También es graduado como Bachiller Técnico en Sistemas del Instituto Técnico Dámaso Zapata y tiene certificación en Programming Essentials in Python de Cisco.",
        estudios: "Nicolás es estudiante de Ingeniería de Sistemas en la Universidad Autónoma de Bucaramanga. También es graduado como Bachiller Técnico en Sistemas del Instituto Técnico Dámaso Zapata y tiene certificación en Programming Essentials in Python de Cisco.",
        formacion: "Nicolás es estudiante de Ingeniería de Sistemas en la Universidad Autónoma de Bucaramanga. También es graduado como Bachiller Técnico en Sistemas del Instituto Técnico Dámaso Zapata y tiene certificación en Programming Essentials in Python de Cisco.",
        habilidades: "Las principales habilidades de Nicolás incluyen: Python (90%), Java (85%), C# (80%), HTML (95%), CSS (90%), JavaScript (85%), Bootstrap, Laravel, MySQL y conocimientos en Linux.",
        skills: "Las principales habilidades de Nicolás incluyen: Python (90%), Java (85%), C# (80%), HTML (95%), CSS (90%), JavaScript (85%), Bootstrap, Laravel, MySQL y conocimientos en Linux.",
        tecnologias: "Las principales habilidades de Nicolás incluyen: Python (90%), Java (85%), C# (80%), HTML (95%), CSS (90%), JavaScript (85%), Bootstrap, Laravel, MySQL y conocimientos en Linux.",
        lenguajes: "Las principales habilidades de Nicolás incluyen: Python (90%), Java (85%), C# (80%), HTML (95%), CSS (90%), JavaScript (85%), Bootstrap, Laravel, MySQL y conocimientos en Linux.",
        proyectos: "Nicolás ha desarrollado varios proyectos destacados: una Aplicación de Mindfulness, un Sistema de Gestión de Horas Libres Universitarias, un Juego de Precisión tipo \"Aimlabs\" y este Portafolio Profesional.",
        portafolio: "Puedes ver mi portafolio completo aquí mismo en esta página.",
        contacto: "Puedes contactar a Nicolás a través de su email: nm5571762@gmail.com o mediante el formulario de contacto en esta página.",
        email: "Puedes contactar a Nicolás a través de su email: nm5571762@gmail.com o mediante el formulario de contacto en esta página.",
        correo: "Puedes contactar a Nicolás a través de su email: nm5571762@gmail.com o mediante el formulario de contacto en esta página.",
        gracias: "¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?",
        thank: "¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?",
        adios: "¡Hasta luego! Si tienes más preguntas, no dudes en volver a consultarme.",
        hasta_luego: "¡Hasta luego! Si tienes más preguntas, no dudes en volver a consultarme.",
        bye: "¡Hasta luego! Si tienes más preguntas, no dudes en volver a consultarme.",
        idiomas: "Nicolás tiene un nivel intermedio de inglés (65%).",
        ingles: "Nicolás tiene un nivel intermedio de inglés (65%).",
        languages: "Nicolás tiene un nivel intermedio de inglés (65%).",
        intereses: "Los intereses técnicos de Nicolás incluyen: Backend, Inteligencia Artificial, Desarrollo de Software, Desarrollo de Videojuegos, Ciberseguridad y Optimización de Bases de Datos.",
        pasiones: "Los intereses técnicos de Nicolás incluyen: Backend, Inteligencia Artificial, Desarrollo de Software, Desarrollo de Videojuegos, Ciberseguridad y Optimización de Bases de Datos.",
        cv: "Puedes descargar mi CV haciendo clic en el botón de la sección principal.",
        perfil: "Nicolás es un estudiante de Ingeniería de Sistemas apasionado por el desarrollo de software, especialmente en backend, inteligencia artificial y videojuegos. Es proactivo, autodidacta y busca aplicar sus conocimientos en proyectos desafiantes."
    };

    // Función para obtener respuesta del chatbot
    function getBotResponse(message) {
        // Convertir mensaje a minúsculas y quitar acentos para mejorar la coincidencia
        const lowerMessage = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        // Buscar la mejor coincidencia basada en palabras clave
        let mejorRespuesta = null;
        let maxPalabrasCoincidentes = 0;

        for (const palabraClave in respuestas) {
            // Normalizar la palabra clave
            const lowerPalabraClave = palabraClave.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const palabrasClaveArray = lowerPalabraClave.split('_'); // Para claves como 'buenas_tardes'
            let palabrasCoincidentes = 0;

            // Contar cuántas palabras clave están en el mensaje del usuario
            palabrasClaveArray.forEach(palabra => {
                // Usar regex para buscar palabras completas
                const regex = new RegExp(`\\b${palabra}\\b`);
                if (regex.test(lowerMessage)) {
                    palabrasCoincidentes++;
                }
            });

            // Si esta clave tiene más coincidencias que la mejor encontrada hasta ahora
            if (palabrasCoincidentes > 0 && palabrasCoincidentes >= maxPalabrasCoincidentes) {
                // Priorizar coincidencias más largas si el número de palabras es el mismo
                if (palabrasCoincidentes > maxPalabrasCoincidentes || lowerPalabraClave.length > (mejorRespuesta ? Object.keys(respuestas).find(key => respuestas[key] === mejorRespuesta).length : 0)) {
                    mejorRespuesta = respuestas[palabraClave];
                    maxPalabrasCoincidentes = palabrasCoincidentes;
                }
            }
        }

        if (mejorRespuesta) {
            return mejorRespuesta;
        }
        
        // Respuesta por defecto si no hay coincidencias
        return "Lo siento, no entendí eso. Intenta con palabras como: hola, perfil, portafolio, cv, contacto, experiencia, habilidades, educación, proyectos, idiomas, intereses.";
    }
});


function scrollToBottom() {
    const messageContainer = document.querySelector('.chatbot-body');
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Ejecutar al añadir nuevo mensaje
function addMessage(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender + '-message');
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;

    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Animar la entrada del mensaje
    anime({
        targets: messageElement,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo'
    });
    scrollToBottom();
}

// Ejecutar al cargar el chat
document.addEventListener('DOMContentLoaded', function() {
    scrollToBottom();
    setupMutationObserver();
});

function setupMutationObserver() {
    const observer = new MutationObserver(scrollToBottom);
    const config = { childList: true };
    observer.observe(document.querySelector('.chatbot-body'), config);
}