# Notes de version - Beta 91 (Complète)

**Date de publication** : 26 novembre 2025
**Version** : Beta 91.2
**Nom** : Pratiques configurables et partage pédagogique
**Auteur** : Grégoire Bédard
**Licence** : Creative Commons BY-NC-SA 4.0

---

## 🎉 Résumé exécutif

La Beta 91 transforme l'application en une **plateforme flexible** qui s'adapte à votre pratique pédagogique, au lieu de vous imposer une méthode unique.

**En 2 clics**, chargez une pratique prédéfinie qui correspond à votre approche.
**En 10 minutes**, créez votre propre pratique avec un assistant interactif.
**En 1 clic**, partagez vos ressources avec vos collègues.

---

## ✨ Les 5 grandes nouveautés

### 1. 🎯 Pratiques prédéfinies (7 enseignants du réseau)

**Fini l'approche unique!** Choisissez parmi 7 pratiques du réseau collégial:

| Pratique | Enseignant·e | Type | Particularité |
|----------|--------------|------|---------------|
| **PAN-Standards (5 niveaux)** | Bruno Voisard (Chimie) | PAN | Évaluation par standards avec 5 niveaux de maîtrise |
| **Sommative traditionnelle** | Marie-Hélène Leduc (Littérature) | SOM | Moyenne pondérée classique avec notes sur 100 |
| **PAN-Spécifications** | François Arseneault-Hubert (Chimie) | PAN | Pass/Fail sur objectifs spécifiques |
| **PAN-Maîtrise (IDME)** | Grégoire Bédard (Littérature) | PAN | Échelle IDME avec critères SRPNF |
| **PAN-Objectifs pondérés** | Michel Baillargeon (Mathématiques) | PAN | 13 objectifs avec poids variables (système multi-objectifs) |
| **Sommative + remplacement** | Jordan Raymond (Philosophie) | SOM | Remplacement automatique par meilleure note |
| **PAN-Jugement global** | Isabelle Ménard (Biologie) | PAN | Évaluation holistique sans notes chiffrées |

**Comment charger une pratique?**
1. Ouvrir **Réglages → Pratique de notation**
2. Cliquer sur **«Exemples de pratiques»** (bouton vert)
3. Sélectionner la pratique qui vous convient
4. Confirmer le chargement
5. **C'est tout!** L'application s'adapte automatiquement

**Que se passe-t-il?**
- L'interface s'adapte à la pratique choisie
- Les calculs utilisent la méthode appropriée
- Les recommandations RàI suivent la logique de la pratique
- Vos données existantes sont préservées

---

### 2. 🧙 Wizard de création de pratiques (8 étapes)

**Votre pratique n'est dans aucune liste?** Créez la vôtre avec un assistant interactif!

**Les 8 étapes**:

#### Étape 1: Informations de base
- Nom de votre pratique
- Votre nom (auteur)
- Description (optionnelle)
- Discipline

#### Étape 2: Échelle d'évaluation
- **Niveaux** (0-1-2-3-4, IDME, personnalisés)
- **Pourcentage** (0-100%)

#### Étape 3: Structure des évaluations
- **Standards** (par standard avec niveaux)
- **Portfolio** (N meilleurs artefacts)
- **Évaluations discrètes** (chaque évaluation compte)
- **Spécifications** (pass/fail par objectif)

#### Étape 4: Calcul de la note finale
- **Conversion de niveaux** (0-1-2-3-4 → pourcentages)
- **Moyenne pondérée** (classique)
- **Spécifications** (% objectifs réussis)

