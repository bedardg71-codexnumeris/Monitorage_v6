# Changelog - Beta 91.0 → Beta 91.1

**Date de publication** : 26 novembre 2025
**Version** : Beta 91.1
**Nom de code** : "Pratiques configurables et multi-objectifs"

---

## 📦 Résumé des changements

Beta 91.1 introduit **le système de pratiques configurables** complet, permettant aux enseignants de charger leur pratique de notation en 2 clics ou de créer la leur avec un wizard interactif. Cette version inclut également le **système multi-objectifs** pour Michel Baillargeon et une **migration vers IndexedDB** pour améliorer la capacité de stockage.

**Principales nouveautés** :
- ✅ 7 pratiques prédéfinies chargées en 2 clics
- ✅ Wizard de création de pratiques en 8 étapes
- ✅ Système multi-objectifs (calcul par objectif pondéré)
- ✅ Architecture IndexedDB (capacité 5-10 MB → plusieurs GB)
- ✅ Détection défis par type d'objectif

---

## 🆕 Nouvelles fonctionnalités

### 1. Pratiques prédéfinies (Beta 91.0 - 25 novembre)

**7 pratiques du réseau collégial prêtes à l'emploi** :

| Pratique | Enseignant·e | Type | Fichier |
|----------|--------------|------|---------|
| PAN-Standards (5 niveaux) | Bruno Voisard | PAN | `PRATIQUE_PAN_STANDARDS_BRUNO` |
| Sommative traditionnelle | Marie-Hélène Leduc | SOM | `PRATIQUE_SOMMATIVE_TRADITIONNELLE` |
| PAN-Spécifications | François Arseneault-Hubert | PAN | `PRATIQUE_PAN_SPECIFICATIONS` |
| PAN-Maîtrise (IDME) | Grégoire Bédard | PAN | `PRATIQUE_PAN_MAITRISE` |
| PAN-Objectifs pondérés | Michel Baillargeon | PAN | `PRATIQUE_PAN_OBJECTIFS_PONDERES_MICHEL` |
| Sommative + remplacement | Jordan Raymond | SOM | `PRATIQUE_SOMMATIVE_REMPLACEMENT_JORDAN` |
| PAN-Jugement global | Isabelle Ménard | PAN | `PRATIQUE_PAN_JUGEMENT_GLOBAL_ISABELLE` |

**Chargement** : Réglages → Pratique de notation → Bouton "Exemples de pratiques"

**Fichiers** :
- `js/pratiques/pratiques-predefines.js` (817 lignes)
- Exportées dans `window.PRATIQUES_PREDEFINES`

### 2. Wizard de création de pratiques (Beta 91.0 - 25 novembre)

**Interface interactive en 8 étapes** pour créer une pratique personnalisée :

1. **Informations de base** : Nom, auteur, description, discipline
2. **Échelle d'évaluation** : Niveaux (IDME, 0-1-2-3-4) ou Pourcentage (0-100%)
3. **Structure des évaluations** : Standards, Portfolio, Évaluations discrètes, Spécifications
4. **Calcul de la note** : Conversion niveaux, Moyenne pondérée, Spécifications
5. **Système de reprises** : Aucune, Illimitées, Occasions ponctuelles, Nombre limité
6. **Gestion des critères** : Fixes (SRPNF), Par standard, Par évaluation
7. **Seuils d'interprétation** : Pourcentages ou Niveaux
8. **Interface et terminologie** : Affichage notes, Personnalisation terminologie

**Fonctionnalités** :
- Validation à chaque étape
- Formulaires dynamiques selon les choix
- Prévisualisation des options
- Export/Import JSON pour partage

**Fichiers** :
- `index 91.html` : Modal wizard (lignes 5771-6123)
- `js/pratiques.js` : Fonctions wizard (lignes 1594-2347)
- `BETA_91_WIZARD_PRATIQUES.md` : Documentation complète

### 3. Système multi-objectifs (Beta 91.1 - 26 novembre)

**Pratique par objectifs d'apprentissage pondérés** (Michel Baillargeon) :

**Fonctionnalités** :
- **13 objectifs** avec poids variables (6% à 15%)
- **3 types d'objectifs** : Fondamental, Intégrateur, Transversal
- **Calcul par objectif** : Moyenne des N meilleurs artefacts par objectif
- **Note finale pondérée** : Σ(P_objectif × poids) / 100
- **Interface profil étudiant** : Tableau des 13 objectifs avec type, poids, performance, niveau IDME, statut
- **Détection défis** : Par type d'objectif (alerte prioritaire intégrateurs, alerte générale fondamentaux)

**Fichiers modifiés** :
- `js/portfolio.js` (+195 lignes) : `calculerPerformanceParObjectif()`, `calculerNoteFinaleMultiObjectifs()`
- `js/objectifs.js` (+86 lignes) : `activerPratiqueMultiObjectifs()`, `verifierPratiqueMultiObjectifs()`
- `js/profil-etudiant.js` (+180 lignes) : `genererTableauObjectifs()` (lignes 3572-3752)
- `js/pratiques/pratique-configurable.js` (+135 lignes) : `detecterDefis()` amélioré (lignes 256-391)
- `styles.css` : Classe `.tableau-objectifs-profil` (ligne 7333+)

