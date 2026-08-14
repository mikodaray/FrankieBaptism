// Background Music Module
import { pulseClick } from './uiHelpers.js';

const audio = new Audio('sounds/music.mp3');
audio.loop = true;

let muted = true;

// Called by envelope.js once the envelope opens - that click is the user
// gesture browsers require before audio with sound is allowed to play.
export function playMusic() {
    if (!muted) {
        audio.play().catch(() => {});
    }
}

export function initMusicToggle() {
    const toggleBtn = document.getElementById('musicToggleBtn');
    const icon = toggleBtn ? toggleBtn.querySelector('.music-icon') : null;
    if (!toggleBtn || !icon) return;

    function updateIcon() {
        icon.src = muted ? 'images/nomusic.png' : 'images/music.png';
        icon.alt = muted ? 'No music' : 'Music';
        toggleBtn.setAttribute('aria-label', muted ? 'Unmute music' : 'Mute music');
    }

    // Reflect the default-muted state immediately rather than relying on
    // the icon's hardcoded HTML src staying in sync with this module.
    updateIcon();

    toggleBtn.addEventListener('click', () => {
        pulseClick(toggleBtn);
        muted = !muted;
        if (muted) {
            audio.pause();
        } else {
            playMusic();
        }
        updateIcon();
    });
    toggleBtn.addEventListener('animationend', () => {
        toggleBtn.classList.remove('clicked');
    });
}
