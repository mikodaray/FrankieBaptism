// Countdown Timer Module

// Set the event date - September 12, 2026 at 3:00 PM (Philippine Time)
const EVENT_DATE = new Date('2026-09-12T15:00:00').getTime();

export function initCountdown() {
    updateCountdown();
    // Update countdown every second
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = EVENT_DATE - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        return;
    }

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    } else {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
    }
}

// Allow updating event date from outside
export function setEventDate(dateString) {
    const newDate = new Date(dateString).getTime();
    if (!isNaN(newDate)) {
        // Update the module-level constant would require restructuring
        // For now, this is a placeholder for future enhancement
        console.log('Event date updated to:', dateString);
    }
}
