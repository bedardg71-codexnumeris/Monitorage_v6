# Cartes des Testeurs - Informations Complètes

**Date**: 26 novembre 2025
**Version**: Beta 91.1
**Auteur**: Grégoire Bédard (Labo Codex)

---

## 📋 Vue d'ensemble

Ce document centralise les informations complètes sur les 10 testeurs/enseignants du système de monitorage pédagogique, incluant leurs établissements, disciplines et pratiques de notation.

### Récapitulatif

| # | Enseignant·e | Établissement | Discipline | Pratique | Statut |
|---|--------------|---------------|------------|----------|--------|
| 1 | Bruno Voisard | Cégep Laurendeau | Chimie | PAN-Standards (5 niveaux) | ✅ |
| 2 | Marie-Hélène Leduc | Cégep Valleyfield | Littérature | Sommative traditionnelle | ✅ |
| 3 | François Arseneault-Hubert | Cégep Laurendeau | Chimie | PAN-Spécifications | ✅ |
| 4 | Grégoire Bédard | Cégep Drummond | Littérature | PAN-Maîtrise (IDME) | ✅ |
| 5 | Michel Baillargeon | Cégep Beauce-Appalaches | Mathématiques | PAN-Objectifs pondérés | ✅ |
| 6 | Jordan Raymond-Robidoux | Cégep Drummond | Philosophie | Sommative + remplacement | ✅ |
| 7 | Etienne Labbé | Cégep de l'Abitibi-Témiscamingue | Administration | Sommative standard | ✅ |
| 8 | Hélène Chabot | Cégep Gérald-Godin | Philosophie | Sommative standard | ✅ |
| 9 | Isabelle Ménard | Collège Champlain Lennoxville | Biologie | PAN-Jugement global | ✅ |
| 10 | Olivier Lalonde | Collège Lionel-Groulx | Géographie | Sommative standard | ✅ |

**Légende:**
- ✅ Pratique documentée et configurée (10/10 testeurs)

---

## 👤 Fiches individuelles

### 1. Bruno Voisard

**Établissement**: Cégep André-Laurendeau
**Discipline**: Chimie
**Cours**: Chimie générale

#### Pratique de notation
**Type**: PAN-Standards (5 niveaux)

**Caractéristiques**:
- **Échelle**: 5 niveaux (0, 1, 2, 3, 4)
  - 0 (Données insuffisantes): 0%
  - 1 (En apprentissage): 50%
  - 2 (Ça y est presque!): 62.5%
  - 3 (Acquis): 75%
  - 4 (Avancé): 100%
- **10 standards** avec 4 standards terminaux (7, 8, 9, 10)
- **Plafonnement**: Si moyenne standards terminaux < 60%, note plafonnée à 55%
- **Reprises illimitées**: 3 occasions formelles (sem. 8, 14, 16) + reprises bureau
- **Niveau non rétrogradable**: Une fois atteint, le niveau ne peut pas descendre

#### Fichiers associés
- ✅ Cartographie: `Cartographie Bruno Voisard Chimie.pdf`
- ✅ Configuration: `js/pratiques/pratiques-predefines.js` (PRATIQUE_PAN_STANDARDS_BRUNO)

#### Statut
✅ **Complètement documenté et configuré**

**Notes techniques**:
- Configuration JSON complète dans pratiques prédéfinies
- Système de standards avec critères essentiels
- Support plafonnement conditionnel

---

### 2. Marie-Hélène Leduc

**Établissement**: Cégep de Valleyfield
**Discipline**: Littérature
**Cours**: Littérature (601)

#### Pratique de notation
**Type**: Sommative traditionnelle

**Caractéristiques**:
- **Échelle**: Pourcentages (0-100%)
- **Évaluations**:
  - Analyse partielle (15%)
  - Portfolio 5-7 travaux (20%)
  - Travail équipe (15%)
  - Analyse finale (50%) avec **double verrou**
- **Double verrou**: Analyse finale doit être ≥60% pour passer (sinon note plafonnée à 55%)
- **Critères fixes**: Pertinence/justesse/clarté, Qualité langue, Structure, Cohérence
- **Seuils**: Va bien 75%, Difficulté 65%, Grande difficulté 55%

