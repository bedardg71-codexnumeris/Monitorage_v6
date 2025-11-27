# Guide : Chargement des nouvelles pratiques configurables
**Date :** 26 novembre 2025
**Version :** 1.0

---

## ✅ Travail complété

### Phase 1 : Analyse et configuration JSON (COMPLÉTÉE)

**Fichiers créés :**
1. `ANALYSE_CARTOGRAPHIES.md` - Analyse détaillée des 6 cartographies
2. `pan-objectifs-ponderes-michel.json` - Configuration Michel Baillargeon
3. `sommative-remplacement-jordan.json` - Configuration Jordan Raymond
4. `pan-jugement-global-isabelle.json` - Configuration Isabelle Ménard
5. `SPEC_SYSTEME_PROFILS.md` (v1.2) - Documentation technique mise à jour
6. `RECAP_INTEGRATION_PRATIQUES_26NOV2025.md` - Récapitulatif complet

**Fichier modifié :**
- `js/pratiques/pratiques-predefines.js` - Ajout des 3 nouvelles pratiques

**Résultat :** 7 pratiques prédéfinies disponibles (4 existantes + 3 nouvelles)

---

## 📖 Instructions de chargement

### Étape 1 : Ouvrir l'application

Ouvre `index 91.html` dans Safari ou Chrome.

### Étape 2 : Naviguer vers les pratiques

**Navigation :**
```
Réglages → Pratique de notation → (scroll vers le bas) → Pratiques configurables
```

### Étape 3 : Charger les pratiques prédéfinies

Tu devrais voir un bouton **"Charger les pratiques prédéfinies"** ou similaire.

**Cliquer sur ce bouton.**

**Message de confirmation attendu :**
```
Charger les pratiques prédéfinies ?

Cela ajoutera des exemples de pratiques (Bruno, Marie-Hélène, François)
que vous pourrez modifier.
```

**Répondre : OK**

### Étape 4 : Vérifier le chargement

**Message de succès attendu :**
```
✅ Pratiques prédéfinies chargées !

Vous pouvez maintenant les activer, les modifier ou les dupliquer.
```

**Dans la console du navigateur (F12 ou Cmd+Opt+I) :**
```
✅ Module pratiques-predefines.js chargé
   • 7 pratiques disponibles
```

---

## 🔍 Vérification dans l'interface

Après le chargement, tu devrais voir **7 cartes de pratiques** :

### Pratiques existantes (4)

1. **PAN-Standards (5 niveaux)**
   - Par Bruno Voisard (Cégep Laurendeau)
   - Système à 5 niveaux avec reprises multiples

2. **Sommative traditionnelle**
   - Par Marie-Hélène Leduc (Cégep Valleyfield)
   - Moyenne pondérée classique avec critères fixes

3. **PAN-Spécifications (notes fixes)**
   - Par François Arseneault-Hubert (Cégep Laurendeau)
   - Notes fixes (50, 60, 80, 100%) selon critères atteints

4. **PAN-Littérature 101**
   - Par Grégoire Bédard (Cégep Drummond)
   - PAN test A2025

### Nouvelles pratiques (3)

5. **PAN-Objectifs pondérés (Michel Baillargeon)** ⭐ NOUVEAU
   - Par Michel Baillargeon (Cégep - Mathématiques)
   - 13 objectifs évalués en mode PAN avec pondérations variables

6. **Sommative avec remplacement (Jordan Raymond)** ⭐ NOUVEAU
   - Par Jordan Raymond (Cégep - Philosophie)
   - Évaluation finale peut remplacer mi-session si note supérieure

7. **PAN-Jugement global (Isabelle Ménard)** ⭐ NOUVEAU
   - Par Isabelle Ménard (Cégep - Biologie)
   - Calcul mode statistique comme suggestion avec jugement professionnel

---

## 🧪 Test des nouvelles pratiques

### Option 1 : Activer une pratique

**Pour tester une pratique :**
1. Cliquer sur le bouton **"Activer"** de la pratique souhaitée
2. L'application changera la pratique active
3. `modalitesEvaluation.pratique` sera mis à jour dans IndexedDB

**Console attendue :**
```
[PratiqueManager] ✅ Pratique changée : pan-objectifs-ponderes-michel
```

### Option 2 : Éditer une pratique

**Pour voir la configuration :**
1. Cliquer sur le bouton **"Éditer"** de la pratique
2. Tu verras la structure JSON de la pratique
3. Tu pourras modifier les paramètres

### Option 3 : Exporter une pratique

**Pour sauvegarder le JSON :**
1. Cliquer sur le bouton **"Exporter"**
2. Un fichier JSON sera téléchargé
3. Format : `pratique-[id]-[date].json`

---

## ⚠️ Limitations actuelles

### Calculs non implémentés

**Important :** Les 3 nouvelles pratiques sont **chargées** dans l'interface mais les **calculs ne fonctionnent pas encore**.

**Raison :** Les méthodes de calcul suivantes nécessitent du développement :
- `pan-par-objectif` (Michel) - Calcul multi-objectifs
- `remplacement-progression` (Jordan) - Logique conditionnelle
- `mode-statistique-avec-jugement` (Isabelle) - Calcul mode + interface confirmation

**Message d'erreur possible :**
```
⚠️ Méthode de calcul non supportée : pan-par-objectif
Les calculs de notes ne fonctionneront pas correctement.
```

**Ceci est normal et attendu !** C'est la Phase 2 du plan d'intégration.

---

## 📋 Prochaines étapes (Phase 2)

### 1. Développement code de calcul (2-3 semaines)

