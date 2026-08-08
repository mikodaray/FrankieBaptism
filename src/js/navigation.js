// Snap Section Navigation Module

export function initSnapNavigation() {
    const sections = document.querySelectorAll('.snap-section');
    const dots = document.querySelectorAll('.section-dot');

    if (sections.length === 0) {
        console.warn('No snap sections found');
        return;
    }

    // Intersection Observer for section visibility
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for animations
                entry.target.classList.add('visible');

                // Update navigation dots
                const index = entry.target.dataset.index;
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === parseInt(index));
                });

                // Hide scroll indicator after first section
                if (parseInt(index) > 0) {
                    const scrollIndicator = document.querySelector('.scroll-indicator');
                    if (scrollIndicator) {
                        scrollIndicator.style.opacity = '0';
                    }
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Navigation dots click handler
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetIndex = dot.dataset.section;
            const targetSection = document.querySelector(`.snap-section[data-index="${targetIndex}"]`);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Haptic feedback for navigation dots
    if ('vibrate' in navigator) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                navigator.vibrate(10);
            });
        });
    }
}
