# Spécifications : Système de pratiques d'évaluation configurables

**Version :** 1.1
**Date :** 25 novembre 2025
**Objectif :** Rendre l'application Codex Numeris adaptable à différentes pratiques d'évaluation sans codage en dur

**⚠️ Note terminologique importante :**
Le terme "pratique" est utilisé pour désigner une méthode d'évaluation (ex: PAN-Maîtrise, Sommative).
Le terme "profil" est réservé au suivi individuel des élèves (profil-etudiant.js).
Cette distinction évite toute confusion entre configuration pédagogique et données étudiantes.

---

## 📋 Contexte

### Problème actuel
L'application est codée pour une seule pratique : PAN-Maîtrise avec échelle IDME à 4 niveaux. Pour supporter d'autres pratiques (Bruno avec 5 niveaux, sommative classique, spécifications, etc.), il faut refactoriser l'architecture.

### Solution proposée
Système de **pratiques configurables** où chaque méthode d'évaluation est définie par un fichier de configuration JSON, pas par du code.

### Utilisateurs cibles identifiés
1. **Bruno Voisard** (Chimie) : PAN-Standards 5 niveaux, 10 cibles, reprises multiples
2. **Marie-Hélène Leduc** (Littérature) : Sommative classique, moyenne pondérée
3. **François Arseneault-Hubert** (Chimie) : PAN-Spécifications, notes fixes (50, 60, 80, 100%)
4. **Grégoire Bédard** (Littérature) : PAN-Maîtrise actuel (déjà implémenté)
5. + 5 autres pratiques recensées

---

## 🏗️ Architecture proposée

### Principe fondamental
```
┌─────────────────────────────────────────────┐
│  Configuration (JSON/IndexedDB)             │
│  - Pratiques d'évaluation configurables     │
│  - Échelles personnalisées                  │
│  - Règles de calcul                         │
└─────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────┐
│  Moteur existant (js/pratiques/)            │
│  - pratique-registre.js (déjà existant)     │
│  - pratique-pan-maitrise.js (déjà existant) │
│  - pratique-sommative.js (déjà existant)    │
│  + NOUVEAU: pratiques-configurables.js      │
└─────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────┐
│  Modules existants (évaluation, etc.)       │
│  - Utilisent pratique.config                │
│  - Pas de logique codée en dur              │
└─────────────────────────────────────────────┘
```

**Note :** L'architecture de base existe déjà (Beta 91). Ce plan ajoute le support de pratiques configurables JSON.

### Nouvelle structure IndexedDB

```javascript
// Store : pratiquesConfigurables (nouveau)
{
  id: "pan-standards-bruno",
  nom: "PAN - Standards (5 niveaux)",
  auteur: "Bruno Voisard",
  description: "Système à 5 niveaux avec reprises multiples",
  actif: false, // Une seule pratique active à la fois (dans modalitesEvaluation.pratique)
  config: { /* voir structure complète ci-dessous */ }
}

// modalitesEvaluation (structure existante, ajout de config)
{
  pratique: "pan-standards-bruno", // ID de la pratique active
  typePAN: null,
  dateConfiguration: "2025-11-25T...",
  grilleReferenceDepistage: "grille-srpnf",
  affichageTableauBord: { ... },
  configPAN: { ... },
  // NOUVEAU : configuration complète de la pratique active
  configPratique: { /* config JSON de la pratique */ }
}
```

**Note :** La pratique active est identifiée par `modalitesEvaluation.pratique` (structure existante).

---

## 📐 Structure complète d'une pratique configurable

