# Récapitulatif : Intégration des pratiques de notation
**Date :** 26 novembre 2025
**Auteur :** Claude Code
**Pour :** Grégoire Bédard

---

## 📊 Travail accompli

### Analyse complète des 6 cartographies

J'ai analysé les 6 cartographies d'enseignant·es présentes dans le répertoire `Autres pratiques de notation/` pour identifier les pratiques qui nécessitent une intégration dans le système modulaire de Monitorage.

**Résultat de l'analyse :**
- ✅ **3 pratiques déjà supportées** (50%) - Aucune action requise
- 🟠 **2 pratiques partiellement nouvelles** (33%) - Configuration JSON possible
- 🔴 **1 pratique entièrement nouvelle** (17%) - Développement code requis

---

## 📄 Documents créés

### 1. `ANALYSE_CARTOGRAPHIES.md` (Analyse détaillée)

**Contenu :**
- Analyse complète des 6 cartographies avec caractéristiques détaillées
- Tableau récapitulatif des statuts d'intégration
- Recommandations d'implémentation par pratique
- Plan d'intégration en 3 phases (1 + 2-3 + 1 semaine)
- Estimation temps total : 4-5 semaines pour intégration complète

**Pratiques analysées :**

| Enseignant·e | Discipline | Pratique | Statut |
|--------------|------------|----------|--------|
| Étienne Labbé | Administration | PAN-Standards 3-5 niveaux | ✅ Supportée |
| Hélène Chabot | Philosophie | Hybride Som+PAN portfolio | ✅ Supportée |
| **Isabelle Ménard** | Biologie | **PAN-Jugement global** | 🟠 **Nouvelle** |
| **Jordan Raymond** | Philosophie | **Sommative + remplacement** | 🔴 **Nouvelle** |
| **Michel Baillargeon** | Mathématiques | **PAN-Objectifs pondérés** | 🟠 **Nouvelle** |
| Olivier Lalonde | Géographie | Sommative classique | ✅ Supportée |

---

### 2. Fichiers de configuration JSON (3 nouvelles pratiques)

#### 2.1 `pan-objectifs-ponderes-michel.json` (Priorité ÉLEVÉE)

**Enseignant :** Michel Baillargeon (Mathématiques - Calcul différentiel)

**Principe :** 13 objectifs évalués indépendamment en mode PAN, avec pondérations variables selon importance (objectifs intégrateurs > fondamentaux).

**Structure clé :**
```json
{
  "structure_evaluations": {
    "type": "objectifs-multiples",
    "objectifs": [
      {"id": "obj1", "nom": "Limites", "poids": 8, "type": "fondamental"},
      {"id": "obj5", "nom": "Optimisation", "poids": 15, "type": "integrateur"},
      ...
    ]
  },
  "calcul_note": {
    "type": "pan-par-objectif",
    "nombre_artefacts_par_objectif": 3,
    "formule": "Note_finale = Σ (Note_objectif_i × Poids_i) / 100"
  }
}
```

**Bénéfice :** Très élevé - Applicable à plusieurs disciplines (math, chimie, physique, bio)

**Complexité :** Élevée - Nécessite refonte structure `indicesCP` pour multi-objectifs

**Estimation développement :** 3-4 jours

---

#### 2.2 `sommative-remplacement-jordan.json` (Priorité MOYENNE)

**Enseignant :** Jordan Raymond (Philosophie 101)

**Principe :** Évaluation finale peut remplacer mi-session si note supérieure. Valorise la progression et permet de "racheter" un échec initial.

**Structure clé :**
```json
{
  "structure_evaluations": {
    "type": "sommative-progressive",
    "paires_remplacement": [
      {
        "evaluation_initiale": {"nom": "Examen mi-session", "poids": 10},
        "evaluation_finale": {"nom": "Examen final", "poids": 20},
        "regle_remplacement": "max"
      }
    ]
  },
  "calcul_note": {
    "type": "remplacement-progression",
    "algorithme": "Si note_finale > note_initiale: max(notes) × poids_total"
  }
}
```

**Bénéfice :** Moyen - Cas d'usage spécifique mais pédagogiquement intéressant

**Complexité :** Modérée - Logique conditionnelle dans calcul

**Estimation développement :** 2-3 jours

---

