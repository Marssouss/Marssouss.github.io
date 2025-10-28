// assets/script.js
(function () {
  const root = document.documentElement;
  const storageKey = 'theme-preference';

  const readStorage = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch (err) {
      return null;
    }
  };

  const writeStorage = (value) => {
    try {
      localStorage.setItem(storageKey, value);
    } catch (err) {
      /* storage might be disabled - ignore */
    }
  };

  const systemPrefersDark = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme, persist = true) => {
    if (theme !== 'light' && theme !== 'dark') {
      theme = systemPrefersDark() ? 'dark' : 'light';
    }
    root.setAttribute('data-theme', theme);
    if (persist) {
      writeStorage(theme);
    }
  };

  const storedTheme = readStorage();
  if (storedTheme) {
    applyTheme(storedTheme, false);
  }

  const updateMetaTheme = (theme) => {
    const metaTags = document.querySelectorAll('meta[name="theme-color"]');
    metaTags.forEach((tag) => {
      const media = tag.getAttribute('media');
      if (!media || media.includes(theme)) {
        tag.setAttribute('content', getComputedStyle(document.body).backgroundColor);
      }
    });
  };

  updateMetaTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    updateMetaTheme(next);
  };

  document.querySelectorAll('[data-action="toggle-theme"]').forEach((btn) => {
    btn.addEventListener('click', toggleTheme);
  });

  if (window.matchMedia) {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const stored = readStorage();
        if (!stored || stored === 'system') {
          applyTheme(event.matches ? 'dark' : 'light', false);
          updateMetaTheme(event.matches ? 'dark' : 'light');
        }
      });
  }

  const navToggle = document.querySelector('[data-action="toggle-nav"]');
  const nav = document.querySelector('[data-nav]');

  const closeNav = () => {
    if (!nav || !navToggle) {
      return;
    }
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        const firstLink = nav.querySelector('a');
        if (firstLink) {
          firstLink.focus({ preventScroll: true });
        }
      }
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
        closeNav();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
      }
    });
  }

  const mapElements = Array.from(document.querySelectorAll('.js-delivery-map'));
  const modal = document.querySelector('[data-media-modal]');

  const loadLeaflet = () =>
    new Promise((resolve) => {
      if (window.L) {
        resolve();
        return;
      }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.defer = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });

  const initMap = (element) => {
    if (!window.L || !element) {
      return;
    }

    const lat = parseFloat(element.dataset.centerLat);
    const lng = parseFloat(element.dataset.centerLng);
    const tiers = JSON.parse(element.dataset.tiers || '[]');
    const city = element.dataset.city || 'Centre';

    const map = L.map(element, { scrollWheelZoom: false }).setView([lat, lng], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup('<strong>' + city + '</strong> - centre des zones');

    const defaultColors = ['#ef4444', '#facc15', '#2563eb', '#f97316'];
    const tiersWithDefaults = tiers.map((tier, index) => ({
      ...tier,
      __defaultColor: defaultColors[index % defaultColors.length],
    }));
    const sortedTiers = tiersWithDefaults.slice().sort((a, b) => b.radius_km - a.radius_km);

    let largestBounds = null;

    sortedTiers.forEach((tier, index) => {
      const color = tier.color || tier.__defaultColor;
      const circle = L.circle([lat, lng], {
        radius: tier.radius_km * 1000,
        color,
        fillColor: color,
        fillOpacity: 0.22,
        weight: 1.4,
      }).addTo(map);
      const contactNote = tier.contact_note || 'Contactez-nous pour plus d\'informations.';
      const popupHtml =
        '<strong>' +
        tier.label +
        '</strong><br>' +
        tier.radius_km +
        ' km - ' +
        tier.price_eur +
        ' &euro;<br><em>' +
        contactNote +
        '</em>';
      circle.bindPopup(popupHtml);
      if (index === 0) {
        largestBounds = circle.getBounds();
      }
    });

    if (largestBounds) {
      map.fitBounds(largestBounds, { padding: [28, 28] });
    }
  };

  if (mapElements.length) {
    mapElements.forEach((element) => {
      const observer = new IntersectionObserver(
        async (entries, obs) => {
          const isVisible = entries.some((entry) => entry.isIntersecting);
          if (!isVisible) {
            return;
          }
          obs.disconnect();
          await loadLeaflet();
          initMap(element);
        },
        { threshold: 0.12 }
      );

      observer.observe(element);
    });
  }

  if (modal) {
    const titleEl = modal.querySelector('[data-media-title]');
    const galleryEl = modal.querySelector('[data-media-gallery]');
    const closeEls = modal.querySelectorAll('[data-media-close]');
    const openButtons = document.querySelectorAll('[data-action="open-showcase"]');
    const backdropEl = modal.querySelector('.media-modal__backdrop');
    const originalBodyOverflow = document.body.style.overflow;

    const closeModal = () => {
      modal.setAttribute('hidden', '');
      galleryEl.innerHTML = '';
      document.body.style.overflow = originalBodyOverflow;
    };

    closeEls.forEach((btn) => btn.addEventListener('click', closeModal));

    if (backdropEl) {
      backdropEl.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.hasAttribute('hidden')) {
        closeModal();
      }
    });

    openButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const rawPhotos = button.getAttribute('data-showcase-photos') || '[]';
        let photos = [];
        try {
          photos = JSON.parse(rawPhotos);
        } catch (err) {
          photos = [];
        }
        galleryEl.innerHTML = '';
        photos.forEach((photo) => {
          const figure = document.createElement('figure');
          const img = document.createElement('img');
          img.src = photo.src;
          img.alt = photo.alt || button.getAttribute('data-showcase-title') || 'Photo de materiel';
          figure.appendChild(img);
          if (photo.caption) {
            const figcap = document.createElement('figcaption');
            figcap.textContent = photo.caption;
            figure.appendChild(figcap);
          }
          galleryEl.appendChild(figure);
        });
        titleEl.textContent = button.getAttribute('data-showcase-title') || 'Galerie media';
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
      });
    });
  }
})();

