// Main JavaScript Entry Point
import '../styles/main.css';
import { initEnvelope } from './envelope.js';
import { initCountdown } from './countdown.js';
import { initSnapNavigation } from './navigation.js';
import { initTouchFeedback } from './touch.js';
import { initMapOverlay } from './map.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initEnvelope();
    initCountdown();
    initSnapNavigation();
    initTouchFeedback();
    initMapOverlay();
});
