# Analyse des 6 cartiques de notation
**Date**: 26 novembre 2025
**Auteur**: Claude Code
**Contexte**: Identification des pratiques non intégrées au système modulaire

---

## 📋 Vue d'ensemble

Cette analyse examine 6 cartographies d'enseignant·es pour déterminer lesquelles sont déjà représentées dans le système modulaire de Monitorage et lesquelles nécessitent une intégration.

### Pratiques déjà implémentées (référence)

| ID Pratique | Nom | Description | Fichier |
|-------------|-----|-------------|---------|
| `pan-maitrise` | PAN-Maîtrise (IDME 4 niveaux) | Grégoire Bédard - Littérature | `pratique-pan-maitrise.js` |
| `sommative` | Sommative traditionnelle | Moyenne pondérée | `pratique-sommative.js` |
| `pan-specifications` | PAN-Spécifications (François) | Pass/fail sur objectifs | Pratique configurable JSON |

**Système de pratiques configurables**: Le système supporte maintenant des pratiques JSON configurables via `PratiqueConfigurable` (Beta 92). Voir `SPEC_SYSTEME_PROFILS.md` et `CLARIFICATION_INTERFACE_PRATIQUES.md`.

---

## 🔍 Analyse détaillée des 6 cartographies

### 1. Étienne Labbé (Administration)

**Discipline**: Comptabilité et numérique
**Pratique**: PAN-Standards (3-5 niveaux)

#### Caractéristiques
- **Échelle**: 3-5 niveaux variables selon l'évaluation
- **Évaluations**: 3 (Examens écrits 30% + 30%, Travaux pratiques 40%)
- **Calcul**: Moyenne pondérée
- **Critères**: Variables selon type (examen vs travail pratique)
- **Seuils**: Va bien 80%, Difficulté 70%, Grande difficulté 60%

#### Analyse d'intégration
**✅ PRATIQUE DÉJÀ REPRÉSENTÉE**

**Pratique équivalente**: `sommative` (sommative traditionnelle)

**Raisons**:
- Calcul par moyenne pondérée classique
- Échelle à niveaux convertissable en pourcentages
- Pas de mécanisme spécifique PAN (pas de N meilleurs artefacts, pas de reprises illimitées)
- Critères variables configurables via système de grilles existant

**Différences mineures**:
- Échelle à 3-5 niveaux au lieu de 0-100%: peut être géré par échelles personnalisées
- Seuils légèrement différents (80/70/60 vs défaut 85/80/70): configurables dans Réglages

**Actions requises**: ✅ Aucune (pratique déjà supportée)

---

### 2. Hélène Chabot (Philosophie)

**Discipline**: Philosophie et rationalité
**Pratique**: Hybride (Sommative majoritaire + éléments PAN-Standards)

#### Caractéristiques
- **Échelle**: Pourcentages (0-100%)
- **Évaluations**: 4 (Travaux pratiques 15% + 20%, Dissertations/analyses 35%, Portfolio 30%)
- **Calcul**: Moyenne pondérée avec portfolio évolutif
- **Particularité portfolio**:
  - Évalue progression longitudinale
  - Erreurs non pénalisées
  - Rétroactions formatives
- **Critères**: Fixes (exploitation genre, problématisation, argumentation, concepts)
- **Seuils**: Va bien 70%, Difficulté 60%, Grande difficulté 50%

#### Analyse d'intégration
**✅ PRATIQUE DÉJÀ REPRÉSENTÉE**

**Pratique équivalente**: `sommative` avec ajustement pondérations

**Raisons**:
- Calcul fondamentalement sommatif (moyenne pondérée)
- Portfolio 30% = une évaluation parmi d'autres (pas de sélection N meilleurs)
- Pas de reprises illimitées ou mécanismes PAN structurels
- Critères fixes configurables via grilles

**Différences mineures**:
- Portfolio évalue progression mais reste une note finale pondérée
- Seuils 70/60/50 vs défaut 85/80/70: configurables
- Critères philosophiques spécifiques: grille personnalisée

**Actions requises**: ✅ Aucune (pratique déjà supportée)

