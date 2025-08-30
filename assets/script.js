/* =============== Menu déroulant sous le header (mobile-first) =============== */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const panel  = document.getElementById('nav-collapsible');
  if (!toggle || !panel) return;

  const setState = (open) => {
    panel.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setState(!panel.classList.contains('open')));

  // Ferme au clic d’un lien/bouton
  panel.addEventListener('click', (e) => {
    if (e.target.closest('a') || e.target.closest('button')) setState(false);
  });

  // Ferme au passage en desktop
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 992px)').matches) setState(false);
  });
})();

/* =============== Dark mode (persist + préférence système) =================== */
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

/* =============== Calendly modal (lazy load) =================== */
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

/* =============== Formspree AJAX + popup "Merci" (si présent) =================== */
(function(){
  const form  = document.getElementById('contactForm');
  if(!form) return;

  const endpoint = form.dataset.endpoint;
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

  if(modal){
    modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
    modal.querySelectorAll('.modal__close').forEach(btn => btn.addEventListener('click', closeModal));
  }
})();
