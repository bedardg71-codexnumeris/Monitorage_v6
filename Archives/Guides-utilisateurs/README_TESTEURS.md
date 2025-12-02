# Guide de test - Monitorage Beta 91.1

Merci de participer aux tests de l'application de monitorage pédagogique ! 🙏

**Nouveautés Beta 91.1** : 7 pratiques prédéfinies, wizard de création, système multi-objectifs, architecture IndexedDB

---

## 🚀 Démarrage rapide

### 1. Installation (2 minutes)
1. Décompressez le fichier `Monitorage_Beta_91.1.zip`
2. Ouvrez le fichier `index 91.html` dans votre navigateur
   - **Recommandé** : Safari, Chrome ou Edge
   - Astuce : Ajoutez-le à vos favoris pour y accéder rapidement

### 2. Première utilisation (5 minutes)
1. **Importer les données de démonstration** (optionnel mais recommandé) :
   - Allez dans **Réglages → Import/Export**
   - Cliquez sur «📥 Importer les données»
   - Sélectionnez le fichier `donnees-demo.json`
   - Confirmez l'import

2. **Charger votre pratique prédéfinie** 🆕 (si disponible) :
   - Allez dans **Réglages → Pratique de notation**
   - Cliquez sur «🎯 Exemples de pratiques» (bouton vert)
   - Sélectionnez votre pratique dans la liste
   - Cliquez sur «Charger les pratiques sélectionnées»
   - Sélectionnez-la dans le menu déroulant "Pratique active"
   - Cliquez sur «Sauvegarder»

3. **Explorer les nouveautés** :
   - **Tableau de bord → Aperçu** : Nuages de points avec gradients lumineux
   - **Réglages → Pratique de notation** : Liste des pratiques, wizard de création
   - **Profil étudiant** : Affichage selon votre pratique chargée
   - Survolez les points dans les barres (animation et grossissement)

---

## 🎯 Pratiques prédéfinies disponibles

| Enseignant·e | Pratique | Type |
|--------------|----------|------|
| **Bruno Voisard** | PAN-Standards (5 niveaux) | PAN |
| **Marie-Hélène Leduc** | Sommative traditionnelle | SOM |
| **François Arseneault-Hubert** | PAN-Spécifications | PAN |
| **Grégoire Bédard** | PAN-Maîtrise (IDME) | PAN |
| **Michel Baillargeon** | PAN-Objectifs pondérés | PAN |
| **Jordan Raymond** | Sommative + remplacement | SOM |
| **Isabelle Ménard** | PAN-Jugement global | PAN |

**7 pratiques distinctes** couvrant **10 testeurs** du réseau collégial.

---

## 🎯 Quoi tester en priorité ?

### ⚠️ PRIORITÉ HAUTE (15 minutes)

#### Test 1 : Charger une pratique prédéfinie 🆕
1. Allez dans **Réglages → Pratique de notation**
2. Cliquez sur «🎯 Exemples de pratiques» (bouton vert)
3. Observez la liste des 7 pratiques avec descriptions
4. Cochez la case de votre pratique (ou une pratique qui vous intéresse)
5. Cliquez sur «Charger les pratiques sélectionnées»
6. Attendez le message de succès
7. Fermez le modal
8. Dans le menu déroulant "Pratique active", sélectionnez votre pratique
9. Cliquez sur «Sauvegarder»

**Questions à vous poser** :
- Le chargement est-il intuitif et rapide ?
- Les descriptions des pratiques sont-elles claires ?
- Votre pratique correspond-elle à votre approche réelle ?

#### Test 2 : Wizard de création de pratiques 🆕
1. Allez dans **Réglages → Pratique de notation**
2. Cliquez sur «Créer une pratique» (bouton bleu)
3. Parcourez les 8 étapes du wizard :
   - Étape 1 : Informations de base
   - Étape 2 : Échelle d'évaluation
   - Étape 3 : Structure des évaluations
   - Étape 4 : Calcul de la note
   - Étape 5 : Système de reprises
   - Étape 6 : Gestion des critères
   - Étape 7 : Seuils d'interprétation
   - Étape 8 : Interface et terminologie
4. Observez les formulaires dynamiques selon vos choix
5. Validez chaque étape (ou annulez si vous explorez seulement)

**Questions à vous poser** :
- Le wizard est-il facile à comprendre ?
- Les étapes sont-elles logiques et progressives ?
- Pourriez-vous créer votre propre pratique avec ce wizard ?

#### Test 3 : Système multi-objectifs 🆕 (Michel Baillargeon)
**Note** : Ce test est spécifique à la pratique multi-objectifs. Sautez si vous n'utilisez pas cette pratique.

1. Chargez la pratique «PAN-Objectifs pondérés Michel»
2. Allez dans **Matériel → Productions**
3. Créez une production et remplissez le champ «Objectif» (ex: obj1, obj2, obj5)
4. Créez quelques évaluations pour différents objectifs
5. Allez dans un **profil étudiant**
6. Section «Développement des habiletés» : Observez le tableau des objectifs
7. Vérifiez les colonnes : Objectif, Type, Poids, Performance, Niveau, Statut

**Questions à vous poser** :
- Le tableau des objectifs est-il clair et informatif ?
- La détection des défis par type d'objectif est-elle pertinente ?
- Ce système correspond-il à votre approche pédagogique ?

### 📊 PRIORITÉ MOYENNE (10 minutes)

#### Test 4 : Visualisations nuages de points
1. Allez dans **Tableau de bord → Aperçu**
2. Observez les barres de distribution des indices (A-C-P-E)
3. Survolez les points individuels (animation hover)
4. Observez les gradients de couleur (rouge → jaune → vert pour Patterns)
5. Activez le mode comparatif (Réglages → Pratique de notation) - *optionnel*
6. Comparez les points oranges (Sommative) vs bleus (PAN) - *si mode comparatif*

