// Family Section Interactions Module
import { initPopupButton } from './uiHelpers.js';

export function initFamilySection() {
    initPopupButton(
        document.getElementById('stylingSuggestionsBtn'),
        document.getElementById('stylingSuggestionsOverlay'),
        document.getElementById('stylingSuggestionsCloseBtn')
    );
}
