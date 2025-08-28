(function () {
  const dialog = document.getElementById('lightbox');
  if (!dialog) return;
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-cap');
  const closeBtn = dialog.querySelector('.lb-close');

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-lg]');
    if (!a) return;
    e.preventDefault();
    const fig = a.closest('figure');
    const caption = fig?.querySelector('figcaption')?.textContent || '';
    img.src = a.getAttribute('href');
    img.alt = fig?.querySelector('img')?.alt || '';
    cap.textContent = caption;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  });

  closeBtn.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    const rect = img.getBoundingClientRect();
    const clickedOutside = e.clientY < rect.top || e.clientY > rect.bottom || e.clientX < rect.left || e.clientX > rect.right;
    if (clickedOutside) dialog.close();
  });
})();
