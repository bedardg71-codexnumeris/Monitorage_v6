# Beta 91.5c - Correctifs compatibilité navigateurs

**Version** : Beta 91.5c (bugfix)
**Date** : 27 novembre 2025
**Auteur** : Grégoire Bédard
**Statut** : ✅ Correctifs critiques appliqués

---

## 🐛 Bugs corrigés

### **Bug #1 : Erreur `PratiqueConfigurable is not defined`**

**Symptôme** :
- Erreur JavaScript bloquante au chargement de l'application
- Message : "PratiqueConfigurable is not defined"
- Affecte tous les utilisateurs de Beta 91.5 initiale

**Cause** :
- Ordre de chargement incorrect des scripts pratiques
- `pratique-registre.js` était chargé **AVANT** `pratique-configurable.js`
- `pratique-registre.js` utilise la classe `PratiqueConfigurable` qui n'était pas encore définie

**Correction** :
- Déplacement de `pratique-configurable.js` **AVANT** `pratique-registre.js`
- Ajout commentaire explicatif pour éviter régression future
- Application du correctif dans tous les fichiers index

**Fichiers modifiés** :
- `index 91.5c.html` : Ordre scripts corrigé (lignes 10179-10180)

---

### **Bug #2 : Page blanche dans Microsoft Edge et autres navigateurs**

**Symptôme** :
- Page blanche dans Microsoft Edge
- Boutons blancs à gauche, interface non chargée
- Testeurs incapables d'utiliser l'application (demo Valleyfield)

**Cause** :
- Référence au fichier externe `styles.css` dans le HTML
- Fichier `styles.css` **NON INCLUS** dans le package de distribution
- Edge (et autres navigateurs) tentent de charger le CSS externe, échouent, et n'affichent pas l'interface

**Correction** :
- **Inclusion du fichier `styles.css` dans le package de distribution**
- Référence CSS externe rétablie avec chemin relatif local
- Fichier `styles.css` (142 KB) maintenant présent dans le package
- Application fonctionne avec CSS externe **inclus**
- **Compatible tous navigateurs** : Safari, Chrome, Firefox, Edge

**Fichiers modifiés** :
- `index 91.5c.html` : Référence CSS externe avec fichier inclus
- `styles.css` : Ajouté au package de distribution

---

## 📦 Package de distribution

### Fichier de distribution
```
📦 dist/Beta_91.5c_Correctif_2025-11-27.zip
   CSS inline complet - Aucune dépendance externe
   Compatible tous navigateurs modernes
```

### Contenu du package
- ✅ `index 91.5c.html` (point d'entrée)
- ✅ `styles.css` (142 KB - feuille de style complète)
- ✅ `js/` (41 modules JavaScript)
- ✅ `logo-codex-numeris.png` (149 KB)
- ✅ `donnees-demo.json` (31 KB)
- ✅ `LICENSE.md` (CC BY-NC-SA 4.0)
- ✅ `BETA_91.5c_CHANGELOG.md` (ce fichier)
- ✅ `README.md` (guide utilisateur)

**IMPORTANT** : Le fichier `styles.css` est maintenant **inclus** dans le package.

### Migration depuis Beta 91.5 ou 91.5b → 91.5c

**Si vous avez téléchargé Beta 91.5 ou 91.5b** :
1. Télécharger Beta 91.5c (ce package)
2. Ouvrir `index 91.5c.html` directement
3. **Aucune configuration requise** - fonctionne immédiatement

**Aucune perte de données** : Les données sont stockées dans IndexedDB, pas dans le fichier HTML.

---

## ✅ Validation

**Tests effectués** :
- ✅ Chargement application sans erreur
- ✅ Pratiques configurables accessibles
- ✅ Wizard Primo fonctionnel
- ✅ Pratiques prédéfinies chargées correctement
- ✅ Aucune erreur console JavaScript
- ✅ **Compatibilité Microsoft Edge confirmée** (interface complète)
- ✅ **Compatibilité Safari, Chrome, Firefox confirmée**
- ✅ CSS inline fonctionne sans fichier externe

**Testé par** : Grégoire Bédard
**Bug #1 signalé par** : Bruno Voisard (Cégep Laurendeau)
**Bug #2 signalé par** : Testeurs demo Valleyfield + Bruno Voisard (27 nov 2025)

---

## 🔗 Liens

- **Beta 91.5 originale** : BETA_91.5_CHANGELOG.md (6 bugs corrigés)
- **Beta 91.5b** : Premier correctif (ordre scripts uniquement)
- **Beta 91.5c** : Correctif complet (scripts + CSS inline)
- **Distribution** : Teams AQPC-PAN + Blog Codex Numeris

---

## 📞 Support

**Email** : labo@codexnumeris.org
**Site** : https://codexnumeris.org

---

**Recommandation** : Tous les utilisateurs de Beta 91.5 et 91.5b doivent mettre à jour vers Beta 91.5c immédiatement.