#### Fichiers associés
- ✅ Cartographie: `Cartographie Marie-Hélène Leduc Littérature.pdf`
- ✅ Configuration: `js/pratiques/pratiques-predefines.js` (PRATIQUE_SOMMATIVE_TRADITIONNELLE)

#### Statut
✅ **Complètement documenté et configuré**

**Notes techniques**:
- Configuration JSON complète dans pratiques prédéfinies
- Moyenne pondérée classique avec double verrou
- Critères fixes appliqués à toutes les évaluations

---

### 3. François Arseneault-Hubert

**Établissement**: Cégep André-Laurendeau
**Discipline**: Chimie
**Cours**: Chimie 202

#### Pratique de notation
**Type**: PAN-Spécifications (notes fixes paliers)

**Caractéristiques**:
- **Notes fixes**: 50%, 60%, 80%, 100%
- **Système d'objectifs par palier**:
  - 60%: Test 1 OU Test 2 + 1 prise position + 1 présentation
  - 80%: Test 1 ET Test 2 + Tout de 60% + Bilan portfolio
  - 100%: Tout de 80% + 2e prise position + Bilan supérieur
- **Philosophie**: Pass/fail sur objectifs, notes fixes encouragent l'excellence

#### Fichiers associés
- ✅ Cartographie: `Cartographie François Arseneault-Hubert Chimie.pdf`
- ✅ Configuration: `js/pratiques/config-francois-chimie.js`
- ✅ Implémentation: Utilise `PratiquePanSpecifications`

#### Statut
✅ **Complètement documenté et configuré**

**Notes techniques**:
- Fonction de création: `creerPratiqueFrancoisChimie()`
- Fonction de test: `testerPratiqueFrancois()`
- Opérateurs logiques: Support OU/ET pour objectifs composés

---

### 4. Grégoire Bédard

**Établissement**: Cégep de Drummondville
**Discipline**: Littérature
**Cours**: Littérature et imaginaire (103), Écriture et littérature (601)

#### Pratique de notation
**Type**: PAN-Maîtrise avec échelle IDME

**Caractéristiques**:
- **Échelle IDME**: 4 niveaux basés sur SOLO
  - I (Insuffisant): < 64%
  - D (Développement): 65-74%
  - M (Maîtrisé): 75-84%
  - E (Étendu): ≥ 85%
- **Critères SRPNF**: Structure, Rigueur, Plausibilité, Nuance, Français
- **Calcul P**: Moyenne des N meilleurs artefacts (3, 7 ou 12 selon configuration)
- **Reprises illimitées**: Favorise la maîtrise progressive

#### Fichiers associés
- ✅ Implémentation: `js/pratiques/pratique-pan-maitrise.js`
- ✅ Documentation: `ARCHITECTURE_PRATIQUES.md`

#### Statut
✅ **Pratique de référence du système (créateur)**

**Notes techniques**:
- Pratique par défaut du système
- Support découplage P_récent pour calcul R
- Détection défis par critère SRPNF
- Identification patterns (Stable, Montant, Descendant, Irrégulier)

---

### 5. Michel Baillargeon

**Établissement**: Cégep Beauce-Appalaches
**Discipline**: Mathématiques
**Cours**: Calcul différentiel (201-NYA)

#### Pratique de notation
**Type**: PAN-Objectifs pondérés (multi-objectifs)

**Caractéristiques**:
- **13 objectifs** avec pondérations variables (5% à 15%)
- **Types d'objectifs**:
  - Fondamentaux (6 obj): Concepts de base
  - Intégrateurs (5 obj): Compétences complexes
  - Transversaux (2 obj): Communication, rigueur
- **Calcul par objectif**: Mode PAN (3 meilleurs artefacts)
- **Note finale**: Σ(P_obj × poids) / 100
- **Objectif intégrateur principal**: Optimisation (15%)

#### Fichiers associés
- ✅ Cartographie: `Cartographie Michel Baillargeon Math.pdf`
- ✅ Configuration: `Autres pratiques de notation/pan-objectifs-ponderes-michel.json`
- ✅ Implémentation: `js/portfolio.js` (fonctions multi-objectifs)
- ✅ Documentation: `TEST_MULTI_OBJECTIFS.md`, `SYSTEME_MULTI_OBJECTIFS_COMPLET.md`

