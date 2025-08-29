// Menu mobile
const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
if(toggleBtn && nav){
  toggleBtn.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', open ? 'true':'false');
  });
}

// Dark mode toggle (persist)
const themeBtn = document.querySelector('.theme-toggle');
if(themeBtn){
  const apply = mode => document.documentElement.dataset.theme = mode;
  const saved = localStorage.getItem('theme');
  if(saved) apply(saved);
  themeBtn.addEventListener('click', ()=>{
    const cur = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    apply(cur);
    localStorage.setItem('theme', cur);
  });
}

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
