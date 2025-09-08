/* ===========================================================================
   ABM — JS unifié (premium, moderne & épuré)
   1) Utils (qs/qsa, on/off, mq, rAF, store, flags)
   2) Navigation mobile (burger, ARIA, breakpoint)
   3) Thème (persist + préférence système, label/ARIA, Alt+clic reset)
   4) Modals (focus-trap, esc, overlay)
   5) Formulaire (Formspree AJAX + feedback + “merci” en modal)
   6) Certifications (carousel mobile + dots + centrage)
   7) Calendly (inline desktop + popup mobile/desktop, assets lazy, loader 3 pts, fallbacks)
   =========================================================================== */

/* ========================= 1) Utils légers ========================= */
const $  = (sel, scope=document) => scope.querySelector(sel);
const $$ = (sel, scope=document) => Array.from(scope.querySelectorAll(sel));
const on  = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
const off = (el, ev, fn, opts) => el && el.removeEventListener(ev, fn, opts);
const mq  = (q) => window.matchMedia ? window.matchMedia(q) : { matches:false, addEventListener(){}, removeEventListener(){} };
const raf = (fn) => (window.requestAnimationFrame || ((f)=>setTimeout(f,16)))(fn);
const noop = () => {};
const PREFERS_REDUCED = mq('(prefers-reduced-motion: reduce)').matches;

/* Storage safe (évite erreurs navigation privée) */
const store = {
  get(k){ try { return localStorage.getItem(k); } catch { return null; } },
  set(k,v){ try { localStorage.setItem(k,v); } catch {} },
  rm(k){ try { localStorage.removeItem(k); } catch {} }
};

/* =================== 2) Navigation mobile (burger + ARIA) =================== */
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
  on(panel, 'click', (e) => { if (e.target.closest('a,button')) setState(false); });

  // Ferme lors du passage en desktop
  const bp = mq('(min-width: 992px)');
  const onChange = () => { if (bp.matches) setState(false); };
  bp.addEventListener('change', onChange);
})();

/* ==================== 3) Thème (persist + système + label) ==================== */
(() => {
  const btn   = $('.theme-toggle');
  const root  = document.documentElement;
  const label = btn?.querySelector('.tt-label');

  const getSystem  = () => (mq('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const getStored  = () => store.get('theme');
  const setLabelAria = (mode) => {
    if (!btn) return;
    const isDark = mode === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    btn.setAttribute('aria-label', isDark ? 'Basculer en mode clair' : 'Basculer en mode sombre');
    if (label) label.textContent = isDark ? 'Dark' : 'Light';
  };
  const apply = (mode) => { root.setAttribute('data-theme', mode); setLabelAria(mode); };

  // Init : storage sinon système
  apply(getStored() || getSystem());

  // Sync système si pas de choix explicite
  const sys = mq('(prefers-color-scheme: light)');
  const syncSystem = () => { if (!getStored()) apply(getSystem()); };
  sys.addEventListener('change', syncSystem);

  // Toggle + persist
  on(btn, 'click', (e) => {
    const cur = root.getAttribute('data-theme');
    const next = (cur === 'light') ? 'dark' : 'light';
    apply(next);
    store.set('theme', next);
  });

  // Alt + clic → reset (revient au thème système)
  on(btn, 'click', (e) => {
    if (!e.altKey) return;
    store.rm('theme');
    apply(getSystem());
  }, { capture:true });
})();

/* =================== 4) Modals utilitaires (focus-trap & co) =================== */
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
    const f = el.querySelector(FOCUSABLE);
    (f || el).focus?.();
  };

  const close = (el) => {
    if (!el) return;
    el.hidden = true;
    el._untrap?.();
  };

  const bind  = (modal) => {
    if (!modal) return;
    on(modal, 'click', (e) => { if (e.target === modal) close(modal); }, { passive:true });
    $$('.modal__close,[data-close]', modal).forEach(btn => on(btn, 'click', () => close(modal)));
    on(document, 'keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(modal); });
  };

  return { open, close, bind };
})();

/* ========== 5) Formulaire (Formspree AJAX + modal “Merci”) ========== */
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
      const res = await fetch(endpoint, { method:'POST', headers:{ 'Accept':'application/json' }, body:fd });
      if (res.ok) { form.reset(); Modal.open(modal); }
      else { setStatus("Oups, l’envoi a échoué. Réessayez ou contactez-moi par email.", true); }
    } catch {
      setStatus("Erreur réseau. Vérifiez votre connexion et réessayez.", true);
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Envoyer'; }
    }
  });
})();

