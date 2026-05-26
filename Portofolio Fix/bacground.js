document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // ELEMENTS
    // =========================================
    const tabContainer = document.querySelector('.tab-container');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const detailPages = document.querySelectorAll('.detail-page');

    // Stop if tabs don't exist
    if (!tabButtons.length || !detailPages.length) return;

    // =========================================
    // TAB SWITCH FUNCTION
    // =========================================
    const switchTab = (targetId) => {

        // Find target section
        const targetSection = document.getElementById(targetId);

        // Prevent error if target doesn't exist
        if (!targetSection) return;

        // Remove active states
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });

        detailPages.forEach(page => {
            page.classList.remove('active');
        });

        // Activate matching button
        const activeButton = document.querySelector(
            `.tab-btn[data-target="${targetId}"]`
        );

        if (activeButton) {
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-selected', 'true');
        }

        // Activate target page
        targetSection.classList.add('active');

        // Update URL hash
        history.replaceState(null, '', `#${targetId}`);
    };

    // =========================================
    // EVENT DELEGATION
    // =========================================
    document.addEventListener('click', (e) => {

        const btn = e.target.closest('.tab-btn');

        if (!btn) return;

        const targetId = btn.dataset.target;

        if (!targetId) return;

        switchTab(targetId);
    });

    // =========================================
    // OPEN TAB FROM URL HASH
    // =========================================
    const hash = window.location.hash.replace('#', '');

    if (hash) {

        switchTab(hash);

    } else {

        // Default first tab
        const firstTab = tabButtons[0];

        if (firstTab?.dataset.target) {
            switchTab(firstTab.dataset.target);
        }
    }

    // =========================================
    // HANDLE BACK/FORWARD NAVIGATION
    // =========================================
    window.addEventListener('hashchange', () => {

        const newHash = window.location.hash.replace('#', '');

        if (newHash) {
            switchTab(newHash);
        }
    });

});