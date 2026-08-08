// Map Overlay Module
export function initMapOverlay() {
    const mapOverlay = document.getElementById('mapOverlay');
    const mapIframe = document.getElementById('mapIframe');
    const mapCloseBtn = document.getElementById('mapCloseBtn');
    const mapLinks = document.querySelectorAll('.map-link');

    if (!mapOverlay || !mapIframe || !mapCloseBtn) {
        console.warn('Map overlay elements not found');
        return;
    }

    // Location coordinates and addresses
    const locations = {
        ceremony: {
            address: 'Christ the King Parish, Greenmeadows, Quezon City',
            encoded: encodeURIComponent('Christ the King Parish, Greenmeadows, Quezon City')
        },
        reception: {
            address: 'Buttery & Co. Katipunan Ave, White Plains, Quezon City',
            encoded: encodeURIComponent('Buttery & Co. Katipunan Ave, White Plains, Quezon City')
        }
    };

    // Open map overlay
    function openMap(location) {
        const loc = locations[location];
        if (!loc) return;

        // Create Google Maps embed URL
        const mapUrl = `https://www.google.com/maps?q=${loc.encoded}&output=embed`;
        mapIframe.src = mapUrl;

        mapOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close map overlay
    function closeMap() {
        mapOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Clear iframe src after animation
        setTimeout(() => {
            mapIframe.src = '';
        }, 300);
    }

    // Add click handlers to map links
    mapLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const location = link.getAttribute('data-location');
            if (location) {
                openMap(location);
            }
        });
    });

    // Close button handler
    mapCloseBtn.addEventListener('click', closeMap);

    // Close on overlay background click
    mapOverlay.addEventListener('click', (e) => {
        if (e.target === mapOverlay) {
            closeMap();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mapOverlay.classList.contains('active')) {
            closeMap();
        }
    });
}