```javascript
{
  // ═══════════════════════════════════════════════
  // 1. MÉTADONNÉES
  // ═══════════════════════════════════════════════
  "id": "pan-standards-bruno",
  "nom": "PAN - Notation basée sur standards (5 niveaux)",
  "auteur": "Bruno Voisard",
  "description": "Système à 5 niveaux avec reprises multiples, niveau non rétrogradable",
  "discipline": "Sciences",
  "version": "1.0",
  "date_creation": "2025-11-24",
  
  // ═══════════════════════════════════════════════
  // 2. ÉCHELLE D'ÉVALUATION
  // ═══════════════════════════════════════════════
  "echelle": {
    "type": "niveaux", // "niveaux", "pourcentage", "binaire", "notes_fixes"
    "niveaux": [
      {
        "code": "0",
        "label": "Données insuffisantes",
        "description": "Pas encore évalué ou travail très incomplet",
        "valeur_numerique": 0,      // Pour calculs
        "valeur_pourcentage": 0,    // Pour conversion en note finale
        "couleur": "#CCCCCC",
        "ordre": 0                   // Pour tri et progression
      },
      {
        "code": "1",
        "label": "En apprentissage",
        "description": "Ne respecte aucun critère essentiel",
        "valeur_numerique": 1,
        "valeur_pourcentage": 50,
        "couleur": "#FF6B6B",
        "ordre": 1
      },
      {
        "code": "2",
        "label": "Ça y est presque!",
        "description": "Respecte au moins un critère essentiel",
        "valeur_numerique": 2,
        "valeur_pourcentage": 62.5,
        "couleur": "#FFD93D",
        "ordre": 2
      },
      {
        "code": "3",
        "label": "Acquis",
        "description": "Tous critères essentiels respectés 3/4 du temps",
        "valeur_numerique": 3,
        "valeur_pourcentage": 75,
        "couleur": "#6BCF7F",
        "ordre": 3
      },
      {
        "code": "4",
        "label": "Avancé",
        "description": "Tous critères respectés, erreurs mineures seulement",
        "valeur_numerique": 4,
        "valeur_pourcentage": 100,
        "couleur": "#4D96FF",
        "ordre": 4
      }
    ]
  },
  
  // ═══════════════════════════════════════════════
  // 3. STRUCTURE DES ÉVALUATIONS
  // ═══════════════════════════════════════════════
  "structure_evaluations": {
    "type": "standards", // "standards", "evaluations_discretes", "portfolio", "hybride"
    
    // Pour type "standards" :
    "nombre_standards": 10,
    "standards_terminaux": [7, 8, 9, 10], // IDs ou indices des standards terminaux/intégrateurs
    "ponderation": "egale", // "egale" ou "variable"
    "poids_par_standard": null, // Si "variable", tableau [10, 10, 15, ...]
    
    // Pour type "evaluations_discretes" :
    "evaluations": [
      {
        "nom": "Analyse partielle",
        "poids": 15,
        "type": "dissertation",
        "obligatoire": true
      },
      {
        "nom": "Portfolio",
        "poids": 20,
        "type": "portfolio",
        "nombre_travaux_min": 5,
        "nombre_travaux_max": 7
      },
      {
        "nom": "Analyse finale",
        "poids": 50,
        "type": "dissertation",
        "double_verrou": true, // Doit être réussi pour passer le cours
        "seuil_reussite": 60
      }
    ]
  },
  
  // ═══════════════════════════════════════════════
  // 4. CALCUL NOTE FINALE
  // ═══════════════════════════════════════════════
  "calcul_note": {
    "methode": "conversion_niveaux", // "conversion_niveaux", "moyenne_ponderee", "specifications", "jugement_global"
    
    // Pour "conversion_niveaux" :
    "table_conversion": [
      {"niveau_code": "0", "note_pct": 0},
      {"niveau_code": "1", "note_pct": 50},
      {"niveau_code": "2", "note_pct": 62.5},
      {"niveau_code": "3", "note_pct": 75},
      {"niveau_code": "4", "note_pct": 100}
    ],
    
    // Pour "moyenne_ponderee" :
    "formule": "somme(note_i × poids_i) / 100",
    
    // Conditions spéciales (optionnel)
    "conditions_speciales": [
      {
        "type": "plafonnement",
        "description": "Si moyenne standards terminaux < 60%, note plafonnée à 55%",
        "condition": {
          "cibles": [7, 8, 9, 10],
          "operation": "moyenne",
          "comparateur": "<",
          "seuil": 60
        },
        "consequence": {
          "action": "plafonner",
          "valeur": 55
        }
      },
      {
        "type": "double_verrou",
        "description": "Analyse finale doit être réussie pour passer",
        "condition": {
          "evaluation": "Analyse finale",
          "comparateur": "<",
          "seuil": 60
        },
        "consequence": {
          "action": "echec",
          "note_max": 55
        }
      }
    ]
  },
  
  // ═══════════════════════════════════════════════
  // 5. SYSTÈME DE REPRISES
  // ═══════════════════════════════════════════════
  "systeme_reprises": {
    "type": "illimitees", // "illimitees", "jetons", "fixes", "aucune"
    
    // Pour type "illimitees" :
    "occasions_formelles": [
      {"semaine": 8, "duree_minutes": 50, "description": "Reprise mi-session"},
      {"semaine": 14, "duree_minutes": 50, "description": "Reprise avant finale"},
      {"semaine": 16, "duree_minutes": 180, "description": "Semaine d'évaluations"}
    ],
    "reprises_bureau": true,
    "reprises_bureau_description": "Entrevue individuelle aux heures de disponibilité",
    
    // Pour type "jetons" :
    "nombre_jetons_delai": 3,
    "nombre_jetons_reprise": 3,
    "regles_jetons": "Voir système PAN-Maîtrise",
    
    // Règles communes
    "niveau_retrogradable": false, // Le niveau peut-il baisser lors d'une reprise?
    "delai_entre_reprises": null   // En jours, ou null si pas de délai
  },
  
  // ═══════════════════════════════════════════════
  // 6. GESTION DES CRITÈRES
  // ═══════════════════════════════════════════════
  "gestion_criteres": {
    "type": "par_standard", // "par_standard", "fixes", "par_evaluation", "hybride"
    
    // Pour "fixes" :
    "criteres_fixes": [
      "Pertinence, justesse, clarté",
      "Qualité de la langue",
      "Respect de la structure",
      "Cohérence textuelle"
    ],
    
    // Pour "par_standard" :
    "criteres_essentiels_obligatoires": true, // Distinction critères essentiels/avancés?
    "description": "Chaque standard a ses propres critères définis dans grilles.js",
    
    // Pour "par_evaluation" :
    "criteres_variables_description": "Critères adaptés selon le type d'évaluation"
  },
  
  // ═══════════════════════════════════════════════
  // 7. SEUILS D'INTERPRÉTATION (pour indices A-C-P)
  // ═══════════════════════════════════════════════
  "seuils": {
    // Option 1 : Seuils sur pourcentages
    "type": "pourcentage", // "pourcentage", "niveau", "aucun"
    "va_bien": 75,
    "difficulte": 65,
    "grande_difficulte": 55,
    
    // Option 2 : Seuils sur niveaux
    // "type": "niveau",
    // "niveau_acceptable": "3", // Code du niveau considéré acceptable
    
    // Seuils par indice (optionnel, sinon utilise les seuils généraux)
    "seuils_par_indice": {
      "assiduite": {"va_bien": 85, "difficulte": 70, "grande_difficulte": 60},
      "completion": {"va_bien": 80, "difficulte": 70, "grande_difficulte": 60},
      "performance": {"va_bien": 75, "difficulte": 65, "grande_difficulte": 55}
    }
  },
  
  // ═══════════════════════════════════════════════
  // 8. PARAMÈTRES D'AFFICHAGE (UI)
  // ═══════════════════════════════════════════════
  "interface": {
    "afficher_notes_chiffrees": true, // Afficher les % ou seulement les niveaux?
    "afficher_rang": false,
    "afficher_moyenne_groupe": true,
    "terminologie": {
      "evaluation": "Évaluation",      // Ou "Test", "Examen", "Standard", etc.
      "critere": "Critère",
      "note_finale": "Note finale",
      "reprise": "Reprise"             // Ou "Occasion supplémentaire", etc.
    }
  }
}
```

---

## 🔧 Implémentation technique

### Fichier 1 : `js/pratiques/pratique-configurable.js` (nouveau module)

