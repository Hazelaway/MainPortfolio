document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM completamente cargado');

  const language = localStorage.getItem('language') || 'en';
  const button = document.getElementById('know-me-btn');

  if (button) {
    console.log('Botón encontrado:', button);
    button.textContent = button.getAttribute(`data-${language}`);

    button.addEventListener('click', () => {
      window.location.href = `carab.html?lang=${language}`;
    });
  } else {
    console.log('El botón con el id "know-me-btn" no se encontró en el DOM.');
  }
});

  
  
  
  
  