**Note pédagogique**: Le portfolio d'Hélène est un **outil formatif** qui génère une note sommative. Ce n'est pas un portfolio PAN avec artefacts sélectionnables.

---

### 3. Isabelle Ménard (Biologie)

**Discipline**: Anatomie et physiologie 3
**Pratique**: PAN-Standards avec jugement global

#### Caractéristiques
- **Échelle**: Niveaux PAN (pas de % explicites)
- **Évaluations**: 11 (Examens écrits + Projets posters anatomie)
- **Calcul**: **Jugement global** sur progression (pas de formule mathématique stricte)
- **Particularité**:
  - Progression sans calcul rigoureux
  - Critères sur projets uniquement (pas examens)
  - Ne utilise pas de pourcentages pour seuils
  - Détection basée sur comportements (désengagement, refus rencontres)
- **Approche**: Qualitative, holistique, relationnelle

#### Analyse d'intégration
**🟠 PRATIQUE PARTIELLEMENT NOUVELLE**

**Pratique la plus proche**: `pan-maitrise` (PAN-Maîtrise Grégoire)

**Différences majeures**:
1. **Absence de formule de calcul**: Isabelle ne fait PAS de moyenne mathématique
2. **Jugement professionnel global**: Décision basée sur observation longitudinale
3. **Pas de seuils chiffrés**: Pas de "75% = Maîtrisé"
4. **Détection comportementale**: Désengagement relationnel vs défis académiques

**Actions requises**: 🟡 **Configuration JSON possible, avec limitations**

**Recommandations**:
1. **Option A** (recommandée): Créer une pratique configurable `pan-jugement-global`
   - Échelle: Niveaux qualitatifs (I, D, M, E)
   - Calcul: "Mode" des derniers N niveaux (niveau le plus fréquent)
   - Pas de moyenne arithmétique
   - Seuils: Basés sur fréquence niveaux (ex: "3 M sur 4 dernières évaluations = Maîtrisé")

2. **Option B**: Utiliser `pan-maitrise` avec ajustements
   - Configurer N = tous les artefacts (pas juste N meilleurs)
   - Interpréter la moyenne comme "tendance centrale"
   - Ajouter note explicative sur jugement professionnel

**Note pédagogique**: La pratique d'Isabelle est **difficilement automatisable** car elle repose sur le jugement professionnel contextuel. Le système peut **soutenir** son processus décisionnel mais ne peut pas le remplacer.

---

### 4. Jordan Raymond (Philosophie)

**Discipline**: Philosophie 101
**Pratique**: Sommative avec mécanisme de remplacement

#### Caractéristiques
- **Échelle**: Pourcentages (0-100%)
- **Évaluations**: 4 + activités de classe
  - Examen mi-session (10%) + Examen final (20%)
  - Texte mi-session (20%) + Texte final (40%)
  - Autres: Notes de lecture, activités classe, textes réflexifs (avec points de complétion)
- **Calcul spécial**: **Mécanisme de remplacement**
  - Examen final (20%) peut remplacer examen mi-session (10%) si note supérieure
  - Texte final (40%) peut remplacer texte mi-session (20%) si note supérieure
- **Critères**: Variables selon type (précision pour examens, argumentation/conceptualisation pour textes)
- **Seuils**: Va bien 80%, Difficulté 60%, Grande difficulté 50%

#### Analyse d'intégration
**🔴 PRATIQUE NOUVELLE (mécanisme unique)**

**Pratique la plus proche**: `sommative` (mais avec logique de remplacement absente)

**Différences majeures**:
1. **Mécanisme de remplacement automatique**: Si note finale > note mi-session, elle la remplace
2. **Philosophie**: Valorise la progression (note finale peut "racheter" échec mi-parcours)
3. **Logique conditionnelle**: Calcul change selon les notes obtenues
4. **Pas de moyenne simple**: Nécessite comparaisons et substitutions