```javascript
/**
 * Module de gestion des pratiques configurables
 *
 * Responsabilités :
 * - Charger/sauvegarder les pratiques dans IndexedDB
 * - Valider la structure des configurations JSON
 * - Implémenter l'interface IPratique pour pratiques configurables
 * - Calculer les notes selon la configuration
 *
 * Note : Ce module s'intègre dans l'architecture existante (js/pratiques/)
 */

class PratiqueConfigurable {
  constructor(config) {
    this.config = config;
    this.valider();
  }

  /**
   * Valide la structure de la configuration
   * @throws {Error} Si la configuration est invalide
   */
  valider() {
    // Vérifier champs obligatoires
    const champsObligatoires = ['id', 'nom', 'echelle', 'calcul_note'];
    for (const champ of champsObligatoires) {
      if (!this.config[champ]) {
        throw new Error(`Champ obligatoire manquant : ${champ}`);
      }
    }

    // Vérifier cohérence échelle
    if (this.config.echelle.type === 'niveaux' && !this.config.echelle.niveaux) {
      throw new Error('Échelle de type "niveaux" requiert le champ "niveaux"');
    }

    // Autres validations...
  }
  
  /**
   * Obtient un niveau par son code
   * @param {string} code - Code du niveau (ex: "3", "M", "B")
   * @returns {object} Objet niveau
   */
  getNiveau(code) {
    if (this.config.echelle.type !== 'niveaux') {
      throw new Error('Cette méthode nécessite une échelle de type "niveaux"');
    }
    
    return this.config.echelle.niveaux.find(n => n.code === code);
  }
  
  /**
   * Convertit un niveau en pourcentage
   * @param {string} niveauCode - Code du niveau
   * @returns {number} Note en pourcentage
   */
  niveauVersPourcentage(niveauCode) {
    const niveau = this.getNiveau(niveauCode);
    if (!niveau) {
      console.warn(`Niveau inconnu : ${niveauCode}`);
      return 0;
    }
    return niveau.valeur_pourcentage;
  }
  
  /**
   * Calcule la note finale selon la méthode du profil
   * @param {array} evaluations - Tableau des évaluations
   * @returns {number} Note finale en pourcentage
   */
  calculerNotFinale(evaluations) {
    switch (this.config.calcul_note.methode) {
      case 'conversion_niveaux':
        return this.calculerParConversionNiveaux(evaluations);
      
      case 'moyenne_ponderee':
        return this.calculerMoyennePonderee(evaluations);
      
      case 'specifications':
        return this.calculerParSpecifications(evaluations);
      
      case 'jugement_global':
        // Pas de calcul automatique, retourner null
        return null;
      
      default:
        throw new Error(`Méthode de calcul inconnue : ${this.config.calcul_note.methode}`);
    }
  }
  
  /**
   * Calcule note par conversion de niveaux (ex: Bruno)
   * @private
   */
  calculerParConversionNiveaux(evaluations) {
    // 1. Calculer note brute (moyenne des niveaux convertis)
    let somme = 0;
    let count = 0;
    
    for (const eval of evaluations) {
      if (eval.niveauFinal && eval.niveauFinal !== '--') {
        const pct = this.niveauVersPourcentage(eval.niveauFinal);
        somme += pct;
        count++;
      }
    }
    
    let noteBrute = count > 0 ? somme / count : 0;
    
    // 2. Appliquer conditions spéciales (plafonnement, double verrou, etc.)
    if (this.config.calcul_note.conditions_speciales) {
      noteBrute = this.appliquerConditionsSpeciales(noteBrute, evaluations);
    }
    
    return Math.round(noteBrute * 10) / 10; // Arrondir à 1 décimale
  }
  
  /**
   * Calcule moyenne pondérée classique (ex: Marie-Hélène)
   * @private
   */
  calculerMoyennePonderee(evaluations) {
    let somme = 0;
    let poidsTotal = 0;
    
    for (const eval of evaluations) {
      if (eval.note !== undefined && eval.note !== null) {
        const poids = eval.poids || 1;
        somme += eval.note * poids;
        poidsTotal += poids;
      }
    }
    
    const noteBrute = poidsTotal > 0 ? somme / poidsTotal : 0;
    
    // Appliquer conditions spéciales (double verrou, etc.)
    if (this.config.calcul_note.conditions_speciales) {
      return this.appliquerConditionsSpeciales(noteBrute, evaluations);
    }
    
    return Math.round(noteBrute * 10) / 10;
  }
  
  /**
   * Applique les conditions spéciales (plafonnement, verrous, etc.)
   * @private
   */
  appliquerConditionsSpeciales(noteBrute, evaluations) {
    let noteFinale = noteBrute;
    
    for (const condition of this.config.calcul_note.conditions_speciales) {
      switch (condition.type) {
        case 'plafonnement':
          noteFinale = this.appliquerPlafonnement(noteFinale, evaluations, condition);
          break;
        
        case 'double_verrou':
          noteFinale = this.appliquerDoubleVerrou(noteFinale, evaluations, condition);
          break;
      }
    }
    
    return noteFinale;
  }
  
  /**
   * Applique un plafonnement conditionnel
   * @private
   */
  appliquerPlafonnement(noteActuelle, evaluations, condition) {
    // Extraire les évaluations concernées
    const ciblesIds = condition.condition.cibles;
    const evals = evaluations.filter(e => ciblesIds.includes(e.standardId || e.id));
    
    // Calculer moyenne de ces évaluations
    let somme = 0;
    let count = 0;
    for (const eval of evals) {
      const pct = eval.niveauFinal 
        ? this.niveauVersPourcentage(eval.niveauFinal)
        : eval.note;
      if (pct !== undefined && pct !== null) {
        somme += pct;
        count++;
      }
    }
    
    const moyenne = count > 0 ? somme / count : 0;
    
    // Vérifier condition
    const seuil = condition.condition.seuil;
    const comparateur = condition.condition.comparateur;
    
    let conditionRemplie = false;
    switch (comparateur) {
      case '<': conditionRemplie = moyenne < seuil; break;
      case '<=': conditionRemplie = moyenne <= seuil; break;
      case '>': conditionRemplie = moyenne > seuil; break;
      case '>=': conditionRemplie = moyenne >= seuil; break;
    }
    
    // Appliquer conséquence
    if (conditionRemplie && condition.consequence.action === 'plafonner') {
      return Math.min(noteActuelle, condition.consequence.valeur);
    }
    
    return noteActuelle;
  }
  
  /**
   * Interprète le niveau de risque selon les seuils du profil
   * @param {number} valeur - Valeur à interpréter (note ou indice)
   * @param {string} typeIndice - 'performance', 'assiduite', 'completion', etc.
   * @returns {string} 'bon', 'acceptable', 'fragile'
   */
  interpreterNiveau(valeur, typeIndice = null) {
    if (this.config.seuils.type === 'aucun') {
      return null; // Pas d'interprétation automatique
    }
    
    // Déterminer les seuils à utiliser
    let seuils;
    if (typeIndice && this.config.seuils.seuils_par_indice?.[typeIndice]) {
      seuils = this.config.seuils.seuils_par_indice[typeIndice];
    } else {
      seuils = {
        va_bien: this.config.seuils.va_bien,
        difficulte: this.config.seuils.difficulte,
        grande_difficulte: this.config.seuils.grande_difficulte
      };
    }
    
    // Interpréter
    if (valeur >= seuils.va_bien) return 'bon';
    if (valeur >= seuils.difficulte) return 'acceptable';
    return 'fragile';
  }
}

// ═══════════════════════════════════════════════
// API du module
// ═══════════════════════════════════════════════

/**
 * Gestionnaire global des pratiques configurables
 *
 * Note : S'intègre avec pratique-registre.js existant
 */
const PratiqueManager = {
  pratiqueActive: null,

  /**
   * Charge la pratique active depuis modalitesEvaluation
   * Compatible avec l'architecture existante
   */
  async chargerPratiqueActive() {
    const modalites = await db.get('modalitesEvaluation', {});
    const pratiqueId = modalites.pratique; // Ex: 'pan-standards-bruno'

    if (!pratiqueId) {
      console.warn('Aucune pratique configurée');
      return null;
    }

    // Vérifier si c'est une pratique configurable ou codée en dur
    if (pratiqueId === 'pan-maitrise' || pratiqueId === 'sommative') {
      // Pratique codée en dur existante, utiliser pratique-registre.js
      return window.obtenirPratiqueActive();
    }

    // Pratique configurable JSON
    const pratiquesConfigurables = await db.get('pratiquesConfigurables', []);
    const pratiqueData = pratiquesConfigurables.find(p => p.id === pratiqueId);

    if (!pratiqueData) {
      throw new Error(`Pratique introuvable : ${pratiqueId}`);
    }

    this.pratiqueActive = new PratiqueConfigurable(pratiqueData.config);
    return this.pratiqueActive;
  },

  /**
   * Change la pratique active (met à jour modalitesEvaluation.pratique)
   */
  async changerPratiqueActive(pratiqueId) {
    const modalites = await db.get('modalitesEvaluation', {});
    modalites.pratique = pratiqueId;
    modalites.dateConfiguration = new Date().toISOString();

    await db.set('modalitesEvaluation', modalites);
    await this.chargerPratiqueActive();

    // Invalider le cache de pratique-registre.js
    if (window.invaliderCachePratique) {
      window.invaliderCachePratique();
    }
  },

  /**
   * Liste toutes les pratiques (codées + configurables)
   */
  async listerPratiques() {
    const pratiquesCodees = window.listerPratiquesDisponibles(); // De pratique-registre.js
    const pratiquesConfigurables = await db.get('pratiquesConfigurables', []);

    return {
      codees: pratiquesCodees,
      configurables: pratiquesConfigurables
    };
  },

  /**
   * Sauvegarde une nouvelle pratique configurable
   */
  async sauvegarderPratique(pratique) {
    const pratiques = await db.get('pratiquesConfigurables', []);

    // Vérifier unicité de l'ID
    if (pratiques.some(p => p.id === pratique.id)) {
      throw new Error(`Une pratique avec l'ID ${pratique.id} existe déjà`);
    }

    // Valider la pratique
    new PratiqueConfigurable(pratique.config); // Lance une erreur si invalide

    pratiques.push(pratique);
    await db.set('pratiquesConfigurables', pratiques);
  }
};