/* ====== 6) Carousel certifications (mobile : dots + centrage) ====== */
(() => {
  const rail     = $('#certs-rail');
  const dotsWrap = $('.certs-dots');
  if (!rail || !dotsWrap) return;

  const slides = Array.from(rail.children);
  if (!slides.length) return;

  rail.setAttribute('tabindex', '0');
  rail.setAttribute('role', 'region');
  rail.setAttribute('aria-label', 'Certifications (carousel)');

  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'certs-dot';
    b.setAttribute('aria-label', `Aller à la certification ${i + 1}`);
    on(b, 'click', () => scrollToSlide(i));
    dotsWrap.appendChild(b);
    return b;
  });

  const centerOffsetFor = (el) => el.offsetLeft - (rail.clientWidth - el.clientWidth) / 2;
  const scrollToSlide = (i) => {
    const el = slides[i];
    rail.scrollTo({ left: centerOffsetFor(el), behavior: PREFERS_REDUCED ? 'auto' : 'smooth' });
  };

  const setActive = (i) => dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      let bestI = null, bestRatio = 0;
      for (const e of entries) {
        const i = slides.indexOf(e.target);
        if (e.isIntersecting && e.intersectionRatio > bestRatio) { bestRatio = e.intersectionRatio; bestI = i; }
      }
      if (bestI !== null) setActive(bestI);
    }, { root: rail, threshold: [0.5, 0.6, 0.7, 0.8] });
    slides.forEach(el => io.observe(el));
  } else {
    const onScroll = () => {
      const deltas = slides.map(el => Math.abs(centerOffsetFor(el) - rail.scrollLeft));
      setActive(deltas.indexOf(Math.min(...deltas)));
    };
    on(rail, 'scroll', onScroll, { passive:true });
  }

  setActive(0);

  on(rail, 'keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const cur = dots.findIndex(d => d.classList.contains('is-active'));
    const next = e.key === 'ArrowRight' ? Math.min(cur + 1, slides.length - 1)
                                        : Math.max(cur - 1, 0);
    scrollToSlide(next);
  });

  let resizeRaf;
  on(window, 'resize', () => {
    cancelAnimationFrame?.(resizeRaf);
    resizeRaf = raf(() => {
      const current = dots.findIndex(d => d.classList.contains('is-active')) || 0;
      scrollToSlide(current);
    });
  }, { passive:true });
})();

/* ================== 7) Calendly (inline + popup unifiés) ================== */
(() => {
  const modal    = $('#calendly-modal');            // popup (mobile/desktop)
  const parentM  = $('#calendly-inline');           // conteneur popup
  const parentD  = $('#calendly-inline-embed');     // conteneur inline desktop
  const triggers = $$('[data-calendly]');           // tous les boutons
  const mqDesk   = mq('(min-width: 992px)');

  // URL (priorité: inline desktop > inline modal > bouton)
  const url = (parentD?.dataset.calendlyUrl
            || parentM?.dataset.calendlyUrl
            || triggers[0]?.dataset.calendlyUrl
            || '').trim();
  if (!url) { console.warn('[Calendly] URL absente (data-calendly-url)'); return; }
  if (!/^https:\/\/calendly\.com\//i.test(url)) { console.warn('[Calendly] URL non valide:', url); return; }

  if (modal) Modal.bind(modal);

  // ----- Assets loader (idempotent) -----
  const ensureLink = (href) => new Promise(res => {
    if (document.querySelector(`link[href="${href}"]`)) return res();
    const l = document.createElement('link'); l.rel='stylesheet'; l.href=href;
    l.onload = res; l.onerror = res; document.head.appendChild(l);
  });
  const ensureScript = (src) => new Promise(res => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement('script'); s.src = src; s.defer = true;
    s.onload = res; s.onerror = res; document.body.appendChild(s);
  });
  const loadAssets = () => Promise.all([
    ensureLink('https://assets.calendly.com/assets/external/widget.css'),
    ensureScript('https://assets.calendly.com/assets/external/widget.js'),
  ]);

  // ----- Loader 3 points -----
  const addDotsLoader = (host) => {
    if (!host || host.querySelector('.dots-loader')) return;
    const wrap = document.createElement('div');
    wrap.className = 'dots-loader';
    wrap.innerHTML = `
      <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
      <span class="sr-only">Chargement…</span>
    `;
    host.appendChild(wrap);
  };
  const removeDotsLoader = (host) => host?.querySelector('.dots-loader')?.remove();

  // ----- Forcer le plein format (sécurité contre styles inline Calendly) -----
  const forceFullSize = (host) => {
    if (!host) return;
    const wr = host.querySelector('.calendly-inline-widget');
    const ifr = host.querySelector('iframe');
    if (wr) Object.assign(wr.style, { position:'absolute', inset:'0', width:'100%', height:'100%', border:0 });
    if (ifr) Object.assign(ifr.style, { position:'absolute', inset:'0', width:'100%', height:'100%', border:0 });
  };

  // ----- Initialiser un conteneur (inline widget) -----
  const initInline = async (host) => {
    if (!host) return;
    addDotsLoader(host);
    await loadAssets();
    host.innerHTML = ''; // nettoyage
    window.Calendly?.initInlineWidget({ url, parentElement: host });

    // Retirer le loader dès qu’un iframe apparaît
    const obs = new MutationObserver(() => {
      if (host.querySelector('iframe')) {
        removeDotsLoader(host);
        forceFullSize(host);
        obs.disconnect();
      }
    });
    obs.observe(host, { childList: true, subtree: true });

    // Fallback : retente une fois si vide après 5s
    setTimeout(() => {
      if (!host.querySelector('iframe')) {
        host.innerHTML = '';
        addDotsLoader(host);
        window.Calendly?.initInlineWidget({ url, parentElement: host });
        const obs2 = new MutationObserver(() => {
          if (host.querySelector('iframe')) { removeDotsLoader(host); forceFullSize(host); obs2.disconnect(); }
        });
        obs2.observe(host, { childList: true, subtree: true });
      }
    }, 5000);
  };

  // ----- Mode inline (desktop) -----
  const bootInlineDesktop = () => { if (parentD) { parentD.style.display = 'block'; initInline(parentD); } };

  // ----- Mode popup (mobile… et desktop si clic) -----
  const openPopup = async () => {
    if (!modal || !parentM) return;
    Modal.open(modal);
    initInline(parentM);
  };

  // ----- Bootstrap -----
  const boot = () => {
    if (mqDesk.matches) bootInlineDesktop();          // inline direct sur desktop
    triggers.forEach(btn => on(btn, 'click', openPopup, { passive:true })); // popup sur action (mobile/desktop)
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once:true });
  } else {
    boot();
  }

  // Resize : s’assure que l’iframe garde le plein format
  on(window, 'resize', () => { forceFullSize(parentD); forceFullSize(parentM); }, { passive:true });
})();



