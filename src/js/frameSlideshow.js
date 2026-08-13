// Details Frame Slideshow Module
export function initFrameSlideshow() {
    const slides = document.querySelectorAll('.frame-slide');
    if (slides.length <= 1) return;

    let current = 0;

    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 3500);
}