// Exporter
window.PratiqueManager = PratiqueManager;
window.PratiqueConfigurable = PratiqueConfigurable;
```

### Fichier 2 : `js/pratiques/pratiques-predefines.js` (pratiques préconfigurées)

```javascript
/**
 * Pratiques d'évaluation préconfigurées au format JSON
 *
 * Ces configurations JSON peuvent être importées dans l'application
 * pour créer de nouvelles pratiques configurables.
 *
 * Note : PAN-Maîtrise et Sommative sont déjà implémentées en dur
 * (pratique-pan-maitrise.js, pratique-sommative.js).
 * Ces fichiers JSON servent de modèles pour créer d'autres pratiques.
 */

// ═══════════════════════════════════════════════
// Pratique 1 : PAN-Maîtrise (Grégoire Bédard)
// ═══════════════════════════════════════════════
// Note : Déjà implémentée en JS (pratique-pan-maitrise.js)
// Ce JSON sert de modèle pour référence
const PRATIQUE_PAN_MAITRISE = {
  id: 'pan-maitrise-gregoire',
  nom: 'PAN-Maîtrise (4 niveaux IDME)',
  auteur: 'Grégoire Bédard',
  description: 'Système IDME à 4 niveaux avec jetons de reprise et taxonomie SOLO',
  discipline: 'Littérature',
  version: '1.0',
  
  echelle: {
    type: 'niveaux',
    niveaux: [
      {
        code: 'I',
        label: 'Incomplet',
        description: 'Travail non remis ou très incomplet',
        valeur_numerique: 0,
        valeur_pourcentage: 0,
        couleur: '#CCCCCC',
        ordre: 0
      },
      {
        code: 'D',
        label: 'En développement',
        description: 'Compréhension unistructurelle (1 critère SOLO)',
        valeur_numerique: 1,
        valeur_pourcentage: 60,
        couleur: '#FFD93D',
        ordre: 1
      },
      {
        code: 'M',
        label: 'Maîtrisé',
        description: 'Compréhension multistructurelle (2-3 critères SOLO)',
        valeur_numerique: 2,
        valeur_pourcentage: 75,
        couleur: '#6BCF7F',
        ordre: 2
      },
      {
        code: 'E',
        label: 'Étendu',
        description: 'Compréhension abstraite étendue (4 critères SOLO)',
        valeur_numerique: 3,
        valeur_pourcentage: 95,
        couleur: '#4D96FF',
        ordre: 3
      }
    ]
  },
  
  structure_evaluations: {
    type: 'portfolio',
    nombre_artefacts_min: 8,
    nombre_artefacts_max: 14,
    artefacts_obligatoires: ['Rédaction finale'],
    ponderation: 'fenetre_glissante',
    nombre_artefacts_retenus: 5 // Les 5 meilleurs
  },
  
  calcul_note: {
    methode: 'conversion_niveaux',
    table_conversion: [
      {niveau_code: 'I', note_pct: 0},
      {niveau_code: 'D', note_pct: 60},
      {niveau_code: 'M', note_pct: 75},
      {niveau_code: 'E', note_pct: 95}
    ]
  },
  
  systeme_reprises: {
    type: 'jetons',
    nombre_jetons_delai: 3,
    nombre_jetons_reprise: 3,
    regles_jetons: 'Jeton de délai : prolongation de 48h. Jeton de reprise : refaire un artefact.',
    niveau_retrogradable: false
  },
  
  gestion_criteres: {
    type: 'fixes',
    criteres_fixes: [
      'Structure (S)',
      'Rigueur (R)',
      'Pertinence (P)',
      'Nuance (N)',
      'Français (F)'
    ]
  },
  
  seuils: {
    type: 'pourcentage',
    va_bien: 75,
    difficulte: 65,
    grande_difficulte: 55,
    seuils_par_indice: {
      assiduite: {va_bien: 85, difficulte: 70, grande_difficulte: 60},
      completion: {va_bien: 80, difficulte: 70, grande_difficulte: 60},
      performance: {va_bien: 75, difficulte: 65, grande_difficulte: 55}
    }
  },
  
  interface: {
    afficher_notes_chiffrees: true,
    afficher_rang: false,
    afficher_moyenne_groupe: true,
    terminologie: {
      evaluation: 'Artefact',
      critere: 'Critère SRPNF',
      note_finale: 'Note finale',
      reprise: 'Reprise avec jeton'
    }
  }
};