**Besoin d'implémentation**:
- ✅ Nouveau type de calcul: `remplacement-progression`
- Logique: `max(note_mi_session, note_finale)` pour chaque paire d'évaluations
- Configuration JSON:
  ```json
  "calcul_note": {
    "type": "remplacement-progression",
    "paires": [
      {"evaluation_A": "examen-mi-session", "evaluation_B": "examen-final", "poids_A": 10, "poids_B": 20},
      {"evaluation_A": "texte-mi-session", "evaluation_B": "texte-final", "poids_A": 20, "poids_B": 40}
    ],
    "autres_evaluations": [
      {"nom": "activites-classe", "poids": 10}
    ]
  }
  ```

**Actions requises**: 🔴 **Nouvelle fonctionnalité à développer**

**Priorité**: Moyenne (cas d'usage spécifique mais intéressant)

**Complexité**: Modérée (logique conditionnelle, pas de calcul complexe)

**Fichiers à modifier**:
1. `js/pratiques/pratique-configurable.js`: Ajouter support `type: "remplacement-progression"`
2. `js/portfolio.js`: Implémenter logique de comparaison et remplacement
3. Documentation: Ajouter exemple dans `SPEC_SYSTEME_PROFILS.md`

---

### 5. Michel Baillargeon (Mathématiques)

**Discipline**: Calcul différentiel
**Pratique**: PAN-Standards avec objectifs pondérés

#### Caractéristiques
- **Échelle**: Niveaux PAN par objectif
- **Évaluations**: 8 (Examens écrits + Présentations orales + Quiz)
- **Calcul spécial**: **13 objectifs en mode PAN avec pondérations variables**
  - Chaque objectif évalué indépendamment (mode PAN)
  - Certains objectifs "intégrateurs" valent plus (ex: 15% vs 5%)
  - Note finale = moyenne pondérée des 13 objectifs
- **Critères**: Variables selon objectif
- **Seuils**: Va bien 75%, Difficulté 60%, Grande difficulté 50%
- **Automation souhaitée**: Michel veut automatiser tâches récurrentes

#### Analyse d'intégration
**🟠 PRATIQUE PARTIELLEMENT NOUVELLE (structure objectifs)**

**Pratique la plus proche**: `pan-maitrise` ou `pan-specifications`

**Différences majeures**:
1. **Structure par objectifs multiples**: 13 objectifs au lieu de 1 compétence globale
2. **Pondérations variables**: Pas tous les objectifs égaux (certains "intégrateurs")
3. **Mode PAN par objectif**: Chaque objectif évalué en mode maîtrise
4. **Calcul hybride**: PAN pour objectifs individuels, moyenne pondérée pour note finale

**Actions requises**: 🟡 **Configuration JSON possible avec extensions**

**Recommandations**:
1. **Option A** (recommandée): Créer pratique configurable `pan-objectifs-ponderes`
   ```json
   "structure_evaluations": {
     "type": "objectifs-multiples",
     "objectifs": [
       {"id": "obj1", "nom": "Dérivées", "poids": 10},
       {"id": "obj2", "nom": "Limites", "poids": 8},
       {"id": "obj3", "nom": "Intégration (intégrateur)", "poids": 15},
       ...
     ]
   },
   "calcul_note": {
     "type": "pan-par-objectif",
     "nombre_artefacts_par_objectif": 3,
     "mode_combinaison": "moyenne_ponderee_objectifs"
   }
   ```

2. **Option B**: Utiliser `pan-specifications` avec ajustement pondérations
   - Chaque objectif = un "standard" ou "spécification"
   - Support pondérations variables (déjà prévu dans specs futures)

**Complexité**: Modérée à élevée (nécessite refonte structure calculs)

**Bénéfice**: **Très forte demande** (Michel veut automatisation, cas d'usage fréquent en sciences)

**Priorité**: Élevée (applicable à plusieurs disciplines: math, chimie, physique)

**Fichiers à créer/modifier**:
1. Nouveau fichier: `js/pratiques/pratique-pan-objectifs.js` ou configuration JSON
2. `js/portfolio.js`: Support calcul multi-objectifs
3. `js/profil-etudiant.js`: Affichage détaillé par objectif
4. Documentation: Guide spécifique pratiques par objectifs

---

### 6. Olivier Lalonde (Géographie)

**Discipline**: Introduction en géographie
**Pratique**: Sommative traditionnelle

#### Caractéristiques
- **Échelle**: Pourcentages (0-100%)
- **Évaluations**: 5 (Examens 55%, Travaux pratiques 45%, Quiz formatifs non notés)
- **Calcul**: Moyenne pondérée classique
- **Critères**: Variables (méthodologie dans travaux, connaissances dans examens)
- **Seuils**: Va bien 70%, Difficulté 65%, Grande difficulté 55%
- **Besoin**: Identifier éléments de compétence spécifiques (forces vs faiblesses)

#### Analyse d'intégration
**✅ PRATIQUE DÉJÀ REPRÉSENTÉE**

**Pratique équivalente**: `sommative` (sommative traditionnelle)

**Raisons**:
- Calcul par moyenne pondérée stricte
- Pas de mécanismes PAN ou alternatifs
- Quiz formatifs = non comptés dans calcul (supporté par système actuel)
- Critères variables = grilles personnalisées

**Différences mineures**:
- Seuils 70/65/55 vs défaut 85/80/70: configurables
- Besoin d'identification forces/faiblesses: déjà supporté par système SRPNF (ou grilles personnalisées)

**Actions requises**: ✅ Aucune (pratique déjà supportée)

**Note**: Le besoin d'Olivier pour "identifier éléments de compétence spécifiques" est déjà adressé par le système de grilles de critères avec barres SRPNF (forces ≥75%, défis <75%).

---

## 📊 Tableau récapitulatif

| Enseignant·e | Discipline | Pratique | Statut intégration | Priorité | Actions requises |
|--------------|------------|----------|-------------------|----------|------------------|
| **Étienne Labbé** | Administration | PAN-Standards 3-5 niveaux | ✅ Supportée (`sommative`) | — | Aucune |
| **Hélène Chabot** | Philosophie | Hybride Som+PAN portfolio | ✅ Supportée (`sommative`) | — | Aucune |
| **Isabelle Ménard** | Biologie | PAN-Jugement global | 🟠 Partiellement nouvelle | Moyenne | Config JSON `pan-jugement-global` |
| **Jordan Raymond** | Philosophie | Sommative + remplacement | 🔴 Nouvelle | Moyenne | Développer `remplacement-progression` |
| **Michel Baillargeon** | Mathématiques | PAN-Objectifs pondérés | 🟠 Partiellement nouvelle | **Élevée** | Config JSON `pan-objectifs-ponderes` |
| **Olivier Lalonde** | Géographie | Sommative classique | ✅ Supportée (`sommative`) | — | Aucune |

**Légende**:
- ✅ **Supportée**: Pratique déjà représentée, aucune action requise
- 🟠 **Partiellement nouvelle**: Adaptable avec configuration JSON
- 🔴 **Nouvelle**: Nécessite développement code nouveau

---

## 🎯 Recommandations d'intégration

### Pratiques déjà supportées (3/6)
✅ Aucune action requise pour:
- Étienne Labbé (PAN-Standards → `sommative`)
- Hélène Chabot (Hybride → `sommative`)
- Olivier Lalonde (Sommative → `sommative`)

**Raison**: Le système actuel avec pratique `sommative` + échelles personnalisées + grilles personnalisées couvre ces cas d'usage.

---

### Pratiques partiellement nouvelles (2/6)

#### 1. Isabelle Ménard: PAN-Jugement global
**Priorité**: Moyenne
**Approche recommandée**: Configuration JSON

**Fichier à créer**: `Autres pratiques de notation/pan-jugement-global-isabelle.json`

```json
{
  "id": "pan-jugement-global-isabelle",
  "nom": "PAN-Jugement global (Isabelle Ménard)",
  "auteur": "Isabelle Ménard",
  "discipline": "Biologie",
  "description": "Pratique basée sur jugement professionnel avec évaluation qualitative de la progression",

  "echelle": {
    "type": "IDME",
    "niveaux": [
      {"code": "I", "nom": "Insuffisant", "min": 0, "max": 0.64, "valeur": 0.50},
      {"code": "D", "nom": "Développement", "min": 0.65, "max": 0.74, "valeur": 0.70},
      {"code": "M", "nom": "Maîtrisé", "min": 0.75, "max": 0.84, "valeur": 0.80},
      {"code": "E", "nom": "Étendu", "min": 0.85, "max": 1.00, "valeur": 0.90}
    ]
  },

  "structure_evaluations": {
    "type": "portfolio-integral",
    "description": "Tous les artefacts sont considérés, pas de sélection des N meilleurs"
  },

  "calcul_note": {
    "type": "mode-statistique",
    "description": "Le niveau final est le mode (niveau le plus fréquent) des N derniers artefacts",
    "nombre_artefacts": 11,
    "fenetre_recente": 4,
    "regles_mode": {
      "si_egalite": "niveau_superieur",
      "poids_progression": "favorise_niveaux_recents"
    }
  },

  "systeme_reprises": {
    "type": "aucune",
    "description": "Pas de système de reprises formel"
  },

  "detection_defis": {
    "type": "comportementale",
    "criteres": [
      "Désengagement en classe",
      "Refus de rencontrer l'enseignante",
      "Absence de progression visible"
    ],
    "seuils": {
      "note": "Pas de seuils chiffrés rigides, jugement contextuel"
    }
  }
}
```

**Limitations**:
- Le système calcule un mode statistique, mais Isabelle devra toujours exercer son jugement professionnel
- Les critères comportementaux ne sont pas automatisables (restent qualitatifs)
- Recommandation: Afficher un avertissement "Cette pratique nécessite un jugement professionnel final"

---

#### 2. Michel Baillargeon: PAN-Objectifs pondérés
**Priorité**: **Élevée** (fort potentiel de réutilisation)
**Approche recommandée**: Configuration JSON (si possible) ou nouveau module

**Fichier à créer**: `Autres pratiques de notation/pan-objectifs-ponderes-michel.json`

```json
{
  "id": "pan-objectifs-ponderes-michel",
  "nom": "PAN-Objectifs pondérés (Michel Baillargeon)",
  "auteur": "Michel Baillargeon",
  "discipline": "Mathématiques - Calcul différentiel",
  "description": "13 objectifs évalués en mode PAN avec pondérations variables selon importance",

  "echelle": {
    "type": "IDME",
    "niveaux": [
      {"code": "I", "nom": "Insuffisant", "min": 0, "max": 0.64, "valeur": 0.50},
      {"code": "D", "nom": "Développement", "min": 0.65, "max": 0.74, "valeur": 0.70},
      {"code": "M", "nom": "Maîtrisé", "min": 0.75, "max": 0.84, "valeur": 0.80},
      {"code": "E", "nom": "Étendu", "min": 0.85, "max": 1.00, "valeur": 0.90}
    ]
  },

  "structure_evaluations": {
    "type": "objectifs-multiples",
    "objectifs": [
      {"id": "obj1", "nom": "Limites et continuité", "poids": 8, "type": "fondamental"},
      {"id": "obj2", "nom": "Dérivées simples", "poids": 8, "type": "fondamental"},
      {"id": "obj3", "nom": "Dérivées composées", "poids": 10, "type": "integrateur"},
      {"id": "obj4", "nom": "Applications dérivées", "poids": 12, "type": "integrateur"},
      {"id": "obj5", "nom": "Optimisation", "poids": 15, "type": "integrateur"},
      {"id": "obj6", "nom": "Analyse graphique", "poids": 7, "type": "fondamental"},
      {"id": "obj7", "nom": "Théorèmes fondamentaux", "poids": 10, "type": "integrateur"},
      {"id": "obj8", "nom": "Intégration", "poids": 12, "type": "integrateur"},
      {"id": "obj9", "nom": "Applications intégrales", "poids": 8, "type": "fondamental"},
      {"id": "obj10", "nom": "Séries", "poids": 5, "type": "fondamental"},
      {"id": "obj11", "nom": "Modélisation", "poids": 5, "type": "fondamental"},
      {"id": "obj12", "nom": "Communication mathématique", "poids": 5, "type": "transversal"},
      {"id": "obj13", "nom": "Rigueur démonstrative", "poids": 5, "type": "transversal"}
    ]
  },

  "calcul_note": {
    "type": "pan-par-objectif",
    "description": "Chaque objectif est évalué en mode PAN (N meilleurs artefacts), puis moyenne pondérée finale",
    "nombre_artefacts_par_objectif": 3,
    "mode_selection": "N_meilleurs",
    "mode_combinaison": "moyenne_ponderee_objectifs",
    "normalisation": "poids_total_100"
  },

  "systeme_reprises": {
    "type": "par-objectif",
    "description": "Reprises possibles pour chaque objectif individuellement",
    "limite": "illimitees"
  },

  "detection_defis": {
    "type": "par-objectif",
    "seuils": {
      "fragile": 0.70,
      "acceptable": 0.75,
      "bon": 0.80
    },
    "regles": [
      "Un objectif intégrateur < 0.70 déclenche alerte prioritaire",
      "3+ objectifs fondamentaux < 0.75 déclenche alerte générale"
    ]
  }
}
```

**Complexité technique**:
- Nécessite refonte structure `indicesCP` pour supporter multi-objectifs
- `profil-etudiant.js` doit afficher tableau par objectif
- `portfolio.js` doit calculer indice P par objectif, puis combiner

**Estimation travail**: 3-4 jours de développement

**Bénéfice**: Très élevé (applicable math, chimie, physique, biologie)

---

### Pratiques entièrement nouvelles (1/6)

#### Jordan Raymond: Sommative avec remplacement
**Priorité**: Moyenne
**Approche recommandée**: Extension du système `sommative`

**Fichier à créer**: `Autres pratiques de notation/sommative-remplacement-jordan.json`

```json
{
  "id": "sommative-remplacement-jordan",
  "nom": "Sommative avec remplacement (Jordan Raymond)",
  "auteur": "Jordan Raymond",
  "discipline": "Philosophie",
  "description": "Évaluation finale peut remplacer évaluation mi-session si note supérieure",

  "echelle": {
    "type": "pourcentages",
    "min": 0,
    "max": 100
  },

  "structure_evaluations": {
    "type": "sommative-progressive",
    "paires_remplacement": [
      {
        "evaluation_initiale": "examen-mi-session",
        "evaluation_finale": "examen-final",
        "poids_initial": 10,
        "poids_final": 20,
        "regle": "max"
      },
      {
        "evaluation_initiale": "texte-mi-session",
        "evaluation_finale": "texte-final",
        "poids_initial": 20,
        "poids_final": 40,
        "regle": "max"
      }
    ],
    "autres_evaluations": [
      {"nom": "activites-classe", "poids": 10, "type": "completion"}
    ]
  },

  "calcul_note": {
    "type": "remplacement-progression",
    "description": "Pour chaque paire, prendre max(note_initiale, note_finale)",
    "formule": "Pour chaque paire: utiliser max(evaluation_initiale, evaluation_finale) × poids correspondant"
  },

  "systeme_reprises": {
    "type": "automatique-progressif",
    "description": "Le système de remplacement constitue un mécanisme de reprise automatique"
  },

  "detection_defis": {
    "type": "progression-bloquee",
    "seuils": {
      "alerte": "Si note_finale ≤ note_initiale pour les deux paires (aucune progression)"
    }
  }
}
```

**Complexité technique**:
- Logique conditionnelle dans `portfolio.js`: `calculerNoteSommativeAvecRemplacement()`
- Affichage dans `profil-etudiant.js`: Indiquer quelle note a été retenue
- Interface `productions.js`: Marquer paires d'évaluations liées

**Estimation travail**: 2-3 jours de développement

**Bénéfice**: Moyen (cas d'usage spécifique mais intéressant pédagogiquement)

---

## 📅 Plan d'intégration proposé

### Phase 1: Pratiques configurables JSON (1 semaine)
**Priorité**: Moyenne à Élevée

1. ✅ Créer fichiers JSON pour 3 nouvelles pratiques:
   - `pan-jugement-global-isabelle.json`
   - `pan-objectifs-ponderes-michel.json`
   - `sommative-remplacement-jordan.json`

2. ✅ Documenter dans `SPEC_SYSTEME_PROFILS.md`:
   - Section sur mode-statistique (jugement global)
   - Section sur objectifs multiples pondérés
   - Section sur calcul avec remplacement

3. ✅ Tester chargement via `PratiqueManager`:
   - Vérifier parsing JSON
   - Vérifier validation structure
   - Vérifier affichage dans interface Pratiques

### Phase 2: Extensions code (2-3 semaines)
**Priorité**: Élevée pour objectifs pondérés, Moyenne pour autres

1. **Objectifs pondérés** (Michel - Priorité ÉLEVÉE):
   - Modifier `js/portfolio.js`: Support calcul multi-objectifs
   - Modifier `js/profil-etudiant.js`: Affichage tableau par objectif
   - Créer `js/pratiques/pratique-pan-objectifs.js` (ou étendre `PratiqueConfigurable`)
   - Tests: Valider avec 13 objectifs de Michel

2. **Remplacement progression** (Jordan - Priorité MOYENNE):
   - Modifier `js/portfolio.js`: Logique conditionnelle `max()`
   - Modifier `js/productions.js`: Interface paires liées
   - Créer fonction `calculerNoteSommativeAvecRemplacement()`
   - Tests: Valider avec 2 paires de Jordan

3. **Jugement global** (Isabelle - Priorité MOYENNE):
   - Implémenter calcul mode statistique dans `PratiqueConfigurable`
   - Ajouter avertissement "Jugement professionnel requis"
   - Tests: Valider avec 11 évaluations d'Isabelle

### Phase 3: Documentation et tests (1 semaine)

1. Créer guides spécifiques:
   - `GUIDE_PRATIQUE_OBJECTIFS_PONDERES.md`
   - `GUIDE_PRATIQUE_REMPLACEMENT.md`
   - `GUIDE_PRATIQUE_JUGEMENT_GLOBAL.md`

2. Mettre à jour `SPEC_SYSTEME_PROFILS.md`:
   - Exemples complets des 3 nouvelles pratiques
   - Schémas flux de calcul

3. Tests utilisateurs:
   - Valider avec Michel (objectifs pondérés)
   - Valider avec Jordan (remplacement)
   - Valider avec Isabelle (jugement global)

---

## 🎯 Résumé exécutif

### Pratiques analysées: 6
- ✅ **Déjà supportées**: 3 (Étienne, Hélène, Olivier)
- 🟠 **Partiellement nouvelles**: 2 (Isabelle, Michel)
- 🔴 **Entièrement nouvelles**: 1 (Jordan)

### Actions requises
**Minimum viable** (config JSON seulement):
- Créer 3 fichiers JSON
- Documenter nouvelles structures dans specs
- Tester chargement dans interface

**Complet** (avec extensions code):
- Développer support objectifs pondérés (Michel) - **Priorité ÉLEVÉE**
- Développer support remplacement (Jordan) - Priorité moyenne
- Développer support jugement global (Isabelle) - Priorité moyenne

### Estimation temps total
- Phase 1 (JSON): 1 semaine
- Phase 2 (Code): 2-3 semaines
- Phase 3 (Docs/tests): 1 semaine
- **Total**: 4-5 semaines pour intégration complète

### Recommandation
**Démarrer Phase 1 immédiatement** (créer les 3 JSON) pour:
1. Valider faisabilité approche configuration
2. Identifier blocages techniques rapidement
3. Permettre tests précoces avec enseignant·es

**Prioriser Michel Baillargeon** (objectifs pondérés) car:
- Forte demande (automation souhaitée)
- Applicable à plusieurs disciplines (math, sciences)
- Impact pédagogique élevé

---

*Document créé le 26 novembre 2025*
*Pour analyse des cartographies de pratiques de notation*
