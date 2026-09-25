/* ═══════════════════════════════════════
   CORPO VIVO — main.js
   Menu mobile · active state
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Menu mobile ── */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // fecha ao clicar em link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    // fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  /* ── Active state no nav ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Nav sombra ao rolar ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(29,58,63,0.08)'
        : 'none';
    }, { passive: true });
  }

})();

/* ═══════════════════════════════════════
   Submenus (Corpo, Ciência)
   Computador: abre ao passar o mouse ou pela setinha
   Celular: abre e fecha pela setinha
   ═══════════════════════════════════════ */
(function () {
  'use strict';

  var itens = document.querySelectorAll('.tem-sub');
  if (!itens.length) return;

  function fechar(exceto) {
    itens.forEach(function (item) {
      if (item === exceto) return;
      item.classList.remove('aberto');
      var b = item.querySelector('.sub-toggle');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }

  itens.forEach(function (item) {
    var botao = item.querySelector('.sub-toggle');
    if (!botao) return;
    botao.addEventListener('click', function (e) {
      e.stopPropagation();
      var abrir = !item.classList.contains('aberto');
      fechar(item);
      item.classList.toggle('aberto', abrir);
      botao.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    });
    // destaca o item principal quando a página atual está no submenu
    if (item.querySelector('.submenu a.active')) {
      var principal = item.querySelector(':scope > a');
      if (principal) principal.classList.add('active-pai');
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.tem-sub')) fechar(null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fechar(null);
  });
})();
