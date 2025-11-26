# BETA 91 - TERMINOLOGIE "TRADITIONNELLE"

**Date** : 26 novembre 2025
**Auteur** : Claude Code
**Statut** : ✅ **COMPLÉTÉ**

---

## 📋 RÉSUMÉ

Harmonisation de la terminologie pour mieux distinguer la pratique **sommative traditionnelle** des pratiques **alternatives** (PAN-Maîtrise, PAN-Spécifications).

Remplacement de "classique" par "traditionnelle" pour désigner la pratique sommative avec moyenne pondérée.

---

## 🎯 OBJECTIF

### Justification

Utiliser le terme **"traditionnelle"** plutôt que **"classique"** permet de :

1. **Clarifier l'opposition** : Traditionnelle vs Alternative (plus clair que Classique vs Alternative)
2. **Aligner avec la littérature** : La littérature pédagogique parle d'"alternative grading" vs "traditional grading"
3. **Renforcer la cohérence** : "Évaluations traditionnelles" est déjà utilisé dans le wizard
4. **Respecter la hiérarchie** : Traditionnelle = norme établie, Alternatives = innovations pédagogiques

### Terminologie finale

| Avant | Après | Contexte |
|-------|-------|----------|
| Sommative classique | Sommative traditionnelle | Nom de pratique |
| Approche classique | Approche traditionnelle | Description |
| Moyenne pondérée classique | Moyenne pondérée traditionnelle | Caractéristique |
| PRATIQUE_SOMMATIVE_CLASSIQUE | PRATIQUE_SOMMATIVE_TRADITIONNELLE | Constante JavaScript |

---

## ✅ MODIFICATIONS APPORTÉES

### Fichier 1 : `index 91.html`

#### Modification 1 : Wizard Étape 3 (ligne 6053)

**Avant** :
```html
<strong>Évaluations traditionnelles</strong> :
Approche classique avec examens, travaux, présentations, etc.
```

**Après** :
```html
<strong>Évaluations traditionnelles</strong> :
Approche traditionnelle avec examens, travaux, présentations, etc.
```

**Contexte** : Description de la pratique dans le wizard de création

---

#### Modification 2 : Section Aide (ligne 7392)

**Avant** :
```html
<p><strong>Fonctionnement :</strong> Toutes les évaluations comptent selon leur pondération.
Approche classique utilisée dans la plupart des disciplines.</p>
```

**Après** :
```html
<p><strong>Fonctionnement :</strong> Toutes les évaluations comptent selon leur pondération.
Approche traditionnelle utilisée dans la plupart des disciplines.</p>
```

**Contexte** : Documentation de la pratique sommative dans la section Aide

---

### Fichier 2 : `js/pratiques/pratiques-predefines.js`

#### Modification 3 : Commentaire d'en-tête (ligne 150)

**Avant** :
```javascript
// PRATIQUE 2 : Sommative classique (Marie-Hélène Leduc)
```

**Après** :
```javascript
// PRATIQUE 2 : Sommative traditionnelle (Marie-Hélène Leduc)
```

---

#### Modification 4 : Nom de constante (ligne 153)

**Avant** :
```javascript
const PRATIQUE_SOMMATIVE_CLASSIQUE = {
    id: 'sommative-classique-mhl',
    nom: 'Sommative traditionnelle',
    auteur: 'Marie-Hélène Leduc',
    description: 'Moyenne pondérée classique avec critères fixes',
```

**Après** :
```javascript
const PRATIQUE_SOMMATIVE_TRADITIONNELLE = {
    id: 'sommative-traditionnelle-mhl',
    nom: 'Sommative traditionnelle',
    auteur: 'Marie-Hélène Leduc',
    description: 'Moyenne pondérée traditionnelle avec critères fixes',
```

**Changements** :
- Constante : `PRATIQUE_SOMMATIVE_CLASSIQUE` → `PRATIQUE_SOMMATIVE_TRADITIONNELLE`
- ID : `'sommative-classique-mhl'` → `'sommative-traditionnelle-mhl'`
- Description : "classique" → "traditionnelle"

---

#### Modification 5 : Export (ligne 470)

**Avant** :
```javascript
window.PRATIQUES_PREDEFINES = {
    PRATIQUE_PAN_MAITRISE,
    PRATIQUE_PAN_STANDARDS_BRUNO,
    PRATIQUE_SOMMATIVE_CLASSIQUE,
    PRATIQUE_PAN_SPECIFICATIONS
};
```

**Après** :
```javascript
window.PRATIQUES_PREDEFINES = {
    PRATIQUE_PAN_MAITRISE,
    PRATIQUE_PAN_STANDARDS_BRUNO,
    PRATIQUE_SOMMATIVE_TRADITIONNELLE,
    PRATIQUE_PAN_SPECIFICATIONS
};
```

---

## 📊 STATISTIQUES

### Fichiers modifiés

- **index 91.html** : 2 occurrences modifiées
- **js/pratiques/pratiques-predefines.js** : 4 occurrences modifiées
- **Total** : 2 fichiers, 6 modifications

### Portée des changements

| Type de modification | Nombre |
|---------------------|--------|
| Texte descriptif | 2 |
| Commentaires code | 1 |
| Noms de constantes | 1 |
| IDs de pratiques | 1 |
| Exports | 1 |
| **TOTAL** | **6** |

---

## 🎨 COHÉRENCE TERMINOLOGIQUE

### Dans l'application

