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

  // Animation des cartes au survol
  const themeCards = document.querySelectorAll('.veille-theme-card');
  themeCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // Animation des articles
  const articleCards = document.querySelectorAll('.article-card');
  articleCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // Animation des liens d'articles
  const articleLinks = document.querySelectorAll('.article-link');
  articleLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.style.transform = 'translateX(3px)';
    });

    link.addEventListener('mouseleave', function () {
      this.style.transform = 'translateX(0)';
    });
  });
});