#### 2.3 `pan-jugement-global-isabelle.json` (Priorité MOYENNE)

**Enseignante :** Isabelle Ménard (Biologie - Anatomie et physiologie)

**Principe :** Le système calcule une **suggestion** (mode statistique), mais l'enseignante conserve le jugement professionnel final. Le calcul **soutient** la décision mais ne la **remplace pas**.

**Structure clé :**
```json
{
  "structure_evaluations": {
    "type": "portfolio-integral",
    "description": "Tous artefacts considérés (pas N meilleurs)"
  },
  "calcul_note": {
    "type": "mode-statistique-avec-jugement",
    "fenetre_recente": 4,
    "algorithme_suggestion": "Calculer mode (niveau le plus fréquent) comme SUGGESTION",
    "avertissement": "⚠️ Jugement professionnel final requis"
  },
  "detection_defis": {
    "type": "comportementale-et-academique",
    "indicateurs_comportementaux": ["Désengagement", "Refus rencontres"],
    "indicateurs_academiques": ["Absence progression", "Maintien en I"]
  }
}
```

**Bénéfice :** Moyen - Limite d'automatisation reconnue

**Complexité :** Modérée - Calcul mode + interface confirmation enseignante

**Estimation développement :** 2-3 jours

**Note importante :** NÉCESSITE une interface permettant de CONFIRMER ou AJUSTER la suggestion. Ne PAS implémenter comme calcul automatique final.

---

### 3. `SPEC_SYSTEME_PROFILS.md` (Documentation technique)

**Mise à jour :** Ajout d'une nouvelle section complète "🆕 Structures de pratiques étendues (novembre 2025)"

**Contenu ajouté :**
- Documentation détaillée des 3 nouvelles structures de calcul
- Exemples de structures JSON spécifiques
- Exemples de calculs concrets avec scénarios
- Tableau récapitulatif avec priorités et complexités
- Prochaines étapes d'implémentation

**Changement de version :** 1.1 → 1.2

---

## 🎯 Synthèse des résultats

### Pratiques déjà supportées (3/6)

**Aucune action requise pour :**

1. **Étienne Labbé** (Administration - PAN-Standards 3-5 niveaux)
   - Pratique équivalente : `sommative` (moyenne pondérée)
   - Échelle personnalisable via système existant

2. **Hélène Chabot** (Philosophie - Hybride Sommative + PAN)
   - Pratique équivalente : `sommative` avec ajustement pondérations
   - Portfolio = évaluation pondérée parmi d'autres

3. **Olivier Lalonde** (Géographie - Sommative traditionnelle)
   - Pratique équivalente : `sommative` (moyenne pondérée classique)
   - Seuils configurables : 70/65/55 vs défaut 85/80/70

**Raison :** Le système actuel avec pratique `sommative` + échelles personnalisées + grilles personnalisées couvre ces cas d'usage.

---

### Nouvelles pratiques identifiées (3/6)

#### 🔥 Priorité ÉLEVÉE : Michel Baillargeon (Objectifs pondérés)

**Pourquoi priorité élevée ?**
- Forte demande (automation souhaitée)
- Applicable à plusieurs disciplines (math, chimie, physique, bio)
- Impact pédagogique élevé
- Cas d'usage très fréquent en sciences

**Actions requises :**
- Étendre `js/pratiques/pratique-configurable.js` pour type `pan-par-objectif`
- Modifier `js/portfolio.js` pour calcul multi-objectifs
- Modifier `js/profil-etudiant.js` pour affichage tableau par objectif
- Créer tests avec les 13 objectifs de Michel

---

#### 🟠 Priorité MOYENNE : Jordan Raymond (Remplacement progression)

**Pourquoi priorité moyenne ?**
- Cas d'usage spécifique (philosophie)
- Pédagogiquement intéressant (valorise progression)
- Logique modérément complexe

**Actions requises :**
- Modifier `js/portfolio.js` pour logique conditionnelle `max()`
- Modifier `js/productions.js` pour interface paires liées
- Créer fonction `calculerNoteSommativeAvecRemplacement()`
- Tests avec 2 paires de Jordan

---

#### 🟠 Priorité MOYENNE : Isabelle Ménard (Jugement global)

