// RSVP Confirmed Page - confetti entrance animation
import '../styles/confirmed.css';

const CONFETTI_PIECES = ['🎉', '✨', '💗', '🎊', '🕊️'];
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
});
