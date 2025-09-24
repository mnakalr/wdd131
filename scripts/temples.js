/* eslint-env browser */
// Wrap everything to avoid running in non-browser environments (e.g., Node)
(function () {
  if (typeof document === 'undefined') return;

  const onReady = () => {
    // === Footer dates ===
    const yearEl = document.getElementById('currentyear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const modEl = document.getElementById('lastModified');
    if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;

    // === Hamburger toggle (mobile only) ===
    const toggleBtn = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');

    const applyDesktopState = () => {
      if (!nav) return;
      // Large view: nav is always visible
      nav.classList.add('open');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.textContent = '☰';
        toggleBtn.setAttribute('aria-label', 'Open menu');
      }
    };

    const applyMobileState = () => {
      if (!nav) return;
      // Mobile view: start closed
      nav.classList.remove('open');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.textContent = '☰';
        toggleBtn.setAttribute('aria-label', 'Open menu');
      }
    };

    if (toggleBtn && nav) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
        toggleBtn.textContent = isOpen ? '✕' : '☰'; // show X when open
        toggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      });

      // Ensure correct state when jumping between sizes
      const mq = window.matchMedia('(min-width: 768px)');
      const syncMenu = () => {
        if (mq.matches) {
          applyDesktopState();
        } else {
          applyMobileState();
        }
      };

      // Initialize and keep in sync with viewport changes
      syncMenu();
      mq.addEventListener('change', syncMenu);
    }

    // === (Optional) Filter links demo wiring (Old/New/Large/Small) ===
    // If you want them to respond, here’s a simple filter based on data attributes.
    const gallery = document.getElementById('gallery');
    const filterLinks = document.querySelectorAll('.site-nav a[data-filter]');

    if (gallery && filterLinks.length) {
      filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const filter = link.dataset.filter; // "old" | "new" | "large" | "small"
          const figures = gallery.querySelectorAll('figure');

          figures.forEach(fig => {
            const year = parseInt(fig.dataset.year, 10);
            const size = fig.dataset.size; // "large" | "small"

            let show = true;
            if (filter === 'old') show = year < 2000;
            if (filter === 'new') show = year >= 2000;
            if (filter === 'large') show = size === 'large';
            if (filter === 'small') show = size === 'small';

            fig.style.display = show ? '' : 'none';
          });
        });
      });
    }
  };

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();