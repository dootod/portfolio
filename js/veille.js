// Script spécifique à la page Veille Technologique

document.addEventListener('DOMContentLoaded', function () {
  // Initialiser AOS
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quad',
      once: true,
      offset: 50
    });
  }

  // Animation des cartes de rubriques au survol
  const rubriqueCards = document.querySelectorAll('.rubrique-card');
  rubriqueCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // Animation des cartes d'outils
  const outilCards = document.querySelectorAll('.outil-card');
  outilCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // Animation des cartes de sites
  const siteCards = document.querySelectorAll('.site-card');
  siteCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // Animation des liens de sites
  const siteLinks = document.querySelectorAll('.site-link');
  siteLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.style.transform = 'translateX(3px)';
    });

    link.addEventListener('mouseleave', function () {
      this.style.transform = 'translateX(0)';
    });
  });

  // Animation des détails de méthode
  const methodDetails = document.querySelectorAll('.method-detail');
  methodDetails.forEach(detail => {
    detail.addEventListener('mouseenter', function () {
      this.style.borderColor = 'rgba(91, 141, 239, 0.4)';
      this.style.transform = 'translateY(-2px)';
    });

    detail.addEventListener('mouseleave', function () {
      this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      this.style.transform = 'translateY(0)';
    });
  });
});