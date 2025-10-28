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
      /* storage might be disabled – ignore */
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
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
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
    if (!nav || !navToggle) return;
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
        nav.querySelector('a')?.focus({ preventScroll: true });
      }
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeNav());
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

  const mapEl = document.getElementById('map');
  if (!mapEl) {
    return;
  }

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

  const initMap = () => {
    if (!window.L) return;
    const lat = parseFloat(mapEl.dataset.centerLat);
    const lng = parseFloat(mapEl.dataset.centerLng);
    const tiers = JSON.parse(mapEl.dataset.tiers || '[]');
    const city = mapEl.dataset.city || 'Centre';

    const map = L.map('map', { scrollWheelZoom: false }).setView([lat, lng], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    L.marker([lat, lng]).addTo(map).bindPopup(`<strong>${city}</strong> — centre des zones`);

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
      const contactNote = tier.contact_note || 'Contactez-nous pour plus d’informations.';
      circle.bindPopup(
        `<strong>${tier.label}</strong><br>${tier.radius_km} km − ${tier.price_eur} €<br><em>${contactNote}</em>`
      );
      if (index === 0) {
        largestBounds = circle.getBounds();
      }
    });

    if (largestBounds) {
      map.fitBounds(largestBounds, { padding: [28, 28] });
    }
  };

  const observer = new IntersectionObserver(
    async (entries) => {
      const firstVisible = entries.find((entry) => entry.isIntersecting);
      if (!firstVisible) return;
      observer.disconnect();
      await loadLeaflet();
      initMap();
    },
    { threshold: 0.12 }
  );

  observer.observe(mapEl);
})();