#### Statut
✅ **Pratique complète implémentée (Beta 91.1 - 26 nov 2025)**

**Notes techniques**:
- Fonctions: `calculerPerformanceParObjectif()`, `calculerNoteFinaleMultiObjectifs()`
- Configuration: `activerPratiqueMultiObjectifs()`
- Interface: Tableau des 13 objectifs dans profil étudiant
- Détection défis: Adaptée par type d'objectif (intégrateur prioritaire)

---

### 6. Jordan Raymond-Robidoux

**Établissement**: Cégep de Drummondville
**Discipline**: Philosophie
**Cours**: Philosophie 101

#### Pratique de notation
**Type**: Sommative avec mécanisme de remplacement progressif

**Caractéristiques**:
- **Échelle**: Pourcentages (0-100%)
- **Mécanisme de remplacement**:
  - Examen final (20%) peut remplacer examen mi-session (10%) si note supérieure
  - Texte final (40%) peut remplacer texte mi-session (20%) si note supérieur
- **Philosophie**: Valorise la progression (note finale "rachète" échec mi-parcours)
- **Autres évaluations**: Activités classe, notes de lecture (10%)

#### Fichiers associés
- ✅ Cartographie: `Cartographie Jordan Raymond Philo.pdf`
- ✅ Configuration: `Autres pratiques de notation/sommative-remplacement-jordan.json`
- ⚠️ Implémentation: À développer (logique conditionnelle `max()`)

#### Statut
🟡 **Configuration créée, implémentation code à compléter**

**Notes techniques**:
- Nécessite: Fonction `calculerNoteSommativeAvecRemplacement()`
- Logique: Pour chaque paire, `max(note_initiale, note_finale)`
- Complexité: Modérée (calcul conditionnel)
- Priorité: Moyenne

---

### 7. Etienne Labbé

**Établissement**: Cégep de l'Abitibi-Témiscamingue
**Discipline**: Administration et gestion
**Cours**: Comptabilité et numérique

#### Pratique de notation
**Type**: Sommative standard (équivalent PAN-Standards 3-5 niveaux)

**Caractéristiques**:
- **Échelle**: 3-5 niveaux variables selon évaluation
- **Évaluations**: 3 (Examens 60%, Travaux pratiques 40%)
- **Calcul**: Moyenne pondérée
- **Seuils**: Va bien 80%, Difficulté 70%, Grande difficulté 60%

#### Fichiers associés
- ✅ Cartographie: `Cartographie Étienne Labbé Admin.pdf`
- ✅ Pratique: Utilise `sommative` (déjà dans le système)
- ✅ Analyse: `ANALYSE_CARTOGRAPHIES.md` (section 1)

#### Statut
✅ **Pratique supportée par système existant**

**Notes techniques**:
- Aucune action requise
- Échelles personnalisables via interface
- Seuils configurables dans Réglages
- Critères variables via grilles personnalisées

---

### 8. Hélène Chabot

**Établissement**: Cégep Gérald-Godin
**Discipline**: Philosophie
**Cours**: Philosophie et rationalité

#### Pratique de notation
**Type**: Hybride (Sommative + portfolio évolutif)

**Caractéristiques**:
- **Échelle**: Pourcentages (0-100%)
- **Évaluations**: 4 (Travaux 35%, Dissertations 35%, Portfolio 30%)
- **Portfolio évolutif**:
  - Évalue progression longitudinale
  - Erreurs non pénalisées (formatif)
  - Génère une note sommative finale
- **Seuils**: Va bien 70%, Difficulté 60%, Grande difficulté 50%

#### Fichiers associés
- ✅ Cartographie: `Cartographie Hélène Chabot Philo.pdf`
- ✅ Pratique: Utilise `sommative` (déjà dans le système)
- ✅ Analyse: `ANALYSE_CARTOGRAPHIES.md` (section 2)

#### Statut
✅ **Pratique supportée par système existant**

**Notes pédagogiques**:
- Portfolio = outil formatif qui génère note sommative
- Différent du portfolio PAN (pas de sélection N meilleurs)
- Critères philosophiques: grille personnalisée

---

### 9. Isabelle Ménard

