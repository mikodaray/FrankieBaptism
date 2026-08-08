// RSVP Modal Module
export function initRsvpModal() {
    const rsvpBtn = document.getElementById('rsvpBtn');
    const rsvpOverlay = document.getElementById('rsvpOverlay');
    const rsvpCloseBtn = document.getElementById('rsvpCloseBtn');
    const rsvpForm = document.getElementById('rsvpForm');

    if (!rsvpBtn || !rsvpOverlay || !rsvpCloseBtn || !rsvpForm) {
        console.warn('RSVP modal elements not found');
        return;
    }

    function openRsvp() {
        rsvpOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeRsvp() {
        rsvpOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    rsvpBtn.addEventListener('click', openRsvp);
    rsvpCloseBtn.addEventListener('click', closeRsvp);

    // Close on overlay background click
    rsvpOverlay.addEventListener('click', (e) => {
        if (e.target === rsvpOverlay) {
            closeRsvp();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && rsvpOverlay.classList.contains('active')) {
            closeRsvp();
        }
    });

    // Handle submit (no backend yet, so just acknowledge and close)
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if ('vibrate' in navigator) {
            navigator.vibrate(15);
        }

        rsvpForm.reset();
        closeRsvp();
    });
}
