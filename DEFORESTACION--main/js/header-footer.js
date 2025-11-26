// js/header-footer.js
// Pequeño script para mejorar header/footer: marca enlace activo y asegure año en footer.
(function(){
  try{
    // active link
    const current = location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.navbar .nav-link');
    links.forEach(a => {
      const href = a.getAttribute('href');
      if(!href) return;
      if(href === current || (href === 'index.html' && current === '')) {
        a.classList.add('active');
      }
    });
  }catch(e){ console.warn('hf active:', e); }

  try{
    // year fallback
    const y = document.getElementById('year');
    if(y && !y.textContent.trim()) y.textContent = new Date().getFullYear();
  }catch(e){ console.warn('hf year:', e); }
})();
