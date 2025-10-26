// assets/js/main.js
(function(){
  // Theme handling
  const key = 'theme-preference';
  const getTheme = () => localStorage.getItem(key) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const setTheme = t => { document.documentElement.setAttribute('data-theme', t); localStorage.setItem(key, t); };
  setTheme(getTheme());
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-action="toggle-theme"]');
    if(btn){ setTheme(getTheme()==='dark'?'light':'dark'); }
  });

  // Lazy-load Leaflet when a map is present
  const mapEl = document.getElementById('map');
  if(!mapEl) return;

  const loadLeaflet = () => new Promise((resolve)=>{
    if(window.L) return resolve();
    const link = document.createElement('link');
    link.rel='stylesheet';
    link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    const s = document.createElement('script');
    s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.defer = true;
    s.onload = resolve;
    document.head.appendChild(s);
  });

  const initMap = () => {
    const lat = parseFloat(mapEl.dataset.centerLat);
    const lng = parseFloat(mapEl.dataset.centerLng);
    const tiers = JSON.parse(mapEl.dataset.tiers || '[]');
    const city = mapEl.dataset.city || 'Centre';

    const map = L.map('map', { scrollWheelZoom:false }).setView([lat, lng], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const marker = L.marker([lat, lng]).addTo(map).bindPopup(`<strong>${city}</strong> — centre des zones`);

    tiers.forEach((t, idx)=>{
      const circle = L.circle([lat, lng], {
        radius: t.radius_km * 1000,
        color: '#2d6cdf',
        fillColor: '#2d6cdf',
        fillOpacity: 0.08,
        weight: 1
      }).addTo(map);
      circle.bindPopup(`${t.label} — ${t.radius_km} km — ${t.price_eur} €`);
      if(idx === tiers.length - 1) {
        map.fitBounds(circle.getBounds(), { padding:[20,20] });
      }
    });
  };

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(async (entry)=>{
      if(entry.isIntersecting){
        observer.disconnect();
        await loadLeaflet();
        initMap();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(mapEl);
})();
