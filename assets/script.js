/* =============== Menu déroulant (mobile-first) =============== */
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const panel  = document.getElementById('nav-collapsible');
  if (!toggle || !panel) return;

  const setState = (open) => {
    panel.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () =>
    setState(!panel.classList.contains('open'))
  );

  // Ferme au clic d’un lien/bouton dans le panneau
  panel.addEventListener('click', (e) => {
    if (e.target.closest('a,button')) setState(false);
  });

  // Ferme au passage en desktop
  const mq = window.matchMedia('(min-width: 992px)');
  const onChange = () => { if (mq.matches) setState(false); };
  mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
})();

/* =============== Dark mode (persist + préférence système) =============== */
(() => {
  const btn   = document.querySelector('.theme-toggle');
  const root  = document.documentElement;
  const apply = (mode) => root.setAttribute('data-theme', mode);

  // init: localStorage -> préférence système -> 'dark'
  let theme = localStorage.getItem('theme');
  if (!theme) {
    const prefersLight = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches;
    theme = prefersLight ? 'light' : 'dark';
  }
  apply(theme);
  if (btn) btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');

  // toggle
  btn?.addEventListener('click', () => {
    const cur  = root.getAttribute('data-theme');
    const next = (cur === 'light') ? 'dark' : 'light';
    apply(next);
    localStorage.setItem('theme', next);
    btn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
  });
})();

/* =============== Calendly modal (lazy load) =============== */
(() => {
  const calendlyBtn = document.querySelector('[data-calendly]');
  const modal       = document.getElementById('calendly-modal');
  const parent      = document.getElementById('calendly-inline');
  if (!calendlyBtn || !modal || !parent) return;

  const CALENDLY_URL = 'https://calendly.com/ton-calendly/30min'; // ← remplace

  const openModal = () => { modal.hidden = false; };
  const closeModal = () => { modal.hidden = true; };

  const loadCalendly = () => {
    if (window.Calendly) {
      Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: parent });
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.onload = () => Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: parent });
    document.body.appendChild(s);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);
  };

  calendlyBtn.addEventListener('click', () => { openModal(); loadCalendly(); });
  modal.querySelector('.modal__close')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
})();

/* =============== Formspree AJAX + popup "Merci" =============== */
(() => {
  const form  = document.getElementById('contactForm');
  if (!form) return;

  const endpoint = form.dataset.endpoint;
  const submitBtn = document.getElementById('contactSubmit');
  const statusEl  = document.getElementById('contactStatus');
  const modal     = document.getElementById('contact-modal');

  const openModal  = () => { if (modal) modal.hidden = false; };
  const closeModal = () => { if (modal) modal.hidden = true;  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!endpoint) { console.error('Formspree endpoint manquant'); return; }

    if (statusEl) statusEl.style.display = 'none';

    const fd = new FormData(form);
    if (!fd.get('_subject')) {
      fd.set('_subject', `[Site] ${fd.get('subject') || 'Nouveau message'}`);
    }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Envoi…'; }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd
      });

      if (res.ok) {
        form.reset();
        openModal();
      } else {
        if (statusEl) {
          statusEl.textContent = "Oups, l’envoi a échoué. Réessayez ou contactez-moi par email.";
          statusEl.style.display = 'block';
        }
      }
    } catch {
      if (statusEl) {
        statusEl.textContent = "Erreur réseau. Vérifiez votre connexion et réessayez.";
        statusEl.style.display = 'block';
      }
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Envoyer'; }
    }
  });

  if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    modal.querySelectorAll('.modal__close').forEach(btn => btn.addEventListener('click', closeModal));
  }
})();







/* =============== Carousel certifs mobile (dots + swipe) =============== */
(() => {
  const rail = document.getElementById('certs-rail');
  const dotsWrap = document.querySelector('.certs-dots');
  if (!rail || !dotsWrap) return;

  const slides = Array.from(rail.children);
  if (!slides.length) return;

  // 1) Crée les dots
  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'certs-dot';
    b.setAttribute('aria-label', `Aller à la certification ${i + 1}`);
    b.addEventListener('click', () => scrollToSlide(i));
    dotsWrap.appendChild(b);
    return b;
  });

  // 2) Scroll vers un slide donné (aligne le début du slide avec le viewport)
  function scrollToSlide(i) {
    const el = slides[i];
    const railRect = rail.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const delta = elRect.left - railRect.left + rail.scrollLeft - parseFloat(getComputedStyle(rail).paddingLeft || '0');
    rail.scrollTo({ left: delta, behavior: 'smooth' });
  }

  // 3) Active le dot du slide majoritairement visible (IntersectionObserver)
  function setActive(i) {
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
  }

  const io = new IntersectionObserver((entries) => {
    // on prend l'entrée la plus visible
    let bestI = null, bestRatio = 0;
    for (const e of entries) {
      const i = slides.indexOf(e.target);
      if (e.isIntersecting && e.intersectionRatio > bestRatio) {
        bestRatio = e.intersectionRatio;
        bestI = i;
      }
    }
    if (bestI !== null) setActive(bestI);
  }, { root: rail, threshold: [0.5, 0.6, 0.7, 0.8] });

  slides.forEach(el => io.observe(el));
  // État initial (au cas où le premier est déjà en vue)
  setActive(0);

  // 4) Support clavier (facultatif) : flèches gauche/droite
  rail.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const current = dots.findIndex(d => d.classList.contains('is-active'));
    const next = e.key === 'ArrowRight' ? Math.min(current + 1, slides.length - 1)
                                        : Math.max(current - 1, 0);
    scrollToSlide(next);
  });

  // 5) Accessibilité: le rail peut recevoir le focus au clavier
  rail.setAttribute('tabindex', '0');
})();
