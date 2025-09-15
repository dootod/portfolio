document.addEventListener('DOMContentLoaded', function () {
  // AOS animations
  if (window.AOS) {
    AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic', offset: 80 });
  }

  // Bootstrap tooltips
  const tooltipTriggers = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggers.forEach(function (el) { new bootstrap.Tooltip(el); });

  // Dynamic year
  const yearSpan = document.getElementById('year');
  if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

  // Navbar scrolled state
  const nav = document.getElementById('mainNav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Dropdown: open on hover for desktop, keep click on mobile
  const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;
  const dropdowns = document.querySelectorAll('.navbar .dropdown');
  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector('[data-bs-toggle="dropdown"]');
    const menu = dd.querySelector('.dropdown-menu');
    if (!toggle || !menu) return;

    // Hover handlers
    dd.addEventListener('mouseenter', () => {
      if (!isDesktop()) return;
      const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
      bsDropdown.show();
    });
    dd.addEventListener('mouseleave', () => {
      if (!isDesktop()) return;
      const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
      bsDropdown.hide();
    });

    // Mobile: click-only, ensure chevron follows state
    toggle.addEventListener('click', () => {
      setTimeout(() => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        if (expanded) dd.classList.add('show');
        else dd.classList.remove('show');
      }, 0);
    });
  });

  // Ink bar logic
  const navInk = document.getElementById('navInk');
  const navEl = document.getElementById('mainNav');
  function moveInkTo(el) {
    if (!navInk || !el) return;
    const rect = el.getBoundingClientRect();
    const containerRect = navEl.querySelector('.container').getBoundingClientRect();
    navInk.style.width = rect.width + 'px';
    navInk.style.left = rect.left - containerRect.left + 'px';
  }

  const navLinks = Array.from(document.querySelectorAll('#mainNav .nav-item-link, #mainNav .dropdown-item, #mainNav .nav-link'));
  // Active state by URL
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const file = href.split('#')[0];
    const isIndex = (currentPath === '' || currentPath === 'index.html') && (file === '' || file === 'index.html' || href.includes('#accueil'));
    if (isIndex || currentPath === file) {
      if (link.classList.contains('dropdown-item')) {
        link.classList.add('active');
        const parentToggle = link.closest('.dropdown')?.querySelector('.nav-item-link, .nav-link');
        if (parentToggle) parentToggle.classList.add('active');
      } else {
        link.classList.add('active');
      }
      moveInkTo(link);
    }
    // Hover move
    link.addEventListener('mouseenter', () => { moveInkTo(link); });
  });
  // Return ink to active on leave container
  const navContainer = document.querySelector('#mainNav .container');
  function resetInkToActive() {
    const active = document.querySelector('#mainNav .nav-link.active, #mainNav .nav-item-link.active');
    if (active) moveInkTo(active);
    else {
      const first = document.querySelector('#mainNav .nav-item-link, #mainNav .nav-link');
      if (first) moveInkTo(first);
    }
  }
  navContainer?.addEventListener('mouseleave', resetInkToActive);
  // Also reset on resize (handles mobile collapse)
  window.addEventListener('resize', resetInkToActive);
  resetInkToActive();
});