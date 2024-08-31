document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carouselInner = document.querySelector('.carousel-inner2');
    
    const itemWidth = document.querySelector('.carousel-item2').offsetWidth;
    const totalItems = document.querySelectorAll('.carousel-item2').length;
    const totalWidth = itemWidth * totalItems;
    
    let currentIndex = 0;
    
    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalItems - 1;
        }
        updateCarousel();
    });
    
    nextButton.addEventListener('click', function() {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });
    
    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        carouselInner.style.transform = `translateX(${offset}px)`;
    }
});
