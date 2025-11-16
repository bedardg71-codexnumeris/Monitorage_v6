# Monitorage pédagogique - Beta 0.89

**Date de release** : 4 novembre 2025
**Nom de code** : Correctif échelles

---

## 🎯 Nouveautés de cette version

### ✨ Niveau "0" dans l'échelle IDME

Cette version ajoute le support complet d'un **5e niveau "0" (Aucun/Nul)** dans l'échelle IDME, permettant de gérer les situations de plagiat ou d'utilisation non autorisée d'IA générative.

**Cas d'usage** :
- Travail copié intégralement d'Internet
- Utilisation de ChatGPT pour générer l'intégralité d'une analyse
- Travail non original ou non recevable

**Configuration** : Voir section "Support niveau 0" dans `NOTES_VERSION_0.89.md`

### 🐛 Correctifs importants

1. **Calcul du niveau corrigé** : Les évaluations avec note 0% affichent maintenant le niveau "0" au lieu de "--"
2. **Affichage (null) corrigé** : Les notes à 0 s'affichent correctement au lieu de "(null)"

### 🎨 Améliorations interface

- **Bouton Courriel** ajouté dans l'en-tête pour contacter l'équipe
- **Interventions RàI** redesignées avec badges compacts et compteurs
- **Recherche étudiants** étendue au numéro DA

---

## 🚀 Installation rapide

### Étape 1 : Décompresser l'archive

Extraire le contenu du fichier `Monitorage_Beta_0.89.zip` dans un dossier local.

### Étape 2 : Ouvrir dans le navigateur

**Méthode A - Double-clic** (recommandé) :
- Double-cliquer sur `index 89 (correctif échelles).html`
- Le fichier s'ouvrira dans votre navigateur par défaut

**Méthode B - Depuis le navigateur** :
1. Ouvrir Safari, Chrome, Firefox ou Edge
2. Menu Fichier → Ouvrir
3. Sélectionner `index 89 (correctif échelles).html`

### Étape 3 : Charger les données de démo (optionnel)

Pour tester l'application avec des données réalistes :

1. Cliquer sur **Réglages** → **Import / Export**
2. Cliquer sur **"Importer des données"**
3. Sélectionner le fichier `donnees-demo.json`
4. Confirmer l'importation

**Résultat** : Vous aurez 30 étudiants fictifs avec :
- 5 artefacts configurés
- Des évaluations complètes
- Des interventions RàI
- Des présences sur plusieurs semaines

---

## 📚 Documentation

### Fichiers à lire

1. **LISEZMOI.txt** (5 minutes)
   - Vue d'ensemble du système
   - Concepts pédagogiques de base
   - Navigation dans l'interface

2. **GUIDE_TESTEURS.md** (10 minutes)
   - Instructions détaillées pour tester la Beta 0.89
   - Scénarios de test prioritaires
   - Formulaire de feedback

3. **NOTES_VERSION_0.89.md** (15 minutes)
   - Documentation technique complète
   - Détails des nouveautés
   - Problèmes connus et solutions

4. **README_DONNEES_DEMO.md** (5 minutes)
   - Explication du contenu des données de démo
   - Scénarios pédagogiques simulés

---

## 🧪 Premier test recommandé

### Scénario : Créer une échelle à 5 niveaux

**Objectif** : Tester la nouvelle fonctionnalité du niveau "0"

1. **Navigation** : Matériel → Niveaux de performance
2. **Duplication** : Cliquer sur "Dupliquer l'échelle actuelle"
3. **Nommer** : "IDME avec niveau 0 (5 niveaux)"
4. **Ajouter niveau** :
   - Code : `0`
   - Nom : `Aucun`
   - Min : `0`
   - Max : `0`
   - Valeur de calcul : `0`
   - Couleur : Gris foncé ou rouge
5. **Sauvegarder**

### Scénario : Évaluer avec niveau "0"

1. **Navigation** : Évaluations → Procéder à une évaluation
2. **Sélectionner** :
   - Étudiant : Maïka Gallant (si données démo chargées)
   - Production : Artefact 4
   - Grille : Global-5 FR-HOLIS
   - **Échelle** : IDME avec niveau 0 (5 niveaux)
3. **Évaluer** : Mettre tous les critères à "0 - Aucun"
4. **Vérifier** :
   - Note finale : **0.0 %**
   - Niveau : **"0"** (pas "--")
5. **Sauvegarder**

### Vérification

