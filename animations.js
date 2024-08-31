document.addEventListener('DOMContentLoaded', (event) => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInOutObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.classList.remove('fade-out');
            } else {
                entry.target.classList.remove('fade-in');
                entry.target.classList.add('fade-out');
            }
        });
    }, observerOptions);

    // Función para aplicar la animación a un elemento
    function applyAnimation(element) {
        element.classList.add('animated-element');
        fadeInOutObserver.observe(element);
    }

    // Carrusel de lugares
    const carousel = document.querySelector('.carousel');
    applyAnimation(carousel);

    // Carrusel de películas
    const carousel2 = document.querySelector('.carousel2');
    applyAnimation(carousel2);

    // Sección de libros
    const booksSection = document.querySelector('.books-section');
    applyAnimation(booksSection);

    // Nueva sección con una tarjeta 3D
    const newSection = document.querySelector('.new-section');
    applyAnimation(newSection);

// Nueva sección TIMELINE
const timeline = document.querySelector('.timeline');
  const timelineItems = document.querySelectorAll('.timeline-item');

  let timelineHeight = 0;
  let animationTriggered = false;

  const animateTimeline = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationTriggered) {
        animationTriggered = true;
        timeline.classList.add('animate');
        
        const totalDuration = 2000; // Duración total de la animación en ms
        const itemDuration = totalDuration / timelineItems.length;
        
        timelineItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate');
            timelineHeight += item.offsetHeight;
            timeline.style.height = `${timelineHeight}px`;
          }, index * itemDuration);
        });
        
        observer.unobserve(entry.target);
      }
    });
  };

  const timelineObserver = new IntersectionObserver(animateTimeline, { 
    threshold: 0.2 
  });

  timelineObserver.observe(timeline);

  // Reiniciar la animación cuando el usuario vuelve a la parte superior de la página
  window.addEventListener('scroll', () => {
    if (window.pageYOffset === 0) {
      animationTriggered = false;
      timeline.classList.remove('animate');
      timelineItems.forEach(item => item.classList.remove('animate'));
      timeline.style.height = '0px';
      timelineHeight = 0;
      timelineObserver.observe(timeline);
    }
  });
});