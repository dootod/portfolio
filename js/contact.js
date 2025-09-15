// Script spécifique à la page Contact

document.addEventListener('DOMContentLoaded', function() {
  // Initialiser AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-out-quad',
    once: true,
    offset: 50
  });

  // Validation du formulaire de contact
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      // Simulation d'envoi
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const submitText = submitBtn.querySelector('.submit-text');
      const loadingText = submitBtn.querySelector('.loading-text');
      
      submitText.classList.add('d-none');
      loadingText.classList.remove('d-none');
      submitBtn.disabled = true;
      
      // Simuler un délai d'envoi
      setTimeout(() => {
        // Ici, vous intégrerez votre solution d'envoi d'email (Formspree, EmailJS, etc.)
        showNotification('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
        
        submitText.classList.remove('d-none');
        loadingText.classList.add('d-none');
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2000);
    });
  }

  // Fonction de validation du formulaire
  function validateForm() {
    let isValid = true;
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');
    
    // Validation prénom
    if (!firstName.value.trim()) {
      showError(firstName, 'Veuillez renseigner votre prénom.');
      isValid = false;
    } else {
      clearError(firstName);
    }
    
    // Validation nom
    if (!lastName.value.trim()) {
      showError(lastName, 'Veuillez renseigner votre nom.');
      isValid = false;
    } else {
      clearError(lastName);
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
      showError(email, 'Veuillez renseigner un email valide.');
      isValid = false;
    } else {
      clearError(email);
    }
    
    // Validation sujet
    if (!subject.value) {
      showError(subject, 'Veuillez sélectionner un sujet.');
      isValid = false;
    } else {
      clearError(subject);
    }
    
    // Validation message
    if (!message.value.trim()) {
      showError(message, 'Veuillez écrire votre message.');
      isValid = false;
    } else {
      clearError(message);
    }
    
    // Validation consentement
    if (!consent.checked) {
      showError(consent, 'Vous devez accepter avant de soumettre.');
      isValid = false;
    } else {
      clearError(consent);
    }
    
    return isValid;
  }

  // Fonctions d'affichage d'erreur
  function showError(input, message) {
    const formControl = input.closest('.form-control') || input.closest('.form-select') || input.closest('.form-check');
    formControl.classList.add('is-invalid');
    
    let feedback = formControl.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.textContent = message;
    }
  }

  function clearError(input) {
    const formControl = input.closest('.form-control') || input.closest('.form-select') || input.closest('.form-check');
    formControl.classList.remove('is-invalid');
  }

  // Fonction de notification
  function showNotification(message, type = 'success') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Afficher avec une animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Cacher après 5 secondes
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  // Effet de survol pour les cartes de contact
  const contactCards = document.querySelectorAll('.contact-method-card');
  contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Effet de saisie pour le formulaire
  const formInputs = document.querySelectorAll('.form-control, .form-select, .form-check-input');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
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

  // Effet de saisie automatique pour le champ message (optionnel)
  const messageField = document.getElementById('message');
  if (messageField) {
    const placeholderText = "Décrivez votre projet, posez-moi une question ou proposez-moi une opportunité...";
    let index = 0;
    
    messageField.addEventListener('focus', function() {
      if (this.getAttribute('data-typing') === 'true') return;
      
      this.setAttribute('data-typing', 'true');
      this.setAttribute('placeholder', '');
      
      function typeWriter() {
        if (index < placeholderText.length) {
          messageField.setAttribute('placeholder', placeholderText.substring(0, index + 1));
          index++;
          setTimeout(typeWriter, 50);
        }
      }
      
      typeWriter();
    });
    
    messageField.addEventListener('blur', function() {
      this.removeAttribute('data-typing');
      this.setAttribute('placeholder', "Votre message...");
      index = 0;
    });
  }
});

// Styles pour les notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  .notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: rgba(19, 28, 59, 0.95);
    border-left: 4px solid #51cf66;
    color: #fff;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 350px;
  }
  
  .notification.error {
    border-left-color: #ff6b6b;
  }
  
  .notification.show {
    transform: translateX(0);
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .notification-content i {
    font-size: 1.2rem;
  }
  
  .notification.success .notification-content i {
    color: #51cf66;
  }
  
  .notification.error .notification-content i {
    color: #ff6b6b;
  }
  
  @media (max-width: 768px) {
    .notification {
      top: auto;
      bottom: 20px;
      right: 20px;
      left: 20px;
      max-width: none;
    }
  }
`;

document.head.appendChild(notificationStyles);