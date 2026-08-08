// Main JavaScript Entry Point
import '../styles/main.css';
import { initEnvelope } from './envelope.js';
import { initCountdown } from './countdown.js';
import { initSnapNavigation } from './navigation.js';
import { initTouchFeedback } from './touch.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initEnvelope();
    initCountdown();
    initSnapNavigation();
    initTouchFeedback();
});

// Add entrance animation on full page load
window.addEventListener('load', () => {
    const envelope = document.getElementById('envelope');
    if (envelope) {
        envelope.style.animation = 'envelopeEntrance 1s ease-out';
    }
});