**Pourquoi priorité moyenne ?**
- Limite d'automatisation reconnue (jugement humain requis)
- Nécessite interface spéciale (confirmation enseignante)
- Cas d'usage spécifique (biologie)

**Actions requises :**
- Implémenter calcul mode statistique dans `PratiqueConfigurable`
- Créer interface confirmation/ajustement jugement
- Ajouter avertissement "Jugement professionnel requis"
- Tests avec 11 évaluations d'Isabelle

---

## 📅 Plan d'intégration recommandé

### Phase 1 : Pratiques configurables JSON (1 semaine)
**Priorité :** Moyenne à Élevée

✅ **COMPLÉTÉ (26 nov 2025) :**
- [x] Créer 3 fichiers JSON
- [x] Documenter dans `SPEC_SYSTEME_PROFILS.md`
- [x] Analyser les 6 cartographies

⏳ **À FAIRE :**
- [ ] Tester chargement via `PratiqueManager`
- [ ] Vérifier parsing JSON
- [ ] Vérifier validation structure
- [ ] Tester affichage dans interface Pratiques

---

### Phase 2 : Extensions code (2-3 semaines)
**Priorité :** ÉLEVÉE pour objectifs pondérés, MOYENNE pour autres

#### 2.1 Objectifs pondérés (Michel) - Priorité ÉLEVÉE
- [ ] Modifier `js/portfolio.js` : Support calcul multi-objectifs
- [ ] Modifier `js/profil-etudiant.js` : Affichage tableau par objectif
- [ ] Créer/étendre `js/pratiques/pratique-pan-objectifs.js`
- [ ] Tests : Valider avec 13 objectifs de Michel
- **Estimation :** 3-4 jours

#### 2.2 Remplacement progression (Jordan) - Priorité MOYENNE
- [ ] Modifier `js/portfolio.js` : Logique conditionnelle `max()`
- [ ] Modifier `js/productions.js` : Interface paires liées
- [ ] Créer fonction `calculerNoteSommativeAvecRemplacement()`
- [ ] Tests : Valider avec 2 paires de Jordan
- **Estimation :** 2-3 jours

#### 2.3 Jugement global (Isabelle) - Priorité MOYENNE
- [ ] Implémenter calcul mode statistique dans `PratiqueConfigurable`
- [ ] Créer interface confirmation jugement enseignante
- [ ] Ajouter avertissement "Jugement professionnel requis"
- [ ] Tests : Valider avec 11 évaluations d'Isabelle
- **Estimation :** 2-3 jours

---

### Phase 3 : Documentation et tests (1 semaine)

#### 3.1 Guides spécifiques
- [ ] `GUIDE_PRATIQUE_OBJECTIFS_PONDERES.md`
- [ ] `GUIDE_PRATIQUE_REMPLACEMENT.md`
- [ ] `GUIDE_PRATIQUE_JUGEMENT_GLOBAL.md`

#### 3.2 Mise à jour documentation
- [ ] Mettre à jour `SPEC_SYSTEME_PROFILS.md` avec exemples complets
- [ ] Créer schémas flux de calcul pour chaque pratique
- [ ] Documenter API `PratiqueConfigurable`

#### 3.3 Tests utilisateurs
- [ ] Valider avec Michel (objectifs pondérés)
- [ ] Valider avec Jordan (remplacement)
- [ ] Valider avec Isabelle (jugement global)
- [ ] Recueillir feedback et ajuster

---

## 📈 Estimation temps total

| Phase | Durée estimée | Priorité |
|-------|---------------|----------|
| **Phase 1** (JSON) | ✅ **Complétée** | Moyenne-Élevée |
| **Phase 2** (Code) | 2-3 semaines | ÉLEVÉE (objectifs), MOYENNE (autres) |
| **Phase 3** (Docs/tests) | 1 semaine | Moyenne |
| **TOTAL** | **3-4 semaines** | — |

**Note :** Phase 1 complétée le 26 novembre 2025. Reste 3-4 semaines pour Phase 2+3.

---

## 🎯 Recommandations stratégiques

### 1. Prioriser Michel Baillargeon (objectifs pondérés)

**Raisons :**
- Forte demande (automation souhaitée explicitement)
- Applicable à plusieurs disciplines (math, sciences)
- Impact pédagogique élevé
- Cas d'usage très fréquent

