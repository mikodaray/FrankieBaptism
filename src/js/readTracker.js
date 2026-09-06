// Read Tracker Module - marks a guest's row as "Read" in the guest-list
// sheet (Sheet2, column E - column D already holds each guest's link) when
// they open their personalized confirmed page, via the same Apps Script
// Web App used to save RSVPs. See README.md for the doGet setup this
// relies on.
import { GOOGLE_SHEET_ENDPOINT } from './rsvp.js';

export function initReadTracker() {
    const rowNumber = parseInt(new URLSearchParams(window.location.search).get('guest'), 10);
    if (!rowNumber || rowNumber < 1 || !GOOGLE_SHEET_ENDPOINT) return;

    const url = `${GOOGLE_SHEET_ENDPOINT}?action=markRead&guest=${rowNumber}`;
    fetch(url, { mode: 'no-cors' }).catch((err) => {
        console.warn('Failed to mark guest as read:', err);
    });
}
