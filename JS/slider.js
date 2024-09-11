document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentIndex = 0;

    function showSlide(index) {
        slider.style.transform = `translateX(${-index * 100}%)`;
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    nextButton.addEventListener('click', showNextSlide);
    prevButton.addEventListener('click', showPrevSlide);

    setInterval(showNextSlide, 5000); // Autoplay slider every 3 seconds
});
