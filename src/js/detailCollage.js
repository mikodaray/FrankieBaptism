// Details Collage Interactions Module
export function initDetailCollage() {
    const mapBtn = document.getElementById('detailMapBtn');
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            mapBtn.classList.remove('clicked');
            void mapBtn.offsetWidth; // restart the animation if clicked again mid-play
            mapBtn.classList.add('clicked');
        });
        mapBtn.addEventListener('animationend', () => {
            mapBtn.classList.remove('clicked');
        });
    }

    const bookBtn = document.getElementById('detailBookBtn');
    const bookOverlay = document.getElementById('bookOverlay');
    const bookCloseBtn = document.getElementById('bookCloseBtn');

    if (bookBtn && bookOverlay && bookCloseBtn) {
        function openBook() {
            bookOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeBook() {
            bookOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        bookBtn.addEventListener('click', () => {
            bookBtn.classList.remove('clicked');
            void bookBtn.offsetWidth;
            bookBtn.classList.add('clicked');

            if ('vibrate' in navigator) {
                navigator.vibrate(12);
            }

            openBook();
        });
        bookBtn.addEventListener('animationend', () => {
            bookBtn.classList.remove('clicked');
        });

        bookCloseBtn.addEventListener('click', closeBook);

        bookOverlay.addEventListener('click', (e) => {
            if (e.target === bookOverlay) {
                closeBook();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && bookOverlay.classList.contains('active')) {
                closeBook();
            }
        });
    }
}
