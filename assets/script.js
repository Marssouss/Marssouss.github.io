// Menu mobile
const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
if(toggleBtn && nav){
  toggleBtn.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', open ? 'true':'false');
  });
}

// Dark mode toggle (persist + préfère système au 1er chargement)
(function(){
  const btn = document.querySelector('.theme-toggle');
  const apply = mode => document.documentElement.setAttribute('data-theme', mode);

  // init: localStorage -> sinon préfère système -> sinon 'dark'
  let theme = localStorage.getItem('theme');
  if(!theme){
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    theme = prefersLight ? 'light' : 'dark';
  }
  apply(theme);
  if(btn) btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');

  // toggle
  btn?.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme');
    const next = (cur === 'light') ? 'dark' : 'light';
    apply(next);
    localStorage.setItem('theme', next);
    btn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
  });
})();


// Calendly modal (lazy load)
const calendlyBtn = document.querySelector('[data-calendly]');
const modal = document.getElementById('calendly-modal');
if(calendlyBtn && modal){
  calendlyBtn.addEventListener('click', async ()=>{
    modal.hidden = false;
    if(!window.Calendly){
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.onload = () => Calendly.initInlineWidget({
        url: 'https://calendly.com/ton-calendly/30min', // ← remplace par ton lien
        parentElement: document.getElementById('calendly-inline'),
        prefill: {}
      });
      document.body.appendChild(s);
      const link = document.createElement('link');
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    } else {
      Calendly.initInlineWidget({ url: 'https://calendly.com/ton-calendly/30min', parentElement: document.getElementById('calendly-inline') });
    }
  });
  modal.querySelector('.modal__close').addEventListener('click', ()=> modal.hidden = true);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.hidden = true; });
}



// Formspree AJAX + popup "Merci"
(function(){
  const form  = document.getElementById('contactForm');
  if(!form) return;

  const endpoint = form.dataset.endpoint; // ← lu depuis l'include
  const submitBtn = document.getElementById('contactSubmit');
  const statusEl  = document.getElementById('contactStatus');
  const modal     = document.getElementById('contact-modal');

  const openModal  = () => { if(modal) modal.hidden = false; };
  const closeModal = () => { if(modal) modal.hidden = true;  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(!endpoint){ console.error('Formspree endpoint manquant'); return; }

    statusEl.style.display = 'none';
    const fd = new FormData(form);
    if(!fd.get('_subject')){
      fd.set('_subject', `[Site] ${fd.get('subject') || 'Nouveau message'}`);
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi…';

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
        statusEl.textContent = "Oups, l’envoi a échoué. Réessayez ou contactez-moi par email.";
        statusEl.style.display = 'block';
      }
    } catch(err) {
      statusEl.textContent = "Erreur réseau. Vérifiez votre connexion et réessayez.";
      statusEl.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer';
    }
  });

  // Fermer la popup
  if(modal){
    modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
    modal.querySelectorAll('.modal__close').forEach(btn => btn.addEventListener('click', closeModal));
  }
})();


// === Menu mobile ==========================================
(function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!menuToggle || !menu) return;

  const panel = menu.querySelector('.nav-mobile__panel');
  const closeBtn = menu.querySelector('.menu-close');
  const backdrop = menu.querySelector('.nav-mobile__backdrop');
  const focusable = () => panel.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])');

  function openMenu() {
    menu.classList.add('open');
    document.body.classList.add('no-scroll');
    menuToggle.setAttribute('aria-expanded', 'true');
    // focus premier lien
    const first = focusable()[0];
    if (first) first.focus();
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onClickOutside);
  }

  function closeMenu() {
    menu.classList.remove('open');
    document.body.classList.remove('no-scroll');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onClickOutside);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeMenu();
    if (e.key === 'Tab' && menu.classList.contains('open')) {
      // piège du focus dans le panneau
      const f = [...focusable()];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  }

  function onClickOutside(e) {
    if (e.target === backdrop || e.target.dataset.close === 'true') closeMenu();
  }

  menuToggle.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Ferme au changement de taille (passage desktop)
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 992px)').matches) closeMenu();
  });
})();


// Menu déroulant sous le header (sans overlay)
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.getElementById('nav-collapsible');
  if (!toggle || !panel) return;

  const setState = (open) => {
    panel.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setState(!(panel.classList.contains('open'))));

  // Ferme au clic d’un lien/bouton
  panel.addEventListener('click', (e) => {
    if (e.target.closest('a') || e.target.closest('button')) setState(false);
  });

  // Ferme au passage en desktop
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 992px)').matches) setState(false);
  });
})();
