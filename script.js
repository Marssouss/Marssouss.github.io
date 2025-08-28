// Année dynamique + dark/light auto (préférence utilisateur)
document.getElementById('year').textContent = new Date().getFullYear();

const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
if (prefersLight) document.documentElement.classList.add('light');

document.getElementById('themeToggle').addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
});

// Restaurer thème sauvegardé
const saved = localStorage.getItem('theme');
if (saved) {
  document.documentElement.classList.toggle('light', saved === 'light');
}
