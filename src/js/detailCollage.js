// Details Collage Interactions Module
import { pulseClick, initPopupButton } from './uiHelpers.js';

const CHURCH_PHOTO = {
    src: 'images/details-section/frankietochurch.png',
    alt: 'Christ the King Parish, Green Meadows',
    name: 'Christ the King Parish',
    subname: 'Divine Mercy Chapel',
    line: 'Greenmeadows Avenue, Quezon City',
    mapLocation: 'ceremony'
};

const RECEPTION_PHOTO = {
    src: 'images/details-section/butteryandco.png',
    alt: 'Buttery & Co. reception venue',
    name: 'Buttery & Co.',
    subname: '',
    line: '104 Katipunan Ave., Brgy. White Plains, Quezon City',
    mapLocation: 'reception'
};

export function initDetailCollage() {
    const mapBtn = document.getElementById('detailMapBtn');
    const churchPopupImg = document.getElementById('churchPopupImg');
    const churchPopupAddress = document.getElementById('churchPopupAddress');
    const receptionBtn = document.getElementById('receptionBtn');
    const churchBtn = document.getElementById('churchBtn');
    const redpinBtn = document.getElementById('churchRedpinBtn');

    initPopupButton(
        mapBtn,
        document.getElementById('churchOverlay'),
        document.getElementById('churchCloseBtn')
    );

    initPopupButton(
        document.getElementById('detailBookBtn'),
        document.getElementById('bookOverlay'),
        document.getElementById('bookCloseBtn')
    );

    function showChurchPopupPhoto(photo) {
        churchPopupImg.src = photo.src;
        churchPopupImg.alt = photo.alt;
        churchPopupAddress.querySelector('.detail-popup-address-name').textContent = photo.name;
        churchPopupAddress.querySelector('.detail-popup-address-subname').textContent = photo.subname;
        churchPopupAddress.querySelector('.detail-popup-address-line').textContent = photo.line;
        if (redpinBtn) {
            redpinBtn.setAttribute('data-location', photo.mapLocation);
        }
    }

    // Reset the church popup back to the ceremony photo each time it's reopened
    if (mapBtn && churchPopupImg && churchPopupAddress && receptionBtn) {
        mapBtn.addEventListener('click', () => {
            showChurchPopupPhoto(CHURCH_PHOTO);
            receptionBtn.style.display = '';
            if (churchBtn) churchBtn.style.display = 'none';
        });
    }

    // Venue swap buttons - reception.png (shown over the church photo) and
    // church.png (shown over the reception photo) swap which venue is
    // displayed. Each just shakes on click; the photo swap and button swap
    // only happen once that shake animation finishes.
    function initVenueSwapButton(btn, otherBtn, targetPhoto) {
        if (!btn || !churchPopupImg || !churchPopupAddress) return;

        btn.addEventListener('click', () => {
            pulseClick(btn);
        });
        btn.addEventListener('animationend', () => {
            btn.classList.remove('clicked');
            showChurchPopupPhoto(targetPhoto);
            btn.style.display = 'none';
            if (otherBtn) otherBtn.style.display = '';
        });
    }

    initVenueSwapButton(receptionBtn, churchBtn, RECEPTION_PHOTO);
    initVenueSwapButton(churchBtn, receptionBtn, CHURCH_PHOTO);

    // Red pin button - the click-bounce animation; opening the Google Maps
    // overlay itself is handled by map.js's own .map-link listener, which
    // reads this button's data-location fresh at click time.
    if (redpinBtn) {
        redpinBtn.addEventListener('click', () => {
            pulseClick(redpinBtn);
        });
        redpinBtn.addEventListener('animationend', () => {
            redpinBtn.classList.remove('clicked');
        });
    }
}