**Établissement**: Collège Champlain - Lennoxville (anglophone)
**Discipline**: Biologie
**Cours**: Anatomie et physiologie 3

#### Pratique de notation
**Type**: PAN-Standards avec jugement global

**Caractéristiques**:
- **Échelle**: Niveaux PAN qualitatifs (I, D, M, E)
- **Évaluations**: 11 (Examens + Projets posters anatomie)
- **Calcul**: **Jugement professionnel global** (pas de formule mathématique stricte)
- **Approche**: Mode statistique des N derniers artefacts
- **Détection**: Basée sur comportements (désengagement, refus rencontres)

#### Fichiers associés
- ✅ Cartographie: `Cartographie Isabelle Ménard Biologie.pdf`
- ✅ Configuration: `Autres pratiques de notation/pan-jugement-global-isabelle.json`
- ⚠️ Implémentation: À développer (mode statistique)

#### Statut
🟡 **Configuration créée, implémentation partielle**

**Notes pédagogiques**:
- Pratique **difficilement automatisable** (jugement contextuel)
- Système peut **soutenir** mais pas remplacer jugement professionnel
- Avertissement requis: "Jugement professionnel final nécessaire"

**Notes techniques**:
- Calcul mode statistique: Niveau le plus fréquent sur fenêtre récente
- Si égalité: Favoriser niveau supérieur
- Poids progression: Favoriser niveaux récents
- Complexité: Modérée
- Priorité: Moyenne

---

### 10. Olivier Lalonde

**Établissement**: Collège Lionel-Groulx
**Discipline**: Géographie
**Cours**: Introduction en géographie

#### Pratique de notation
**Type**: Sommative traditionnelle

**Caractéristiques**:
- **Échelle**: Pourcentages (0-100%)
- **Évaluations**: 5 (Examens 55%, Travaux pratiques 45%)
- **Calcul**: Moyenne pondérée classique
- **Quiz formatifs**: Non notés (exclus du calcul)
- **Besoin**: Identifier forces/faiblesses par critère
- **Seuils**: Va bien 70%, Difficulté 65%, Grande difficulté 55%

#### Fichiers associés
- ✅ Cartographie: `Cartographie Olivier Lalonde Géographie.pdf`
- ✅ Pratique: Utilise `sommative` (déjà dans le système)
- ✅ Analyse: `ANALYSE_CARTOGRAPHIES.md` (section 6)

#### Statut
✅ **Pratique supportée par système existant**

**Notes techniques**:
- Besoin identification forces/faiblesses: Déjà supporté par grilles SRPNF
- Barres de distribution par critère (≥75% = force, <75% = défi)
- Quiz formatifs: Type "formatif" exclus automatiquement

---

## 📊 Analyse par type de pratique

### Sommative standard (3 testeurs)
- ✅ **Etienne Labbé** (Administration)
- ✅ **Hélène Chabot** (Philosophie)
- ✅ **Olivier Lalonde** (Géographie)

**Système utilisé**: Pratique `sommative` (déjà implémentée)
**Actions requises**: Aucune

---

### PAN-Maîtrise (1 testeur)
- ✅ **Grégoire Bédard** (Littérature) - Créateur

**Système utilisé**: Pratique `pan-maitrise` (déjà implémentée)
**Actions requises**: Aucune

---

### PAN-Spécifications (1 testeur)
- ✅ **François Arseneault-Hubert** (Chimie)

**Système utilisé**: `PratiquePanSpecifications` avec config
**Fichier**: `config-francois-chimie.js`
**Actions requises**: Aucune (déjà complété)

---

### PAN-Objectifs pondérés (1 testeur)
- ✅ **Michel Baillargeon** (Mathématiques)

**Système utilisé**: Pratique multi-objectifs
**Fichier**: `pan-objectifs-ponderes-michel.json`
**Actions requises**: ✅ Complété (Beta 91.1)

---

### Sommative avec remplacement (1 testeur)
- 🟡 **Jordan Raymond-Robidoux** (Philosophie)

**Système prévu**: Extension sommative
**Fichier**: `sommative-remplacement-jordan.json`
**Actions requises**: Développer logique conditionnelle `max()`
**Priorité**: Moyenne
**Complexité**: Modérée (2-3 jours)

---

### PAN-Jugement global (1 testeur)
- 🟡 **Isabelle Ménard** (Biologie)

