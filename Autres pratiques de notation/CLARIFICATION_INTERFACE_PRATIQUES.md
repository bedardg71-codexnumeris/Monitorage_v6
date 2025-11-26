# Clarification : Interface de gestion des pratiques

**Date :** 25 novembre 2025  
**Pour :** Claude Code  
**Sujet :** Modification du design de l'interface des pratiques

---

## 🎯 Objectif utilisateur

Grégoire veut pouvoir :
1. **Garder ses cours existants avec PAN-Maîtrise** (cours en production, semaine 13)
2. **Créer un cours "test" avec la pratique de Bruno** pour l'explorer
3. **Comparer les deux pratiques en parallèle** sans risque

---

## ❌ Problème avec le design initial

Le concept de pratique **"ACTIVE"** suggère qu'une seule pratique est active globalement pour toute l'application.

**Conséquence non souhaitée :**
```
[Changer pratique active vers "PAN-Standards Bruno"]
    ↓
TOUS les cours basculent vers cette pratique
    ↓
Le cours de Littérature 101 en production utilise maintenant
la pratique de Bruno au lieu de PAN-Maîtrise
    ↓
💥 DÉSASTRE en pleine session
```

---

## ✅ Solution : Association pratique ↔ cours

### Principe

Chaque cours est **lié à UNE pratique spécifique** :

```
Cours "Littérature 101 (A25)" → Pratique: PAN-Maîtrise
Cours "Test Bruno"            → Pratique: PAN-Standards (Bruno)
Cours "Exploration sommative" → Pratique: Sommative classique
```

### Fonctionnement

1. **À la création d'un cours**, l'utilisateur choisit quelle pratique utiliser
2. **Un cours existant garde toujours sa pratique** (sauf changement explicite)
3. **On peut avoir plusieurs cours avec des pratiques différentes** simultanément

---

## 🔧 Modifications requises

### 1. IndexedDB : Store `cours`

```javascript
// AJOUTER le champ `pratiqueId` dans chaque cours
{
  id: "601-101-AH-A25",
  nom: "Littérature et imaginaire",
  session: "Automne 2025",
  pratiqueId: "pan-maitrise-gregoire", // ← NOUVEAU CHAMP
  // ... autres champs existants
}
```

### 2. Interface : Section 1 - Liste des pratiques

**Remplacer le badge [ACTIVE] par des informations d'usage :**

```html
┌─────────────────────────────────────────────────┐
│ PAN-Maîtrise (IDME 4 niveaux)                   │
│ Grégoire Bédard · Littérature                   │
│                                                  │
│ 📊 Utilisée par : 1 cours                       │
│     • Littérature 101 (A25)                     │
│                                                  │
│ [PAR DÉFAUT] ← Badge si pratique par défaut    │
│                                                  │
│ [Éditer] [Définir par défaut] [Exporter] [...]  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ PAN-Standards (5 niveaux)                       │
│ Bruno Voisard · Chimie                          │
│                                                  │
│ 📊 Utilisée par : 0 cours                       │
│                                                  │
│ [Éditer] [Définir par défaut] [Exporter] [...]  │
└─────────────────────────────────────────────────┘
```

**Affichage dynamique :**
- Si pratique utilisée par ≥1 cours : afficher la liste des cours
- Si pratique non utilisée : "Utilisée par : 0 cours"
- Le bouton "Supprimer" est **désactivé** si pratique utilisée par ≥1 cours

### 3. Concept de "Pratique par défaut"

Une pratique peut être marquée comme "par défaut" pour simplifier la création de nouveaux cours.

**Fonctionnement :**
- Une seule pratique peut être "par défaut" à la fois
- Lors de la création d'un cours, la pratique par défaut est **présélectionnée** (mais modifiable)
- L'utilisateur peut changer la pratique par défaut via le bouton "Définir par défaut"

**Stockage IndexedDB :**

```javascript
// Store : pratiques
{
  id: "pan-maitrise-gregoire",
  nom: "PAN-Maîtrise (IDME 4 niveaux)",
  auteur: "Grégoire Bédard",
  par_defaut: true, // ← NOUVEAU CHAMP (une seule pratique avec true)
  config: { /* ... */ }
}
```

### 4. Interface : Création/modification d'un cours

**Formulaire de création de cours (existant à modifier) :**