#### Étape 5: Système de reprises
- **Aucune** (pas de reprises)
- **Illimitées** (jusqu'à maîtrise)
- **Occasions ponctuelles** (fenêtres de reprise)
- **Nombre limité** (ex: 2 reprises maximum)

#### Étape 6: Gestion des critères
- **Fixes** (SRPNF pour tout)
- **Par standard** (critères différents par standard)
- **Par évaluation** (critères différents par évaluation)

#### Étape 7: Seuils d'interprétation
- Fragile / Acceptable / Bon
- En pourcentages (70%, 80%, 85%) ou niveaux (I, D, M)

#### Étape 8: Interface et terminologie
- Affichage des notes (visible ou masqué)
- Personnalisation de la terminologie
- Options d'affichage

**Comment créer votre pratique?**
1. **Réglages → Pratique de notation → «Créer ma pratique»**
2. Répondre aux 8 questions (validées à chaque étape)
3. Prévisualiser votre configuration
4. Sauvegarder
5. **Activée automatiquement!**

**Bonus**: Exportez votre pratique en JSON pour la partager avec vos collègues.

---

### 3. 📊 Système multi-objectifs (Michel Baillargeon)

**Pour les cours avec plusieurs objectifs d'apprentissage** (ex: Mathématiques avec 13 objectifs).

**Fonctionnalités**:
- ✅ Définir jusqu'à 20 objectifs avec poids variables
- ✅ Lier chaque évaluation à un objectif spécifique
- ✅ Calculer la performance par objectif (moyenne N meilleurs)
- ✅ Note finale pondérée: Σ(P_objectif × poids) / 100
- ✅ Tableau détaillé des 13 objectifs dans le profil étudiant
- ✅ Identification forces et défis par objectif

**Exemple concret**: Cours de Calcul différentiel (Michel Baillargeon)

| Objectif | Poids | Type |
|----------|-------|------|
| Limites et continuité | 6% | Fondamental |
| Dérivées - Définition | 8% | Fondamental |
| **Optimisation** | **15%** | **Intégrateur** |
| Intégration définie | 12% | Intégrateur |
| Résolution de problèmes | 10% | Intégrateur |
| ... (13 objectifs total) | 100% | — |

**Affichage dans le profil étudiant**:
- Tableau complet des 13 objectifs avec performance, poids, statut
- Codes couleur par type (Fondamental 🔵, Intégrateur 🟠, Transversal 🟣)
- Forces (≥ 75%) et Défis (< 75%) identifiés automatiquement
- Note finale pondérée calculée en temps réel

**Comment activer?**
1. Créer un ensemble d'objectifs (Réglages → Objectifs d'apprentissage)
2. Lier vos productions aux objectifs
3. Activer la pratique multi-objectifs
4. **Le système calcule tout automatiquement!**

---

### 4. 💾 Architecture IndexedDB (Capacité GB)

**Le problème**: localStorage limité à 5-10 MB (suffisant pour 1-2 groupes seulement).

**La solution Beta 91.1**: Migration vers IndexedDB avec cache hybride.

**Avant Beta 91.1**:
- Stockage: localStorage uniquement
- Capacité: 5-10 MB
- Support: 1-2 groupes maximum

**Beta 91.1**:
- Stockage: IndexedDB (principal) + localStorage (cache rapide)
- Capacité: **Plusieurs GB** (vs 5-10 MB)
- Support: **Plusieurs groupes simultanés** (préparation Beta 92)
- Performance: Accès synchrone ultra-rapide via cache (0ms)
- Fallback: Automatique vers localStorage si IndexedDB indisponible

**Impact pour vous**:
- ✅ Stockez autant de données que nécessaire
- ✅ Support multi-groupes à venir (Beta 92)
- ✅ Aucun changement visible (tout est automatique)
- ✅ Performance préservée (accès instantané)

---

### 5. 📤 Import/Export pédagogique (Partage entre collègues)

**Facilitez le partage de vos ressources** avec vos collègues, tout en respectant la licence CC BY-NC-SA 4.0.

#### Export enrichi

**Quoi exporter?**
- **Configuration complète** : Échelles + Grilles + Productions + Cartouches + Paramètres
- **Ressources individuelles** : Une grille, une échelle, etc.

**Métadonnées enrichies** (obligatoires):
- Nom de votre pratique
- Disciplines (ex: Français, Littérature)
- Niveau (Collégial, Universitaire)
- Description de votre approche
- Vos coordonnées (optionnel)
- Licence CC BY-NC-SA 4.0 automatique

