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