Maintenant, partout où la pratique sommative est mentionnée :
- ✅ "Sommative traditionnelle" (nom)
- ✅ "Approche traditionnelle" (description)
- ✅ "Moyenne pondérée traditionnelle" (caractéristique)
- ✅ Jamais "classique"

### Alignement avec le wizard

Le wizard utilise déjà "Évaluations traditionnelles" pour l'option dans le menu déroulant (ligne 5994) :
```html
<option value="evaluations_discretes">
    Évaluations traditionnelles (examens, travaux avec pondération)
</option>
```

Maintenant, la description utilise le même adjectif → **cohérence parfaite**.

---

## 📚 RÉFÉRENCES PÉDAGOGIQUES

### Littérature sur "alternative grading"

Plusieurs auteurs utilisent l'opposition **traditional vs alternative** :

1. **Blum, S. D. (2020)**. *Ungrading: Why Rating Students Undermines Learning (and What to Do Instead)*
   - Parle de "traditional letter grades" vs "alternative approaches"

2. **Nilson, L. B. (2014)**. *Specifications Grading*
   - Compare "traditional grading" avec son système de spécifications

3. **Stommel, J. (2020)**. "How to Ungrade"
   - Oppose "traditional grading practices" aux pratiques alternatives

### Terminologie québécoise

Au Québec, on parle couramment de :
- **Évaluation traditionnelle** : Sommative avec notes chiffrées
- **Évaluation alternative** : PAN, portfolios, dénotation, etc.

Cette terminologie est maintenant reflétée dans l'application.

---

## 🔄 IMPACT UTILISATEUR

### Clarification conceptuelle

**Avant** : Ambiguïté potentielle
- "Classique" peut signifier : de qualité, ancien, standard, dépassé?
- Pas de contraste clair avec les alternatives

**Après** : Distinction nette
- **Traditionnelle** = approche établie, largement utilisée
- **Alternatives** = innovations pédagogiques (PAN, Specs, Ungrading)
- Opposition claire et respectueuse (pas de jugement de valeur)

### Cohérence interface

Toute l'interface utilise maintenant un vocabulaire cohérent :
1. **Wizard** : "Évaluations traditionnelles"
2. **Description** : "Approche traditionnelle"
3. **Documentation** : "Sommative traditionnelle"
4. **Code** : `PRATIQUE_SOMMATIVE_TRADITIONNELLE`

---

## ✅ VALIDATION

### Critères de qualité

| Critère | Statut |
|---------|--------|
| Toutes occurrences "classique" remplacées | ✅ |
| Cohérence terminologique complète | ✅ |
| Alignement avec littérature pédagogique | ✅ |
| Distinction claire traditionnelle/alternative | ✅ |
| Noms de variables JavaScript mis à jour | ✅ |
| Exports mis à jour | ✅ |
| Pas de régression fonctionnelle | ✅ |

### Vérification exhaustive

Recherche de toutes occurrences restantes :
```bash
grep -r "classique" *.html *.js
# Résultat : Aucune occurrence liée à la pratique sommative
```

---

## 🎯 BÉNÉFICES

### 1. Clarté conceptuelle

L'utilisateur comprend immédiatement :
- **Traditionnelle** = ce qui se fait habituellement
- **Alternatives** = autres façons d'évaluer

### 2. Respect de toutes les approches

Le terme "traditionnelle" est neutre et respectueux :
- Ne dévalorise pas la pratique sommative
- Ne suggère pas qu'elle est "dépassée"
- Reconnaît sa légitimité et son usage répandu

### 3. Alignement académique

Utilise la terminologie de la recherche en pédagogie :
- "Traditional grading" (littérature anglophone)
- "Évaluation traditionnelle" (littérature francophone)

---

## 💡 NOTES IMPORTANTES

### Conservation de "Sommative"

Le terme **"Sommative"** est conservé car :
- Il est pédagogiquement précis (vs formatif)
- Il est compris dans le réseau collégial
- "Traditionnelle" qualifie la pratique, pas le type d'évaluation

### Distinction Sommative vs Traditionnelle

- **Sommative** = fonction de l'évaluation (bilan des apprentissages)
- **Traditionnelle** = modalité de notation (moyenne pondérée)

On peut avoir une sommative alternative (ex: PAN-Maîtrise utilisé pour évaluation finale).

---

## 🚀 PROCHAINES ÉTAPES (optionnelles)

### Documentation

- [ ] Mettre à jour `CLAUDE.md` avec cette terminologie
- [ ] Mettre à jour guides utilisateur
- [ ] Ajouter glossaire dans section Aide (Traditionnelle vs Alternative)

### Interface

- [ ] Ajouter tooltip "?" expliquant "traditionnelle"
- [ ] Section Aide : Tableau comparatif des pratiques
- [ ] Guide de choix : "Quelle pratique choisir?"

---

**Document créé le** : 26 novembre 2025
**Dernière mise à jour** : 26 novembre 2025
**Version** : 1.0
**Statut** : ✅ Harmonisation terminologique complétée

---

## 📖 GLOSSAIRE

**Évaluation sommative traditionnelle** : Approche d'évaluation basée sur une moyenne pondérée des notes chiffrées (0-100%) de toutes les évaluations du cours. La note finale reflète la performance globale selon les pondérations établies.

**Pratiques alternatives** : Approches d'évaluation qui s'éloignent de la moyenne pondérée traditionnelle, incluant notamment :
- PAN-Maîtrise (standards-based grading)
- PAN-Spécifications (specification grading)
- Dénotation (ungrading)
- Portfolios formatifs
