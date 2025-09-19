# Tutoriel Complet : Ajouter un Projet à la Page "Mes Projets"

## 📋 Table des Matières
1. [Prérequis](#-prérequis)
2. [Étapes pour Ajouter un Projet](#-étapes-pour-ajouter-un-projet)
3. [Personnalisation](#-personnalisation)
4. [Ajouter des Images](#-ajouter-des-images-à-un-projet)
5. [Exemple Complet](#-exemple-complet)
6. [Vérifications Finales](#-vérifications-finales)
7. [Dépannage](#-dépannage)
8. [Structure des Dossiers](#-structure-recommandée-des-dossiers)
9. [Bonnes Pratiques](#-bonnes-pratiques)

---

## 📋 Prérequis

- Connaissances de base en HTML
- Accès aux fichiers de votre site
- Images de votre projet (optionnel mais recommandé)

---

## 📝 Étapes pour Ajouter un Projet

### 1. Préparer les Informations du Projet

Rassemblez toutes les informations nécessaires :
- Titre du projet
- Courte description (1-2 phrases)
- Description détaillée
- Catégories (web, app, database, school)
- Technologies utilisées
- Date de réalisation
- Contexte (projet personnel, académique, professionnel)
- Images (optionnel)

### 2. Modifier le Fichier HTML

Ouvrez le fichier `projets.html` et effectuez les modifications suivantes :

#### a. Ajouter les Données du Projet

Localisez la section avec le commentaire :
```html
<!-- Données des projets (facilement extensible) -->
```

Ajoutez un nouvel objet à l'objet `projetsData` avec un nouvel ID unique :

```javascript
7: {
  titre: "Nom de votre projet",
  categorie: ["web", "school"], // Choisissez parmi: web, app, database, school
  description: "Description courte de votre projet qui apparaîtra sur la carte.",
  details: `
    <p>Description détaillée de votre projet avec mise en forme HTML.</p>
    <p><strong>Fonctionnalités principales :</strong></p>
    <ul>
      <li>Fonctionnalité 1</li>
      <li>Fonctionnalité 2</li>
      <li>Fonctionnalité 3</li>
    </ul>
    <p><strong>Technologies utilisées :</strong> Liste des technologies</p>
    <p>Rétrospective ou apprentissages tirés de ce projet.</p>
  `,
  technos: ["HTML", "CSS", "JavaScript", "PHP"], // Technologies utilisées
  date: "Mai 2024",
  contexte: "Projet académique", // ou "Projet personnel" ou "Stage"
  images: [] // Vous pouvez ajouter des URLs d'images plus tard
}
```

#### b. Créer la Carte du Projet

Localisez la section avec l'ID `grid-projets` et ajoutez une nouvelle carte :

```html
<div class="col-md-6 col-lg-4" data-aos="fade-up" data-category="web school">
  <div class="projet-card card h-100 shadow-sm border-0" 
       data-bs-toggle="modal" 
       data-bs-target="#projetModal" 
       data-projet="7"> <!-- Même ID que dans projetsData -->
    
    <div class="card-img-top projet-image">
      <div class="projet-badges">
        <span class="badge bg-primary">Web</span>
        <span class="badge bg-secondary">School</span>
      </div>
      <div class="image-placeholder">
        <i class="bi bi-globe"></i> <!-- Choisissez une icône appropriée -->
      </div>
    </div>
    
    <div class="card-body">
      <h3 class="h5 mb-2">Nom de votre projet</h3>
      <p class="text-secondary small">Description courte de votre projet.</p>
      <div class="technos">
        <span class="techno-tag">HTML</span>
        <span class="techno-tag">CSS</span>
        <span class="techno-tag">JS</span>
      </div>
    </div>
  </div>
</div>
```

### 3. Modifier le Fichier CSS (Optionnel mais Recommandé)

Pour améliorer la visibilité des titres de projet, ouvrez le fichier `projets.css` et ajoutez cette règle :

```css
.projet-card .card-body h3 {
  color: #e9eef7 !important;
  font-weight: 600;
}
```

---

## 🎨 Personnalisation

### Choix des Catégories
Utilisez ces valeurs pour les catégories :
- `web` → Développement web
- `app` → Applications
- `database` → Bases de données  
- `school` → Projets académiques

### Choix des Icônes
Remplacez `bi-globe` par une icône Bootstrap Icons appropriée :
- `bi-globe` → Sites web
- `bi-phone` → Applications mobiles
- `bi-database` → Bases de données
- `bi-laptop` → Logiciels
- `bi-controller` → Jeux
- `bi-egg-fried` → Projets culinaires
- `bi-cart` → Sites e-commerce
- `bi-chat` → Applications de messagerie

[Voir toutes les icônes Bootstrap](https://icons.getbootstrap.com/)

### Couleurs des Badges
Utilisez ces classes pour les badges :
- `bg-primary` → Bleu (Web)
- `bg-info` → Cyan (Applications)
- `bg-warning text-dark` → Jaune (Bases de données)
- `bg-secondary` → Gris (Projets académiques)
- `bg-success` → Vert (Frontend)
- `bg-danger` → Rouge (Backend)
- `bg-dark` → Noir (Autre)

---

## 🖼️ Ajouter des Images à un Projet

### a. Dans l'Objet Projet
Remplacez le tableau `images` vide par :

```javascript
images: [
  "../assets/img/projets/mon-projet/screenshot1.jpg",
  "../assets/img/projets/mon-projet/screenshot2.jpg"
]
```

### b. Dans la Section Details
Ajoutez le code HTML pour afficher les images :

```html
<div class="row mt-4">
  <div class="col-md-6">
    <img src="../assets/img/projets/mon-projet/screenshot1.jpg" 
         alt="Capture d'écran du projet" class="img-fluid rounded">
  </div>
  <div class="col-md-6">
    <img src="../assets/img/projets/mon-projet/screenshot2.jpg" 
         alt="Deuxième capture d'écran" class="img-fluid rounded">
  </div>
</div>
```

### c. Ajouter des Liens
Dans la section `details`, ajoutez des liens vers le projet :

```html
<div class="mt-4">
  <a href="https://lien-vers-le-projet.com" target="_blank" class="btn btn-outline-light me-2">
    <i class="bi bi-box-arrow-up-right me-1"></i>Voir le projet
  </a>
  <a href="https://github.com/votre-compte/votre-projet" target="_blank" class="btn btn-outline-light">
    <i class="bi bi-github me-1"></i>Code source
  </a>
</div>
```

---

## 💡 Exemple Complet

### Dans projetsData
```javascript
8: {
  titre: "Application de recettes cuisine",
  categorie: ["web", "app"],
  description: "Application web responsive permettant de découvrir et enregistrer des recettes de cuisine.",
  details: `
    <p>Développement d'une application web complète de recettes de cuisine avec système de favoris et recherche avancée.</p>
    
    <p><strong>Fonctionnalités principales :</strong></p>
    <ul>
      <li>Recherche de recettes par ingrédients, difficulté, temps de préparation</li>
      <li>Système de favoris avec stockage local</li>
      <li>Interface responsive adaptée mobile et desktop</li>
      <li>Liste de courses générée automatiquement</li>
    </ul>
    
    <div class="row mt-4">
      <div class="col-md-6">
        <img src="../assets/img/projets/recettes/app-mobile.jpg" 
             alt="Version mobile" class="img-fluid rounded">
      </div>
      <div class="col-md-6">
        <img src="../assets/img/projets/recettes/app-desktop.jpg" 
             alt="Version desktop" class="img-fluid rounded">
      </div>
    </div>
    
    <p class="mt-3"><strong>Technologies utilisées :</strong> React, Node.js, MongoDB, Express</p>
    
    <div class="mt-4">
      <a href="https://mes-recettes.com" target="_blank" class="btn btn-outline-light me-2">
        <i class="bi bi-box-arrow-up-right me-1"></i>Voir l'application
      </a>
      <a href="https://github.com/dootod/app-recettes" target="_blank" class="btn btn-outline-light">
        <i class="bi bi-github me-1"></i>Code source
      </a>
    </div>
  `,
  technos: ["React", "Node.js", "MongoDB", "Express"],
  date: "Juin 2024",
  contexte: "Projet personnel",
  images: [
    "../assets/img/projets/recettes/app-mobile.jpg",
    "../assets/img/projets/recettes/app-desktop.jpg"
  ]
}
```

### Dans la Grille de Projets
```html
<div class="col-md-6 col-lg-4" data-aos="fade-up" data-category="web app">
  <div class="projet-card card h-100 shadow-sm border-0" 
       data-bs-toggle="modal" 
       data-bs-target="#projetModal" 
       data-projet="8">
    
    <div class="card-img-top projet-image">
      <div class="projet-badges">
        <span class="badge bg-primary">Web</span>
        <span class="badge bg-info">Application</span>
      </div>
      <div class="image-placeholder">
        <i class="bi bi-egg-fried"></i>
      </div>
    </div>
    
    <div class="card-body">
      <h3 class="h5 mb-2">Application de recettes cuisine</h3>
      <p class="text-secondary small">Application web responsive permettant de découvrir et enregistrer des recettes.</p>
      <div class="technos">
        <span class="techno-tag">React</span>
        <span class="techno-tag">Node.js</span>
        <span class="techno-tag">MongoDB</span>
      </div>
    </div>
  </div>
</div>
```

---

## 🔍 Vérifications Finales

Après avoir ajouté votre projet, vérifiez que :

1. ✅ L'ID dans `data-projet` correspond à la clé dans `projetsData`
2. ✅ Les catégories dans `data-category` correspondent à celles dans `projetsData`
3. ✅ Les technologies affichées sur la carte correspondent à celles dans `projetsData`
4. ✅ Le titre et la description courte sont identiques
5. ✅ Le projet apparaît correctement dans les filtres
6. ✅ Les images se chargent correctement (si applicable)
7. ✅ Les liens fonctionnent et s'ouvrent dans un nouvel onglet

---

## 🚨 Dépannage

### Le Projet n'Apparaît Pas
- Vérifiez que l'ID dans `data-projet` correspond exactement à la clé dans `projetsData`
- Assurez-vous qu'il n'y a pas d'erreurs JavaScript dans la console du navigateur (F12)

### Le Modal ne s'Affiche Pas Correctement
- Vérifiez que toutes les propriétés de l'objet projet sont correctement définies
- Assurez-vous que les guillemets et apostrophes sont correctement fermés
- Vérifiez que les balises HTML dans la section `details` sont bien formées

### Le Projet n'Apparaît Pas dans les Filtres
- Vérifiez que les catégories dans `data-category` correspondent à celles dans `projetsData.categorie`
- Assurez-vous que les valeurs sont séparées par un espace (ex: `data-category="web app"`)

### Les Images ne s'Affichent Pas
- Vérifiez le chemin d'accès aux images
- Assurez-vous que les images existent à l'emplacement spécifié
- Vérifiez la casse des noms de fichiers (sensible sur certains serveurs)

### Erreurs de Console JavaScript
- Ouvrez la console développeur (F12)
- Corrigez les erreurs mentionnées (souvent des fautes de syntaxe)

---

## 📁 Structure Recommandée des Dossiers

Pour organiser vos images de projets, créez cette structure de dossiers :

```
assets/
  img/
    projets/
      projet-1/
        screenshot1.jpg
        screenshot2.jpg
        logo.png
      projet-2/
        screenshot1.jpg
        screenshot2.jpg
      recettes/
        app-mobile.jpg
        app-desktop.jpg
      ...
```

Cette organisation vous permettra de :
1. Retrouver facilement les images de chaque projet
2. Maintenir une structure claire et organisée
3. Éviter les conflits de noms de fichiers
4. Faciliter les sauvegardes et transferts

---

## 🔄 Bonnes Pratiques

1. **Sauvegardez toujours** une copie de vos fichiers avant de les modifier
2. **Testez systématiquement** après chaque ajout pour vérifier que tout fonctionne
3. **Utilisez des IDs séquentiels** pour éviter les conflits (7, 8, 9, etc.)
4. **Optimisez vos images** avant de les ajouter pour améliorer les performances :
   - Réduisez la taille des fichiers sans perte de qualité notable
   - Utilisez des formats modernes comme WebP quand c'est possible
   - Redimensionnez les images aux dimensions d'affichage réelles
5. **Vérifiez les liens** pour vous assurer qu'ils fonctionnent correctement
6. **Utilisez des textes alternatifs** descriptifs pour les images (attribut `alt`)
7. **Maintenez une cohérence** dans la structure et le style des descriptions
8. **Documentez vos ajouts** avec des commentaires dans le code si nécessaire

---

## 📝 Template de Description de Projet

Pour vous aider à structurer vos descriptions, voici un template :

```html
<p>[Introduction et contexte du projet]</p>

<p><strong>Fonctionnalités principales :</strong></p>
<ul>
  <li>Fonctionnalité 1</li>
  <li>Fonctionnalité 2</li>
  <li>Fonctionnalité 3</li>
</ul>

<p><strong>Défis techniques :</strong></p>
<ul>
  <li>Défi 1 et solution apportée</li>
  <li>Défi 2 et solution apportée</li>
</ul>

<p><strong>Technologies utilisées :</strong> [Liste des technologies]</p>

<p>[Rétrospective ou apprentissages tirés de ce projet]</p>
```