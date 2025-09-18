// Script spécifique à la page Projets

document.addEventListener('DOMContentLoaded', function () {
  // Initialiser AOS (Animate On Scroll)
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quad',
      once: true,
      offset: 50
    });
  }

  // Filtrage des projets
  const filtres = document.querySelectorAll('.btn-filter');
  const projets = document.querySelectorAll('[data-category]');
  
  filtres.forEach(filtre => {
    filtre.addEventListener('click', function() {
      // Retirer la classe active de tous les filtres
      filtres.forEach(f => f.classList.remove('active'));
      // Ajouter la classe active au filtre cliqué
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Afficher/masquer les projets en fonction du filtre
      projets.forEach(projet => {
        if (filterValue === 'all' || projet.getAttribute('data-category').includes(filterValue)) {
          projet.style.display = 'block';
          // Réinitialiser AOS pour les éléments affichés
          if (window.AOS) {
            AOS.refresh();
          }
        } else {
          projet.style.display = 'none';
        }
      });
    });
  });

  // Gestion du modal de détails des projets
  const projetModal = document.getElementById('projetModal');
  const modalContent = document.getElementById('modal-projet-content');
  
  projetModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const projetId = button.getAttribute('data-projet');
    const projet = projetsData[projetId];
    
    if (projet) {
      // Générer le contenu du modal
      let technosHTML = '';
      projet.technos.forEach(techno => {
        technosHTML += `<span class="modal-techno">${techno}</span>`;
      });
      
      let categoriesHTML = '';
      projet.categorie.forEach(cat => {
        categoriesHTML += `<span class="badge bg-primary me-1">${cat}</span>`;
      });
      
      modalContent.innerHTML = `
        <div class="row">
          <div class="col-md-12">
            <div class="d-flex align-items-center mb-3">
              ${categoriesHTML}
            </div>
            <h2 class="mb-3">${projet.titre}</h2>
            <p class="text-secondary">${projet.description}</p>
            
            <div class="modal-technos">
              ${technosHTML}
            </div>
            
            <div class="modal-meta">
              <div class="meta-item">
                <i class="bi bi-calendar"></i>
                <span>${projet.date}</span>
              </div>
              <div class="meta-item">
                <i class="bi bi-building"></i>
                <span>${projet.contexte}</span>
              </div>
            </div>
            
            <div class="projet-details">
              ${projet.details}
            </div>
            
            <div class="mt-4">
              <a href="contact.html" class="btn btn-primary btn-animated">
                <i class="bi bi-chat-dots me-2"></i>Me contacter à propos de ce projet
              </a>
            </div>
          </div>
        </div>
      `;
    }
  });
  
  // Réinitialiser le contenu du modal lorsqu'il est fermé
  projetModal.addEventListener('hidden.bs.modal', function () {
    modalContent.innerHTML = '';
  });
  
  // Animation des cartes au survol
  const projetCards = document.querySelectorAll('.projet-card');
  projetCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});