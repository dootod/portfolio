// Script spécifique à la page Contact

document.addEventListener('DOMContentLoaded', function () {
  // Initialiser AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-out-quad',
    once: true,
    offset: 50
  });

  // Effet de survol pour les cartes de contact
  const contactCards = document.querySelectorAll('.contact-method-card');
  contactCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // Animation des icônes de contact
  animateContactIcons();

  function animateContactIcons() {
    const contactIcons = document.querySelectorAll('.contact-icon');
    contactIcons.forEach((icon, index) => {
      setTimeout(() => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';

        setTimeout(() => {
          icon.style.transition = 'all 0.5s ease';
          icon.style.opacity = '1';
          icon.style.transform = 'translateY(0)';
        }, 100);
      }, index * 200);
    });
  }
});