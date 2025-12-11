# Logique des snapshots - Indices ponctuels et instantanés

**Date**: 7 décembre 2025
**Auteur**: Grégoire Bédard
**Contexte**: Documentation du système de snapshots par séance avec indices ponctuels

---

## Vue d'ensemble

Le système de snapshots capture l'état des indices A-C-P-E de chaque étudiant **à chaque séance de cours**, permettant de retracer l'évolution temporelle individuelle et collective.

### Concept clé: "Photo instantanée"

Chaque snapshot = **photo prise au moment d'une séance spécifique**
- Pas de calcul rétroactif depuis le début
- État actuel des données disponibles à ce moment précis
- Permet de reconstruire l'historique fidèlement

---

## Les deux types de graphiques

### 📈 1. Graphique INDIVIDUEL (Profil de l'étudiant)

**Objectif**: Voir l'évolution d'UN étudiant au fil du trimestre

**Données utilisées**: Indices de cet étudiant à chaque séance
- A ponctuel (présence à cette séance)
- C instantané (complétion actuelle à ce moment)
- P instantané (performance actuelle à ce moment)
- E calculé (engagement)

**Exemple pour étudiant DA 6345433**:
```
Séance 1 (15 jan):  A=100%, C=null, P=null, E=null
Séance 2 (17 jan):  A=100%, C=null, P=null, E=null
...
Séance 12 (10 mar): A=100%, C=60%, P=72%, E=87%  ← Premières évaluations
Séance 13 (12 mar): A=0%,   C=60%, P=72%, E=0%   ← Absent cette séance
...
Séance 30 (15 mai): A=100%, C=85%, P=78%, E=92%
```

**Résultat graphique**:
- Courbe A: Pics discontinus (100% présent, 0% absent)
- Courbes C et P: Débutent vers semaine 7, évoluent progressivement
- Courbe E: Débute vers semaine 7, suit A (dents de scie)

---

### 📊 2. Graphique GROUPE (Aperçu tableau de bord)

**Objectif**: Voir l'évolution du GROUPE au fil du trimestre

**Données utilisées**: MOYENNES des indices de tous les étudiants à chaque séance

**Calcul pour une séance donnée**:
```javascript
// Séance du 15 mars (30 étudiants)
A_moyen = (somme des A de tous les étudiants) / 30
C_moyen = (somme des C non-null) / (nombre d'étudiants avec C non-null)
P_moyen = (somme des P non-null) / (nombre d'étudiants avec P non-null)
E_moyen = (somme des E non-null) / (nombre d'étudiants avec E non-null)
```

**Exemple séance 15 mars**:
- 25 étudiants présents (A=100%), 5 absents (A=0%)
- → A_moyen = (25×1.00 + 5×0.00) / 30 = **83.3%**

- 28 étudiants ont C (entre 50% et 90%), 2 ont C=null
- → C_moyen = (somme des 28 valeurs) / 28 = **68%**

- 26 étudiants ont P (entre 60% et 85%), 4 ont P=null
- → P_moyen = (somme des 26 valeurs) / 26 = **72%**

- 26 étudiants ont E, 4 ont E=null
- → E_moyen = (somme des 26 valeurs) / 26 = **75%**

**Résultat graphique**:
- Courbe A moyenne: Lisse, reflète taux de présence du groupe
- Courbes C et P moyennes: Débutent vers semaine 7, évoluent progressivement
- Courbe E moyenne: Débute vers semaine 7, plus lisse que graphiques individuels

---

## Définition détaillée de chaque indice

### A - Assiduité (PONCTUELLE)

**Nature**: Vraiment ponctuel (cette séance uniquement)

**Calcul**:
```javascript
// Pour une séance donnée
if (etudiant présent à cette séance) {
    A = 1.00  // 100%
} else {
    A = 0.00  // 0%
}
```

**Caractéristiques**:
- ✅ Binaire (0% ou 100%)
- ✅ Indépendant des autres séances
- ✅ Crée des pics discontinus dans graphiques individuels
- ✅ Lissé dans graphiques de groupe (moyenne du groupe)

**Données sources**: `presencesDetaillees` pour cette date

---