// ═══════════════════════════════════════════════
// Pratique 2 : PAN-Standards 5 niveaux (Bruno Voisard)
// ═══════════════════════════════════════════════
const PRATIQUE_PAN_STANDARDS_BRUNO = {
  id: 'pan-standards-bruno',
  nom: 'PAN-Standards (5 niveaux)',
  auteur: 'Bruno Voisard',
  description: 'Système à 5 niveaux avec reprises multiples, niveau non rétrogradable',
  discipline: 'Chimie',
  version: '1.0',
  
  echelle: {
    type: 'niveaux',
    niveaux: [
      {
        code: '0',
        label: 'Données insuffisantes',
        description: 'Pas encore évalué ou travail très incomplet',
        valeur_numerique: 0,
        valeur_pourcentage: 0,
        couleur: '#CCCCCC',
        ordre: 0
      },
      {
        code: '1',
        label: 'En apprentissage',
        description: 'Ne respecte aucun critère essentiel',
        valeur_numerique: 1,
        valeur_pourcentage: 50,
        couleur: '#FF6B6B',
        ordre: 1
      },
      {
        code: '2',
        label: 'Ça y est presque!',
        description: 'Respecte au moins un critère essentiel',
        valeur_numerique: 2,
        valeur_pourcentage: 62.5,
        couleur: '#FFD93D',
        ordre: 2
      },
      {
        code: '3',
        label: 'Acquis',
        description: 'Tous critères essentiels respectés 3/4 du temps',
        valeur_numerique: 3,
        valeur_pourcentage: 75,
        couleur: '#6BCF7F',
        ordre: 3
      },
      {
        code: '4',
        label: 'Avancé',
        description: 'Tous critères respectés, erreurs mineures seulement',
        valeur_numerique: 4,
        valeur_pourcentage: 100,
        couleur: '#4D96FF',
        ordre: 4
      }
    ]
  },
  
  structure_evaluations: {
    type: 'standards',
    nombre_standards: 10,
    standards_terminaux: [7, 8, 9, 10],
    ponderation: 'egale'
  },
  
  calcul_note: {
    methode: 'conversion_niveaux',
    table_conversion: [
      {niveau_code: '0', note_pct: 0},
      {niveau_code: '1', note_pct: 50},
      {niveau_code: '2', note_pct: 62.5},
      {niveau_code: '3', note_pct: 75},
      {niveau_code: '4', note_pct: 100}
    ],
    conditions_speciales: [
      {
        type: 'plafonnement',
        description: 'Si moyenne standards terminaux < 60%, note plafonnée à 55%',
        condition: {
          cibles: [7, 8, 9, 10],
          operation: 'moyenne',
          comparateur: '<',
          seuil: 60
        },
        consequence: {
          action: 'plafonner',
          valeur: 55
        }
      }
    ]
  },
  
  systeme_reprises: {
    type: 'illimitees',
    occasions_formelles: [
      {semaine: 8, duree_minutes: 50, description: 'Reprise mi-session'},
      {semaine: 14, duree_minutes: 50, description: 'Reprise avant finale'},
      {semaine: 16, duree_minutes: 180, description: 'Semaine d\'évaluations'}
    ],
    reprises_bureau: true,
    reprises_bureau_description: 'Entrevue individuelle aux heures de disponibilité',
    niveau_retrogradable: false
  },
  
  gestion_criteres: {
    type: 'par_standard',
    criteres_essentiels_obligatoires: true,
    description: 'Chaque standard a ses propres critères. Tous les critères essentiels doivent être respectés pour atteindre "Acquis".'
  },
  
  seuils: {
    type: 'niveau',
    niveau_acceptable: '3' // "Acquis"
  },
  
  interface: {
    afficher_notes_chiffrees: true,
    afficher_rang: false,
    afficher_moyenne_groupe: false,
    terminologie: {
      evaluation: 'Standard',
      critere: 'Critère',
      note_finale: 'Note finale',
      reprise: 'Reprise'
    }
  }
};

// ═══════════════════════════════════════════════
// Pratique 3 : Sommative classique (Marie-Hélène Leduc)
// ═══════════════════════════════════════════════
// Note : Déjà implémentée en JS (pratique-sommative.js)
// Ce JSON sert de modèle pour référence
const PRATIQUE_SOMMATIVE_CLASSIQUE = {
  id: 'sommative-classique-mhl',
  nom: 'Sommative traditionnelle',
  auteur: 'Marie-Hélène Leduc',
  description: 'Moyenne pondérée classique avec critères fixes',
  discipline: 'Littérature',
  version: '1.0',
  
  echelle: {
    type: 'pourcentage',
    min: 0,
    max: 100,
    precision: 0.5
  },
  
  structure_evaluations: {
    type: 'evaluations_discretes',
    evaluations: [
      {
        nom: 'Analyse partielle',
        poids: 15,
        type: 'dissertation',
        obligatoire: true
      },
      {
        nom: 'Portfolio',
        poids: 20,
        type: 'portfolio',
        nombre_travaux_min: 5,
        nombre_travaux_max: 7
      },
      {
        nom: 'Travail équipe',
        poids: 15,
        type: 'travail_equipe'
      },
      {
        nom: 'Analyse finale',
        poids: 50,
        type: 'dissertation',
        double_verrou: true,
        seuil_reussite: 60
      }
    ]
  },
  
  calcul_note: {
    methode: 'moyenne_ponderee',
    formule: 'somme(note_i × poids_i) / 100',
    conditions_speciales: [
      {
        type: 'double_verrou',
        description: 'Analyse finale doit être réussie (≥60%) pour passer',
        condition: {
          evaluation: 'Analyse finale',
          comparateur: '<',
          seuil: 60
        },
        consequence: {
          action: 'echec',
          note_max: 55
        }
      }
    ]
  },
  
  systeme_reprises: {
    type: 'aucune'
  },
  
  gestion_criteres: {
    type: 'fixes',
    criteres_fixes: [
      'Pertinence, justesse, clarté',
      'Qualité de la langue',
      'Respect de la structure',
      'Cohérence textuelle'
    ]
  },
  
  seuils: {
    type: 'pourcentage',
    va_bien: 75,
    difficulte: 65,
    grande_difficulte: 55
  },
  
  interface: {
    afficher_notes_chiffrees: true,
    afficher_rang: false,
    afficher_moyenne_groupe: true,
    terminologie: {
      evaluation: 'Évaluation',
      critere: 'Critère',
      note_finale: 'Note finale',
      reprise: 'Reprise'
    }
  }
};

