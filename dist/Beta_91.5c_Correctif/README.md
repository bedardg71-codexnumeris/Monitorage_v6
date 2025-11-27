# Système de monitorage pédagogique - Beta 91.5c

**Version** : Beta 91.5c - Correctifs compatibilité navigateurs
**Date** : 27 novembre 2025
**Auteur** : Grégoire Bédard
**Licence** : Creative Commons BY-NC-SA 4.0

---

## ⚠️ **IMPORTANT : Correctifs critiques**

Cette version **Beta 91.5c** corrige **deux bugs bloquants** des versions Beta 91.5 et 91.5b :

**Bug #1 corrigé** : `PratiqueConfigurable is not defined`
- Erreur JavaScript empêchant le chargement de l'application
- Ordre de chargement des scripts pratiques corrigé

**Bug #2 corrigé** : Page blanche dans Microsoft Edge
- CSS externe manquant dans le package
- **Solution** : Fichier `styles.css` maintenant inclus dans le package
- **Compatible tous navigateurs** : Safari, Chrome, Firefox, Edge

**→ Tous les utilisateurs de Beta 91.5 et 91.5b doivent mettre à jour vers 91.5c**

---

## 🚀 Démarrage rapide

### Étape 1: Ouvrir l'application
```bash
# Double-cliquer sur "index 91.5c.html" ou
open "index 91.5c.html"  # macOS
```

**Compatible tous navigateurs** : Safari, Chrome, Firefox, Microsoft Edge

### Étape 2: Configurer la grille de référence (IMPORTANT)
1. Allez dans **Réglages → Pratique de notation**
2. Scrollez jusqu'à **"Grille de critères pour le dépistage"**
3. Sélectionnez votre grille principale
4. Cliquez sur **"Sauvegarder les modalités"**

**Pourquoi ?** Cette configuration permet d'afficher les barres SRPNF dans les profils étudiants.

---

## 🔧 Migration depuis Beta 91.5 ou 91.5b

Si vous utilisez déjà Beta 91.5 ou 91.5b :

1. **Vos données sont conservées** (stockées dans IndexedDB)
2. Téléchargez Beta 91.5c
3. Ouvrez `index 91.5c.html` directement
4. **Aucune perte de données**

---

## ✨ Fonctionnalités Beta 91.5 (rappel)

### Bugs corrigés (version initiale)
1. ✅ Ancienne interface du tableau de bord (cartes séparées)
2. ✅ Carte "Indicateurs globaux" vide
3. ✅ Erreur JavaScript "Cannot access uninitialized variable"
4. ✅ Barres SRPNF affichant "NaN%"
5. ✅ Sélecteur de grille de référence vide
6. ✅ Erreur SyntaxError dans pratique-configurable.js

### Bugs corrigés (Beta 91.5c)
7. ✅ Ordre chargement scripts (PratiqueConfigurable is not defined)
8. ✅ Page blanche Microsoft Edge (CSS externe manquant)

### Nouvelles fonctionnalités
- ✅ Wizard Primo : Création de pratiques personnalisées en 8 étapes
- ✅ 7 pratiques prédéfinies prêtes à l'emploi
- ✅ Système multi-objectifs d'apprentissage
- ✅ Import/export enrichi avec métadonnées CC BY-NC-SA 4.0
- ✅ Architecture IndexedDB pour stockage étendu

---

## 📁 Structure du package

```
Beta_91.5c_Correctif/
├── index 91.5c.html         # Point d'entrée
├── styles.css               # Feuille de style complète (142 KB)
├── logo-codex-numeris.png   # Logo Codex Numeris
├── js/                      # Code JavaScript (41 modules)
│   ├── pratiques/           # Système de pratiques configurables
│   │   ├── pratique-configurable.js
│   │   ├── pratique-registre.js
│   │   ├── pratiques-predefines.js
│   │   └── ...
│   └── ...
├── donnees-demo.json        # Données de démonstration
├── BETA_91.5c_CHANGELOG.md  # Notes de version détaillées
├── LICENSE.md               # Licence CC BY-NC-SA 4.0
└── README.md                # Ce fichier
```

**Note** : Le fichier `styles.css` est maintenant **inclus** dans le package.

---

## 🔍 Vérification du correctif

### Tests rapides
1. Ouvrir `index 91.5c.html` dans **Safari, Chrome, Firefox ou Edge**
2. Ouvrir la console JavaScript (Cmd+Option+C ou F12)
3. **Vérifier** : Aucune erreur "PratiqueConfigurable is not defined"
4. **Vérifier** : Aucune erreur de chargement CSS
5. **Vérifier** : Interface complète affichée avec boutons visibles
6. Naviguer vers **Réglages → Pratique de notation → Pratiques configurables**
7. **Vérifier** : Liste des pratiques s'affiche correctement

### Console attendue
```
✅ Module pratique-registre.js chargé
✅ [SOM] Pratique Sommative enregistrée avec succès
✅ [PAN] Pratique PAN-Maîtrise enregistrée avec succès
✅ [SPEC] Pratique PAN-Spécifications enregistrée avec succès
✅ Wizard Primo initialisé
```

---

## 🆘 Problèmes connus

### L'erreur "PratiqueConfigurable is not defined" persiste
**Solution** : Assurez-vous d'utiliser `index 91.5c.html` et pas les versions antérieures.

### Page blanche ou boutons blancs
**Solution** : Utilisez Beta 91.5c (CSS inline complet). Versions 91.5 et 91.5b ont ce bug.

### Le sélecteur de grille est vide
**Solution** : Créez d'abord des grilles de critères dans **Matériel → Critères d'évaluation**.

### Les barres SRPNF n'apparaissent pas
**Solution** : Configurez la grille de référence dans **Réglages → Pratique de notation**.

---

## 📞 Support

**Email** : labo@codexnumeris.org
**Site** : https://codexnumeris.org
**Teams** : LABO CODEX DE L'AQPC-PAN

---

## 📄 Licence

Creative Commons BY-NC-SA 4.0 (Grégoire Bédard)

Vous êtes libre de :
- ✅ Partager : Copier et redistribuer le matériel
- ✅ Adapter : Remixer, transformer et créer à partir du matériel

Selon les conditions suivantes :
- 📝 Attribution : Vous devez créditer l'auteur original
- 🚫 Pas d'utilisation commerciale : Usage éducatif uniquement
- 🔄 Partage dans les mêmes conditions : Même licence pour vos adaptations

Voir **LICENSE.md** pour le texte complet.

---

## 🙏 Remerciements

Merci à :
- **Bruno Voisard** (Cégep Laurendeau) pour avoir signalé les deux bugs
- **Testeurs demo Valleyfield** (27 novembre 2025) pour avoir confirmé le bug Edge

---

**Bon monitorage pédagogique !** 🎓