**Priorité ÉLEVÉE : Michel Baillargeon (Objectifs pondérés)**
- Modifier `js/portfolio.js` : Support calcul multi-objectifs
- Modifier `js/profil-etudiant.js` : Affichage tableau par objectif
- Créer/étendre `js/pratiques/pratique-pan-objectifs.js`
- Tests : Valider avec 13 objectifs de Michel
- **Estimation :** 3-4 jours

**Priorité MOYENNE : Jordan Raymond (Remplacement progression)**
- Modifier `js/portfolio.js` : Logique conditionnelle `max()`
- Modifier `js/productions.js` : Interface paires liées
- Créer fonction `calculerNoteSommativeAvecRemplacement()`
- Tests : Valider avec 2 paires de Jordan
- **Estimation :** 2-3 jours

**Priorité MOYENNE : Isabelle Ménard (Jugement global)**
- Implémenter calcul mode statistique dans `PratiqueConfigurable`
- Créer interface confirmation jugement enseignante
- Ajouter avertissement "Jugement professionnel requis"
- Tests : Valider avec 11 évaluations d'Isabelle
- **Estimation :** 2-3 jours

### 2. Documentation et tests (1 semaine)

- Créer guides spécifiques pour chaque pratique
- Mettre à jour documentation technique
- Tests utilisateurs avec les 3 enseignant·es sources

---

## 🐛 Dépannage

### Problème : Les nouvelles pratiques n'apparaissent pas

**Solution 1 : Vider le cache**
```javascript
// Dans la console du navigateur (F12)
localStorage.clear();
location.reload();
```

**Solution 2 : Recharger les pratiques**
```javascript
// Dans la console du navigateur
await PratiqueManager.initialiserPratiquesPredefines();
await afficherListePratiques();
```

**Solution 3 : Vérifier la console**
```javascript
// Vérifier que le module est chargé
console.log(window.PRATIQUES_PREDEFINES);
// Devrait afficher un objet avec 7 pratiques
```

### Problème : Erreur "pratique non trouvée"

**Cause possible :** Cache IndexedDB désynchronisé

**Solution :**
```javascript
// Forcer la synchronisation
await db.syncToLocalStorageCache();
```

### Problème : Bouton "Charger pratiques" manquant

**Cause possible :** Interface pas à jour

**Solution :** Vérifier que tu es bien dans `index 91.html` (Beta 91+)

---

## 📊 Vérification dans IndexedDB

### Avec les DevTools du navigateur

**Safari :**
1. Cmd+Opt+I → Onglet "Storage"
2. IndexedDB → MonitorageDB → pratiquesConfigurables
3. Tu devrais voir 7 entrées

**Chrome :**
1. F12 → Onglet "Application"
2. IndexedDB → MonitorageDB → pratiquesConfigurables
3. Tu devrais voir 7 entrées

### Avec JavaScript

```javascript
// Dans la console
const pratiques = db.getSync('pratiquesConfigurables', []);
console.log(`Nombre de pratiques : ${pratiques.length}`);
console.log('IDs:', pratiques.map(p => p.id));
```

**Résultat attendu :**
```
Nombre de pratiques : 7
IDs: [
  "pan-maitrise-json",
  "pan-standards-bruno",
  "sommative-traditionnelle-mhl",
  "pan-specifications-fah",
  "pan-objectifs-ponderes-michel",
  "sommative-remplacement-jordan",
  "pan-jugement-global-isabelle"
]
```

---

## 📚 Documents de référence

### Pour comprendre l'analyse
- `ANALYSE_CARTOGRAPHIES.md` - Analyse complète des 6 cartographies
- `RECAP_INTEGRATION_PRATIQUES_26NOV2025.md` - Récapitulatif du travail

### Pour le développement technique
- `SPEC_SYSTEME_PROFILS.md` (v1.2) - Spécifications techniques complètes
- `ARCHITECTURE_PRATIQUES.md` - Architecture système modulaire
- `GUIDE_AJOUT_PRATIQUE.md` - Guide pour ajouter une pratique

### Configurations JSON sources
- `pan-objectifs-ponderes-michel.json`
- `sommative-remplacement-jordan.json`
- `pan-jugement-global-isabelle.json`

---

## 🎯 Critères de succès Phase 1

✅ **COMPLÉTÉS :**
- [x] 3 fichiers JSON créés avec structure complète
- [x] Documentation `SPEC_SYSTEME_PROFILS.md` mise à jour
- [x] Analyse détaillée des 6 cartographies
- [x] Plan d'intégration documenté
- [x] Pratiques intégrées dans `pratiques-predefines.js`
- [x] 7 pratiques disponibles au chargement

⏳ **À VENIR (Phase 2) :**
- [ ] Calculs de notes fonctionnels pour les 3 nouvelles pratiques
- [ ] Interfaces spécifiques (tableau objectifs, confirmation jugement)
- [ ] Tests validés avec les 3 enseignant·es sources
- [ ] Documentation utilisateur complète

---

## 💡 Recommandations

### Pour Grégoire

1. **Tester le chargement immédiatement** pour valider la Phase 1
2. **Prioriser Michel Baillargeon** pour Phase 2 (forte demande, impact élevé)
3. **Impliquer les enseignant·es** dès Phase 2 (feedback itératif)
4. **Documenter les bugs rencontrés** pour faciliter le développement

### Pour le développement

1. Commencer par la pratique la plus simple (Jordan - remplacement)
2. Monter en complexité progressivement
3. Tester chaque pratique individuellement
4. Créer des tests unitaires pour les calculs

---

*Document créé le 26 novembre 2025*
*Guide de chargement des nouvelles pratiques configurables*
*Phase 1 (JSON) complétée - Phase 2 (Code) à venir*
