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

  // Gestion des dropdowns
  const dropdowns = document.querySelectorAll('.navbar .dropdown');
  const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (!toggle) return;

    if (isDesktop()) {
      // Sur desktop: hover seulement
      let hideTimeout;
      
      // Hover sur le bouton pour ouvrir
      toggle.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        openDropdown(dropdown);
      });
      
      // Hover sur le menu lui-même
      const menu = dropdown.querySelector('.dropdown-menu');
      if (menu) {
        menu.addEventListener('mouseenter', () => {
          clearTimeout(hideTimeout);
          openDropdown(dropdown);
        });
        
        menu.addEventListener('mouseleave', () => {
          // Petit délai avant de fermer
          hideTimeout = setTimeout(() => {
            closeDropdown(dropdown);
          }, 150);
        });
      }
      
      // Hover sur le bouton pour fermer
      toggle.addEventListener('mouseleave', (e) => {
        // Vérifier si on va vers le menu
        const relatedTarget = e.relatedTarget;
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!menu || !menu.contains(relatedTarget)) {
          hideTimeout = setTimeout(() => {
            closeDropdown(dropdown);
          }, 150);
        }
      });
      
      // Fermer quand on clique ailleurs
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          closeDropdown(dropdown);
        }
      });
      
    } else {
      // Sur mobile: laisser Bootstrap gérer avec clic
      toggle.setAttribute('data-bs-toggle', 'dropdown');
      
      // Mettre à jour la flèche
      toggle.addEventListener('click', () => {
        setTimeout(() => {
          const expanded = toggle.getAttribute('aria-expanded') === 'true';
          const chevron = dropdown.querySelector('.chevron');
          if (chevron) {
            chevron.style.transform = expanded ? 'rotate(180deg)' : '';
          }
        }, 10);
      });
    }
  });

  // Fonctions helper
  function openDropdown(dropdown) {
    dropdown.classList.add('show');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) {
      menu.classList.add('show');
      menu.style.display = 'block';
    }
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    
    const chevron = dropdown.querySelector('.chevron');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }

  function closeDropdown(dropdown) {
    dropdown.classList.remove('show');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) {
      menu.classList.remove('show');
      menu.style.display = '';
    }
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    
    const chevron = dropdown.querySelector('.chevron');
    if (chevron) chevron.style.transform = '';
  }

  // Active state by URL
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  const navLinks = Array.from(document.querySelectorAll('#mainNav .nav-item-link, #mainNav .dropdown-item, #mainNav .nav-link'));
  
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
    }
  });
});