1. Aller dans **Évaluations → Liste des évaluations**
2. Trouver l'évaluation d'Artefact 4
3. Vérifier que la note affiche **"0 (0%)"** et non "-- (0%)"

**Résultat attendu** : ✅ Le niveau "0" s'affiche correctement partout

---

## ⚙️ Configuration système

### Navigateurs supportés

✅ **Recommandés** :
- Safari 15+ (macOS, iOS)
- Chrome 100+
- Firefox 100+
- Edge 100+

⚠️ **Non supportés** :
- Internet Explorer (toutes versions)
- Navigateurs obsolètes (> 2 ans)

### Système d'exploitation

✅ Compatible :
- macOS 11+ (Big Sur et ultérieur)
- Windows 10/11
- Linux (distributions récentes)
- iPadOS 14+ (interface adaptée tablette)

### Stockage des données

**Important** : Cette application utilise **localStorage** pour enregistrer vos données localement dans votre navigateur.

⚠️ **Risques de perte de données** :
- Navigation privée / incognito
- Nettoyage des données de navigation
- Désinstallation du navigateur
- Changement d'ordinateur

✅ **Protection recommandée** :
1. Utiliser **Réglages → Import / Export** pour sauvegarder régulièrement
2. Exporter un fichier JSON de backup hebdomadaire
3. Conserver les exports sur un cloud (Dropbox, OneDrive, Google Drive)

---

## 🐛 Problèmes connus

### 1. Niveau "--" dans anciennes évaluations

**Symptôme** : Les évaluations créées avant la Beta 0.89 affichent niveau "--" au lieu de "0"

**Solution** :
1. Ouvrir l'évaluation (Consulter)
2. Sauvegarder à nouveau sans rien changer
3. Le niveau sera recalculé correctement

### 2. Page blanche lors du chargement

**Symptôme** : Cliquer sur "Consulter" depuis la liste affiche une page blanche

**Solution temporaire** :
- Charger l'évaluation depuis **Évaluations → Procéder à une évaluation**
- Sélectionner l'étudiant et la production manuellement

**Status** : En investigation pour la Beta 0.90

---

## 📞 Support et feedback

### Donner votre feedback

Votre retour est essentiel pour améliorer l'outil !

1. **Formulaire en ligne** : Cliquer sur le bouton "Feedback" dans l'en-tête
2. **Par courriel** : Cliquer sur le bouton "Courriel" ou écrire à `labo@codexnumeris.org`

**Informations utiles à fournir** :
- Navigateur et version (ex: Safari 17.1)
- Système d'exploitation (ex: macOS 14.1)
- Description détaillée du problème
- Captures d'écran si possible

### Ressources additionnelles

- **Site web** : https://codexnumeris.org
- **Guide complet** : Disponible sur le site du Labo Codex
- **Articles** : Revue Pédagogie collégiale (printemps-été 2024, hiver 2025)

---

## 📄 Licence

**Creative Commons BY-NC-SA 4.0** (Grégoire Bédard)

✅ Vous êtes libre de :
- Partager : copier et redistribuer le matériel
- Adapter : remixer, transformer et créer à partir du matériel

⚠️ Selon les conditions suivantes :
- **Attribution** : Vous devez créditer l'œuvre
- **Pas d'utilisation commerciale** : Usage non commercial uniquement
- **Partage dans les mêmes conditions** : Redistribution sous licence identique

Voir `LICENSE.md` pour les détails complets.

---

## 🗓️ Historique des versions

- **Beta 0.89** (4 novembre 2025) : Support niveau "0", correctifs affichage
- **Beta 0.88** (3 novembre 2025) : Absences motivées RàI, améliorations UX
- **Beta 0.85** (1 novembre 2025) : Interventions RàI, optimisations profil
- **Beta 0.83** (31 octobre 2025) : Seuils configurables, affichage épuré
- **Beta 0.79** (29 octobre 2025) : Optimisation espace, format compact

Voir `NOTES_VERSION_0.89.md` pour l'historique détaillé.

---

## 🎯 Prochaine version

**Beta 0.90** (prévue mi-novembre 2025)

**Focus** :
- Système de jetons complet (délai, reprise)
- Cartouches de rétroaction contextuels
- Script de migration pour anciennes évaluations

---

**Merci d'utiliser le Système de monitorage pédagogique !**

Développé avec passion par le Labo Codex Numeris
*Réfléchir, expérimenter, partager.*
