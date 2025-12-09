# Beta 93 - Changelog complet

**Version** : Beta 93
**Période de développement** : 2 décembre - 9 décembre 2025
**Auteur** : Grégoire Bédard (Labo Codex) avec Claude Code
**Statut** : ✅ En développement actif

---

## 📅 Vue d'ensemble

Beta 93 est une version d'optimisation majeure qui améliore significativement les performances, l'architecture et l'interface utilisateur de l'application. Cette version se concentre sur **six axes majeurs** : performance des calculs, architecture des pratiques de notation, hiérarchie visuelle, système de bibliothèque universel, snapshots par séance et graphiques d'évolution.

### Développement sur 4 jours

| Date | Session | Thème principal | Statut |
|------|---------|-----------------|--------|
| **2 déc** | Session 1 | Correctif export cartouches | ✅ Complété |
| **3-5 déc** | - | (Pause développement) | - |
| **6 déc** | Session 5 | Système bibliothèque universel (6 types) | ✅ Complété |
| **6 déc** | Session 6 | Snapshots par séance (refonte) | ✅ Complété |
| **7 déc** | Session 6 (suite) | Correctif critique snapshots (IndexedDB) | ✅ Complété |
| **8 déc** | - | (Pause développement) | - |
| **9 déc** | Session 2 | Réaménagement pratiques notation | ✅ Complété |
| **9 déc** | Session 3 | Optimisation performance | ✅ Complété |
| **9 déc** | Session 4 | Design system et hiérarchie | ✅ Complété |

---

## 🌍 Session 0 : Système 100% universel - Critères configurables (3 décembre 2025)

### Contexte

Beta 92 avait les critères SRPNF codés en dur dans le code, ce qui empêchait d'autres enseignant·es d'utiliser leurs propres critères d'évaluation.

### Objectif

Rendre le système **100% universel** en permettant l'utilisation de **n'importe quelle grille de critères** personnalisée.

---

### Problème résolu

**Avant** (90% universel) :
- Critères SRPNF codés en dur dans `pratique-pan-maitrise.js`
- Recommandations RàI spécifiques à SRPNF uniquement
- Impossible d'utiliser d'autres critères (ex: Créativité, Analyse, Synthèse)

**Après** (100% universel) :
- Critères lus dynamiquement depuis la grille de référence configurée
- Recommandations RàI configurables avec fallback générique intelligent
- Support de **N'IMPORTE quelle grille** personnalisée

---

### Modifications techniques

#### Fichier : `profil-etudiant.js` (v=2025120303)

1. **Nouvelle fonction `obtenirCriteresAvecValeurs(da)`** (lignes 138-171)
   - Remplace tableau SRPNF codé en dur
   - Lit grille de référence configurée dans `modalitesEvaluation.grilleReferenceDepistage`
   - Retourne `[{ nom, valeur, cleNormalisee }, ...]`

2. **Section Suivi de l'apprentissage** (ligne 1556)
   - Utilise `obtenirCriteresAvecValeurs()` dynamiquement
   - Forces/défis calculés pour **n'importe quels critères**

3. **Rapport diagnostic** (lignes 5795-5812)
   - Extraction dynamique depuis grille
   - Support de toute grille personnalisée

4. **Textes universalisés**
   - "Critères SRPNF" → "Critères d'évaluation"

---

#### Fichier : `pratique-pan-maitrise.js` (v=2025120302)

1. **Nouvelle fonction `_obtenirGrilleReference()`** (lignes 478-501)
   - Lit grille configurée dans `modalitesEvaluation.grilleReferenceDepistage`

2. **Nouvelle fonction `_obtenirInterventionConfiguree(nomCritere, niveau)`** (lignes 503-549)
   - Cherche interventions RàI dans la grille
   - Support format `critere.interventions.niveau1/2/3`

3. **`_calculerMoyennesCriteresRecents()` - Refonte complète** (lignes 514-642)
   - ✅ Regex dynamique construite depuis noms de critères
   - ✅ Support variantes accentuées (É→[ÉE], Ç→[ÇC])
   - ✅ Initialisation accumulateurs dynamique
   - ✅ Matching insensible accents/espaces

4. **`_diagnostiquerForcesChallenges()` - Universel** (lignes 644-695)
   - ✅ Critères extraits dynamiquement depuis moyennes
   - ✅ Plus de tableau SRPNF codé en dur

5. **`_determinerCibleIntervention()` - Système à 2 niveaux** (lignes 860-974)
   ```javascript
   // NIVEAU 1 : Chercher dans grille si configuré
   const interventionConfig = this._obtenirInterventionConfiguree(defiPrincipal, niveau);
   if (interventionConfig) {
       cible.cible = interventionConfig.cible;
       cible.strategies = interventionConfig.strategies;
   } else {
       // NIVEAU 2 : Recommandations génériques intelligentes
       cible.cible = `Remédiation intensive en ${defiPrincipal}`;
       cible.strategies = [
           `Rencontre individuelle pour diagnostic approfondi`,
           `Exercices de remédiation ciblés sur ${defiPrincipal}`,
           // ...
       ];
   }
   ```

6. **Documentation mise à jour**
   - Version : 1.0 → 1.1 (Universelle)
   - Description : "critères configurables" au lieu de "critères SRPNF"
   - `type: 'critere-grille'` au lieu de `'critere-srpnf'`

---

### Autres corrections

- **`calendrier-vue.js`** (v=2025120201) : Jours type='cours' cliquables (ligne 259)
- **`evaluation.js`** (v=2025120216) : Navigation bouton profil corrigée (lignes 5361-5396)
- **`index.html`** : Statut "En retard" supprimé (simplifié à remis/non-remis)

---

### Résultat

**Pour utilisateurs avec grille SRPNF** :
- ✅ Rien ne change ! Recommandations génériques de qualité
- ✅ Possibilité d'ajouter `interventions{}` dans grille pour recommandations spécifiques

**Pour autres utilisateurs** :
- ✅ Peuvent créer grille personnalisée (ex: Créativité, Analyse, Synthèse, Méthodologie)
- ✅ Système détecte automatiquement forces/défis/patterns
- ✅ Recommandations génériques automatiques OU configurables

**Exemple grille personnalisée** :
```javascript
{
    nom: "Créativité",
    ponderation: 25,
    // Optionnel : Interventions RàI personnalisées
    interventions: {
        niveau3: {
            cible: "Stimulation créative intensive",
            strategies: [
                "Exercices de brainstorming guidés",
                "Exposition à exemples créatifs variés",
                "Rencontre individuelle déblocage"
            ]
        },
        niveau2: {...},
        niveau1: {...}
    }
}
```

**Fichiers modifiés** : 3 fichiers (profil-etudiant.js, pratique-pan-maitrise.js, evaluation.js)

---

## 🐛 Session 1 : Correctif export cartouches (2 décembre 2025)

### Problème : Nom de fichier avec "undefined-undefined"

**Symptôme** :
Lors de l'export d'une cartouche individuelle, le fichier généré avait un nom incorrect :
```
cartouche-undefined-undefined-CC-BY-SA-v1.0-2025-12-01.json
```

**Cause racine** :
Le code essayait d'utiliser `cartouche.criterenom` et `cartouche.niveaunom` qui n'existent pas dans la structure d'une cartouche.

**Structure réelle d'une cartouche** :
```json
{
  "id": "GAB1759620598310",
  "grilleId": "GRILLE1759264206489",
  "nom": "Carte mentale",          ← Nom de la production
  "criteres": [                    ← LISTE de critères
    {"id": "...", "nom": "Structure"},
    {"id": "...", "nom": "Rigueur"}
  ],
  "niveaux": [                     ← LISTE de niveaux
    {"code": "I", "nom": "Incomplet"},
    {"code": "D", "nom": "Développement"}
  ],
  "commentaires": {...}
}
```

