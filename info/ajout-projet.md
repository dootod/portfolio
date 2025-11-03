# 📖 Guide pour ajouter un Modal de Projet

## 🎯 Structure de base d'un nouveau projet

### 1. Ajouter la carte dans la grille HTML

```html
<div class="col-md-6 col-lg-4" data-aos="fade-up" data-category="web school">
    <div class="projet-card card h-100 shadow-sm border-0" data-bs-toggle="modal"
        data-bs-target="#projetModal" data-projet="NUMERO_DU_PROJET">
        <div class="card-img-top projet-image">
            <div class="projet-badges">
                <span class="badge bg-primary">Web</span>
                <span class="badge bg-secondary">School</span>
            </div>
            <img src="../img/modal/NOM_IMAGE.png" alt="Description du projet">
        </div>
        <div class="card-body">
            <h3 class="h5 mb-2">NOM DU PROJET</h3>
            <p class="text-secondary small">Description courte du projet.</p>
            <div class="technos">
                <span class="techno-tag">HTML</span>
                <span class="techno-tag">CSS</span>
                <span class="techno-tag">JS</span>
            </div>
        </div>
    </div>
</div>
```

### 2. Ajouter les données dans le JavaScript

Dans la section `<script>` de `projets.html`, ajoutez :

```javascript
NUMERO_DU_PROJET: {
    titre: "NOM DU PROJET",
    categorie: ["Web", "Projet académique"],
    description: "Description courte du projet.",
    details: `
        <div class="modal-projet-img">
            <img src="../img/modal/NOM_IMAGE.png" alt="NOM DU PROJET" class="img-fluid rounded">
        </div>
        <p>Description détaillée du projet.</p>
        <p><strong>Fonctionnalités principales :</strong></p>
        <ul>
            <li>Fonctionnalité 1</li>
            <li>Fonctionnalité 2</li>
            <li>Fonctionnalité 3</li>
        </ul>
        <p><strong>Technologies utilisées :</strong> HTML5, CSS3, JavaScript</p>
        <p>Ce que vous avez appris avec ce projet.</p>
        <a href="LIEN_DU_PROJET" target="_blank" class="btn btn-primary btn-animated me-2">
            <i class="bi bi-link me-2"></i>Voir le projet
        </a>
        <a href="contact.html" class="btn btn-outline-light btn-animated">
            <i class="bi bi-chat-dots me-2"></i>En savoir plus
        </a>
    `,
    technos: ["HTML", "CSS", "JavaScript"],
    date: "Mois Année",
    contexte: "Type de projet (Stage, Personnel, Académique)",
    images: ["../img/modal/NOM_IMAGE.png"]
},
```

## 📝 Champs à personnaliser

- **`NUMERO_DU_PROJET`** : Numéro unique (2, 3, 4...)
- **`NOM_DU_PROJET`** : Titre de votre projet
- **`NOM_IMAGE.png`** : Nom de votre image
- **`data-category`** : Catégories (web, app, database, school)
- **`technos`** : Liste des technologies utilisées
- **`LIEN_DU_PROJET`** : URL vers le projet en ligne ou GitHub

## 🗂️ Organisation des fichiers

Placez vos images dans : `img/modal/`
```
img/
└── modal/
    ├── 1.png
    ├── 2.png
    ├── 3.png
    └── ...
```

## 🏷️ Catégories disponibles

- `web` → Développement Web
- `app` → Applications
- `database` → Bases de données
- `school` → Projets académiques

## 💡 Exemple complet

```html
<!-- Dans la grille HTML -->
<div class="col-md-6 col-lg-4" data-aos="fade-up" data-category="web app">
    <div class="projet-card card h-100 shadow-sm border-0" data-bs-toggle="modal"
        data-bs-target="#projetModal" data-projet="2">
        <div class="card-img-top projet-image">
            <div class="projet-badges">
                <span class="badge bg-primary">Web</span>
                <span class="badge bg-success">App</span>
            </div>
            <img src="../img/modal/mon-projet.png" alt="Mon Application">
        </div>
        <div class="card-body">
            <h3 class="h5 mb-2">Mon Application</h3>
            <p class="text-secondary small">Application de gestion moderne.</p>
            <div class="technos">
                <span class="techno-tag">React</span>
                <span class="techno-tag">Node.js</span>
                <span class="techno-tag">MongoDB</span>
            </div>
        </div>
    </div>
</div>
```

Et le JavaScript correspondant. Le modal se génère automatiquement ! 🚀