**Documentation** :
- `TEST_MULTI_OBJECTIFS.md` (283 lignes) : Guide complet du système
- `SYSTEME_MULTI_OBJECTIFS_COMPLET.md` : Documentation technique

### 4. Architecture IndexedDB (Beta 91.1 - 25-26 novembre)

**Migration localStorage → IndexedDB avec cache hybride** :

**Avant Beta 91.1** :
- Stockage : localStorage uniquement
- Capacité : 5-10 MB
- Accès : Synchrone

**Beta 91.1** :
- Stockage : IndexedDB (principal) + localStorage (cache)
- Capacité : Plusieurs GB (vs 5-10 MB)
- Accès : Synchrone via cache (0ms) + asynchrone vers IndexedDB (~10ms)
- Fallback : Automatique si IndexedDB indisponible

**API unifiée** (`js/db.js`, 450 lignes) :
- `db.getSync(key, defaultValue)` : Lecture synchrone depuis cache
- `db.setSync(key, value)` : Écriture synchrone + sync IndexedDB
- `db.removeSync(key)` : Suppression
- `db.keys()` : Liste clés
- Événement `'db-ready'` : Émis après synchronisation initiale

**Statistiques migration** :
- 38 commits (20 lundi + 18 mardi)
- 10 bugs corrigés
- 37 fichiers modifiés (+1966 lignes, -682 lignes)
- 0 modules modifiés pour l'API (compatibilité totale)

**Documentation** :
- `INDEXEDDB_ARCHITECTURE.md` (441 lignes) : Architecture complète
- Tag Git : `v0.91.1-indexeddb` (26 novembre 2025)

### 5. Détection défis par type d'objectif (Beta 91.1 - 26 novembre)

**Logique de détection intelligente** pour pratiques multi-objectifs :

**Avant** :
- Détection par critère (SRPNF) uniquement
- Seuil unique pour tous les critères

**Beta 91.1** :
- **Objectifs intégrateurs** (poids ≥ 10%) avec P < 70% → **Alerte prioritaire**
- **3+ objectifs fondamentaux** avec P < 75% → **Alerte générale**
- **Objectifs transversaux** avec P < 75% → **Suivi**
- Seuils configurables par type (`seuils.difficulte`, `seuils.acceptable`)

**Implémentation** : `js/pratiques/pratique-configurable.js` (lignes 256-391)

---

## 🔧 Améliorations

### Interface utilisateur

1. **Bouton "Exemples de pratiques"** (index 91.html:5907)
   - Bouton vert distinctif
   - Modal de sélection avec descriptions
   - Chargement multiple possible

2. **Section Pratique de notation** (Réglages)
   - Liste des pratiques chargées
   - Boutons : Créer, Importer JSON, Exemples
   - Menu déroulant "Pratique active" avec sélection

3. **Profil étudiant - Section Performance**
   - Détection automatique pratique multi-objectifs
   - Affichage conditionnel du tableau des objectifs
   - Légende des types d'objectifs (couleurs distinctes)

### Performances

1. **Stockage hybride** :
   - Accès synchrone 0ms (cache localStorage)
   - Capacité plusieurs GB (IndexedDB)
   - Synchronisation automatique au démarrage

2. **Calcul multi-objectifs** :
   - Performances stockées dans `indicesCP` (évite recalculs)
   - Historique longitudinal des performances par objectif
   - Logging console pour debugging

### Documentation

1. **Nouveaux guides** :
   - `GUIDE_TESTEURS.md` mis à jour (Beta 91.1, 488 lignes)
   - `README_TESTEURS.md` mis à jour (Beta 91.1, 270 lignes)
   - `DEMARRAGE_RAPIDE.md` créé (guide 1 page)
   - `CHANGELOG_BETA_91.md` créé (ce fichier)

2. **Documentation technique** :
   - `TEST_MULTI_OBJECTIFS.md` (283 lignes)
   - `SYSTEME_MULTI_OBJECTIFS_COMPLET.md`
   - `INDEXEDDB_ARCHITECTURE.md` (441 lignes)
   - `BETA_91_WIZARD_PRATIQUES.md` (documentation wizard)

---

## 🐛 Corrections de bugs

### Beta 91.0 (25 novembre)

1. **Export/Import pratiques** :
   - Correction validation JSON
   - Gestion erreurs chargement
   - Messages de confirmation

2. **Wizard** :
   - Navigation entre étapes corrigée
   - Validation formulaires améliorée
   - Prévisualisation options

### Beta 91.1 (26 novembre)

1. **Multi-objectifs** :
   - Calcul note finale corrigé (formule pondérée)
   - Détection défis par type fonctionnelle
   - Affichage tableau objectifs optimisé

2. **IndexedDB** :
   - 10 bugs corrigés (double parsing, fonctions manquantes, etc.)
   - Fallback localStorage opérationnel
   - Synchronisation au démarrage fiable

3. **Pratique-configurable** :
   - Fonction `detecterDefis()` améliorée
   - Support méthode `pan_par_objectif`
   - Logging console ajouté