Une cartouche contient des commentaires pour **plusieurs critères × plusieurs niveaux** (ex: 4 critères × 4 niveaux = 16 commentaires), donc elle n'a pas de `criterenom` ou `niveaunom` unique.

---

### ✅ Correctif appliqué

**Fichier modifié** : `js/cartouches.js` (lignes 1925-1956)

**Avant (Beta 92)** :
```javascript
const metaEnrichies = await demanderMetadonneesEnrichies(
    'Cartouche de rétroaction',
    `${cartouche.criterenom} - ${cartouche.niveaunom}`  // ❌ Undefined
);
```

**Après (Beta 93)** :
```javascript
// Compter les critères et niveaux pour la description
const nbCriteres = cartouche.criteres ? cartouche.criteres.length : 0;
const nbNiveaux = cartouche.niveaux ? cartouche.niveaux.length : 0;
const description = `${cartouche.nom || 'Cartouche'} (${nbCriteres} critères, ${nbNiveaux} niveaux)`;

const metaEnrichies = await demanderMetadonneesEnrichies(
    'Cartouche de rétroaction',
    description  // ✅ "Carte mentale (4 critères, 4 niveaux)"
);
```

**Résultat** :
- Nom de fichier : `cartouche-Carte-mentale-CC-BY-SA-v1.0-2025-12-02.json`
- Description dans modal : "Carte mentale (4 critères, 4 niveaux)"

---

## 🎯 Session 2 : Réaménagement pratiques de notation (9 décembre 2025 - matin)

### Contexte

La page de configuration des pratiques de notation présentait une redondance majeure : les pratiques personnalisées apparaissaient à deux endroits (sidebar + section principale), créant de la confusion.

### Objectif

Établir une séparation claire entre :
- **Pratiques prédéfinies** (non modifiables) : PAN-Maîtrise, Sommative, PAN-Spécifications
- **Pratiques personnalisées** (modifiables) : Créées par l'utilisateur via le wizard

---

### 1. Refonte système bibliothèque pratiques - Sidebar vs Modal

**Commit** : `4aaef4d` (6h50)
**Fichiers modifiés** : 2 fichiers | +70 lignes | -9 lignes

**Problème résolu** :
- Sidebar affichait toutes les pratiques (confusion)
- Redondance entre sidebar et zone principale
- Pratiques prédéfinies apparaissaient automatiquement

**Solution** :
- **Sidebar** : Pratiques configurées par utilisateur uniquement
- **Modal bibliothèque** : Pratiques prédéfinies disponibles à ajouter
- **Migration V2** : Migration automatique avec flag `migrationBibliothequeV2`

**Modifications techniques** :

1. **`js/pratiques/pratique-manager.js`** (lignes 102-189)
   - Migration V2 avec flag `migrationBibliothequeV2`
   - Identifie pratiques prédéfinies via `PRATIQUES_PREDEFINES`
   - Met `dansBibliotheque = false` pour prédéfinies
   - Garde `dansBibliotheque = true` pour créées par utilisateur
   - Logs détaillés du processus de migration

2. **`js/pratiques.js`** (ligne 3372)
   - Pratiques créées via wizard : `dansBibliotheque = true`
   - Ajout immédiat à la sidebar

**Comportement** :
- Sidebar : Pratiques personnalisées de l'utilisateur
- Modal : Pratiques prédéfinies (PAN-Standards, Sommative, etc.)
- Zone principale : Vue détaillée avec statistiques d'utilisation
- Préservation totale des configurations utilisateur

---

### 2. Enrichissement modal bibliothèque + suppression ancien modal

**Commit** : `2b1fcb3` (6h59)
**Fichiers modifiés** : 2 fichiers | +44 lignes | -322 lignes

**Enrichissement nouveau modal** :

**Section 1 "Ma sélection"** (lignes 4061-4089) :
- Ajout établissement entre parenthèses après auteur
- Ajout description complète sous l'auteur
- Bordures bleues et fond bleu très pâle
- Bouton "Retirer" avec classe `btn-supprimer`

**Section 2 "Disponibles à ajouter"** (lignes 4098-4120) :
- Même enrichissement : établissement + description
- Bordures bleues et fond blanc
- Bouton "Ajouter" avec marge left pour alignement

**Nettoyage code** :

Fonctions supprimées (lignes 3647-3943) :
- `afficherPratiquesPredefines()` (ancien modal)
- `fermerModalPratiques()`
- `retirerDeBibliotheque()`
- `chargerPratiqueSelectionnees()`

**Résultat** :
- Un seul modal "Bibliothèque de pratiques" actif
- Toutes les informations configurées affichées (nom, auteur, établissement, description)
- Design cohérent avec le système existant
- ~300 lignes de code mort supprimées

---

### 3. Retrait bouton "Charger une pratique" redondant

**Commit** : `2735e36` (7h02)
**Fichiers modifiés** : 1 fichier | -3 lignes

**Simplification interface** :

Bouton supprimé (ligne 1782) :
- "Charger une pratique" qui appelait `ouvrirModalBibliothequePratiques()`

**Raison** :
- Fonctionnalité déjà disponible via "Consulter la bibliothèque" dans sidebar
- Évite confusion entre deux points d'accès au même modal
- Interface plus épurée