```html
<div class="formulaire-cours">
  <label>
    Nom du cours *
    <input type="text" id="nom-cours" placeholder="Ex: Littérature 101">
  </label>
  
  <label>
    Session
    <input type="text" id="session-cours" placeholder="Ex: Automne 2025">
  </label>
  
  <!-- NOUVEAU CHAMP -->
  <label>
    Pratique d'évaluation *
    <select id="pratique-cours">
      <option value="pan-maitrise-gregoire" selected>
        PAN-Maîtrise (IDME 4 niveaux) [PAR DÉFAUT]
      </option>
      <option value="pan-standards-bruno">
        PAN-Standards (5 niveaux) - Bruno Voisard
      </option>
      <option value="sommative-classique">
        Sommative traditionnelle
      </option>
      <!-- ... autres pratiques -->
    </select>
    <small>
      La pratique par défaut est présélectionnée. Vous pouvez en choisir une autre.
    </small>
  </label>
  
  <!-- ... autres champs existants -->
  
  <button onclick="creerCours()">Créer le cours</button>
</div>
```

**Modification d'un cours existant :**

```html
<!-- Dans l'interface d'édition de cours -->
<label>
  Pratique d'évaluation actuelle
  <select id="pratique-cours-modifier">
    <option value="pan-maitrise-gregoire" selected>
      PAN-Maîtrise (IDME 4 niveaux)
    </option>
    <!-- ... -->
  </select>
  
  ⚠️ <strong>Attention :</strong> Changer la pratique peut affecter 
  les calculs de notes et l'affichage des évaluations existantes.
</label>
```

### 5. API JavaScript : Récupérer la pratique d'un cours

**Nouvelle fonction dans `pratiques.js` :**

```javascript
/**
 * Obtient la pratique associée à un cours
 * @param {string} coursId - ID du cours
 * @returns {PratiqueEvaluation} Instance de la pratique
 */
async function getPratiqueCours(coursId) {
  const cours = await db.get(`cours-${coursId}`);
  
  if (!cours || !cours.pratiqueId) {
    // Fallback : utiliser pratique par défaut
    console.warn(`Cours ${coursId} n'a pas de pratique définie, utilisation de la pratique par défaut`);
    return await PratiqueManager.chargerPratiqueParDefaut();
  }
  
  const pratiques = await db.get('pratiques', []);
  const pratiqueData = pratiques.find(p => p.id === cours.pratiqueId);
  
  if (!pratiqueData) {
    throw new Error(`Pratique introuvable : ${cours.pratiqueId}`);
  }
  
  return new PratiqueEvaluation(pratiqueData.config);
}
```

**Utilisation dans les modules :**

```javascript
// AVANT (dans evaluation.js, profil-etudiant.js, etc.)
const pratique = await PratiqueManager.chargerPratiqueActive();

