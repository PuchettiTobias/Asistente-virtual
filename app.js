// Verificar compatibilidad del navegador
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  document.querySelector('.content').innerHTML = 'Tu navegador no soporta reconocimiento de voz. Usa Chrome.';
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.continuous = false;
  recognition.interimResults = false;

  const content = document.querySelector('.content');
  const button = document.getElementById('talk');

  // Función para hablar
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
    content.textContent = `Asistente: ${text}`;
  }

  // Iniciar escucha al hacer clic
  button.addEventListener('click', () => {
    recognition.start();
    content.textContent = 'Escuchando...';
  });

  // Procesar el resultado del habla
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    content.textContent = `Tú: ${transcript}`;
    takeCommand(transcript);
  };

  // Manejar errores
  recognition.onerror = (event) => {
    content.textContent = `Error: ${event.error}`;
  };

  // Función para interpretar comandos
  function takeCommand(message) {
    if (message.includes('hola')) {
      speak('Hola, ¿cómo estás?');
    } else if (message.includes('qué hora es')) {
      const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      speak(`Son las ${time}`);
    } else if (message.includes('qué día es hoy')) {
      const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
      speak(`Hoy es ${date}`);
    } else if (message.includes('abrir google')) {
      window.open('https://www.google.com', '_blank');
      speak('Abriendo Google');
    } else if (message.includes('abrir youtube')) {
      window.open('https://www.youtube.com', '_blank');
      speak('Abriendo YouTube');
    } else if (message.includes('buscar en google')) {
      const query = message.replace('buscar en google', '').trim();
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      speak(`Buscando ${query} en Google`);
    } else if (message.includes('gracias')) {
      speak('De nada, estoy aquí para ayudarte.');
    } else {
      speak('No entendí ese comando.');
    }
  }
}   