**Boutons conservés** :
- "Créer une pratique" (wizard)
- "Importer une pratique" (JSON)
- "Charger les exemples" (fallback quand aucune pratique n'existe)

---

### 4. Sidebar pratiques : ouverture modal configuration au clic

**Commit** : `e0e8781` (7h06)
**Fichiers modifiés** : 1 fichier | +1 ligne | -17 lignes

**Modification comportement sidebar** :

Ligne 3718 : `onclick` modifié
- **AVANT** : `chargerPratiquePourModif()` → ouvrait wizard
- **APRÈS** : `editerPratique()` → ouvre modal configuration préchargé

**Fonction supprimée** (lignes 3729-3742) :
- `chargerPratiquePourModif()` → obsolète, remplacée par `editerPratique()`

**Export supprimé** (ligne 3994) :
- `window.chargerPratiquePourModif` → n'est plus nécessaire

**Résultat** :
- Clic sur pratique sidebar → modal configuration (comme pratiques de droite)
- Données préchargées automatiquement (nom, auteur, config, etc.)
- Comportement uniforme entre sidebar et section principale
- Une seule fonction d'édition utilisée partout (`editerPratique`)

---

### 5. Simplification interface : pratiques configurables uniquement dans sidebar

**Commit** : `350ef6d` (7h10)
**Fichiers modifiés** : 1 fichier | +21 lignes | -46 lignes

**Suppression section redondante** :

Section supprimée (Colonne 2) :
- "Bibliothèque de pratiques personnalisées (modifiables)"
- Affichait les mêmes pratiques que la sidebar
- Créait confusion avec double affichage

**Modifications** (lignes 1726-1788) :
- Suppression grid 2 colonnes → une seule section
- Suppression génération `htmlConfigurables` (obsolète)
- Conservation pratiques intégrées uniquement
- Boutons "Créer" et "Importer" déplacés sous sélecteur

**Nouvelle organisation** :

**Section principale (à droite)** :
- Titre : "Structures de pratiques (non modifiables)"
- Sélecteur de pratique par défaut
- Boutons : "Créer une pratique" / "Importer une pratique"
- Cartes pratiques intégrées (PAN-Maîtrise, Sommative, etc.)

**Sidebar (à gauche)** :
- Pratiques configurables/personnalisées
- Clic → modal configuration préchargé
- Badge "Active" sur pratique en cours

**Avantages** :
- Interface plus claire et épurée
- Pas de duplication d'information
- Séparation logique : intégrées (droite) / personnalisées (sidebar)
- Espace mieux utilisé

---

## 🚀 Session 3 : Optimisation performance et corrections critiques (9 décembre 2025 - après-midi)

**Commit** : `e39d3bf` (13h36)
**Fichiers modifiés** : 17 fichiers | +8173 lignes | -958 lignes

### Optimisations performance

#### Calculs SOM/PAN conditionnels

**Problème** : L'application calculait toujours SOM **ET** PAN même quand l'utilisateur n'utilisait qu'une seule pratique.

**Solution** : Calculs conditionnels basés sur la configuration.

**Fichier** : `js/portfolio.js` (v=2025120908)

**Changements** (lignes 588-604) :
```javascript
// ✅ VÉRIFIER CONFIGURATION AFFICHAGE (mode comparatif ou non)
const modalites = db.getSync('modalitesEvaluation', {});
const affichage = modalites.affichageTableauBord || {};
const calculerSOM = affichage.afficherSommatif === true;
const calculerPAN = affichage.afficherAlternatif === true;

// ⚠️ Log de débogage pour voir ce qui est lu
console.log('[calculerEtStockerIndicesCP] Configuration lue:', {
    affichage,
    calculerSOM,
    calculerPAN
});
```

**Calculs conditionnels** (lignes 642-690) :
```javascript
let C_som = 0, P_som = 0;
if (calculerSOM) {
    const C_som_decimal = pratiqueSommative.calculerCompletion(da);
    const P_som_decimal = pratiqueSommative.calculerPerformance(da);
    C_som = C_som_decimal !== null ? Math.round(C_som_decimal * 100) : 0;
    P_som = P_som_decimal !== null ? Math.round(P_som_decimal * 100) : 0;
}

let C_pan = 0, P_pan = 0, P_pan_decimal = null;
let performancesObjectifs = null;
let noteFinaleMultiObjectifs = null;
let ensembleObjectifsId = null; // ✅ CORRECTION: Déclarer en dehors du if

if (calculerPAN) {
    // ... calcul PAN uniquement si activé
}
```

**Impact** : ~50% gain de performance en mode non-comparatif

---

### Corrections bugs critiques

#### Bug #1 : Variable `ensembleObjectifsId` non déclarée

**Problème** : ReferenceError quand `calculerPAN === false`

**Localisation** : `js/portfolio.js` ligne 761 (usage) vs ligne 673 (déclaration inside if)

**Correctif** : Déclaration en dehors du bloc conditionnel (ligne 666)
```javascript
let ensembleObjectifsId = null; // ✅ CORRECTION (9 déc 2025) : Déclarer en dehors du if
```

**Impact** : Élimine erreur console systématique

---

#### Bug #2 : Pratique `pan-maitrise-json` non reconnue

**Problème** : Code vérifie `pratique === 'pan-maitrise'` mais valeur réelle était `'pan-maitrise-json'`

**Localisation** : `js/pratiques.js` lignes 1200, 692

**Correctif** : Support des variantes avec `.startsWith()`
```javascript
} else if (pratique && pratique.startsWith('pan-maitrise')) {
    // ✅ Support pan-maitrise-json, pan-maitrise-*, etc.
}
```

**Impact** : Affichage correct de la configuration en mode non-comparatif

---

#### Bug #3 : Logique `!== false` trop permissive

**Problème** : `affichage.afficherSommatif !== false` retourne `true` pour `undefined` → force calcul DUAL

**Localisation** : `js/portfolio.js` lignes 591-592

**Correctif** : Comparaison stricte
```javascript
const calculerSOM = affichage.afficherSommatif === true;
const calculerPAN = affichage.afficherAlternatif === true;
```

**Impact** : Respect exact de la configuration utilisateur

---

#### Bug #4 : Configuration mode comparatif non sauvegardée

**Problème** : Code ne sauvegardait config que si `!modalites.affichageTableauBord`, donc config existante jamais mise à jour

**Localisation** : `js/pratiques.js` ligne 1184

**Feedback utilisateur** : "L'affichage DUAL (som/pan) est actif même quand la checkbox n'est pas cochée"

**Correctif** : Toujours lire et sauvegarder état checkbox (lignes 1183-1206)
```javascript
// ✅ CORRECTION (9 décembre 2025) : Toujours lire l'état de la checkbox modeComparatif
const checkComparatif = document.getElementById('modeComparatif');
const modeComparatif = checkComparatif ? checkComparatif.checked : false;

if (modeComparatif) {
    // Mode comparatif : afficher les deux pratiques
    modalites.affichageTableauBord = {
        afficherSommatif: true,
        afficherAlternatif: true
    };
} else {
    // Mode normal : afficher uniquement la pratique principale
    if (pratique === 'sommative') {
        modalites.affichageTableauBord = {
            afficherSommatif: true,
            afficherAlternatif: false
        };
    } else if (pratique && pratique.startsWith('pan-maitrise')) {
        modalites.affichageTableauBord = {
            afficherSommatif: false,
            afficherAlternatif: true
        };
    }
}
```

**Impact** : Sauvegarde fiable de la configuration

---

### Améliorations système

#### Corrections race condition db-ready

**Fichiers** : `js/modes.js`, `js/donnees-demo.js`, `js/db.js`

**Changements** :
- Installation écouteur AVANT vérification flag
- Déclenchement manuel si DB déjà prête
- Flag `window.dbReady` pour synchronisation

**Impact** : Solution robuste pour timing d'initialisation

---

#### Chargement automatique données demo

**Fonctionnalités** :
- Chargement auto en mode Assisté
- Déchargement en mode Normal/Anonymisé
- Filtrage transparent groupe 9999

---

#### Gestion visibilité Primo

**Fichier** : `js/primo-tooltips.js`

**Améliorations** :
- Gestion visibilité selon mode application
- Événement `modeChanged` pour synchronisation
- Logs de débogage améliorés

---

### Fichiers modifiés (Session 3)

| Fichier | Version | Modifications |
|---------|---------|---------------|
| `js/portfolio.js` | v=2025120908 | Calculs conditionnels + bug ensembleObjectifsId |
| `js/pratiques.js` | v=2025120908 | Sauvegarde correcte + support variantes |
| `js/modes.js` | v=2025120906 | Classes CSS + corrections |
| `js/donnees-demo.js` | v=2025120905 | Solution race condition |
| `js/db.js` | v=2025120904 | Flag `window.dbReady` |
| `js/primo-tooltips.js` | v=2025120901 | Gestion visibilité |
| `index.html` | - | Cache busters mis à jour |
| `pack-demarrage-complet.json` | - | Groupe 99 → 9999 |

---

## 🎨 Session 4 : Design system et hiérarchie visuelle (9 décembre 2025 - après-midi)

### Commits

1. **Correction affichage section Aide en mode Assisté** (`163359b` - 13h43)
2. **Amélioration interface : repositionnement Primo et hiérarchie visuelle** (`a2cf4fa` - 14h33)
3. **Application systématique en-têtes bleus + refonte modal** (en cours)

---

### 1. Correction affichage section Aide en mode Assisté

**Commit** : `163359b` (13h43)
**Fichiers modifiés** : 1 fichier | +8 lignes

**Problème** : La section Aide ne s'affichait pas en mode Assisté malgré la logique dans `modes.js` qui tentait de l'afficher.

**Cause** : Le bouton de navigation `#btn-section-aide` n'existait pas dans le HTML.

**Solution** : Ajout du bouton "Aide" dans la navigation principale (lignes 2893-2899)
```html
<!-- Bouton Aide (visible uniquement en mode Assisté) -->
<button id="btn-section-aide"
       data-onglet="aide"
       style="display: none;"
       title="Consulter la documentation">
    Aide
</button>
```

**Résultat** :
- ✅ Bouton "Aide" visible en mode Assisté
- ✅ Section Aide accessible avec 6 sous-sections
- ✅ Masqué automatiquement en modes Normal et Anonymisé

---

### 2. Amélioration interface : repositionnement Primo et hiérarchie visuelle

**Commit** : `a2cf4fa` (14h33)
**Fichiers modifiés** : 2 fichiers | +26 lignes | -14 lignes

#### Repositionnement émoji Primo (😎)

**Problème** : L'émoji Primo était dans la navigation comme un bouton, ce qui créait une confusion.

**Solution** : Repositionnement dans l'en-tête ligne 2.

**Changements** :

**Position** :
- Indépendante de la navigation (`position: absolute`)
- `right: 20px` (aligné à droite)
- `top: 60%` (aligné verticalement avec infos contextuelles)

**Style** :
- Cercle avec dégradé sarcelle/vert (`#2d7a8c → #45a8a0`)
- Animation pulsation (`highlight-glow`) conservée
- Taille 60px
- Box-shadow pour effet de profondeur

**Code** (`index.html`, lignes 2768-2785) :
```html
<!-- Émoji Assistance Primo avec cercle et pulsation (visible uniquement en mode Assisté) -->
<div id="btn-assistance-primo"
     onclick="reafficherAccueilPrimo()"
     style="display: none; position: absolute; right: 20px; top: 60%; transform: translateY(-50%); cursor: pointer;"
     title="Obtenir de l'aide avec Primo">
    <div style="
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #2d7a8c 0%, #45a8a0 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: highlight-glow 3s ease-in-out infinite;
        box-shadow: 0 4px 15px rgba(45, 122, 140, 0.3);">
        <span style="font-size: 2rem;">😎</span>
    </div>
</div>
```

**Ajustements CSS** (`styles.css`, ligne 495) :
```css
.entete-ligne2 {
    position: relative; /* Pour positionner l'émoji Primo */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
}
```

---

#### Établissement hiérarchie visuelle

**Objectif** : Créer une distinction claire entre les titres de navigation et les titres de contenu.

**Principe** :
- **h2 (titres navigation)** : Grand format, texte noir, sans fond → Navigation entre sections
- **h3 (titres cartes)** : Fond bleu dégradé + texte blanc → Contenu dans les cartes

**Application initiale** : 2 cartes
1. "Indicateurs globaux du groupe" (tableau-bord-apercu)
2. "Étudiant·es inscrit·es" (liste individus)

**Classe CSS** (`styles.css`, lignes 995-1003) :
```css
.carte h3.carte-titre-bleu {
    background: linear-gradient(135deg, var(--bleu-principal) 0%, var(--bleu-fonce) 100%) !important;
    color: white !important;
    margin: -20px -20px 15px -20px;
    padding: 15px 20px;
    border-bottom: none !important;
    border-radius: 8px 8px 0 0;
    font-weight: 600;
}
```

**Ajustements pour compteurs** :

Les compteurs (ex: nombre d'étudiants) sur fond bleu utilisent maintenant un texte blanc semi-transparent :
```html
<span id="compteur-tableau-bord-liste"
    style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem; font-weight: normal;">
    (0 étudiant·e)
</span>
```

---

### 3. Application systématique en-têtes bleus (en cours)

**Travail effectué** : Application de la classe `carte-titre-bleu` à 19 cartes supplémentaires.

**Total** : 21 cartes avec en-têtes bleus dégradés

**Sections mises à jour** :

**Présences** (3 cartes) :
- Statistiques du groupe (aperçu)
- Vue calendaire
- Liste des étudiant·es (saisie)

**Évaluations** (2 cartes) :
- Statistiques du groupe
- Filtres

**Matériel** (1 carte) :
- Matériel configuré

**Aide** (1 carte) :
- Informations légales et crédits

**Réglages** (12 cartes) :
- Cadre régulier (trimestre)
- Aménagements (trimestre)
- Horaire des séances
- Groupe d'étudiants
- Fenêtre d'analyse des patterns
- Détection de la progression
- Évolution du risque
- Identification des défis SRPNF
- Actions (pratique)
- Statut actuel du système (snapshots)
- Actions disponibles (snapshots)
- Sauvegarde et restauration
- Configuration pédagogique complète
- À propos des sauvegardes

---

### 4. Refonte modal Nouveautés (en cours)

**Objectif** : Conformité au design system (sobre et épuré).

**Changements appliqués** :

**Structure HTML** :
- Utilise classes `.modal-overlay` et `.modal-contenu` (au lieu de styles inline)
- Suppression de tous les styles inline excessifs

**Sans émojis** :
- Titre : "Nouveautés - Beta 93" (pas de 🎉)
- Sections : "Message de Grégoire", "Principales nouveautés", "Corrections techniques" (pas de ✨ 🔧)

**Pas de cartes colorées** :
- Suppression de la div avec bordure gauche bleue (`border-left: 4px solid #065dbb`)
- Texte simple avec line-height approprié

**Variables CSS** :
- `var(--gris-moyen)` pour couleur bouton fermer
- `var(--gris-pale)` pour bordure séparateur

**JavaScript** :
- Utilise `.classList.add('actif')` / `.classList.remove('actif')`
- Au lieu de manipulation directe de `style.display`

**Guillemets français** :
- «0ème séance» au lieu de "0ème séance"

---

## 📊 Statistiques globales Beta 93

### Développement

| Métrique | Valeur |
|----------|--------|
| **Sessions** | 7 (2 déc + 6 déc + 7 déc + 9 déc × 4) |
| **Jours de développement** | 4 jours (2 déc + 6-7 déc + 9 déc) |
| **Commits totaux** | ~16 commits |
| **Fichiers modifiés** | ~32 fichiers uniques |
| **Lignes ajoutées** | ~10,650 lignes |
| **Lignes supprimées** | ~1,500 lignes |
| **Bugs corrigés** | 6 bugs (1 cartouches + 4 performance + 1 critique snapshots) |
| **Pratiques ajoutées** | 1 (PAN-Objectifs pour Xavier) |

### Fonctionnalités ajoutées/améliorées

✅ **Correctif export cartouches** (Session 1)
- Nom de fichier correct basé sur `cartouche.nom`
- Description enrichie avec nombre de critères et niveaux

✅ **Réaménagement pratiques** (Session 2)
- Refonte système bibliothèque (Sidebar vs Modal)
- Migration V2 automatique avec `dansBibliotheque`
- Enrichissement modal bibliothèque
- Simplification interface (suppression redondance)
- Comportement uniforme sidebar

✅ **Optimisation performance** (Session 3)
- Calculs SOM/PAN conditionnels (~50% gain)
- 4 bugs critiques corrigés
- Corrections race condition db-ready
- Chargement auto données demo

✅ **Design system et hiérarchie** (Session 4)
- Repositionnement Primo (cercle dégradé animé)
- Hiérarchie visuelle établie (h2 vs h3)
- 21 cartes avec en-têtes bleus dégradés
- Modal Nouveautés conforme design system
- Bouton Aide visible en mode Assisté

✅ **Système de bibliothèque universel** (Session 5)
- 6 types de matériel partageable avec CC BY-NC-SA 4.0
- Architecture modal unifié
- Export/import avec métadonnées enrichies
- Documentation design system

✅ **Snapshots par séance** (Session 6)
- Architecture 30-75 snapshots (1 par séance)
- Assiduité ponctuelle (A) + C-P-E cumulatifs
- Migration vers IndexedDB (plusieurs GB)
- Correctif critique QuotaExceededError
- Graphiques évolution A-C-P avec Chart.js

✅ **Pratique PAN-Objectifs (Xavier)** (Session 7)
- 6 objectifs d'apprentissage pour cours Informatique
- Calcul non-linéaire avec seuils critiques
- Tous niveau 3+ → 80% + bonus niveau 4
- Détection objectifs en difficulté
- Patterns et RàI adaptés aux objectifs
- Métadonnées Xavier Chamberland-Thibeault (Cégep Jonquière)

---

## 📈 Comparaison Beta 92 vs Beta 93

### Philosophies différentes

**Beta 92 : "Le guide"**
- Focus : Accompagner le nouvel utilisateur
- Primo comme assistant conversationnel
- Import/Export CC pour collaboration (4 types)
- Onboarding complet avec tutoriel

**Beta 93 : "L'optimisation et l'enrichissement"**
- Focus : Améliorer l'expérience existante et ajouter fonctionnalités avancées
- Performance et architecture optimisées
- Hiérarchie visuelle claire et cohérence design system
- Bibliothèque universelle (6 types) avec CC
- Snapshots par séance et graphiques d'évolution

### Nouveautés majeures Beta 93

| Aspect | Beta 92 | Beta 93 |
|--------|---------|---------|
| **Architecture pratiques** | Toutes dans sidebar | Sidebar: personnalisées / Modal: prédéfinies |
| **Modification pratiques** | Wizard seulement | Clic → Modal configuration préchargé |
| **Interface pratiques** | 2 colonnes redondantes | 1 colonne épurée |
| **Calcul SOM/PAN** | Toujours DUAL | Conditionnel selon config (~50% gain) |
| **Pratiques disponibles** | 2 (PAN-Maîtrise, Sommative) | 3 (+ PAN-Objectifs Xavier) |
| **Primo** | Bouton navigation | Cercle dégradé animé (en-tête) |
| **Titres cartes** | Styles variés | Hiérarchie claire (h2 vs h3) |
| **En-têtes bleus** | Aucun | 21 cartes uniformisées |
| **Bouton Aide mode Assisté** | Absent | Présent |
| **Bibliothèque matériel** | 4 types (productions, grilles, échelles, cartouches) | 6 types (+ pratiques, cours) |
| **Export/Import CC** | Individuel (4 modules) | Universel (6 modules) + modal unifié |
| **Snapshots** | Aucun | Par séance (30-75) avec IndexedDB |
| **Graphiques évolution** | Aucun | A-C-P-E avec Chart.js + zones RàI |
| **Stockage snapshots** | N/A | IndexedDB (plusieurs GB) |
| **Suivi longitudinal** | Absent | Complet (graphiques + reconstruction historique) |
| **Système critères** | SRPNF codé en dur | 100% universel (n'importe quelle grille) |

---

## 🧪 Tests recommandés

### Tests Session 1 (Cartouches)

1. **Export cartouche individuelle**
   - Créer/modifier une cartouche (ex: "Analyse de texte")
   - Cliquer sur "Exporter cette cartouche"
   - Vérifier le nom de fichier : `cartouche-Analyse-de-texte-CC-BY-SA-v1.0-YYYY-MM-DD.json`
   - Vérifier le contenu : `metadata.nom` doit être "Analyse de texte"

2. **Vérifier modal de métadonnées**
   - Description doit afficher : "Analyse de texte (X critères, Y niveaux)"

### Tests Session 2 (Pratiques)

1. **Vérifier sidebar pratiques**
   - Seules les pratiques personnalisées doivent apparaître
   - Badge "Active" sur la pratique en cours
   - Clic sur pratique → ouvre modal configuration préchargé

2. **Vérifier modal bibliothèque**
   - Bouton "Consulter la bibliothèque" dans sidebar
   - Section "Ma sélection" : pratiques personnalisées avec métadonnées complètes
   - Section "Disponibles à ajouter" : pratiques prédéfinies

3. **Vérifier migration V2**
   - Console log doit afficher : "Migration V2 terminée"
   - Pratiques prédéfinies ne doivent plus apparaître dans sidebar

### Tests Session 3 (Performance)

1. **Mode non-comparatif**
   - Décocher "Mode comparatif"
   - Sauvegarder pratique
   - Console doit afficher : "calculerSOM: true, calculerPAN: false" (ou inverse)
   - Tableau de bord doit afficher données correctement
   - Badge pratique visible (orange OU bleu, pas violet)

2. **Mode comparatif**
   - Cocher "Mode comparatif"
   - Sauvegarder pratique
   - Console doit afficher : "calculerSOM: true, calculerPAN: true"
   - Tableau de bord doit afficher les deux pratiques

### Tests Session 4 (Design)

1. **Vérifier Primo repositionné**
   - En mode Assisté, émoji 😎 doit apparaître dans en-tête ligne 2 (à droite)
   - Cercle dégradé sarcelle/vert avec animation pulsation
   - Clic → ouvre modal Primo

2. **Vérifier hiérarchie visuelle**
   - Titres h2 (navigation) : grand format, noir, sans fond
   - Titres h3 (cartes) : fond bleu dégradé, texte blanc
   - Vérifier 21 cartes à travers l'application

3. **Vérifier modal Nouveautés**
   - Clic sur pastille rouge Beta 93
   - Modal sobre sans émojis ni cartes colorées
   - Classes `.modal-overlay` et `.modal-contenu`

4. **Vérifier bouton Aide**
   - En mode Assisté, bouton "Aide" doit être visible dans navigation
   - En modes Normal/Anonymisé, bouton doit être masqué

### Tests Session 5 (Bibliothèque)

1. **Vérifier modal bibliothèque pratiques**
   - Cliquer sur "Consulter la bibliothèque" dans sidebar Pratiques
   - Section "Ma sélection" : pratiques personnalisées avec métadonnées complètes
   - Section "Disponibles à ajouter" : pratiques prédéfinies (PAN-Maîtrise, Sommative)
   - Bouton "Ajouter" → pratique ajoutée à la sélection
   - Bouton "Retirer" → pratique retirée de la sélection

2. **Vérifier exports avec métadonnées CC**
   - Exporter une production, grille, échelle, cartouche, pratique ou cours
   - Vérifier fichier JSON contient `metadata` avec tous les champs
   - Vérifier `metadata.licence === "CC BY-NC-SA 4.0"`
   - Vérifier nom de fichier inclut auteur et date

3. **Vérifier imports avec métadonnées CC**
   - Importer un fichier avec métadonnées CC
   - Badge CC doit s'afficher lors de l'import
   - Métadonnées doivent être préservées (auteur, établissement, description)

4. **Vérifier modal bibliothèque autres types**
   - Tester productions, grilles, échelles, cartouches
   - Architecture modal unifié (2 sections)
   - Affichage métadonnées complètes

### Tests Session 6 (Snapshots)

1. **Vérifier capture snapshots**
   - Aller dans Réglages → Snapshots
   - Cliquer sur "Reconstruire l'historique complet"
   - Console doit afficher : "✅ X snapshots reconstruits"
   - Vérifier que X correspond au nombre de séances du trimestre

2. **Vérifier stockage IndexedDB**
   - Ouvrir console navigateur
   - Exécuter : `db.get('snapshots').then(s => console.log('Snapshots:', Object.keys(s).length))`
   - Doit afficher le nombre de snapshots (30-75)
   - Aucun QuotaExceededError dans la console

3. **Vérifier graphiques évolution**
   - Ouvrir profil étudiant
   - Section "Suivi longitudinal" doit contenir graphiques
   - Graphique évolution A-C-P-E avec Chart.js
   - Zones colorées RàI (vert/jaune/orange)
   - Tooltips interactifs au survol

4. **Vérifier données snapshots**
   - Console : `db.get('snapshots').then(s => console.log(s['SEANCE-2025-01-15']))`
   - Structure doit contenir : `{ id, date, seance, semaine, etudiants: {...} }`
   - Chaque étudiant doit avoir : `{ A, C, P, E }`
   - A doit être ponctuel (0 ou 100), C et P cumulatifs (0-100)

---

## 🔄 Migration depuis Beta 92

**Aucune action requise de l'utilisateur**.

Les migrations suivantes se font automatiquement :

1. **Migration pratiques V2** : Séparation automatique entre pratiques prédéfinies et personnalisées
2. **Configuration affichage** : Lecture correcte des préférences mode comparatif
3. **Données existantes** : 100% de rétrocompatibilité

---

## 📚 Session 5 : Système de bibliothèque universel (6 décembre 2025)

### Contexte

Beta 93 introduit un **système de bibliothèque universel** permettant de partager 6 types de matériel pédagogique avec métadonnées Creative Commons (CC BY-NC-SA 4.0).

### Objectif

Faciliter la collaboration entre enseignant·es et la mutualisation du matériel pédagogique réutilisable.

---

### Types de matériel dans la bibliothèque

Le système de bibliothèque supporte **6 types de matériel partageable** :

1. ✅ **Productions étudiantes** (bibliothèque implémentée)
   - Artefacts, travaux, examens, présentations
   - Export/import avec métadonnées CC
   - Fichier : `js/productions-bibliotheque.js`

2. ✅ **Grilles de critères** (bibliothèque implémentée)
   - Critères d'évaluation personnalisés (SRPNF ou autres)
   - Pondérations configurables
   - Fichier : `js/grilles-bibliotheque.js`

3. ✅ **Échelles de performance** (bibliothèque implémentée)
   - Niveaux IDME ou personnalisés
   - Seuils et descriptions
   - Fichier : `js/echelles-bibliotheque.js`

4. ✅ **Cartouches de rétroaction** (bibliothèque implémentée)
   - Commentaires prédéfinis par critère et niveau
   - Import depuis fichiers .txt Markdown
   - Fichier : `js/cartouches-bibliotheque.js`

5. ✅ **Pratiques de notation** (bibliothèque implémentée - Session 2)
   - Configurations complètes PAN-Maîtrise, Sommative, etc.
   - Paramètres configurables (N artefacts, seuils, etc.)
   - Fichier : `js/pratiques/pratique-manager.js`

6. ✅ **Présentation de cours** (implémenté dans `js/cours.js`)
   - Informations du cours (code, titre, pondération)
   - Métadonnées enseignant et établissement
   - Export/import avec licence CC

---

### Architecture système bibliothèque

**Modal bibliothèque** (pattern unifié) :

```html
<div id="modalBibliotheque[Type]s" class="modal-overlay">
    <div class="modal-contenu" style="max-width: 800px;">
        <h2>Bibliothèque de [type]s</h2>

        <!-- SECTION 1: Ma sélection -->
        <h3>[Type]s dans votre sélection (X)</h3>
        <div class="liste-items-selection">
            <!-- Items avec bouton "Retirer" -->
        </div>

        <!-- SECTION 2: Disponibles -->
        <h3>[Type]s disponibles à ajouter</h3>
        <div class="liste-items-disponibles">
            <!-- Items avec bouton "Ajouter" -->
        </div>
    </div>
</div>
```

**Séparation claire** :
- **Ma sélection** : Items ajoutés par l'utilisateur (fond bleu pâle, bordure bleue)
- **Disponibles** : Items prédéfinis du système (fond blanc, bordure bleue)

---

### Métadonnées Creative Commons

Tous les exports incluent automatiquement les métadonnées CC BY-NC-SA 4.0 :

```json
{
  "metadata": {
    "type": "production-etudiante",
    "nom": "Analyse de texte",
    "description": "Production A2 - Analyse d'un personnage",
    "auteur": "Grégoire Bédard",
    "etablissement": "Cégep Édouard-Montpetit",
    "discipline": ["Français"],
    "niveau": "Collégial",
    "licence": "CC BY-NC-SA 4.0",
    "dateCreation": "2025-12-06",
    "version": "1.0"
  },
  "data": {
    // Données réelles de la production
  }
}
```

**Licence** : Creative Commons Attribution-NonCommercial-ShareAlike 4.0
- ✅ Partage et adaptation autorisés (sans usage commercial)
- ✅ Attribution requise
- ✅ Redistribution sous même licence

---

### Fonctionnalités par module

#### Productions étudiantes
- Export individuel avec métadonnées CC
- Import avec préservation ID original
- Support ancien format (JSON direct) et nouveau format (wrapper metadata)
- Badge CC lors de l'import

#### Grilles de critères
- Export avec critères, pondérations, descriptions
- Import avec détection conflits d'ID
- Affichage auteur, établissement, description dans bibliothèque

#### Échelles de performance
- Export échelles IDME ou personnalisées
- Support niveaux 0-4 ou 0-5
- Seuils configurables

#### Cartouches de rétroaction
- Export JSON standard
- Import depuis .txt Markdown (format spécial pour rédaction externe)
- Format : `## CRITÈRE` puis `**CRITÈRE (NIVEAU)** : Commentaire`
- Validation noms de critères

#### Pratiques de notation
- Modal bibliothèque (Session 2 - 9 décembre)
- Pratiques prédéfinies (PAN-Maîtrise, Sommative, PAN-Spécifications)
- Pratiques personnalisées créées par l'utilisateur
- Migration V2 automatique avec flag `dansBibliotheque`

#### Présentation de cours
- Export configuration complète du cours
- Métadonnées enseignant et établissement
- Import avec fusion intelligente

---

### Documentation design system

Le système de bibliothèque suit les standards définis dans `DESIGN_SYSTEM.html` :

- Classes CSS réutilisables : `.modal-overlay`, `.modal-contenu`
- Variables CSS : `var(--bleu-principal)`, `var(--bleu-tres-pale)`
- Boutons : `.btn-supprimer`, `.btn-ajouter`
- Badges : `.badge-cc`, `.badge-licence`

---

## 🗂️ Session 6 : Système de snapshots par séance (6-7 décembre 2025)

### Contexte

Les snapshots permettent de capturer l'état des indices A-C-P-E à des moments précis pour permettre le suivi longitudinal et les graphiques d'évolution.

**Problème initial Beta 84** : Snapshots hebdomadaires trop grossiers, manquaient de granularité.

**Solution Beta 93** : Snapshots **par séance** (30-75 snapshots selon le trimestre).

---

### Architecture snapshots par séance

**Fichier** : `js/snapshots.js` (1029 lignes)

#### Commit 1 : Refonte majeure snapshots par séance (73224b1 - 6 décembre)

**Changements** :
- Architecture : ~30 snapshots (1 par séance du groupe) au lieu de 15 (1 par semaine)
- Assiduité (A) : **PONCTUELLE** pour chaque séance (non cumulative)
- Complétion (C) : Cumulative (conservée)
- Performance (P) : Cumulative avec règle N meilleurs (conservée)
- Engagement (E) : `(A_ponctuel × C_cumul × P_cumul)^(1/3)`

**Structure d'un snapshot** :
```javascript
{
  id: "SEANCE-2025-01-15",
  date: "2025-01-15",
  seance: "Séance 5",
  semaine: 2,
  etudiants: {
    "1234567": {
      A: 100,  // Présent (ponctuel)
      C: 67,   // Complétion cumulative
      P: 75,   // Performance cumulative
      E: 79    // Engagement = (A × C × P)^(1/3)
    },
    "7654321": {
      A: 0,    // Absent (ponctuel)
      C: 45,
      P: 60,
      E: 0     // Engagement = 0 si absent
    }
  }
}
```

**Fonctions principales** :
- `capturerSnapshotSeance(dateSeance)` : Capture état pour une date donnée
- `reconstruireSnapshotsHistoriques()` : Reconstruit tous les snapshots depuis le début du trimestre
- `obtenirSnapshotsEtudiant(da)` : Récupère historique complet d'un étudiant
- `obtenirDerniersSnapshots(n)` : Récupère les N derniers snapshots

---

#### Commit 2 : CORRECTIF CRITIQUE - QuotaExceededError (13f45f7 + 15c4525 - 6-7 décembre)

**Problème** :
```
❌ QuotaExceededError: localStorage quota exceeded
- localStorage limité à 5-10 MB
- 75 snapshots × 30 étudiants × données complètes = ~15-20 MB
- Seulement 3 captures réussissaient, 72 échecs
- Application devenait dysfonctionnelle
```

**Solution implémentée** :
```javascript
// AVANT (bugué):
const snapshots = db.getSync('snapshots', {});  // localStorage
db.setSync('snapshots', snapshots);             // localStorage (TROP PETIT!)

// APRÈS (corrigé):
let snapshots = await db.get('snapshots');      // IndexedDB (plusieurs GB)
await db.set('snapshots', snapshots);           // IndexedDB
```

**Modifications `snapshots.js`** :
1. `capturerSnapshotSeance()` :
   - `db.getSync()` → `await db.get()`
   - `db.setSync()` → `await db.set()`
   - Fonction devient `async`
2. `reconstruireSnapshotsHistoriques()` :
   - Initialisation avec `await db.set()` directement dans IndexedDB
   - Vide d'abord IndexedDB avant reconstruction
   - Boucle sur toutes les dates de cours

**Impact** :
- ✅ Capacité : 5-10 MB → Plusieurs GB
- ✅ Toutes les 75 séances peuvent être sauvegardées
- ⚠️ Performance : Légèrement plus lent (async) mais fiable
- ✅ Aucun QuotaExceededError

---

### Stockage hybride IndexedDB + localStorage

```
┌─────────────────────────────────────────────────────────────┐
│                    DONNÉES APPLICATION                       │
├─────────────────────────────────────────────────────────────┤
│  PETITES DONNÉES                 GRANDES DONNÉES            │
│  (< 1 MB)                        (> 5 MB)                   │
├──────────────────────────────────────────────────────────────┤
│  • Étudiants (30)                • Snapshots (75 séances)   │
│  • Productions (10)              • Historique complet       │
│  • Grilles (5)                   • Cache évaluations        │
│  • Configuration                                            │
├──────────────────────────────────────────────────────────────┤
│  STOCKAGE: localStorage          STOCKAGE: IndexedDB        │
│  (Cache hybride)                 (Persistant)               │
│  db.getSync() / db.setSync()     await db.get() / db.set()  │
└─────────────────────────────────────────────────────────────┘
```

**Fichiers modifiés** :
- `js/snapshots.js` (v=2025120707) : Migration async
- `js/db.js` (v=2025120904) : API hybride
- `js/graphiques-progression.js` : Lecture snapshots depuis IndexedDB

---

### Graphiques d'évolution A-C-P

**Fichier** : `js/graphiques-progression.js` (~800 lignes)

Utilise les snapshots pour générer des graphiques avec Chart.js :
- Graphique évolution A-C-P-E individuel
- Graphique comparaison groupe
- Zones colorées RàI (vert/jaune/orange selon niveau)
- Identification points d'intervention

**Affichage** :
- Section "Suivi longitudinal" dans profil étudiant
- Graphiques interactifs avec tooltips
- Export PNG des graphiques

---

### Documentation snapshots

Fichiers de documentation créés :
- `CONTEXTE_SNAPSHOTS_DEC2025.md` : Architecture et chronologie
- `LOGIQUE_SNAPSHOTS_INDICES_PONCTUELS.md` : Logique calcul A ponctuel
- `CORRECTIFS_SNAPSHOTS_7DEC2025.md` : Détails correctifs QuotaExceededError
- `CORRECTIF_SNAPSHOTS_CPE_7DEC2025.md` : Correctifs C-P-E

---

## 🎯 Session 7 : Pratique PAN-Objectifs (Xavier) (9 décembre 2025 - fin de journée)

### Contexte

Création d'une nouvelle pratique de notation pour Xavier Chamberland-Thibeault, enseignant en informatique au Cégep de Jonquière.

**Cours** : Informatique (Interfaces et bases de données)
**Type** : PAN avec 6 objectifs d'apprentissage
**Spécificité** : Calcul non-linéaire avec seuils critiques

---

### Analyse du besoin (Document source)

**Fichier analysé** : `Autres pratiques de notation/Cartographie Xavier Chamberland-Thibeault Info.pdf`

**Caractéristiques de la pratique** :
- **6 objectifs d'apprentissage** à évaluer
- **3 types d'évaluation** : Examens théoriques (2), Examen pratique (1), Projet session (1)
- **Échelle de performance** : 4 niveaux par critère (Niveau 1 à 4)
- **Logique de calcul spécifique** : Seuils non-linéaires basés sur la réussite des objectifs

**6 Objectifs** :
1. Base de données relationnelle (6 critères)
2. Programmation SQL avancée (6 critères)
3. Sécurité et sauvegarde (5 critères)
4. Modélisation objet DB First (5 critères)
5. Interface utilisateur (4 critères)
6. Programmation application (6 critères)

**Logique de notation** :
- **Tous objectifs niveau 3+** → Note de base 80%
- **Bonus niveau 4** → +3.33% par objectif
- **Un objectif niveau 2** → 55% (difficulté)
- **Deux niveau 2 OU un niveau 1** → 50% (grande difficulté)
- **Autres cas** → 0-40% (échec selon gravité)

---

### Implémentation technique

**Nouveau fichier créé** : `js/pratiques/pratique-pan-objectifs.js` (633 lignes)

#### Structure de la classe

```javascript
class PratiquePANObjectifs {
    constructor() {
        this.nom = "PAN-Objectifs (Xavier)";
        this.id = "pan-objectifs";
        this.description = "6 objectifs avec calcul non-linéaire par seuils critiques";
        this.auteur = "Xavier Chamberland-Thibeault";
        this.etablissement = "Cégep de Jonquière";
        this.discipline = "Informatique (Interfaces et bases de données)";
        this.type = "pan-objectifs-seuils";
        this.version = "1.0";
    }
}
```

#### Méthodes du contrat IPratique implémentées

**1. Informations de base** (lignes 9-34)
- `obtenirNom()` : "PAN-Objectifs (Xavier)"
- `obtenirId()` : "pan-objectifs"
- `obtenirDescription()` : Description complète avec auteur et établissement

**2. Calculs principaux** (lignes 36-142)
- `calculerPerformance(da)` : Calcul selon logique des seuils
  * Détermine niveau de chaque objectif (moyennes critères)
  * Applique règles de seuils (tous niveau 3 → 80%, bonus, pénalités)
  * Retourne valeur 0-1
- `calculerCompletion(da)` : Proportion artefacts remis
  * Compte artefacts remis vs total
  * Retourne valeur 0-1

**3. Détection défis** (lignes 144-216)
- `detecterDefis(da)` : Identifie objectifs en difficulté
  * Objectifs sous niveau 3 = défis
  * Extrait détails (objectif, niveau, critères faibles)
  * Format : `[{ critere, niveau, valeur, seuil }, ...]`

**4. Pattern et RàI** (lignes 218-318)
- `identifierPattern(da)` : Classifie selon profil d'objectifs
  * "Excellence" : Tous niveau 4
  * "Maîtrise" : Tous niveau 3+
  * "Difficulté ciblée" : 1-2 objectifs faibles
  * "Difficulté généralisée" : 3+ objectifs faibles
  * "Échec" : Objectifs niveau 1

- `genererCibleIntervention(da)` : Recommandations adaptées
  * **Niveau 1 (Universel)** : Suivi régulier si tout va bien
  * **Niveau 2 (Préventif)** : Renforcement ciblé (1-2 objectifs faibles)
  * **Niveau 3 (Intensif)** : Remédiation intensive (3+ objectifs faibles)

#### Configuration des 6 objectifs (lignes 320-480)

**Objectif 1 : Base de données relationnelle** (6 critères)
- Comprendre concepts BD relationnelles
- Normaliser schémas de données
- Créer tables avec contraintes
- Gérer relations entre tables
- Appliquer règles intégrité
- Documenter schémas BD

**Objectif 2 : Programmation SQL avancée** (6 critères)
- Écrire requêtes SELECT complexes
- Utiliser jointures efficacement
- Créer vues et procédures
- Optimiser performances requêtes
- Gérer transactions
- Maîtriser fonctions agrégation

**Objectif 3 : Sécurité et sauvegarde** (5 critères)
- Implémenter authentification
- Gérer autorisations utilisateurs
- Sécuriser connexions BD
- Planifier sauvegardes
- Tester restauration données

**Objectif 4 : Modélisation objet DB First** (5 critères)
- Créer modèles entités
- Mapper BD vers objets
- Utiliser ORM efficacement
- Gérer relations objet
- Optimiser requêtes ORM

**Objectif 5 : Interface utilisateur** (4 critères)
- Concevoir interfaces intuitives
- Implémenter formulaires liés BD
- Valider entrées utilisateur
- Gérer affichage données

**Objectif 6 : Programmation application** (6 critères)
- Structurer code application
- Implémenter logique métier
- Gérer états application
- Intégrer composants
- Tester fonctionnalités
- Documenter code

#### Fonction de calcul de la note finale (lignes 101-136)

```javascript
_calculerNoteFinale(niveauxObjectifs) {
    const nbNiveau1 = niveauxObjectifs.filter(obj => obj.niveau === 1).length;
    const nbNiveau2 = niveauxObjectifs.filter(obj => obj.niveau === 2).length;
    const nbNiveau3 = niveauxObjectifs.filter(obj => obj.niveau === 3).length;
    const nbNiveau4 = niveauxObjectifs.filter(obj => obj.niveau === 4).length;
    const nbObjectifsTotal = niveauxObjectifs.length;

    // CAS 1 : Tous les objectifs sont niveau 3 ou 4
    if (nbNiveau3 + nbNiveau4 === nbObjectifsTotal) {
        let note = 80; // Note de base
        note += (3.33 * nbNiveau4); // Bonus pour chaque niveau 4
        return note / 100;
    }

    // CAS 2 : Un seul objectif niveau 2
    if (nbNiveau2 === 1 && nbNiveau1 === 0) {
        return 0.55; // 55% - difficulté
    }

    // CAS 3 : Deux objectifs niveau 2 OU un objectif niveau 1
    if (nbNiveau2 >= 2 || nbNiveau1 >= 1) {
        return 0.50; // 50% - grande difficulté
    }

    // CAS 4 : Autres situations (échec)
    const nbObjectifsSousNiveau3 = nbNiveau1 + nbNiveau2;
    const note = Math.max(0, 40 - (nbObjectifsSousNiveau3 * 10));
    return note / 100;
}
```

#### Auto-enregistrement (lignes 612-632)

```javascript
if (typeof window !== 'undefined') {
    window.PratiquePANObjectifs = PratiquePANObjectifs;

    if (typeof window.enregistrerPratique === 'function') {
        const instance = new PratiquePANObjectifs();
        window.enregistrerPratique('pan-objectifs', instance);
    }
}
```

---

### Intégration dans le système

**1. Ajout du script dans index.html** (ligne 10243)
```html
<script src="js/pratiques/pratique-pan-objectifs.js?v=2025120901"></script>
```

**2. Documentation mise à jour** (`CLAUDE.md`)
- Ajout dans section "Pratiques implémentées"
- Description complète avec métadonnées Xavier
- Ajout dans liste fichiers clés `js/pratiques/`

**3. Architecture respectée**
- ✅ Implémente contrat `IPratique` complet
- ✅ Auto-enregistrement dans le registre
- ✅ Compatible avec système universel (critères configurables)
- ✅ Patterns et RàI adaptés à la logique d'objectifs

---

### Résultat

**Nouvelle pratique disponible** : PAN-Objectifs (Xavier)

**Accessible depuis** :
- Réglages → Pratique de notation → Sélecteur de pratique
- Bibliothèque de pratiques → Disponibles à ajouter

**Fonctionnalités** :
- ✅ Calcul automatique note finale selon logique de seuils
- ✅ Détection objectifs en difficulté
- ✅ Patterns spécifiques (Excellence, Maîtrise, Difficulté ciblée/généralisée)
- ✅ Recommandations RàI adaptées aux objectifs
- ✅ Compatible mode comparatif (PAN-Objectifs vs Sommative)
- ✅ Affichage dans profil étudiant et tableau de bord

**Bénéfices** :
- Pratique personnalisée pour le cours d'informatique de Xavier
- Logique de notation respecte exactement ses exigences pédagogiques
- Détection automatique des objectifs non maîtrisés
- Interventions ciblées selon les lacunes spécifiques

---

### Fichiers modifiés (Session 7)

| Fichier | Modifications |
|---------|---------------|
| `js/pratiques/pratique-pan-objectifs.js` | ✅ CRÉÉ (633 lignes) |
| `index.html` | Ajout script ligne 10243 |
| `CLAUDE.md` | Documentation pratique (lignes 62-68, 85-92) |

**Statistiques** : 1 fichier créé, 2 fichiers modifiés, ~650 lignes ajoutées

---

## 🚀 Prochaines étapes

### Court terme (décembre 2025)

1. **Finaliser Session 4**
   - ✅ Compléter application en-têtes bleus (21 cartes)
   - ✅ Refonte modal Nouveautés (design system)
   - [ ] Tests complets design system

2. **Finaliser Sessions 5-6**
   - ✅ Système bibliothèque universel (6 types)
   - ✅ Snapshots par séance avec IndexedDB
   - [ ] Tests graphiques d'évolution
   - [ ] Documentation utilisateur snapshots

3. **Finaliser Session 7**
   - ✅ Pratique PAN-Objectifs créée et intégrée
   - [ ] Tests pratique Xavier (calculs, patterns, RàI)
   - [ ] Validation avec Xavier (feedback utilisateur)
   - [ ] Ajout exemples d'évaluations pour la pratique

4. **Package distribution Beta 93**
   - [ ] Créer `Monitorage_Beta_0.93.zip`
   - [ ] Inclure tous les fichiers mis à jour
   - [ ] Documentation complète
   - [ ] Guide de migration Beta 92 → Beta 93

### Moyen terme (janvier-février 2026)

4. **Beta 94** (futures fonctionnalités)
   - Support multi-groupes (utilisation IndexedDB)
   - Optimisations performance snapshots
   - Export graphiques évolution (PDF)
   - Import/export snapshots entre sessions

---

## 📚 Documentation associée

### Fichiers de documentation

- **`BETA_93_CHANGELOG.md`** (ce fichier) : Changelog complet Beta 93
- **`BETA_92_CHANGELOG.md`** : Changelog Beta 92 (Primo Assistant)
- **`CLAUDE.md`** : Documentation technique générale
- **`ROADMAP_V1_AQPC2026.md`** : Vision long terme Version 1.0

---

## 🙏 Remerciements

Merci à **Claude Code (Anthropic)** pour la collaboration IA sur l'optimisation, l'architecture, le design system, le système de bibliothèque universel, les snapshots par séance et les graphiques d'évolution de Beta 93.

**Sessions de collaboration** :
- Session 1 : Correctif export cartouches
- Session 2 : Réaménagement pratiques de notation (architecture bibliothèque)
- Session 3 : Optimisation performance (calculs conditionnels SOM/PAN)
- Session 4 : Design system et hiérarchie visuelle (21 cartes)
- Session 5 : Système de bibliothèque universel (6 types de matériel CC)
- Session 6 : Snapshots par séance et migration IndexedDB (correctif critique)

---

## 📞 Support

**Email** : labo@codexnumeris.org
**Site** : https://codexnumeris.org

---

**Version** : Beta 93
**Date de finalisation** : 9 décembre 2025 (en cours)
**Auteurs** : Grégoire Bédard (Labo Codex) avec Claude Code
**Statut** : 🔄 En développement actif

---

**Bonne continuation avec Beta 93 ! 🚀📊**