/* ================== 8) Copy to clipboard (contacts) ================== */
(() => {
  const rows = $$('.contact-row');
  if (!rows.length) return;

  const resolveText = (row) => {
    const btn  = row.querySelector('.ci-copy-btn');
    if (!btn) return null;

    // 1) Valeur explicite
    const explicit = btn.getAttribute('data-copy');
    if (explicit && explicit.trim()) return explicit.trim();

    // 2) Sinon, déduire du lien voisin
    const link = row.querySelector('.contact-item[href]');
    if (link) {
      const href = (link.getAttribute('href') || '').trim();
      if (/^mailto:/i.test(href)) return decodeURIComponent(href.replace(/^mailto:/i,'')).replace(/\?.*$/,'');
      if (/^tel:/i.test(href))    return href.replace(/^tel:/i,'');
    }

    // 3) Sinon, le texte fort
    const strong = row.querySelector('.ci-body strong');
    return strong?.textContent?.trim() || null;
  };

  const copyText = async (txt) => {
    if (!txt) throw new Error('Nothing to copy');
    try {
      await navigator.clipboard.writeText(txt);
      return true;
    } catch {
      // Fallback (HTTP / permissions)
      const ta = document.createElement('textarea');
      ta.value = txt;
      ta.setAttribute('readonly','');
      ta.style.position='fixed';
      ta.style.opacity='0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch {}
      document.body.removeChild(ta);
      return ok;
    }
  };

  rows.forEach(row => {
    const btn = row.querySelector('.ci-copy-btn');
    if (!btn) return;

    // Région a11y pour annoncer le statut
    const announcer = (() => {
      let live = row.querySelector('.sr-only[role="status"]');
      if (!live) {
        live = document.createElement('span');
        live.className = 'sr-only';
        live.setAttribute('role','status');
        live.setAttribute('aria-live','polite');
        row.appendChild(live);
      }
      return (msg) => { live.textContent = msg; };
    })();

    on(btn, 'click', async (e) => {
      e.preventDefault();       // évite un submit accidentel
      e.stopPropagation();      // évite le clic sur le <a> voisin

      const value = btn.getAttribute('data-copy')?.trim() || resolveText(row);
      if (!value) return;

      const prev = btn.innerHTML;
      try {
        const ok = await copyText(value);
        // Feedback visuel + a11y
        btn.classList.add('is-copied');
        btn.setAttribute('aria-label', ok ? 'Copié !' : 'Échec de la copie');
        btn.innerHTML = ok ? '✓' : '!';
        announcer(ok ? 'Copié dans le presse-papier' : 'La copie a échoué');
      } finally {
        setTimeout(() => {
          btn.classList.remove('is-copied');
          btn.innerHTML = prev;
          btn.setAttribute('aria-label', 'Copier');
        }, 1200);
      }
    }, { passive:false });
  });
})();


// Fallback si un logo casse
(() => {
  document.querySelectorAll('.cert-logo').forEach(img => {
    img.addEventListener('error', () => {
      const wrap = img.closest('.cert-badge');
      if (!wrap) return;
      wrap.innerHTML = `
        <svg class="cert-ph" width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
          <defs>
            <linearGradient id="gradABM" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="currentColor" stop-opacity=".25"/>
              <stop offset="1" stop-color="currentColor" stop-opacity=".55"/>
            </linearGradient>
          </defs>
          <rect x="0.5" y="0.5" width="55" height="55" rx="12" fill="url(#gradABM)" stroke="currentColor" opacity=".5"/>
          <g transform="translate(0,1)">
            <path d="M20 28h16M28 20v16" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".9"/>
          </g>
        </svg>`;
    }, { once: true });
  });
})();