### C - Complétion (INSTANTANÉE)

**Nature**: Photo instantanée de l'état actuel (cumulatif naturellement)

**Calcul**:
```javascript
// Pour une séance du 15 mars
const evaluationsAttendues = productions.filter(p =>
    p.dateAttendue <= '2025-03-15'
).length;

const evaluationsRemises = evaluations.filter(e =>
    e.etudiantDA === da &&
    e.dateEvaluation <= '2025-03-15' &&
    e.statutRemise === 'remis'
).length;

if (evaluationsAttendues === 0) {
    C = null;  // Aucune production attendue encore
} else {
    C = evaluationsRemises / evaluationsAttendues;  // 0.0 à 1.0
}
```

**Caractéristiques**:
- ⚠️ **null** avant première production attendue (≠ 0%)
- ✅ Devient progressivement disponible (semaine 6-7 typiquement)
- ✅ Évolue au fil des remises
- ✅ Cumulatif dans le sens "tout ce qui existe jusqu'à maintenant"

**Données sources**:
- `productions` (productions attendues jusqu'à cette date)
- `evaluationsSauvegardees` (évaluations remises jusqu'à cette date)

**Exemple d'évolution**:
```
Sem. 1-5:  C = null (aucune production attendue)
Sem. 6:    C = 0.00 (1 attendue, 0 remise)
Sem. 7:    C = 0.50 (2 attendues, 1 remise)
Sem. 8:    C = 0.67 (3 attendues, 2 remises)
...
Sem. 15:   C = 0.85 (7 attendues, 6 remises)
```

---

### P - Performance (INSTANTANÉE)

**Nature**: Photo instantanée selon règle PAN (N meilleurs artefacts)

**Calcul** (selon pratique PAN-Maîtrise):
```javascript
// Pour une séance du 15 mars
const evaluations = evaluationsSauvegardees.filter(e =>
    e.etudiantDA === da &&
    e.type === 'artefact-portfolio' &&
    e.dateEvaluation <= '2025-03-15' &&
    e.niveauFinal !== null
);

if (evaluations.length === 0) {
    P = null;  // Aucune évaluation encore
} else if (evaluations.length < N) {
    // Moins de N artefacts → Moyenne de TOUS
    P = moyenne(evaluations);
} else {
    // N artefacts ou plus → Moyenne des N MEILLEURS
    const meilleurs = trierParNoteDesc(evaluations).slice(0, N);
    P = moyenne(meilleurs);
}
```

**Paramètre N**: Configurable dans pratique de notation (ex: N=4)

**Caractéristiques**:
- ⚠️ **null** avant première évaluation (≠ 0%)
- ✅ Avant N évaluations: Moyenne de toutes les évaluations disponibles
- ✅ Après N évaluations: Moyenne des N meilleures
- ✅ Évolue selon nouvelles évaluations et règle N meilleurs

**Données sources**:
- `evaluationsSauvegardees` (artefacts évalués jusqu'à cette date)
- `modalitesEvaluation.configPAN.nArtefacts` (valeur de N)

**Exemple d'évolution** (N=4):
```
Sem. 1-6:  P = null (aucune évaluation)
Sem. 7:    P = 0.72 (1 évaluation: 72%)
Sem. 8:    P = 0.70 (2 évaluations: moyenne de 72% et 68%)
Sem. 9:    P = 0.73 (3 évaluations: moyenne de 72%, 68%, 78%)
Sem. 10:   P = 0.75 (4 évaluations: moyenne des 4)
Sem. 11:   P = 0.76 (5 évaluations: moyenne des 4 MEILLEURS - 78%, 75%, 72%, 70%)
...
Sem. 15:   P = 0.82 (8 évaluations: moyenne des 4 meilleurs - 85%, 82%, 80%, 78%)
```

---

### E - Engagement (CALCULÉ)

**Nature**: Produit des trois indices avec racine cubique

**Formule**:
```javascript
if (C === null || P === null) {
    E = null;  // Si C ou P manquant, E indéfini
} else {
    E = Math.pow(A * C * P, 1/3);  // Racine cubique
}
```

**Justification racine cubique**:
- Sans racine: E = A × C × P (peut donner des valeurs très petites)
- Exemple: 0.80 × 0.70 × 0.75 = 0.42 (42%, trop bas!)
- Avec racine cubique: ∛(0.80 × 0.70 × 0.75) = ∛(0.42) = 0.75 (75%, plus réaliste)
- **Bénéfice**: Ramène E dans les mêmes proportions que A, C, P

**Caractéristiques**:
- ⚠️ **null** tant que C ou P sont null
- ✅ Sensible à A (si absent, E chute à ~0)
- ✅ Balance les trois dimensions de l'engagement

**Exemple d'évolution**:
```
Sem. 1-6:  E = null (C et P manquants)
Sem. 7:    E = ∛(1.00 × 0.50 × 0.72) = ∛(0.36) = 0.71 (71%)
Sem. 8:    E = ∛(0.00 × 0.67 × 0.70) = ∛(0.00) = 0.00 (0% - absent!)
Sem. 9:    E = ∛(1.00 × 0.67 × 0.73) = ∛(0.49) = 0.79 (79%)
...
Sem. 15:   E = ∛(1.00 × 0.85 × 0.82) = ∛(0.70) = 0.89 (89%)
```

---

## Structure de données d'un snapshot

### Structure complète pour UNE séance

```javascript
{
  // Identification
  id: "SEANCE-2025-03-15",
  date: "2025-03-15",
  numeroSeance: 12,
  numeroSemaine: 7,
  timestamp: "2025-03-15T15:30:00.000Z",

  // DONNÉES INDIVIDUELLES (30 étudiants)
  etudiants: [
    {
      da: "6345433",
      nom: "Bermudez Ambriz",
      prenom: "Patricio",

      // Indices ponctuels/instantanés
      A: 1.00,   // Présent à cette séance
      C: 0.60,   // 3 remis / 5 attendus au 15 mars
      P: 0.72,   // Moyenne des 3 meilleurs artefacts au 15 mars
      E: 0.77,   // ∛(1.00 × 0.60 × 0.72) = 0.77

      // Analyses pédagogiques (basées sur C et P instantanés)
      pattern: "Stable",
      rai: "Niveau 1",
      defiPrincipal: null,
      forcePrincipale: "Nuance"
    },
    {
      da: "7654321",
      nom: "Tremblay",
      prenom: "Sophie",

      // Indices
      A: 0.00,   // Absente cette séance
      C: 0.45,   // 2 remis / 4 attendus (1 en retard)
      P: null,   // Seulement 1 évaluation, note trop faible
      E: null,   // P manquant

      pattern: null,
      rai: null,
      defiPrincipal: null,
      forcePrincipale: null
    }
    // ... 28 autres étudiants
  ],

  // DONNÉES GROUPE (moyennes)
  groupe: {
    moyenneA: 0.833,        // 25 présents / 30 = 83.3%
    moyenneC: 0.653,        // Moyenne des 28 C non-null
    moyenneP: 0.698,        // Moyenne des 26 P non-null
    moyenneE: 0.745,        // Moyenne des 26 E non-null

    nbEtudiants: 30,
    nbPresents: 25,
    nbAbsents: 5,
    nbAvecC: 28,            // Nombre d'étudiants avec C non-null
    nbAvecP: 26,            // Nombre d'étudiants avec P non-null
    nbAvecE: 26,            // Nombre d'étudiants avec E non-null

    // Statistiques complémentaires
    dispersionA: 0.379,     // Écart-type de A
    dispersionC: 0.142,     // Écart-type de C
    dispersionP: 0.095,     // Écart-type de P
    dispersionE: 0.118      // Écart-type de E
  }
}
```

---

## Évolution typique sur un trimestre (15 semaines, 30 séances)

### Phase 1: Semaines 1-6 (~séances 1-12)
**Période d'observation initiale**

```
Indices disponibles:
├─ A: ✅ Disponible (présences/absences enregistrées)
├─ C: ❌ null (aucune production attendue encore)
├─ P: ❌ null (aucune évaluation)
└─ E: ❌ null (C et P manquants)

Graphique individuel: Seulement courbe A (pics 0%/100%)
Graphique groupe:     Seulement courbe A moyenne (lisse, ~85-95%)
```

### Phase 2: Semaines 7-10 (~séances 13-20)
**Émergence des données C et P**

```
Indices disponibles:
├─ A: ✅ Toujours disponible
├─ C: ✅ Commence à se remplir (0-60% typiquement)
├─ P: ✅ Commence à se remplir (moyenne de 1-3 artefacts)
└─ E: ✅ Calculable maintenant

Graphique individuel:
  - Courbe A (pics)
  - Courbe C (monte progressivement)
  - Courbe P (stabilise autour performance moyenne)
  - Courbe E (suit A, mais modulée par C et P)

Graphique groupe:
  - Courbe A moyenne (stable ~90%)
  - Courbe C moyenne (monte de 0% à ~65%)
  - Courbe P moyenne (stabilise ~70%)
  - Courbe E moyenne (monte de ~0% à ~75%)
```

### Phase 3: Semaines 11-15 (~séances 21-30)
**Stabilisation et différenciation**

```
Indices disponibles:
├─ A: ✅ Historique complet
├─ C: ✅ Valeurs stables (65-85%)
├─ P: ✅ Règle N=4 meilleurs appliquée
└─ E: ✅ Reflet fidèle de l'engagement global

Graphique individuel:
  - Courbe A (pics, révèle assiduité)
  - Courbe C (plateau ou monte selon remises)
  - Courbe P (évolue selon nouvelles évaluations et N meilleurs)
  - Courbe E (différenciation claire entre étudiants)

Graphique groupe:
  - Courbe A moyenne (stable)
  - Courbe C moyenne (monte vers 75-85%)
  - Courbe P moyenne (stable ou monte légèrement)
  - Courbe E moyenne (reflète engagement collectif)
```

---

## Cas particuliers et gestion des valeurs null

### Pourquoi null et pas 0?

**Principe**: Absence de données ≠ Zéro

```javascript
// ❌ INCORRECT
if (aucune évaluation) {
    P = 0.00;  // Faux! 0% signifie "a eu 0%", pas "pas encore évalué"
}

// ✅ CORRECT
if (aucune évaluation) {
    P = null;  // Vrai! "Donnée pas encore disponible"
}
```

**Impact sur les graphiques**:
- `null` → Point non affiché, courbe commence plus tard
- `0` → Point affiché à 0%, courbe part de 0 (trompeur!)

### Gestion dans les moyennes du groupe

```javascript
// Calcul de C moyen pour une séance
const valeursC = etudiants
    .map(e => e.C)
    .filter(c => c !== null);  // Exclure les null

if (valeursC.length === 0) {
    C_moyen = null;  // Aucun étudiant avec C
} else {
    C_moyen = somme(valeursC) / valeursC.length;
}
```

**Bénéfice**: Moyenne reflète les étudiants ayant des données, pas faussée par des 0 artificiels

### Gestion dans le calcul de E

```javascript
// E individuel
if (C === null || P === null) {
    E = null;  // Ne pas calculer E si C ou P manquant
} else {
    E = Math.pow(A * C * P, 1/3);
}

// E moyen groupe
const valeursE = etudiants
    .map(e => e.E)
    .filter(e => e !== null);

E_moyen = valeursE.length > 0
    ? somme(valeursE) / valeursE.length
    : null;
```

---

## Reconstruction rétroactive des snapshots

### Principe

Pour chaque séance du trimestre (ex: 30 séances), **recalculer les indices comme ils auraient été à cette date**.

### Fonction clé: `calculerIndicesHistoriques(da, dateLimite)`

```javascript
/**
 * Calcule les indices A-C-P-E pour un étudiant jusqu'à une date limite
 *
 * @param {string} da - Numéro DA de l'étudiant
 * @param {string} dateLimite - Date limite (format YYYY-MM-DD)
 * @param {Array} evaluationsCache - Cache optionnel des évaluations
 * @param {boolean} usePonctualA - Si true, A ponctuel (sinon cumulatif)
 * @returns {Object} - {A, C, P, E}
 */
function calculerIndicesHistoriques(da, dateLimite, evaluationsCache = null, usePonctualA = true) {
    // A - Assiduité ponctuelle ou cumulative
    const A = usePonctualA
        ? calculerAssiduiteSeance(da, dateLimite)  // Ponctuelle (0 ou 1)
        : calculerAssiduiteCumulative(da, dateLimite);  // Cumulative (0-1)

    // C - Complétion jusqu'à cette date
    const productionsAttendues = productions.filter(p => p.dateAttendue <= dateLimite);
    const evaluationsRemises = evaluations.filter(e =>
        e.etudiantDA === da &&
        e.dateEvaluation <= dateLimite &&
        e.statutRemise === 'remis'
    );

    const C = productionsAttendues.length === 0
        ? null
        : evaluationsRemises.length / productionsAttendues.length;

    // P - Performance selon règle PAN jusqu'à cette date
    const artefactsEvalues = evaluations.filter(e =>
        e.etudiantDA === da &&
        e.type === 'artefact-portfolio' &&
        e.dateEvaluation <= dateLimite &&
        e.niveauFinal !== null
    );

    let P = null;
    if (artefactsEvalues.length > 0) {
        const N = modalitesEvaluation.configPAN.nArtefacts || 4;
        if (artefactsEvalues.length < N) {
            // Moyenne de tous
            P = moyenne(artefactsEvalues);
        } else {
            // Moyenne des N meilleurs
            const meilleurs = trierParNoteDesc(artefactsEvalues).slice(0, N);
            P = moyenne(meilleurs);
        }
    }

    // E - Engagement
    const E = (C !== null && P !== null)
        ? Math.pow(A * C * P, 1/3)
        : null;

    return { A, C, P, E };
}
```

### Processus de reconstruction complète

```javascript
async function reconstruireSnapshotsHistoriques() {
    // 1. Obtenir toutes les dates de séances du groupe
    const seancesCompletes = obtenirSeancesCompletes();
    const datesCours = Object.keys(seancesCompletes).sort();

    console.log(`Reconstruction: ${datesCours.length} séances à traiter`);

    // 2. Vider snapshots existants
    await db.set('snapshots', {
        hebdomadaires: [],
        interventions: [],
        metadata: {
            version: '1.0.0',
            dateCreation: new Date().toISOString()
        }
    });

    // 3. Pour chaque séance
    for (const dateSeance of datesCours) {
        const snapshot = await capturerSnapshotSeance(dateSeance);
        console.log(`✅ Snapshot ${dateSeance} créé`);
    }

    console.log(`✅ Reconstruction terminée: ${datesCours.length} snapshots`);
}
```

### Fonction de capture par séance

```javascript
async function capturerSnapshotSeance(dateSeance) {
    const etudiants = db.getSync('groupeEtudiants', []);
    const snapshotEtudiants = [];

    // Calculer indices pour chaque étudiant
    for (const etudiant of etudiants) {
        const indices = calculerIndicesHistoriques(
            etudiant.da,
            dateSeance,
            evaluationsCache,
            true  // usePonctualA = true
        );

        snapshotEtudiants.push({
            da: etudiant.da,
            nom: etudiant.nom,
            prenom: etudiant.prenom,
            ...indices,
            pattern: determinerPattern(indices),
            rai: determinerNiveauRai(indices)
        });
    }

    // Calculer moyennes groupe
    const groupe = {
        moyenneA: moyenne(snapshotEtudiants.map(e => e.A)),
        moyenneC: moyenneSansNull(snapshotEtudiants.map(e => e.C)),
        moyenneP: moyenneSansNull(snapshotEtudiants.map(e => e.P)),
        moyenneE: moyenneSansNull(snapshotEtudiants.map(e => e.E)),
        nbEtudiants: etudiants.length,
        nbPresents: snapshotEtudiants.filter(e => e.A === 1.0).length
    };

    // Créer et sauvegarder snapshot
    const snapshot = {
        id: `SEANCE-${dateSeance}`,
        date: dateSeance,
        timestamp: new Date().toISOString(),
        etudiants: snapshotEtudiants,
        groupe: groupe
    };

    // Ajouter aux snapshots
    const snapshots = await db.get('snapshots');
    snapshots.hebdomadaires.push(snapshot);
    await db.set('snapshots', snapshots);

    return snapshot;
}
```

---

## Affichage des graphiques

### Graphique individuel (Chart.js)

```javascript
function afficherGraphiqueIndividuel(da) {
    const snapshots = await db.get('snapshots');
    const donneesEtudiant = snapshots.hebdomadaires.map(s => {
        const etudiant = s.etudiants.find(e => e.da === da);
        return {
            date: s.date,
            A: etudiant.A,
            C: etudiant.C,
            P: etudiant.P,
            E: etudiant.E
        };
    });

    // Configuration Chart.js
    const config = {
        type: 'line',
        data: {
            labels: donneesEtudiant.map(d => d.date),
            datasets: [
                {
                    label: 'Assiduité (A)',
                    data: donneesEtudiant.map(d => d.A),
                    borderColor: 'blue',
                    spanGaps: false  // Ne pas relier les null
                },
                {
                    label: 'Complétion (C)',
                    data: donneesEtudiant.map(d => d.C),
                    borderColor: 'orange',
                    spanGaps: false
                },
                {
                    label: 'Performance (P)',
                    data: donneesEtudiant.map(d => d.P),
                    borderColor: 'green',
                    spanGaps: false
                },
                {
                    label: 'Engagement (E)',
                    data: donneesEtudiant.map(d => d.E),
                    borderColor: 'purple',
                    spanGaps: false
                }
            ]
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 1.05,
                    ticks: {
                        format: {
                            style: 'percent'
                        }
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}
```

### Graphique groupe (Chart.js)

```javascript
function afficherGraphiqueGroupe() {
    const snapshots = await db.get('snapshots');
    const donneesGroupe = snapshots.hebdomadaires.map(s => ({
        date: s.date,
        A: s.groupe.moyenneA,
        C: s.groupe.moyenneC,
        P: s.groupe.moyenneP,
        E: s.groupe.moyenneE
    }));

    // Configuration similaire, utilisant moyennes groupe
    const config = {
        type: 'line',
        data: {
            labels: donneesGroupe.map(d => d.date),
            datasets: [
                {
                    label: 'Assiduité moyenne (A)',
                    data: donneesGroupe.map(d => d.A),
                    borderColor: 'blue'
                },
                {
                    label: 'Complétion moyenne (C)',
                    data: donneesGroupe.map(d => d.C),
                    borderColor: 'orange',
                    spanGaps: false
                },
                {
                    label: 'Performance moyenne (P)',
                    data: donneesGroupe.map(d => d.P),
                    borderColor: 'green',
                    spanGaps: false
                },
                {
                    label: 'Engagement moyen (E)',
                    data: donneesGroupe.map(d => d.E),
                    borderColor: 'purple',
                    spanGaps: false
                }
            ]
        }
        // ... options similaires
    };

    new Chart(ctx, config);
}
```

---

## Résumé des principes clés

### ✅ À retenir

1. **Snapshot = Photo instantanée à une séance donnée**
   - Pas de calcul rétroactif
   - État des données disponibles à ce moment

2. **A (Assiduité) = Vraiment ponctuel**
   - 100% si présent, 0% si absent
   - Indépendant des autres séances

3. **C (Complétion) = Instantané (cumulatif naturellement)**
   - Remises / Attendues jusqu'à cette date
   - null si aucune production attendue

4. **P (Performance) = Instantané selon règle PAN**
   - Moyenne de tous si < N artefacts
   - Moyenne des N meilleurs si ≥ N artefacts
   - null si aucune évaluation

5. **E (Engagement) = Racine cubique du produit**
   - E = ∛(A × C × P)
   - Ramène dans mêmes proportions que A, C, P
   - null si C ou P null

6. **Deux graphiques distincts**
   - Individuel: Indices de l'étudiant
   - Groupe: Moyennes des indices

7. **null ≠ 0**
   - null = donnée pas encore disponible
   - 0 = valeur réelle de zéro
   - Important pour moyennes et graphiques

---

**Fin du document**

Date de création: 7 décembre 2025
Dernière mise à jour: 7 décembre 2025
Version: 1.0
