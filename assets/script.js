/* ===========================================================================
   ABM — JS unifié (premium, moderne & épuré)
   - Utils (qs/qsa, on, store, mq, rAF)
   - Nav mobile (burger, ARIA, breakpoints)
   - Thème (persist + préférence système, aria-pressed)
   - Modals (Calendly lazy, Contact “Merci”)
   - Formspree (AJAX + feedback)
   - Carousel certifications (dots + centrage)
   - A11y & prefers-reduced-motion
   =========================================================================== */

/* ========================= 1) Utils légers ========================= */
const $  = (sel, scope=document) => scope.querySelector(sel);
const $$ = (sel, scope=document) => Array.from(scope.querySelectorAll(sel));
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
const off = (el, ev, fn, opts) => el && el.removeEventListener(ev, fn, opts);
const mq  = (q) => window.matchMedia ? window.matchMedia(q) : { matches:false, addListener(){}, removeListener(){} };
const raf = (fn) => (window.requestAnimationFrame || setTimeout)(fn, 16);

/* Storage safe (pas d’erreur en mode privé) */
const store = {
  get(key){ try { return localStorage.getItem(key); } catch { return null; } },
  set(key,val){ try { localStorage.setItem(key,val); } catch {} },
  rm(key){ try { localStorage.removeItem(key); } catch {} }
};

/* Prefers reduced motion ? */
const PREFERS_REDUCED = mq('(prefers-reduced-motion: reduce)').matches;

/* =================== 2) Nav mobile (burger + ARIA) =================== */
(() => {
  const toggle = $('.nav-toggle');
  const panel  = $('#nav-collapsible');
  if (!toggle || !panel) return;

  const setState = (open) => {
    panel.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  // Init ARIA
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'nav-collapsible');

  on(toggle, 'click', () => setState(!panel.classList.contains('open')));

  // Ferme au clic d’un lien/bouton dans le panneau
  on(panel, 'click', (e) => {
    if (e.target.closest('a,button')) setState(false);
  });

  // Ferme lors du passage en desktop
  const bp = mq('(min-width: 992px)');
  const onChange = () => { if (bp.matches) setState(false); };
  // compatibilité anciens navigateurs
  bp.addEventListener ? bp.addEventListener('change', onChange) : bp.addListener(onChange);
})();

/* ==================== 3) Thème (persist + système) ==================== */
(() => {
  const btn  = $('.theme-toggle');
  const root = document.documentElement;

  const apply = (mode) => {
    root.setAttribute('data-theme', mode);
    if (btn) btn.setAttribute('aria-pressed', String(mode === 'dark'));
  };

  // init: localStorage -> préférence système -> dark
  let theme = store.get('theme');
  if (!theme) {
    const prefersLight = mq('(prefers-color-scheme: light)').matches;
    theme = prefersLight ? 'light' : 'dark';
  }
  apply(theme);

  // Sync si l’utilisateur change le thème au niveau OS
  const sysPref = mq('(prefers-color-scheme: light)');
  const syncSystem = () => {
    const saved = store.get('theme'); // si user a choisi un thème, on respecte
    if (saved) return;
    apply(sysPref.matches ? 'light' : 'dark');
  };
  sysPref.addEventListener ? sysPref.addEventListener('change', syncSystem) : sysPref.addListener(syncSystem);

  // Toggle explicite
  on(btn, 'click', () => {
    const cur  = root.getAttribute('data-theme');
    const next = (cur === 'light') ? 'dark' : 'light';
    apply(next);
    store.set('theme', next);
  });
})();

/* =================== 4) Modal utilitaire générique =================== */
const Modal = (() => {
  const open  = (el) => { if (el) el.hidden = false; };
  const close = (el) => { if (el) el.hidden = true; };
  const bind  = (modal) => {
    if (!modal) return;
    // fermer par clic fond
    on(modal, 'click', (e) => { if (e.target === modal) close(modal); }, { passive:true });
    // close buttons
    $$('.modal__close', modal).forEach(btn => on(btn, 'click', () => close(modal)));
    // ESC
    on(document, 'keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(modal); });
  };
  return { open, close, bind };
})();

/* ============ 5) Calendly modal (lazy load + idempotent) ============ */
(() => {
  const calendlyBtn = document.querySelector('[data-calendly]');
  const modal       = $('#calendly-modal');
  const parent      = $('#calendly-inline');
  if (!calendlyBtn || !modal || !parent) return;

  Modal.bind(modal);

  const CALENDLY_URL = 'https://calendly.com/ton-calendly/30min'; // ← remplace

  let loaded = false;
  const loadCalendly = () => {
    if (loaded) return;
    loaded = true;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);

    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.onload = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: parent });
      }
    };
    document.body.appendChild(s);
  };

  on(calendlyBtn, 'click', () => { Modal.open(modal); loadCalendly(); });
})();

