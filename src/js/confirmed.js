// RSVP Confirmed Page - confetti entrance animation
import '../styles/confirmed.css';
import { initDetailCollage } from './detailCollage.js';
import { initMapOverlay } from './map.js';
import { initGuestGreeting } from './guestName.js';

const CONFETTI_PIECES = ['🌸', '🌼', '🌷', '🌺', '🌻'];
const CONFETTI_COUNT = 26;

function spawnConfetti(layer) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = CONFETTI_PIECES[Math.floor(Math.random() * CONFETTI_PIECES.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.fontSize = `${1.1 + Math.random() * 1.2}rem`;
    piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 160}px`);
    piece.style.animationDuration = `${4 + Math.random() * 3}s`;
    piece.style.animationDelay = `-${Math.random() * 6}s`;
    layer.appendChild(piece);
}

document.addEventListener('DOMContentLoaded', () => {
    const layer = document.getElementById('confettiLayer');
    if (!layer) return;

    for (let i = 0; i < CONFETTI_COUNT; i++) {
        spawnConfetti(layer);
    }

    if ('vibrate' in navigator) {
        navigator.vibrate([30, 40, 30, 40, 60]);
    }

    // ?nobuttons=true hides the "see where" / "see date and time" buttons,
    // e.g. for a share link that should just show the confirmation itself.
    const hideButtons = new URLSearchParams(window.location.search).get('nobuttons') === 'true';
    const detailsButtons = document.querySelector('.confirmed-details-buttons');
    if (hideButtons && detailsButtons) {
        detailsButtons.style.display = 'none';
    }

    initDetailCollage();
    initMapOverlay();
    initGuestGreeting();
});