**Fichiers générés**:
- `PRATIQUE-COMPLETE-[nom]-[date].json` (données)
- `LISEZMOI-[nom]-[date].txt` (instructions + licence complète)

**Comment exporter?**
1. **Réglages → Gestion des données**
2. Cliquer **«Exporter ma configuration complète»**
3. Remplir le formulaire de métadonnées
4. Accepter la licence CC BY-NC-SA 4.0
5. **2 fichiers se téléchargent automatiquement**

#### Import intelligent

**Importation avec détection de conflits**:
- ✅ Validation structure JSON
- ✅ Aperçu avant import (métadonnées + contenu)
- ✅ Détection automatique conflits d'ID
- ✅ Remapping intelligent avec mise à jour des références
- ✅ Détection dépendances manquantes
- ✅ Option annuler ou continuer

**Comment importer?**
1. **Réglages → Gestion des données**
2. Cliquer **«Importer une configuration»**
3. Sélectionner le fichier JSON reçu
4. Vérifier l'aperçu
5. Confirmer l'import
6. **Recharger la page**

#### Cas d'usage

1. **Harmonisation départementale**: Tous utilisent les mêmes grilles
2. **Mentorat**: Transmettre votre configuration à un·e collègue
3. **Réutilisation sessions**: Conserver votre config d'une session à l'autre
4. **Communautés de pratique**: Mutualiser vos ressources

**⚠️ Protection vie privée**:
- **Aucune donnée étudiante exportée** (noms, DA, notes, présences)
- Seulement le matériel pédagogique réutilisable

---

## 💡 Différences entre types d'export

**Trois types d'export** disponibles:

### 1. Backup complet (boutons modaux)
- **Contenu**: TOUTES vos données (cours, étudiants, notes, présences, etc.)
- **Usage**: Sauvegarde personnelle, changement d'ordinateur
- **Partage**: ❌ NON (données confidentielles incluses)

### 2. Configuration pédagogique (NOUVEAU - Beta 91.2)
- **Contenu**: Matériel pédagogique uniquement (grilles, échelles, productions, cartouches)
- **Usage**: Partage avec collègues, réutilisation entre sessions
- **Partage**: ✅ OUI (aucune donnée étudiante)

### 3. Export partiel (boutons dans chaque section)
- **Contenu**: Une ressource spécifique (1 grille, 1 échelle, etc.)
- **Usage**: Partage ciblé d'une ressource précise
- **Partage**: ✅ OUI (aucune donnée étudiante)

---

## 🚀 Comment profiter de ces nouveautés?

### Scénario 1: Vous débutez avec l'application

**Chargez une pratique prédéfinie**:
1. Réglages → Pratique de notation → «Exemples de pratiques»
2. Choisir celle qui ressemble à votre approche
3. Explorer l'application avec cette configuration
4. Ajuster au besoin (seuils, paramètres)

**Temps requis**: 2 minutes

### Scénario 2: Vous avez une pratique particulière

**Créez votre pratique avec le wizard**:
1. Réglages → Pratique de notation → «Créer ma pratique»
2. Répondre aux 8 questions
3. Sauvegarder votre configuration
4. Tester avec quelques évaluations

**Temps requis**: 10-15 minutes

### Scénario 3: Vous harmonisez avec des collègues

**Importez une configuration partagée**:
1. Recevoir le fichier JSON d'un·e collègue
2. Réglages → Gestion des données → «Importer une configuration»
3. Sélectionner le fichier
4. Vérifier l'aperçu et confirmer

**Temps requis**: 2 minutes

### Scénario 4: Vous enseignez avec plusieurs objectifs

**Activez le système multi-objectifs**:
1. Créer votre ensemble d'objectifs (Réglages → Objectifs)
2. Lier vos productions aux objectifs
3. Activer la pratique multi-objectifs
4. Consulter le tableau des objectifs dans les profils

**Temps requis**: 20-30 minutes (configuration initiale)

---

## 📊 Statistiques de développement

