// Godparent Proposal Banner Module - reveals a personalized
// "Will you be my Ninong/Ninang?" banner in place of the baptismal pool
// decoration when the matching URL query parameter is set, e.g.
// index.html?no=true (Ninong) or index.html?na=true (Ninang)
export function initGodparentBanners() {
    const params = new URLSearchParams(window.location.search);
    const showNinong = params.get('no') === 'true';
    const showNinang = params.get('na') === 'true';

    const ninongBanner = document.getElementById('ninongBanner');
    if (ninongBanner && showNinong) {
        ninongBanner.classList.add('visible');
    }

    const ninangBanner = document.getElementById('ninangBanner');
    if (ninangBanner && showNinang) {
        ninangBanner.classList.add('visible');
    }

    const poolDecoration = document.getElementById('baptismPoolDecoration');
    if (poolDecoration && (showNinong || showNinang)) {
        poolDecoration.style.display = 'none';
    }
}