/* ========== 6) Formspree AJAX + popup “Merci” (accessible) ========== */
(() => {
  const form   = $('#contactForm');
  if (!form) return;

  const endpoint  = form.dataset.endpoint;
  const submitBtn = $('#contactSubmit');
  const statusEl  = $('#contactStatus');
  const modal     = $('#contact-modal');

  Modal.bind(modal);

  const setStatus = (msg, isError=false) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.display = 'block';
    statusEl.setAttribute('role', 'status');
    statusEl.setAttribute('aria-live', isError ? 'assertive' : 'polite');
  };

  on(form, 'submit', async (e) => {
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
        body: fd,
      });

      if (res.ok) {
        form.reset();
        Modal.open(modal);
      } else {
        setStatus("Oups, l’envoi a échoué. Réessayez ou contactez-moi par email.", true);
      }
    } catch {
      setStatus("Erreur réseau. Vérifiez votre connexion et réessayez.", true);
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Envoyer'; }
    }
  });
})();

/* ====== 7) Carousel certifs mobile (dots + centrage propre) ====== */
(() => {
  const rail    = $('#certs-rail');
  const dotsWrap= $('.certs-dots');
  if (!rail || !dotsWrap) return;

  const slides = Array.from(rail.children);
  if (!slides.length) return;

  // Rôle défilant
  rail.setAttribute('tabindex', '0');
  rail.setAttribute('role', 'region');
  rail.setAttribute('aria-label', 'Certifications (carousel)');

  // Crée les dots (une fois)
  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'certs-dot';
    b.setAttribute('aria-label', `Aller à la certification ${i + 1}`);
    on(b, 'click', () => scrollToSlide(i));
    dotsWrap.appendChild(b);
    return b;
  });

  // Centrage d’un slide dans le viewport du rail
  function centerOffsetFor(el) {
    return el.offsetLeft - (rail.clientWidth - el.clientWidth) / 2;
  }
  function scrollToSlide(i) {
    const el = slides[i];
    const target = centerOffsetFor(el);
    rail.scrollTo({ left: target, behavior: PREFERS_REDUCED ? 'auto' : 'smooth' });
  }

  // Active le dot du slide majoritairement visible
  function setActive(i) {
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
  }

  // Observer pour déterminer le “meilleur” slide en vue
  const useIO = 'IntersectionObserver' in window;
  if (useIO) {
    const io = new IntersectionObserver((entries) => {
      let bestI = null, bestRatio = 0;
      for (const e of entries) {
        const i = slides.indexOf(e.target);
        if (e.isIntersecting && e.intersectionRatio > bestRatio) {
          bestRatio = e.intersectionRatio; bestI = i;
        }
      }
      if (bestI !== null) setActive(bestI);
    }, { root: rail, threshold: [0.5, 0.6, 0.7, 0.8] });
    slides.forEach(el => io.observe(el));
  } else {
    // Fallback sans IO : se base sur scrollLeft
    const onScroll = () => {
      const centers = slides.map(el => Math.abs(centerOffsetFor(el) - rail.scrollLeft));
      const bestI = centers.indexOf(Math.min(...centers));
      setActive(bestI);
    };
    on(rail, 'scroll', onScroll, { passive:true });
  }

  // État initial
  setActive(0);

  // Clavier : flèches G/D
  on(rail, 'keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const current = dots.findIndex(d => d.classList.contains('is-active'));
    const next = e.key === 'ArrowRight'
      ? Math.min(current + 1, slides.length - 1)
      : Math.max(current - 1, 0);
    scrollToSlide(next);
  });

  // Recenter on resize (orientation, etc.)
  let resizeRaf;
  on(window, 'resize', () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = raf(() => {
      const current = dots.findIndex(d => d.classList.contains('is-active')) || 0;
      scrollToSlide(current);
    });
  }, { passive:true });
})();

