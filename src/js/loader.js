// Page Loader Module - keeps the loading screen up until every page
// resource (images especially) has finished fetching, so slow connections
// don't reveal a half-loaded envelope.
export function initPageLoader() {
    const pageLoader = document.getElementById('pageLoader');
    if (!pageLoader) return;

    function hideLoader() {
        pageLoader.classList.add('hidden');
    }

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
}
