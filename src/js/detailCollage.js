// Details Collage Interactions Module

function initPopupButton(btn, overlay, closeBtn) {
    if (!btn || !overlay || !closeBtn) return;

    function open() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
        btn.classList.remove('clicked');
        void btn.offsetWidth; // restart the animation if clicked again mid-play
        btn.classList.add('clicked');

        if ('vibrate' in navigator) {
            navigator.vibrate(12);
        }

        open();
    });
    btn.addEventListener('animationend', () => {
        btn.classList.remove('clicked');
    });

    closeBtn.addEventListener('click', close);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            close();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            close();
        }
    });
}

const CHURCH_PHOTO = {
    src: 'images/details-section/frankietochurch.png',
    alt: 'Christ the King Parish, Green Meadows',
    name: 'Christ the King Parish',
    line: 'Greenmeadows Avenue, Quezon City'
};

const RECEPTION_PHOTO = {
    src: 'images/details-section/butteryandco.png',
    alt: 'Buttery & Co. reception venue',
    name: 'Buttery & Co.',
    line: '104 Katipunan Ave., Brgy. White Plains, Quezon City'
};

export function initDetailCollage() {
    const mapBtn = document.getElementById('detailMapBtn');
    const churchPopupImg = document.getElementById('churchPopupImg');
    const churchPopupAddress = document.getElementById('churchPopupAddress');
    const receptionBtn = document.getElementById('receptionBtn');

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
        churchPopupAddress.querySelector('.detail-popup-address-line').textContent = photo.line;
    }

    // Reset the church popup back to the ceremony photo each time it's reopened
    if (mapBtn && churchPopupImg && churchPopupAddress && receptionBtn) {
        mapBtn.addEventListener('click', () => {
            showChurchPopupPhoto(CHURCH_PHOTO);
            receptionBtn.style.display = '';
        });
    }

    // Reception button - swaps the church popup photo for the reception venue
    if (receptionBtn && churchPopupImg && churchPopupAddress) {
        receptionBtn.addEventListener('click', () => {
            receptionBtn.classList.remove('clicked');
            void receptionBtn.offsetWidth;
            receptionBtn.classList.add('clicked');

            if ('vibrate' in navigator) {
                navigator.vibrate(12);
            }

            showChurchPopupPhoto(RECEPTION_PHOTO);
            receptionBtn.style.display = 'none';
        });
        receptionBtn.addEventListener('animationend', () => {
            receptionBtn.classList.remove('clicked');
        });
    }
}
