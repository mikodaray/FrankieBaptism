// RSVP Modal Module
import { pulseClick } from './uiHelpers.js';

// Paste the deployment URL of a Google Apps Script Web App here to have
// submissions appended to a Google Sheet. See README.md for setup steps.
// Left blank, RSVPs still open/close/reset normally, they just won't be saved.
const GOOGLE_SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxHWKo45SVUDQc8dFLSR8pXEWL9bymD8QktzX4u1SKsa2VXy1t-LdcXKPW98Z-KqJpxwg/exec';

export function initRsvpModal() {
    const rsvpBtn = document.getElementById('familyRsvpBtn');
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

    rsvpBtn.addEventListener('click', () => {
        pulseClick(rsvpBtn);
        openRsvp();
    });
    rsvpBtn.addEventListener('animationend', () => {
        rsvpBtn.classList.remove('clicked');
    });

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

    // Send the RSVP to the Google Sheet, if an endpoint is configured. Apps
    // Script web apps don't return CORS headers, so this is a fire-and-forget
    // no-cors request - we can't read back success/failure, only whether the
    // request itself went out.
    async function submitToGoogleSheet(payload) {
        if (!GOOGLE_SHEET_ENDPOINT) {
            console.warn('GOOGLE_SHEET_ENDPOINT is not configured; RSVP was not saved.');
            return;
        }

        await fetch(GOOGLE_SHEET_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        });
    }

    const rsvpContent = rsvpOverlay.querySelector('.rsvp-overlay-content');
    const submitBtn = rsvpContent.querySelector('.rsvp-submit-btn');

    // Sending the RSVP is a two-beat sequence: a quick punch animation for
    // click feedback, then (once that finishes) the spinning/grayed-out
    // saving state for the duration of the actual request.
    async function sendRsvp() {
        const formData = new FormData(rsvpForm);
        const payload = {
            guestName: formData.get('guestName'),
            bringingCar: formData.get('bringingCar') === 'on',
            submittedAt: new Date().toISOString()
        };

        rsvpContent.classList.add('saving');
        submitBtn.classList.add('saving');
        submitBtn.disabled = true;
        rsvpForm.querySelectorAll('input').forEach((el) => { el.disabled = true; });

        try {
            await submitToGoogleSheet(payload);
        } catch (err) {
            console.error('Failed to submit RSVP to Google Sheets:', err);
        }

        rsvpContent.classList.remove('saving');
        submitBtn.classList.remove('saving');
        submitBtn.disabled = false;
        rsvpForm.querySelectorAll('input').forEach((el) => { el.disabled = false; });

        if ('vibrate' in navigator) {
            navigator.vibrate(15);
        }

        rsvpForm.reset();
        closeRsvp();
    }

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        pulseClick(submitBtn);
        submitBtn.addEventListener('animationend', () => {
            submitBtn.classList.remove('clicked');
            sendRsvp();
        }, { once: true });
    });
}