// ═══════════════════════════════════════════════
// Pratique 4 : PAN-Spécifications (François Arseneault-Hubert)
// ═══════════════════════════════════════════════
const PRATIQUE_PAN_SPECIFICATIONS = {
  id: 'pan-specifications-fah',
  nom: 'PAN-Spécifications (notes fixes)',
  auteur: 'François Arseneault-Hubert',
  description: 'Notes fixes (50, 60, 80, 100%) selon critères atteints',
  discipline: 'Chimie',
  version: '1.0',
  
  echelle: {
    type: 'notes_fixes',
    notes_possibles: [50, 60, 80, 100]
  },
  
  structure_evaluations: {
    type: 'specifications',
    specifications: [
      {
        nom: 'Tests (2)',
        description: 'Réussir au moins 1 des 2 tests',
        requis_pour: [60, 80, 100]
      },
      {
        nom: 'Prise de position 1',
        description: 'Prise de position acceptable',
        requis_pour: [60, 80, 100]
      },
      {
        nom: 'Présentation découverte',
        description: 'Présentation acceptable',
        requis_pour: [60, 80, 100]
      },
      {
        nom: 'Tests (2)',
        description: 'Réussir les 2 tests',
        requis_pour: [80, 100]
      },
      {
        nom: 'Bilan portfolio',
        description: 'Bilan acceptable lors entrevue finale',
        requis_pour: [80, 100]
      },
      {
        nom: 'Prise de position 2',
        description: 'Deuxième prise de position acceptable',
        requis_pour: [100]
      },
      {
        nom: 'Bilan portfolio supérieur',
        description: 'Critères supérieurs lors entrevue',
        requis_pour: [100]
      }
    ]
  },
  
  calcul_note: {
    methode: 'specifications',
    description: 'Vérifier quelles spécifications sont remplies, déterminer la note la plus élevée accessible'
  },
  
  systeme_reprises: {
    type: 'illimitees',
    reprises_bureau: true,
    niveau_retrogradable: false
  },
  
  gestion_criteres: {
    type: 'par_evaluation',
    criteres_variables_description: 'Tests : exactitude. Prises de position : clarté + fiabilité sources.'
  },
  
  seuils: {
    type: 'pourcentage',
    va_bien: 60,
    difficulte: 50,
    grande_difficulte: 50
  },
  
  interface: {
    afficher_notes_chiffrees: true,
    afficher_rang: false,
    afficher_moyenne_groupe: false,
    terminologie: {
      evaluation: 'Spécification',
      critere: 'Critère',
      note_finale: 'Note finale',
      reprise: 'Reprise'
    }
  }
};

// ═══════════════════════════════════════════════
// Export
// ═══════════════════════════════════════════════
window.PRATIQUES_PREDEFINES = {
  PRATIQUE_PAN_MAITRISE,
  PRATIQUE_PAN_STANDARDS_BRUNO,
  PRATIQUE_SOMMATIVE_CLASSIQUE,
  PRATIQUE_PAN_SPECIFICATIONS
};
```

### Fichier 3 : Modifications dans les modules existants

#### `js/evaluation.js`

```javascript
// AVANT (codé en dur)
function afficherEchelleEvaluation() {
  const echelle = JSON.parse(localStorage.getItem('echellesTemplates') || '{}');
  // ... code spécifique à l'échelle IDME
}

// APRÈS (utilise pratique configurable)
async function afficherEchelleEvaluation() {
  const pratique = await PratiqueManager.chargerPratiqueActive();

  if (!pratique) {
    // Pratique codée en dur, utiliser l'ancienne logique
    const echelle = JSON.parse(localStorage.getItem('echellesTemplates') || '{}');
    // ... code existant
    return;
  }

  // Pratique configurable JSON
  const echelle = pratique.config.echelle;

  if (echelle.type === 'niveaux') {
    afficherEchelleNiveaux(echelle.niveaux);
  } else if (echelle.type === 'pourcentage') {
    afficherEchellePourcentage(echelle);
  }
  // etc.
}
```

**Note** : Les modules existants continuent de fonctionner avec les pratiques codées en dur (PAN-Maîtrise, Sommative).
Les pratiques configurables JSON sont une extension optionnelle.

### Fichier 3 : Interface de sélection de pratique

**Note :** Cette interface sera intégrée dans `pratiques.js` (module existant).
Pas besoin d'un nouveau fichier, juste d'étendre l'interface actuelle.

#### Ajouts à `js/pratiques.js`

```javascript
/**
 * Affiche la liste des pratiques (codées + configurables)
 * Affichée au premier lancement ou depuis Réglages
 */

async function afficherSelectionPratique() {
  const pratiques = await ProfilManager.listerProfils();
  
  // Si aucun profil, forcer la création/sélection
  if (profils.length === 0) {
    await afficherEcranBienvenue();
    return;
  }
  
  // Sinon, afficher liste des profils
  afficherListeProfils(profils);
}