**Système prévu**: Mode statistique
**Fichier**: `pan-jugement-global-isabelle.json`
**Actions requises**: Implémenter mode statistique
**Priorité**: Moyenne
**Complexité**: Modérée (2-3 jours)

---

### PAN-Standards 5 niveaux (1 testeur)
- ✅ **Bruno Voisard** (Chimie)

**Système utilisé**: Configuration JSON
**Fichier**: `pratiques-predefines.js` (PRATIQUE_PAN_STANDARDS_BRUNO)
**Actions requises**: ✅ Complété

---

### Sommative traditionnelle (1 testeur)
- ✅ **Marie-Hélène Leduc** (Littérature)

**Système utilisé**: Configuration JSON
**Fichier**: `pratiques-predefines.js` (PRATIQUE_SOMMATIVE_TRADITIONNELLE)
**Actions requises**: ✅ Complété

---

## 🎯 Actions requises

### Priorité HAUTE
✅ **Aucune** - Toutes les pratiques sont documentées et configurées (10/10)

### Priorité MOYENNE
🟡 **Implémenter Jordan (remplacement)**:
- Développer logique conditionnelle
- Temps estimé: 2-3 jours
- Fichiers: `portfolio.js`, `productions.js`

🟡 **Implémenter Isabelle (jugement global)**:
- Développer mode statistique
- Temps estimé: 2-3 jours
- Fichiers: `pratique-configurable.js`

### Priorité BASSE
- Documentation guides spécifiques
- Tests utilisateurs étendus

---

## 📁 Répertoire des fichiers

### Cartographies (PDF)
```
Autres pratiques de notation/
├── Cartographie Bruno Voisard Chimie.pdf
├── Cartographie Étienne Labbé Admin.pdf
├── Cartographie François Arseneault-Hubert Chimie.pdf
├── Cartographie Hélène Chabot Philo.pdf
├── Cartographie Isabelle Ménard Biologie.pdf
├── Cartographie Jordan Raymond Philo.pdf
├── Cartographie Marie-Hélène Leduc Littérature.pdf
├── Cartographie Michel Baillargeon Math.pdf
└── Cartographie Olivier Lalonde Géographie.pdf
```

### Configurations pratiques
```
js/pratiques/
├── pratiques-predefines.js (7 pratiques complètes)
│   ├── PRATIQUE_PAN_STANDARDS_BRUNO
│   ├── PRATIQUE_SOMMATIVE_TRADITIONNELLE (Marie-Hélène)
│   ├── PRATIQUE_PAN_SPECIFICATIONS (François)
│   ├── PRATIQUE_PAN_MAITRISE (Grégoire)
│   ├── PRATIQUE_PAN_OBJECTIFS_PONDERES_MICHEL
│   ├── PRATIQUE_SOMMATIVE_REMPLACEMENT_JORDAN
│   └── PRATIQUE_PAN_JUGEMENT_GLOBAL_ISABELLE
└── config-francois-chimie.js (config alternative)

Autres pratiques de notation/
├── pan-jugement-global-isabelle.json
├── pan-objectifs-ponderes-michel.json
└── sommative-remplacement-jordan.json
```

### Documentation
```
├── ANALYSE_CARTOGRAPHIES.md (6 testeurs analysés)
├── CARTES_TESTEURS_COMPLET.md (ce fichier - 10 testeurs)
├── ARCHITECTURE_PRATIQUES.md (système de pratiques)
└── GUIDE_AJOUT_PRATIQUE.md (guide création pratiques)
```

---

## ✅ Statut final

**10/10 testeurs complètement documentés et configurés**

Toutes les pratiques sont disponibles dans `js/pratiques/pratiques-predefines.js` avec des configurations JSON complètes prêtes à l'emploi.

**Fichiers de référence**:
- `pratiques-predefines.js` - 7 configurations JSON complètes
- `ANALYSE_CARTOGRAPHIES.md` - Analyse détaillée 6 testeurs
- `CARTES_TESTEURS_COMPLET.md` - Vue d'ensemble 10 testeurs (ce fichier)

---

**Dernière mise à jour**: 26 novembre 2025
**Statut**: ✅ Complet - Toutes les pratiques documentées
