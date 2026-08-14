// Envelope Animation Module
import { playMusic } from './music.js';

export function initEnvelope() {
    const envelopeIntro = document.getElementById('envelopeIntro');
    const waxSealBtn = document.getElementById('waxSealBtn');
    const closedEnvelopeImg = document.getElementById('closedEnvelopeImg');
    const envelopeBottomDecoration = document.getElementById('envelopeBottomDecoration');

    let transitioned = false;

    if (!envelopeIntro || !waxSealBtn) {
        console.warn('Envelope elements not found');
        return;
    }

    // Prevent scrolling while envelope is showing
    document.body.style.overflow = 'hidden';

    // Ensure page starts at the top
    window.scrollTo(0, 0);
    const container = document.querySelector('.container');
    if (container) {
        container.scrollTo(0, 0);
    }

    // Open the envelope: reveal the page, whose first section is the opened
    // envelope with the letter
    function openEnvelope() {
        if (transitioned) return;
        transitioned = true;

        // Scroll to top before revealing
        window.scrollTo(0, 0);
        if (container) {
            container.scrollTo(0, 0);
        }

        // Also scroll to the first section explicitly
        const firstSection = document.querySelector('.snap-section[data-index="0"]');
        if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'instant' });
        }

        envelopeIntro.classList.add('hidden');
        playMusic();

        if ('vibrate' in navigator) {
            navigator.vibrate([30, 50, 30]);
        }

        document.body.style.overflow = '';
    }

    waxSealBtn.addEventListener('click', openEnvelope);

    // The envelope artwork and the decoration below it open the invitation
    // too, same as the wax seal, so the whole envelope reads as clickable.
    if (closedEnvelopeImg) {
        closedEnvelopeImg.addEventListener('click', openEnvelope);
    }
    if (envelopeBottomDecoration) {
        envelopeBottomDecoration.addEventListener('click', openEnvelope);
    }
}
