// Main JavaScript Entry Point
import '../styles/main.css';
import { initPageLoader } from './loader.js';
import { initEnvelope } from './envelope.js';
import { initSnapNavigation } from './navigation.js';
import { initTouchFeedback } from './touch.js';
import { initMapOverlay } from './map.js';
import { initFrameSlideshow } from './frameSlideshow.js';
import { initDetailCollage } from './detailCollage.js';
import { initRsvpModal } from './rsvp.js';
import { initFamilySection } from './familySection.js';
import { initMusicToggle } from './music.js';
import { initGodparentBanners } from './godparents.js';

// The guestlist is finalized (see index.html's #guestlistClosedOverlay) -
// nothing else on this page should initialize. Flip back to false (and
// remove the overlay markup) to reopen the invitation.
const GUESTLIST_CLOSED = true;

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (GUESTLIST_CLOSED) {
        return;
    }

    initPageLoader();
    initEnvelope();
    initSnapNavigation();
    initTouchFeedback();
    initMapOverlay();
    initFrameSlideshow();
    initDetailCollage();
    initRsvpModal();
    initFamilySection();
    initMusicToggle();
    initGodparentBanners();
});