async function afficherEcranBienvenue() {
  const html = `
    <div class="ecran-bienvenue">
      <h1>Bienvenue dans Codex Numeris</h1>
      <p>Choisissez votre pratique d'évaluation :</p>
      
      <div class="grille-profils">
        <div class="carte-pratique" onclick="choisirPratique('pan-maitrise-gregoire')">
          <h3>PAN-Maîtrise</h3>
          <p>4 niveaux IDME, jetons de reprise</p>
          <span class="discipline">Littérature</span>
        </div>
        
        <div class="carte-pratique" onclick="choisirPratique('pan-standards-bruno')">
          <h3>PAN-Standards</h3>
          <p>5 niveaux, reprises illimitées</p>
          <span class="discipline">Sciences</span>
        </div>
        
        <div class="carte-pratique" onclick="choisirPratique('sommative-classique-mhl')">
          <h3>Sommative classique</h3>
          <p>Moyenne pondérée traditionnelle</p>
          <span class="discipline">Toutes disciplines</span>
        </div>
        
        <div class="carte-pratique" onclick="choisirPratique('pan-specifications-fah')">
          <h3>PAN-Spécifications</h3>
          <p>Notes fixes selon critères atteints</p>
          <span class="discipline">Sciences</span>
        </div>
        
        <div class="carte-pratique special" onclick="creerPratiquePersonnalisee()">
          <h3>✨ Créer un pratique personnalisé</h3>
          <p>Assistant pas-à-pas</p>
        </div>
      </div>
      
      <button class="btn-secondaire" onclick="importerPratique()">
        Importer un profil
      </button>
    </div>
  `;
  
  document.getElementById('main').innerHTML = html;
}

async function choisirPratique(profilId) {
  await ProfilManager.changerProfilActif(profilId);
  
  // Afficher message de confirmation
  afficherNotification('Pratique activé avec succès!');
  
  // Rediriger vers tableau de bord
  naviguerVers('tableau-bord');
}

async function creerPratiquePersonnalisee() {
  // Afficher wizard de création (voir ci-dessous)
  afficherWizardCreationPratique();
}
```

#### Wizard de création de pratique (plusieurs étapes)

```javascript
async function afficherWizardCreationPratique() {
  const wizard = new WizardCreationPratique();
  await wizard.demarrer();
}

class WizardCreationPratique {
  constructor() {
    this.etapeActuelle = 0;
    this.donnees = {};
  }
  
  async demarrer() {
    this.afficherEtape(0);
  }
  
  afficherEtape(numero) {
    const etapes = [
      this.etape1_Informations.bind(this),
      this.etape2_Echelle.bind(this),
      this.etape3_Structure.bind(this),
      this.etape4_Calcul.bind(this),
      this.etape5_Reprises.bind(this),
      this.etape6_Criteres.bind(this),
      this.etape7_Seuils.bind(this),
      this.etape8_Recapitulatif.bind(this)
    ];
    
    if (numero < etapes.length) {
      etapes[numero]();
    } else {
      this.terminer();
    }
  }
  
  etape1_Informations() {
    const html = `
      <div class="wizard-etape">
        <div class="wizard-header">
          <h2>Étape 1 sur 8 : Informations de base</h2>
          <div class="wizard-progress">
            <div class="wizard-progress-bar" style="width: 12.5%"></div>
          </div>
        </div>
        
        <div class="wizard-contenu">
          <label>
            Nom du pratique *
            <input type="text" id="wizard-nom" placeholder="Ex: Mon système PAN personnalisé">
          </label>
          
          <label>
            Discipline
            <input type="text" id="wizard-discipline" placeholder="Ex: Mathématiques">
          </label>
          
          <label>
            Description courte
            <textarea id="wizard-description" rows="3" placeholder="Décrivez brièvement votre système"></textarea>
          </label>
        </div>
        
        <div class="wizard-footer">
          <button class="btn-secondaire" onclick="wizard.annuler()">Annuler</button>
          <button class="btn-principal" onclick="wizard.etapeSuivante()">Suivant →</button>
        </div>
      </div>
    `;
    
    document.getElementById('main').innerHTML = html;
  }
  
