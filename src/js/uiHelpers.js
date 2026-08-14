// Shared UI Helpers

// Toggles .clicked on a button to (re)play its click animation, restarting
// it cleanly even if clicked again before the previous run finished.
export function pulseClick(btn) {
    btn.classList.remove('clicked');
    void btn.offsetWidth;
    btn.classList.add('clicked');

    if ('vibrate' in navigator) {
        navigator.vibrate(12);
    }
}

// Wires a button to open/close a full-screen overlay: click-to-open (with
// the pulse animation above), a dedicated close button, clicking the
// backdrop, and Escape.
export function initPopupButton(btn, overlay, closeBtn) {
    if (!btn || !overlay || !closeBtn) return;

    function open() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
        pulseClick(btn);
        open();
    });
    btn.addEventListener('animationend', () => {
        btn.classList.remove('clicked');
    });

    closeBtn.addEventListener('click', close);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            close();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            close();
        }
    });
}
