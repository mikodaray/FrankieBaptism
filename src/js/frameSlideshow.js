// Details Frame Slideshow Module
export function initFrameSlideshow() {
    const container = document.querySelector('.detail-frame-slideshow');
    const slides = document.querySelectorAll('.frame-slide');
    if (!container || slides.length <= 1) return;

    let current = 0;
    let intervalId = null;
    let paused = false;

    function showSlide(index) {
        slides[current].classList.remove('active');
        current = index;
        slides[current].classList.add('active');
    }

    function next() {
        showSlide((current + 1) % slides.length);
    }

    function start() {
        intervalId = setInterval(next, 3500);
    }

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
    }

    start();

    // First click pauses the auto-advance; each click after that manually
    // advances to the next photo instead.
    container.addEventListener('click', () => {
        if (!paused) {
            paused = true;
            stop();
        } else {
            next();
        }
    });
}