// APRÈS
const coursId = getCurrentCoursId(); // Fonction existante qui retourne l'ID du cours actif
const pratique = await getPratiqueCours(coursId);
```

### 6. API JavaScript : Gérer la pratique par défaut

**Nouvelles méthodes dans `PratiqueManager` :**

```javascript
const PratiqueManager = {
  // ... méthodes existantes
  
  /**
   * Charge la pratique par défaut
   */
  async chargerPratiqueParDefaut() {
    const pratiques = await db.get('pratiques', []);
    const pratiqueDefaut = pratiques.find(p => p.par_defaut === true);
    
    if (!pratiqueDefaut) {
      // Aucune pratique par défaut, prendre la première
      if (pratiques.length === 0) {
        await this.initialiserPratiqueParDefaut();
        return await this.chargerPratiqueParDefaut();
      }
      return new PratiqueEvaluation(pratiques[0].config);
    }
    
    return new PratiqueEvaluation(pratiqueDefaut.config);
  },
  
  /**
   * Définit une pratique comme pratique par défaut
   * @param {string} pratiqueId - ID de la pratique
   */
  async definirPratiqueParDefaut(pratiqueId) {
    const pratiques = await db.get('pratiques', []);
    
    // Désactiver "par défaut" pour toutes les pratiques
    for (const pratique of pratiques) {
      pratique.par_defaut = false;
    }
    
    // Activer "par défaut" pour la pratique choisie
    const pratique = pratiques.find(p => p.id === pratiqueId);
    if (!pratique) {
      throw new Error(`Pratique introuvable : ${pratiqueId}`);
    }
    pratique.par_defaut = true;
    
    await db.set('pratiques', pratiques);
    
    console.log(`Pratique par défaut définie : ${pratique.nom}`);
  },
  
  /**
   * Liste les cours utilisant une pratique donnée
   * @param {string} pratiqueId - ID de la pratique
   * @returns {Array} Tableau des cours
   */
  async getCoursUtilisantPratique(pratiqueId) {
    const tousLesCours = await db.get('cours', []); // À adapter selon votre structure
    return tousLesCours.filter(cours => cours.pratiqueId === pratiqueId);
  }
};
```

### 7. Validation avant suppression

**Empêcher la suppression d'une pratique utilisée :**

```javascript
async function supprimerPratique(pratiqueId) {
  // Vérifier si la pratique est utilisée
  const coursUtilisant = await PratiqueManager.getCoursUtilisantPratique(pratiqueId);
  
  if (coursUtilisant.length > 0) {
    const nomsCoursUtilisant = coursUtilisant.map(c => c.nom).join(', ');
    afficherErreur(
      `Impossible de supprimer cette pratique`,
      `Elle est utilisée par ${coursUtilisant.length} cours : ${nomsCoursUtilisant}. ` +
      `Veuillez d'abord changer la pratique de ces cours ou les supprimer.`
    );
    return;
  }
  
  // Demander confirmation
  if (!confirm(`Êtes-vous sûr de vouloir supprimer cette pratique ? Cette action est irréversible.`)) {
    return;
  }
  
  // Supprimer
  const pratiques = await db.get('pratiques', []);
  const index = pratiques.findIndex(p => p.id === pratiqueId);
  if (index !== -1) {
    pratiques.splice(index, 1);
    await db.set('pratiques', pratiques);
    afficherNotification('Pratique supprimée avec succès');
    rafraichirListePratiques();
  }
}
```

---

## 📋 Checklist d'implémentation

### Modifications de données

- [ ] Ajouter champ `pratiqueId` dans store `cours`
- [ ] Ajouter champ `par_defaut` dans store `pratiques`
- [ ] Créer fonction `getPratiqueCours(coursId)`
- [ ] Créer fonction `chargerPratiqueParDefaut()`
- [ ] Créer fonction `definirPratiqueParDefaut(pratiqueId)`
- [ ] Créer fonction `getCoursUtilisantPratique(pratiqueId)`

### Interface - Liste des pratiques

- [ ] Remplacer badge [ACTIVE] par badge [PAR DÉFAUT]
- [ ] Afficher "Utilisée par : X cours" avec liste des cours
- [ ] Ajouter bouton "Définir par défaut"
- [ ] Désactiver bouton "Supprimer" si pratique utilisée
- [ ] Afficher compteur de cours pour chaque pratique

### Interface - Création/modification cours

- [ ] Ajouter sélecteur de pratique dans formulaire création
- [ ] Présélectionner la pratique par défaut
- [ ] Permettre modification de pratique pour cours existant
- [ ] Afficher avertissement lors du changement de pratique

### Modules existants

- [ ] Remplacer `PratiqueManager.chargerPratiqueActive()` par `getPratiqueCours(coursId)` dans :
  - [ ] `evaluation.js`
  - [ ] `profil-etudiant.js`
  - [ ] `echelles.js`
  - [ ] `grilles.js`
  - [ ] `productions.js`
  - [ ] (tous les autres modules utilisant la pratique)

### Validation et sécurité

- [ ] Empêcher suppression pratique si utilisée par ≥1 cours
- [ ] Validation lors changement de pratique d'un cours
- [ ] Migration automatique : ajouter `pratiqueId` aux cours existants (utiliser pratique par défaut)

---

## 🧪 Scénarios de test

### Test 1 : Création de cours avec pratiques différentes

1. Créer cours "Littérature 101" avec pratique PAN-Maîtrise
2. Créer cours "Test Bruno" avec pratique PAN-Standards (Bruno)
3. Vérifier que les deux cours fonctionnent indépendamment
4. Vérifier que changer de cours charge la bonne pratique

### Test 2 : Gestion pratique par défaut

1. Définir PAN-Maîtrise comme pratique par défaut
2. Créer un nouveau cours → vérifier qu'il est présélectionné
3. Changer la pratique par défaut vers PAN-Standards
4. Créer un nouveau cours → vérifier que PAN-Standards est présélectionné
5. Vérifier que les cours existants gardent leur pratique

### Test 3 : Protection contre suppression

1. Créer un cours avec pratique PAN-Maîtrise
2. Essayer de supprimer PAN-Maîtrise → doit être bloqué
3. Changer la pratique du cours vers une autre
4. Supprimer PAN-Maîtrise → doit fonctionner

### Test 4 : Migration données existantes

1. Avoir des cours existants sans champ `pratiqueId`
2. Charger un cours → doit utiliser pratique par défaut
3. Sauvegarder le cours → doit ajouter `pratiqueId`

---

## 🎯 Résultat attendu

**Grégoire pourra :**
1. ✅ Garder son cours Littérature 101 avec PAN-Maîtrise intact
2. ✅ Créer un cours "Test" avec la pratique de Bruno
3. ✅ Naviguer entre les deux cours et voir les différences
4. ✅ Explorer d'autres pratiques (sommative, spécifications) dans de nouveaux cours tests
5. ✅ Tout cela **sans risque** pour ses cours en production

**Interface claire :**
- Badge [PAR DÉFAUT] au lieu de [ACTIVE]
- Compteur "Utilisée par : X cours" pour chaque pratique
- Protection contre suppressions accidentelles
- Sélection de pratique lors de la création de cours

---

*Document créé le 25 novembre 2025*  
*Pour clarification du design de l'interface des pratiques*
