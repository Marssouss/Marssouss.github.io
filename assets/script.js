/* ===========================================================================
   ABM — JS unifié (premium, moderne & épuré)
   - Utils (qs/qsa, on, store, mq, rAF)
   - Nav mobile (burger, ARIA, breakpoints)
   - Thème (persist + préférence système, label Light/Dark, aria-pressed, reset Alt+clic)
   - Modals (focus-trap, Calendly lazy)
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
const noop = () => {};

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
  on(panel, 'click', (e) => { if (e.target.closest('a,button')) setState(false); });

  // Ferme lors du passage en desktop
  const bp = mq('(min-width: 992px)');
  const onChange = () => { if (bp.matches) setState(false); };
  bp.addEventListener ? bp.addEventListener('change', onChange) : bp.addListener(onChange);
})();

/* ==================== 3) Thème (persist + système + label) ==================== */
(() => {
  const btn   = $('.theme-toggle');
  const root  = document.documentElement;
  const label = btn?.querySelector('.tt-label');

  const getSystem = () => (mq('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const getStored = () => store.get('theme');

  const setLabelAndAria = (mode) => {
    if (!btn) return;
    const isDark = mode === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    btn.setAttribute('aria-label', isDark ? 'Basculer en mode clair' : 'Basculer en mode sombre');
    if (label) label.textContent = isDark ? 'Dark' : 'Light';
  };

  const apply = (mode) => {
    root.setAttribute('data-theme', mode);
    setLabelAndAria(mode);
  };

  // init: storage -> système
  apply(getStored() || getSystem());

  // Sync système si l’utilisateur n’a PAS choisi manuellement
  const sysPref = mq('(prefers-color-scheme: light)');
  const syncSystem = () => {
    if (getStored()) return; // on respecte le choix explicite
    apply(getSystem());
  };
  sysPref.addEventListener ? sysPref.addEventListener('change', syncSystem)
                           : sysPref.addListener(syncSystem);

  // Toggle explicite + persistance
  on(btn, 'click', (e) => {
    const cur  = root.getAttribute('data-theme');
    const next = (cur === 'light') ? 'dark' : 'light';
    apply(next);
    store.set('theme', next);
  });

  // Alt+clic => reset au thème système (supprime la préférence)
  on(btn, 'click', (e) => {
    if (!e.altKey) return;
    store.rm('theme');
    apply(getSystem());
  }, { capture:true });
})();

/* =================== 4) Modal utilitaire (focus-trap) =================== */
const Modal = (() => {
  const FOCUSABLE = [
    'a[href]','area[href]','button:not([disabled])','input:not([disabled])',
    'select:not([disabled])','textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const trap = (modal) => {
    const nodes = $$(FOCUSABLE, modal);
    if (!nodes.length) return noop;
    const first = nodes[0], last = nodes[nodes.length - 1];

    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    on(modal, 'keydown', onKey);
    return () => off(modal, 'keydown', onKey);
  };

  const open  = (el) => {
    if (!el) return;
    el.hidden = false;
    const untrap = trap(el);
    el._untrap = untrap;
    // focus premier élément focusable
    const f = $(FOCUSABLE, el);
    (f || el).focus?.();
  };
  const close = (el) => {
    if (!el) return;
    el.hidden = true;
    el._untrap?.();
  };
  const bind  = (modal) => {
    if (!modal) return;
    // fermer par clic fond
    on(modal, 'click', (e) => { if (e.target === modal) close(modal); }, { passive:true });
    // close buttons + attribut data-close
    $$('.modal__close,[data-close]', modal).forEach(btn => on(btn, 'click', () => close(modal)));
    // ESC
    on(document, 'keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(modal); });
  };
  return { open, close, bind };
})();

/* ============ 5) Calendly modal (lazy load + idempotent) ============ */
/*(() => {
  const calendlyBtn = document.querySelector('[data-calendly]');
  const modal       = $('#calendly-modal');
  const parent      = $('#calendly-inline');
  if (!calendlyBtn || !modal || !parent) return;

  Modal.bind(modal);

  const CALENDLY_URL = 'https://calendly.com/ton-calendly/30min'; // ← remplace
  let loaded = false;

  const loadCalendly = () => {
    if (loaded) return; loaded = true;

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
*/
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
  const centerOffsetFor = (el) => el.offsetLeft - (rail.clientWidth - el.clientWidth) / 2;
  const scrollToSlide = (i) => {
    const el = slides[i];
    const target = centerOffsetFor(el);
    rail.scrollTo({ left: target, behavior: PREFERS_REDUCED ? 'auto' : 'smooth' });
  };

  // Active le dot du slide majoritairement visible
  const setActive = (i) => dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));

  // Observer pour déterminer le “meilleur” slide en vue
  if ('IntersectionObserver' in window) {
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

/* ============ Calendly inline — plein format + overlays robustes ============ */
(() => {
  const parent = document.getElementById('calendly-inline');
  if (!parent) return;

  const url = (parent.dataset.calendlyUrl || '').trim();
  const skeleton = parent.querySelector('.calendly-skeleton');
  const fallback = parent.querySelector('.calendly-fallback');

  const hideOverlays = () => {
    parent.classList.add('is-ready');
    if (skeleton) skeleton.style.display = 'none';
    if (fallback)  { fallback.hidden = true; fallback.style.display = 'none'; }
  };
  const showFallback = (why='') => {
    console.warn('[Calendly] Fallback:', why);
    parent.classList.remove('is-ready');
    if (skeleton) skeleton.style.display = 'none';
    if (fallback)  { fallback.hidden = false; fallback.style.display = 'grid'; }
  };
  const forceFullSize = () => {
    const wr = parent.querySelector('.calendly-inline-widget');
    const ifr = parent.querySelector('iframe');
    if (wr) { wr.style.width='100%'; wr.style.height='100%'; wr.style.position='absolute'; wr.style.inset='0'; }
    if (ifr){ ifr.style.width='100%'; ifr.style.height='100%'; ifr.style.position='absolute'; ifr.style.inset='0'; }
  };

  // 1) URL valide ?
  if (!url) { showFallback('URL manquante (_config.yml)'); return; }
  if (!/^https:\/\/calendly\.com\//i.test(url)) { showFallback('URL non Calendly'); return; }

  // 2) Charge assets Calendly
  const ensureCalendly = (cb) => {
    let pending = 0, errored = false;
    const done  = () => (--pending <= 0 && !errored) && cb();
    const fail  = () => { errored = true; showFallback('Assets non chargés'); };

    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      pending++;
      const l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = 'https://assets.calendly.com/assets/external/widget.css';
      l.onload = done; l.onerror = fail; document.head.appendChild(l);
    }
    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      pending++;
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.defer = true; s.onload = done; s.onerror = fail; document.body.appendChild(s);
    }
    if (pending === 0) cb();
  };

  const init = () => {
    if (!window.Calendly) { showFallback('API absente'); return; }

    // Démarre l’inline widget
    try {
      window.Calendly.initInlineWidget({ url, parentElement: parent });
    } catch (e) {
      console.error(e); showFallback('initInlineWidget error'); return;
    }

    // 3) Quand le widget apparaît → on masque les overlays et on force la taille
    const observer = new MutationObserver(() => {
      const ready = parent.querySelector('.calendly-inline-widget');
      if (ready) {
        hideOverlays();
        forceFullSize();
        observer.disconnect();
      }
    });
    observer.observe(parent, { childList: true, subtree: true });

    // 4) Poll de sécurité au cas où l’observer raterait l’événement
    const poll = setInterval(() => {
      const iframe = parent.querySelector('iframe');
      if (iframe) {
        hideOverlays();
        forceFullSize();
        clearInterval(poll);
      }
    }, 250);

    // 5) Timeout : si rien après 8s → on montre le fallback (en overlay)
    setTimeout(() => {
      if (!parent.querySelector('iframe')) showFallback('timeout');
    }, 8000);

    // 6) Resize
    window.addEventListener('resize', forceFullSize, { passive:true });
  };

  ensureCalendly(() => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init, { once:true });
    } else {
      init();
    }
  });
})();



