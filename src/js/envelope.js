// Envelope Animation Module
export function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const envelopeIntro = document.getElementById('envelopeIntro');
    const continueBtn = document.getElementById('continueBtn');
    const tapInstruction = document.getElementById('tapInstruction');
    let envelopeOpened = false;

    if (!envelope || !envelopeIntro || !continueBtn) {
        console.warn('Envelope elements not found');
        return;
    }

    // Prevent scrolling while envelope is showing
    document.body.style.overflow = 'hidden';

    // Open envelope on click/tap
    envelope.addEventListener('click', () => {
        if (!envelopeOpened) {
            envelopeOpened = true;
            envelope.classList.add('open');

            // Haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate([30, 50, 30]);
            }

            // Hide tap instruction
            if (tapInstruction) {
                tapInstruction.style.opacity = '0';
                tapInstruction.style.transform = 'translateY(20px)';
            }

            // Show continue button after animation
            setTimeout(() => {
                continueBtn.classList.add('show');
            }, 800);
        }
    });

    // Continue to invitation
    continueBtn.addEventListener('click', () => {
        envelopeIntro.classList.add('hidden');

        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(15);
        }

        // Enable scrolling on the body
        document.body.style.overflow = '';
    });

    // Add subtle entrance animation to envelope on load
    envelope.style.animation = 'envelopeEntrance 1s ease-out';
}