### Commits et lignes de code
- **53 commits** (Beta 91.0 + 91.1 + 91.2)
- **+3,900 lignes** de code fonctionnel
- **+450 lignes** (architecture IndexedDB)
- **+700 lignes** (import/export)

### Modules créés/modifiés
- **7 fichiers** `js/pratiques/` (pratiques prédéfinies, wizard, manager)
- **1 fichier** `js/db.js` (IndexedDB)
- **1 fichier** `js/objectifs.js` (multi-objectifs)
- **7 fichiers** modifiés (import/export avec métadonnées)

### Documentation
- **15 fichiers** de documentation technique
- **8 guides** utilisateurs et testeurs
- **3 fichiers** de test JSON fournis

---

## 🎯 Prochaines étapes (Beta 92+)

### Court terme (Décembre 2025)
1. **Support multi-groupes** (plusieurs groupes simultanés)
2. **Système de snapshots** (portrait hebdomadaire)
3. **Graphiques évolution objectifs** (radar charts)

### Moyen terme (Janvier-Février 2026)
1. **Export rapports détaillés** (par objectif)
2. **Amélioration wizard** (prévisualisation temps réel)
3. **Enrichissement pratiques** (nouvelles pratiques réseau)

### Long terme (Mars-Juin 2026)
1. **Version 1.0** (consolidation complète)
2. **Présentation AQPC 2026** (atelier formation)

---

## 🙏 Remerciements

Merci aux **10 testeurs du réseau collégial** dont les pratiques sont implémentées:

- **Bruno Voisard** (Cégep Laurendeau - Chimie)
- **Marie-Hélène Leduc** (Cégep Valleyfield - Littérature)
- **François Arseneault-Hubert** (Cégep Laurendeau - Chimie)
- **Grégoire Bédard** (Cégep Drummond - Littérature)
- **Michel Baillargeon** (Cégep Beauce-Appalaches - Mathématiques)
- **Jordan Raymond-Robidoux** (Cégep Drummond - Philosophie)
- **Etienne Labbé** (Cégep Abitibi-Témiscamingue - Administration)
- **Hélène Chabot** (Cégep Gérald-Godin - Philosophie)
- **Isabelle Ménard** (Collège Champlain Lennoxville - Biologie)
- **Olivier Lalonde** (Collège Lionel-Groulx - Géographie)

---

## 📚 Documentation complémentaire

### Pour les utilisateurs
- Ce fichier : Notes de version complètes
- `DEMARRAGE_RAPIDE.md` : Guide 1 page
- `GUIDE_TESTEURS.md` : Guide complet (488 lignes)
- Dans l'application : Aide → sections mises à jour

### Pour les développeurs
- `CHANGELOG_BETA_91.md` : Changelog technique
- `SYSTEME_MULTI_OBJECTIFS_COMPLET.md` : Système multi-objectifs
- `INDEXEDDB_ARCHITECTURE.md` : Architecture stockage
- `BETA_91_WIZARD_PRATIQUES.md` : Documentation wizard
- `CLAUDE.md` : Documentation développement

---

## 🐛 Problèmes connus

**Aucun bug critique identifié.**

Si vous rencontrez un problème:
1. Vérifier la console navigateur (F12 → Console)
2. Essayer dans un autre navigateur (Safari, Chrome)
3. Consulter la section Aide de l'application
4. Contacter: labo@codexnumeris.org

---

## 📄 Licence

**Creative Commons BY-NC-SA 4.0** (Grégoire Bédard)
- ✅ Partage et adaptation autorisés (sans usage commercial)
- ✅ Attribution requise
- ✅ Redistribution sous même licence

---

## 💬 Support et feedback

**Email**: labo@codexnumeris.org
**Site**: https://codexnumeris.org

Vos commentaires sont précieux pour l'amélioration continue de l'application!

---

**Bon monitorage pédagogique!** 🎓✨

**Version**: Beta 91.2
**Date**: 26 novembre 2025
**Auteur**: Grégoire Bédard (Labo Codex)