  etape2_Echelle() {
    const html = `
      <div class="wizard-etape">
        <div class="wizard-header">
          <h2>Étape 2 sur 8 : Échelle d'évaluation</h2>
          <div class="wizard-progress">
            <div class="wizard-progress-bar" style="width: 25%"></div>
          </div>
        </div>
        
        <div class="wizard-contenu">
          <p>Quel type d'échelle utilisez-vous ?</p>
          
          <div class="choix-echelle">
            <label class="carte-choix">
              <input type="radio" name="type-echelle" value="niveaux">
              <div>
                <h4>Niveaux (ex: I-D-M-E, 0-1-2-3-4)</h4>
                <p>Pour systèmes PAN avec niveaux qualitatifs</p>
              </div>
            </label>
            
            <label class="carte-choix">
              <input type="radio" name="type-echelle" value="pourcentage">
              <div>
                <h4>Pourcentages (0-100%)</h4>
                <p>Pour systèmes sommatifs traditionnels</p>
              </div>
            </label>
            
            <label class="carte-choix">
              <input type="radio" name="type-echelle" value="notes_fixes">
              <div>
                <h4>Notes fixes (ex: 50, 60, 80, 100)</h4>
                <p>Pour systèmes par spécifications</p>
              </div>
            </label>
          </div>
          
          <!-- Si "niveaux" sélectionné, afficher sous-formulaire -->
          <div id="config-niveaux" style="display: none">
            <label>
              Combien de niveaux ?
              <select id="nombre-niveaux">
                <option value="3">3 niveaux</option>
                <option value="4" selected>4 niveaux</option>
                <option value="5">5 niveaux</option>
                <option value="6">6 niveaux</option>
              </select>
            </label>
            
            <p>Vous pourrez définir chaque niveau à l'étape suivante.</p>
          </div>
        </div>
        
        <div class="wizard-footer">
          <button class="btn-secondaire" onclick="wizard.etapePrecedente()">← Précédent</button>
          <button class="btn-principal" onclick="wizard.etapeSuivante()">Suivant →</button>
        </div>
      </div>
    `;
    
    document.getElementById('main').innerHTML = html;
    
    // Event listener pour afficher config-niveaux
    document.querySelectorAll('input[name="type-echelle"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const configNiveaux = document.getElementById('config-niveaux');
        configNiveaux.style.display = e.target.value === 'niveaux' ? 'block' : 'none';
      });
    });
  }
  
  // ... autres étapes similaires
  
  async terminer() {
    // Construire l'objet pratique à partir de this.donnees
    const pratique = {
      id: this.genererIdUnique(),
      nom: this.donnees.nom,
      auteur: 'Utilisateur',
      description: this.donnees.description,
      actif: false,
      config: this.construireConfig()
    };
    
    // Sauvegarder
    await ProfilManager.sauvegarderProfil(profil);
    
    // Afficher confirmation
    afficherNotification('Pratique créé avec succès!');
    
    // Proposer d'activer
    if (confirm('Voulez-vous activer ce pratique maintenant ?')) {
      await ProfilManager.changerProfilActif(profil.id);
    }
    
    naviguerVers('tableau-bord');
  }
}
```

---

## 📅 Plan d'implémentation (3 jours avec Max 20x)

### Jour 1 : Fondations (24 novembre)

**Matin (3-4h)**
1. ✅ Créer `js/profils.js`
   - Classe `ProfilEvaluation`
   - Classe `ProfilManager`
   - Méthodes de validation
   
2. ✅ Créer `js/profils-predefinis.js`
   - Migrer ton système PAN-Maîtrise vers un profil
   - Créer pratique de Bruno (PAN-Standards 5 niveaux)
   - Créer pratique sommative classique

**Après-midi (3-4h)**
3. ✅ Modifier IndexedDB schema
   - Ajouter store `profils`
   - Ajouter champ `profilId` dans store `cours`
   
4. ✅ Tests initiaux
   - Charger pratique PAN-Maîtrise
   - Valider structure
   - Vérifier calculs de base

**Livrable J1 :** Architecture de pratiques fonctionnelle avec 3 pratiques prédéfinis

---

### Jour 2 : Adaptation des modules (25 novembre)

**Matin (3-4h)**
1. ✅ Adapter `js/evaluation.js`
   - Utiliser `profil.config.echelle` au lieu de localStorage
   - Rendre l'affichage dynamique selon type d'échelle
   - Gérer conversion niveaux ↔ pourcentages

2. ✅ Adapter `js/profil-etudiant.js`
   - Utiliser `profil.calculerNotFinale()`
   - Utiliser `profil.interpreterNiveau()` pour indices A-C-P
   - Adapter affichage selon terminologie du profil

**Après-midi (3-4h)**
3. ✅ Adapter autres modules critiques
   - `js/echelles.js` → utiliser profil
   - `js/grilles.js` → critères selon profil
   - `js/productions.js` → pondération selon profil
   
4. ✅ Tests avec pratiques différents
   - Créer un cours avec pratique PAN-Maîtrise
   - Créer un cours avec pratique Bruno
   - Vérifier calculs différents

**Livrable J2 :** Modules adaptés, application fonctionnelle avec 2+ profils

---

### Jour 3 : Interface utilisateur (26 novembre)

**Matin (3-4h)**
1. ✅ Créer `js/interface-selection-profil.js`
   - Écran de bienvenue
   - Sélection de pratique au premier lancement
   - Changement de pratique depuis Réglages

2. ✅ Créer wizard de création personnalisée (version simplifiée)
   - 8 étapes guidées
   - Validation à chaque étape
   - Génération du JSON final

**Après-midi (3-4h)**
3. ✅ Import/Export de profils
   - Exporter un pratique en JSON
   - Importer un pratique partagé
   - Partager pratiques entre utilisateurs

4. ✅ Tests et corrections
   - Tester tous les profils
   - Vérifier cohérence des calculs
   - Corriger bugs identifiés

**Livrable J3 :** Interface complète, wizard fonctionnel, import/export

---

### 28 novembre : Distribution Beta 92

**Matin (2h)**
1. ✅ Documentation
   - Guide utilisateur : "Choisir sa pratique"
   - Documentation technique : structure pratiques configurables
   - Vidéo démo : créer une pratique personnalisée

2. ✅ Préparation distribution
   - Notes de version Beta 92
   - Liste des 4 pratiques configurables incluses
   - Instructions pour Bruno

**Après-midi (1h)**
3. ✅ Distribution
   - Publier Beta 92 sur blog
   - Envoyer à Bruno
   - Annoncer dans Labo PAN

**Livrable final :** Beta 92 avec support pratiques configurables distribuée

---

## ✅ Critères de succès

### Critères techniques
- [ ] 4+ pratiques prédéfinies fonctionnelles
- [ ] Tous les modules adaptés utilisent `pratique.config`
- [ ] Calculs de notes corrects pour chaque pratique
- [ ] Wizard de création guide l'utilisateur pas-à-pas
- [ ] Import/Export de pratiques fonctionnel
- [ ] Tests validés sur Safari + Chrome

### Critères utilisateur
- [ ] Bruno peut utiliser l'app avec son système 5 niveaux
- [ ] Marie-Hélène peut utiliser l'app en mode sommative
- [ ] Interface claire pour choisir/créer une pratique
- [ ] Documentation compréhensible pour non-techniques

### Critères de maintenabilité
- [ ] Aucune logique codée en dur dans les modules
- [ ] Structure JSON des pratiques bien documentée
- [ ] Code modulaire et testable
- [ ] Pratiques partageables entre utilisateurs

---

## 🚨 Risques et mitigations

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Calculs complexes difficiles à généraliser | Moyenne | Élevé | Commencer par les 3 méthodes identifiées, ajouter cas spéciaux au besoin |
| Wizard trop complexe pour utilisateurs | Moyenne | Moyen | Version simplifiée d'abord, améliorer selon feedback |
| Bugs dans conversions niveaux ↔ % | Élevée | Élevé | Tests unitaires systématiques, validation à chaque étape |
| Manque de temps (3 jours serrés) | Moyenne | Moyen | Prioriser fonctionnalités essentielles, reporter wizard v2 si nécessaire |

---

## 📚 Références

### Documents de conception
- `ROADMAP VERSION 2 (11 nov 2025).txt` → Planification générale
- `NOTES_VERSION_0.89.md` → État actuel de l'architecture
- Cartographies (9 PDFs) → Pratiques recensées

### Articles de référence
- Chronique Bruno Voisard (24 nov 2025) → Système 5 niveaux détaillé
- Article Pédagogie collégiale (équipe chimie) → Fondements PAN

---

## 🎯 Vision à long terme

Cette architecture de pratiques ouvre la voie à :
- **Bibliothèque de pratiques partagées** : Les profs peuvent échanger leurs configurations
- **Pratiques disciplinaires** : Pratiques optimisées par discipline (maths, sciences, lettres)
- **Support multi-groupes avec pratiques différentes** : Un prof peut utiliser PAN en 101 et sommative en 102
- **Évolution incrémentale** : Ajouter méthodes de calcul sans casser l'existant

L'objectif est que **Codex Numeris devienne l'outil de référence pour TOUTES les pratiques d'évaluation**, pas seulement PAN-Maîtrise.

---

*Document créé le 24 novembre 2025*
*Mis à jour le 25 novembre 2025 (terminologie "pratique" vs "profil")*
*Auteur : Grégoire Bédard*
*Version : 1.1*