**Bénéfice :** Maximise le retour sur investissement du développement

---

### 2. Tester chargement JSON immédiatement

**Actions :**
- Vérifier que `PratiqueManager` peut charger les 3 nouveaux JSON
- Identifier rapidement blocages techniques
- Valider structure JSON avant de coder

**Bénéfice :** Détection précoce des problèmes

---

### 3. Commencer développement par pratique la plus simple

**Ordre suggéré :**
1. **Remplacement progression** (Jordan) - Logique conditionnelle simple
2. **Jugement global** (Isabelle) - Calcul mode + interface
3. **Objectifs pondérés** (Michel) - Refonte structure la plus complexe

**Raison :** Monter en complexité progressivement, apprendre des pratiques simples

**Alternative :** Commencer par Michel si priorité business très forte

---

### 4. Impliquer les enseignant·es dès Phase 2

**Actions :**
- Partager prototypes intermédiaires
- Recueillir feedback itératif
- Ajuster avant finalisation

**Bénéfice :** Garantit que l'implémentation répond aux besoins réels

---

## 📚 Références

### Documents créés (26 nov 2025)
- `ANALYSE_CARTOGRAPHIES.md` - Analyse détaillée des 6 cartographies
- `pan-objectifs-ponderes-michel.json` - Configuration Michel Baillargeon
- `sommative-remplacement-jordan.json` - Configuration Jordan Raymond
- `pan-jugement-global-isabelle.json` - Configuration Isabelle Ménard
- `SPEC_SYSTEME_PROFILS.md` (v1.2) - Documentation technique mise à jour

### Cartographies sources
- `Cartographie Étienne Labbé Admin.pdf`
- `Cartographie Hélène Chabot Philo.pdf`
- `Cartographie Isabelle Ménard Biologie.pdf`
- `Cartographie Jordan Raymond Philo.pdf`
- `Cartographie Michel Baillargeon Math.pdf`
- `Cartographie Olivier Lalonde Géographie.pdf`

### Architecture existante
- `ARCHITECTURE_PRATIQUES.md` - Architecture système pratiques modulaire
- `GUIDE_AJOUT_PRATIQUE.md` - Guide pour ajouter une pratique
- `FEUILLE_DE_ROUTE_PRATIQUES.md` - Roadmap implémentation pratiques
- `CLARIFICATION_INTERFACE_PRATIQUES.md` - Clarifications interface

---

## ✅ Critères de succès

### Phase 1 (JSON) - ✅ COMPLÉTÉE
- [x] 3 fichiers JSON créés avec structure complète
- [x] Documentation `SPEC_SYSTEME_PROFILS.md` mise à jour
- [x] Analyse détaillée des 6 cartographies
- [x] Plan d'intégration documenté

### Phase 2 (Code) - ⏳ À VENIR
- [ ] Michel peut utiliser app avec 13 objectifs pondérés
- [ ] Jordan peut utiliser app avec remplacement automatique
- [ ] Isabelle peut utiliser app avec suggestion mode + confirmation
- [ ] Calculs de notes corrects pour chaque pratique
- [ ] Tests validés sur Safari + Chrome

### Phase 3 (Docs/Tests) - ⏳ À VENIR
- [ ] Guides utilisateur compréhensibles pour non-techniques
- [ ] Validation par les 3 enseignant·es sources
- [ ] Documentation technique complète pour mainteneurs
- [ ] Pratiques partageables entre utilisateurs

---

## 🚀 Prochaine étape immédiate

**Action recommandée :** Tester chargement des 3 fichiers JSON via `PratiqueManager`

**Commande de test (console navigateur) :**
```javascript
// Charger une pratique configurable
const pratiques = db.getSync('pratiquesConfigurables', []);
console.log('Pratiques configurables:', pratiques);

// Tenter de charger les nouvelles pratiques
// (Nécessite d'abord importer les JSON dans IndexedDB)
```

**Objectif :** Valider que la structure JSON est correcte et parsable par le système existant.

---

*Document créé le 26 novembre 2025*
*Analyse basée sur 6 cartographies d'enseignant·es*
*Travail accompli : Analyse + 3 JSON + Documentation*
*Temps restant estimé : 3-4 semaines (Phases 2+3)*