**Questions à vous poser** :
- Les nuages de points facilitent-ils la visualisation de la densité ?
- L'animation au hover est-elle utile ou distrayante ?
- Les gradients de couleur sont-ils intuitifs ?

#### Test 5 : Système de jetons
1. Allez dans **Réglages → Pratique de notation**
2. Configurez les jetons (délai, reprise, aide, bonus)
3. Ouvrez un **profil étudiant**
4. Section Accompagnement : Attribuer un jeton
5. Retournez aux évaluations : vérifiez le badge jeton

**Questions à vous poser** :
- La configuration des jetons est-elle claire ?
- L'attribution dans le profil est-elle intuitive ?
- Les badges sont-ils visibles et distincts ?

---

## 📝 Comment rapporter vos observations ?

### Format suggéré pour vos retours

**1. Points positifs** ✅
- Qu'est-ce qui fonctionne bien ?
- Qu'est-ce qui améliore vraiment votre expérience ?

**2. Points à améliorer** ⚠️
- Qu'est-ce qui est confus ou difficile ?
- Qu'est-ce qui manque ?

**3. Bugs rencontrés** 🐛
Pour chaque bug :
- **Quoi** : Que s'est-il passé ?
- **Quand** : Dans quelle section / après quelle action ?
- **Attendu** : Que devrait-il se passer normalement ?
- **Navigateur** : Safari / Chrome / Firefox / Edge ?

**4. Suggestions** 💡
- Quelles améliorations proposez-vous ?
- Quelles autres sections pourraient bénéficier d'optimisations ?

**5. Pratiques prédéfinies** 🆕
- Votre pratique correspond-elle bien à votre approche réelle ?
- Quelles modifications avez-vous dû faire après chargement ?
- Le wizard de création est-il utile pour créer une pratique personnalisée ?

---

## 🔍 Points de vigilance spécifiques à Beta 91.1

### Nouveautés à valider
- [ ] Le bouton «Exemples de pratiques» est-il facile à trouver ?
- [ ] Le chargement des pratiques prédéfinies fonctionne-t-il bien ?
- [ ] Les 7 pratiques sont-elles toutes présentes et correctes ?
- [ ] Le wizard de création est-il compréhensible et fonctionnel ?
- [ ] Le système multi-objectifs affiche-t-il correctement les 13 objectifs ?
- [ ] La détection des défis par type d'objectif est-elle pertinente ?
- [ ] Les nuages de points sont-ils plus clairs que les barres empilées ?
- [ ] Le concept "Engagement" est-il plus clair que "Risque" ?

### Problèmes potentiels à surveiller
- [ ] Pratiques non chargées ou erreurs au chargement ?
- [ ] Wizard bloqué ou étapes confuses ?
- [ ] Objectifs multi-objectifs non affichés ou incorrects ?
- [ ] Points trop petits ou difficiles à cliquer ?
- [ ] Animations trop lentes ou saccadées ?
- [ ] Données corrompues après chargement d'une pratique ?
- [ ] Incompatibilité entre pratique et données existantes ?

---

## 💾 Sauvegarder vos données

**Important** : L'application fonctionne en mode local (IndexedDB + localStorage)

### Export de vos données (recommandé)
1. Allez dans **Réglages → Import/Export**
2. Cliquez sur «📤 Exporter les données»
3. Sauvegardez le fichier JSON sur votre ordinateur
4. Conservez-le comme backup

### En cas de problème
- Rechargez la page (F5 ou Cmd+R)
- Si les données sont corrompues : réimportez votre dernier export
- En dernier recours : réimportez `donnees-demo.json`

---

## 🆘 Besoin d'aide ?

### Documentation complète
- **GUIDE_TESTEURS.md** - Guide complet et détaillé (version longue)
- **DEMARRAGE_RAPIDE.md** - Guide ultra-court 1 page (version express)
- Section **Aide** dans l'application (dans le menu de navigation)

### Support
- Email : labo@codexnumeris.org
- Site web : https://codexnumeris.org
- GitHub : https://github.com/bedardg71-codexnumeris/Monitorage_v6/issues

---

## 📅 Calendrier de test

**Durée suggérée** : 1-2 semaines d'utilisation

**Phase 1** (Jours 1-3) : Tests initiaux
- Familiarisation avec les nouveautés (pratiques prédéfinies, wizard)
- Chargement de votre pratique
- Tests des fonctionnalités principales
- Rapport des bugs critiques

**Phase 2** (Jours 4-10) : Utilisation quotidienne
- Intégration dans votre workflow réel
- Observations sur l'ergonomie
- Suggestions d'amélioration

**Phase 3** (Jours 11-14) : Retour final
- Synthèse de votre expérience
- Retours consolidés
- Propositions pour la version 1.0

---

## ✨ Ce qui arrive ensuite

Vos retours permettront de :
1. Corriger les bugs identifiés
2. Ajuster l'interface selon vos besoins réels
3. Enrichir les pratiques prédéfinies
4. Améliorer le wizard de création
5. Préparer la version 1.0 stable

**Merci de votre contribution précieuse !** 🎉

---

**Version du package** : Beta 91.1
**Date de publication** : 26 novembre 2025
**Statut** : Phase de tests - Retours attendus avant fin décembre 2025

**Principales améliorations depuis Beta 90.5** :
- ✅ 7 pratiques prédéfinies chargées en 2 clics
- ✅ Wizard de création de pratiques en 8 étapes
- ✅ Système multi-objectifs (Michel Baillargeon)
- ✅ Architecture IndexedDB (capacité 5-10 MB → plusieurs GB)
- ✅ Détection défis par type d'objectif (intégrateur, fondamental, transversal)
