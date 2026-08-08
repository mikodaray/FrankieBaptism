// Touch Feedback Module

export function initTouchFeedback() {
    const interactiveElements = document.querySelectorAll('.rsvp-btn, .when-where-block, .section-dot');

    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.98)';
        }, { passive: true });

        el.addEventListener('touchend', () => {
            el.style.transform = '';
        }, { passive: true });
    });
}