/* ============ Calendly modal — URL depuis _config.yml + init idempotent ============ */
(() => {
  const trigger = document.querySelector('[data-calendly]');   // le bouton qui ouvre la popup
  const modal   = document.getElementById('calendly-modal');   // conteneur modal
  const parent  = document.getElementById('calendly-inline');  // conteneur de l'iframe à l'intérieur du modal
  if (!trigger || !modal || !parent) return;

  // URL injectée depuis _config.yml dans un data-attribute
  const CALENDLY_URL =
    parent.dataset.calendlyUrl ||
    trigger.dataset.calendlyUrl ||
    '';

  if (!/^https:\/\/calendly\.com\//i.test(CALENDLY_URL)) {
    console.warn('[Calendly] URL manquante ou invalide. Vérifie site.author.calendly_url dans _config.yml');
    return;
  }

  // Bind utilitaire Modal (déjà présent dans ton code)
  Modal.bind(modal);

  let assetsLoaded = false;

  const ensureAssets = (cb) => {
    // charge CSS/JS Calendly une seule fois
    const needCss = !document.querySelector('link[href*="calendly.com/assets/external/widget.css"]');
    const needJs  = !document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
    let pending = 0;

    const done = () => { if (--pending === 0) { assetsLoaded = true; cb(); } };

    if (needCss) {
      pending++;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.onload = done; link.onerror = done;
      document.head.appendChild(link);
    }
    if (needJs) {
      pending++;
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.onload = done; s.onerror = done;
      document.body.appendChild(s);
    }
    if (!needCss && !needJs) { assetsLoaded = true; cb(); }
  };

  const initCalendly = () => {
    // (ré)initialise à chaque ouverture pour être propre
    parent.innerHTML = '';
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: parent
      });
    }
  };

  trigger.addEventListener('click', () => {
    Modal.open(modal);
    if (!assetsLoaded) {
      ensureAssets(initCalendly);
    } else {
      initCalendly();
    }
  });
})();