---

## 📊 Statistiques

### Commits

- **Beta 91.0 (25 novembre)** : 15 commits
- **Beta 91.1 (25-26 novembre)** : 38 commits (migration IndexedDB)
- **Total Beta 91** : 53 commits

### Lignes de code

| Module | Avant | Après | Diff |
|--------|-------|-------|------|
| `js/pratiques/` | 2 fichiers | 5 fichiers | +3 |
| `pratiques-predefines.js` | 0 | 817 | +817 |
| `pratique-configurable.js` | 0 | 450 | +450 |
| `pratique-manager.js` | 0 | 180 | +180 |
| `js/portfolio.js` | ~800 | ~995 | +195 |
| `js/objectifs.js` | 0 | 86 | +86 |
| `js/profil-etudiant.js` | ~3400 | ~3580 | +180 |
| `js/db.js` | 0 | 450 | +450 (nouveau) |

**Total Beta 91** : +3200 lignes (fonctionnalités) + 450 lignes (db.js)

### Fichiers créés

- `js/db.js` (IndexedDB)
- `js/pratiques/pratiques-predefines.js` (7 pratiques)
- `js/pratiques/pratique-configurable.js` (classe configurable)
- `js/pratiques/pratique-manager.js` (gestionnaire)
- `js/objectifs.js` (gestion objectifs)
- `DEMARRAGE_RAPIDE.md` (guide 1 page)
- `CHANGELOG_BETA_91.md` (ce fichier)

---

## 🔜 Prochaines étapes (Beta 92+)

### Court terme (Beta 92 - Décembre 2025)

1. **Support multi-groupes** :
   - Gestion plusieurs groupes simultanés
   - Bénéficie de l'architecture IndexedDB
   - Sélecteur de groupe actif

2. **Système de snapshots** :
   - Snapshots hebdomadaires (portrait complet chaque semaine)
   - Reconstruction rétroactive (recalcul semaines passées)
   - Base pour graphiques évolution

3. **Graphiques évolution objectifs** :
   - Évolution P par objectif dans le temps
   - Comparaison objectifs fondamentaux vs intégrateurs
   - Radar chart des objectifs

### Moyen terme (Beta 93-95 - Janvier-Février 2026)

1. **Export rapports** :
   - Rapport détaillé par objectif
   - Recommandations ciblées
   - Plan d'action personnalisé

2. **Amélioration wizard** :
   - Prévisualisation en temps réel
   - Templates supplémentaires
   - Mode expert vs simplifié

3. **Enrichissement pratiques prédéfinies** :
   - Ajout nouvelles pratiques réseau
   - Versions adaptées par discipline
   - Communauté de partage

### Long terme (Version 1.0 - Mars-Juin 2026)

1. **Préparation Version 1.0** :
   - Consolidation fonctionnalités
   - Tests utilisateurs extensifs
   - Documentation complète

2. **Présentation AQPC 2026** :
   - Version 1.0 stable
   - Package démonstration complet
   - Ateliers formation

---

## 📄 Documents du package

### Guides utilisateurs

- `GUIDE_TESTEURS.md` (488 lignes) - Guide complet
- `README_TESTEURS.md` (270 lignes) - Guide test rapide
- `DEMARRAGE_RAPIDE.md` (nouveau) - Guide 1 page

### Documentation technique

- `TEST_MULTI_OBJECTIFS.md` (283 lignes) - Système multi-objectifs
- `SYSTEME_MULTI_OBJECTIFS_COMPLET.md` - Documentation complète
- `INDEXEDDB_ARCHITECTURE.md` (441 lignes) - Architecture stockage
- `BETA_91_WIZARD_PRATIQUES.md` - Documentation wizard
- `CHANGELOG_BETA_91.md` (ce fichier) - Changelog complet

### Cartes de référence

- `CARTES_TESTEURS_COMPLET.md` - Fiches 10 testeurs
- `ARCHITECTURE_PRATIQUES.md` - Architecture système pratiques
- `GUIDE_AJOUT_PRATIQUE.md` - Guide ajout pratique

---

## 🙏 Remerciements

Merci aux **10 testeurs du réseau collégial** dont les pratiques sont implémentées dans cette version :

- Bruno Voisard (Cégep Laurendeau - Chimie)
- Marie-Hélène Leduc (Cégep Valleyfield - Littérature)
- François Arseneault-Hubert (Cégep Laurendeau - Chimie)
- Grégoire Bédard (Cégep Drummond - Littérature)
- Michel Baillargeon (Cégep Beauce-Appalaches - Mathématiques)
- Jordan Raymond-Robidoux (Cégep Drummond - Philosophie)
- Etienne Labbé (Cégep de l'Abitibi-Témiscamingue - Administration)
- Hélène Chabot (Cégep Gérald-Godin - Philosophie)
- Isabelle Ménard (Collège Champlain Lennoxville - Biologie)
- Olivier Lalonde (Collège Lionel-Groulx - Géographie)

---

**Date de publication** : 26 novembre 2025
**Version** : Beta 91.1
**Auteur** : Grégoire Bédard (Labo Codex)
**Contact** : labo@codexnumeris.org
