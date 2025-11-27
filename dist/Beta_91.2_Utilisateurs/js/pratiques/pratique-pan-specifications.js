/**
 * PRATIQUE PAN PAR CONTRAT (SPÉCIFICATIONS) - Implémentation complète
 *
 * Pratique par contrat (Specification Grading) avec objectifs réussite/échec.
 * Approche motivante basée sur l'atteinte d'objectifs mesurables.
 *
 * CARACTÉRISTIQUES :
 * - Notes fixes prédéfinies (ex: 50%, 60%, 80%, 100%)
 * - Objectifs évalués réussite/échec (réussi/non réussi)
 * - Progression par paliers (plus d'objectifs = note supérieure)
 * - Secondes chances via jetons
 * - Critères clairs et détaillés (niveau B+ minimum)
 * - Lien direct avec résultats d'apprentissage
 *
 * RÉFÉRENCES :
 * - Nilson, L. B. (2014). Specifications Grading: Restoring Rigor, Motivating Students, and Saving Faculty Time
 * - François Arseneault-Hubert (2024). Pratique Chimie 202
 *
 * VERSION : 1.0
 * DATE : 26 novembre 2025
 * AUTEUR : Grégoire Bédard (Labo Codex)
 */

class PratiquePanSpecifications {

    constructor() {
        console.log('📋 Initialisation de la pratique PAN-Spécifications');

        // Configuration par défaut (peut être surchargée par pratique spécifique)
        this.config = {
            notesFixes: [50, 60, 80, 100], // Notes possibles
            seuilReussite: 60, // Seuil minimal de réussite
            seuilExcellence: 80, // Seuil d'excellence

            // Objectifs par palier (exemple générique)
            objectifsParNote: {
                60: {
                    requis: [],
                    description: "Note de passage - maîtrise des bases"
                },
                80: {
                    requis: [],
                    description: "Bonne performance - maîtrise complète"
                },
                100: {
                    requis: [],
                    description: "Excellence - maîtrise avancée"
                }
            },

            // Mapping objectifs → productions (sera configuré par enseignant)
            mappingObjectifs: {}
        };
    }

    // ========================================================================
    // MÉTHODES D'IDENTITÉ (Interface IPratique)
    // ========================================================================

    obtenirNom() {
        return "PAN par contrat (Spécifications)";
    }

    obtenirId() {
        return "specifications";
    }

    obtenirDescription() {
        return "Pratique par contrat (Specification Grading) avec objectifs réussite/échec. " +
               "Les étudiants atteignent des paliers de notes fixes (ex: 60%, 80%, 100%) " +
               "en réussissant des ensembles d'objectifs mesurables. Approche motivante " +
               "qui clarifie les attentes et responsabilise les étudiants.";
    }

    // ========================================================================
    // CONFIGURATION (Spécifique à PAN-Spécifications)
    // ========================================================================

    /**
     * Configure la pratique avec des paramètres spécifiques
     *
     * @param {Object} configuration - Configuration de la pratique
     * @param {Array<number>} configuration.notesFixes - Notes fixes possibles
     * @param {Object} configuration.objectifsParNote - Objectifs requis par note
     * @param {Object} configuration.mappingObjectifs - Mapping objectifs → productions
     */
    configurerPratique(configuration) {
        if (configuration.notesFixes) {
            this.config.notesFixes = configuration.notesFixes;
        }

        if (configuration.objectifsParNote) {
            this.config.objectifsParNote = configuration.objectifsParNote;
        }

        if (configuration.mappingObjectifs) {
            this.config.mappingObjectifs = configuration.mappingObjectifs;
        }

        console.log('[SPEC] Pratique configurée:', this.config);
    }

    // ========================================================================
    // MÉTHODES DE CALCUL (Interface IPratique)
    // ========================================================================

    /**
     * Calcule l'indice P (Performance) selon pratique PAN-Spécifications
     *
     * Logique :
     * 1. Vérifier quels objectifs sont atteints (réussite/échec)
     * 2. Déterminer le palier de note le plus élevé atteint
     * 3. Retourner cette note fixe
     *
     * @param {string} da - Numéro de dossier d'admission
     * @returns {number} Indice P entre 0 et 1, ou null si pas de données
     */
    calculerPerformance(da) {
        if (!da || da.length !== 7) {
            console.warn('[SPEC] DA invalide:', da);
            return null;
        }

        // Lire les évaluations
        const evaluations = this._lireEvaluations();
        const evaluationsEleve = evaluations.filter(e =>
            e.etudiantDA === da &&
            !e.remplaceeParId &&
            e.noteFinale !== null &&
            e.noteFinale !== undefined
        );

        if (evaluationsEleve.length === 0) {
            console.log('[SPEC] Aucune évaluation pour DA', da);
            return null;
        }

        // Vérifier quels objectifs sont atteints
        const objectifsAtteints = this._verifierObjectifsAtteints(da, evaluationsEleve);

        console.log(`[SPEC] Objectifs atteints pour DA ${da}:`, objectifsAtteints);

        // Déterminer la note la plus élevée atteinte
        const noteAtteinte = this._determinerNotePalier(objectifsAtteints);

        console.log(`[SPEC] Performance DA ${da}: ${noteAtteinte}% (${objectifsAtteints.length} objectifs atteints)`);

        return noteAtteinte / 100;
    }

    /**
     * Calcule l'indice C (Complétion) selon pratique PAN-Spécifications
     *
     * Formule : Nombre d'objectifs atteints / Nombre total d'objectifs configurés
     *
     * @param {string} da - Numéro de dossier d'admission
     * @returns {number} Indice C entre 0 et 1, ou null si pas de données
     */
    calculerCompletion(da) {
        if (!da || da.length !== 7) {
            console.warn('[SPEC] DA invalide:', da);
            return null;
        }

        const evaluations = this._lireEvaluations();
        const evaluationsEleve = evaluations.filter(e =>
            e.etudiantDA === da &&
            !e.remplaceeParId &&
            e.noteFinale !== null
        );

        if (evaluationsEleve.length === 0) {
            console.log('[SPEC] Aucune évaluation pour DA', da);
            return null;
        }

        // Compter objectifs atteints
        const objectifsAtteints = this._verifierObjectifsAtteints(da, evaluationsEleve);

        // Compter objectifs totaux (tous les objectifs de tous les paliers)
        const tousObjectifs = new Set();
        Object.values(this.config.objectifsParNote).forEach(palier => {
            palier.requis.forEach(obj => tousObjectifs.add(obj));
        });

        const nbObjectifsTotaux = tousObjectifs.size;

        if (nbObjectifsTotaux === 0) {
            console.warn('[SPEC] Aucun objectif configuré');
            return null;
        }

        const indiceC = objectifsAtteints.length / nbObjectifsTotaux;

        console.log(`[SPEC] Complétion DA ${da}: ${(indiceC * 100).toFixed(1)}% (${objectifsAtteints.length}/${nbObjectifsTotaux} objectifs)`);

        return indiceC;
    }

    // ========================================================================
    // MÉTHODES D'ANALYSE (Interface IPratique)
    // ========================================================================

    /**
     * Détecte les défis spécifiques à la pratique PAN-Spécifications
     *
     * Défis spécifiques :
     * - Objectifs non atteints (blocage pour palier supérieur)
     * - Objectifs critiques manquants (requis pour réussite)
     * - Objectifs facultatifs non tentés (opportunités perdues)
     *
     * @param {string} da - Numéro de dossier d'admission
     * @returns {Object} { type: 'specifications', defis: [], objectifsAtteints: [], objectifsManquants: [] }
     */
    detecterDefis(da) {
        if (!da || da.length !== 7) {
            console.warn('[SPEC] DA invalide:', da);
            return { type: 'specifications', defis: [], objectifsAtteints: [], objectifsManquants: [] };
        }

        const evaluations = this._lireEvaluations();
        const evaluationsEleve = evaluations.filter(e =>
            e.etudiantDA === da &&
            !e.remplaceeParId &&
            e.noteFinale !== null
        );

        if (evaluationsEleve.length === 0) {
            return { type: 'specifications', defis: [], objectifsAtteints: [], objectifsManquants: [] };
        }

        // Vérifier objectifs atteints
        const objectifsAtteints = this._verifierObjectifsAtteints(da, evaluationsEleve);
        const noteActuelle = this._determinerNotePalier(objectifsAtteints);

        // Identifier objectifs manquants pour palier supérieur
        const defis = [];
        const notesFixes = [...this.config.notesFixes].sort((a, b) => b - a);

        // Trouver le prochain palier
        const prochainPalier = notesFixes.find(note => note > noteActuelle);

        if (prochainPalier && this.config.objectifsParNote[prochainPalier]) {
            const objectifsRequis = this.config.objectifsParNote[prochainPalier].requis;
            const objectifsManquants = objectifsRequis.filter(obj => !objectifsAtteints.includes(obj));

            objectifsManquants.forEach(obj => {
                const mapping = this.config.mappingObjectifs[obj];
                defis.push({
                    type: 'objectif-manquant',
                    objectif: obj,
                    palier: prochainPalier,
                    mapping: mapping,
                    priorite: noteActuelle < this.config.seuilReussite ? 'haute' : 'moyenne'
                });
            });
        }

        // Identifier objectifs critiques (requis pour réussite)
        if (noteActuelle < this.config.seuilReussite) {
            const objectifsReussite = this.config.objectifsParNote[this.config.seuilReussite]?.requis || [];
            const objectifsCritiquesManquants = objectifsReussite.filter(obj => !objectifsAtteints.includes(obj));

            objectifsCritiquesManquants.forEach(obj => {
                const mapping = this.config.mappingObjectifs[obj];
                defis.push({
                    type: 'objectif-critique',
                    objectif: obj,
                    mapping: mapping,
                    priorite: 'haute',
                    message: 'Requis pour la réussite du cours'
                });
            });
        }

        return {
            type: 'specifications',
            defis: defis,
            objectifsAtteints: objectifsAtteints,
            noteActuelle: noteActuelle,
            prochainPalier: prochainPalier
        };
    }

    /**
     * Identifie le pattern actuel de l'étudiant
     *
     * Pour PAN-Spécifications, les patterns sont basés sur la progression
     * entre les paliers de notes.
     *
     * @param {string} da - Numéro de dossier d'admission
     * @returns {string} Pattern identifié: 'progression', 'stagnation', 'stable', 'risque'
     */
    identifierPattern(da) {
        if (!da || da.length !== 7) {
            console.warn('[SPEC] DA invalide:', da);
            return 'stable';
        }

        const evaluations = this._lireEvaluations();
        const evaluationsEleve = evaluations.filter(e =>
            e.etudiantDA === da &&
            !e.remplaceeParId &&
            e.noteFinale !== null
        );

        if (evaluationsEleve.length === 0) {
            return 'stable';
        }

        // Calculer note actuelle
        const objectifsAtteints = this._verifierObjectifsAtteints(da, evaluationsEleve);
        const noteActuelle = this._determinerNotePalier(objectifsAtteints);

        // Déterminer pattern selon note et nombre d'objectifs
        if (noteActuelle >= this.config.seuilExcellence) {
            return 'excellence'; // 80%+
        } else if (noteActuelle >= this.config.seuilReussite) {
            return 'stable'; // 60-79%
        } else if (noteActuelle >= 50) {
            return 'difficulte'; // 50-59%
        } else {
            return 'risque'; // < 50%
        }
    }

    /**
     * Génère la cible d'intervention RàI pour un étudiant
     * Méthode requise par l'interface IPratique
     *
     * @param {string} da - Numéro de dossier d'admission
     * @returns {Object} { type, cible, strategies, ressources, niveau }
     */
    genererCibleIntervention(da) {
        if (!da || da.length !== 7) {
            console.warn('[SPEC] DA invalide:', da);
            return null;
        }

        // Obtenir le pattern et les défis
        const pattern = this.identifierPattern(da);
        const defis = this.detecterDefis(da);

        // Déterminer la cible principale d'intervention
        // Pour PAN-Spécifications, la cible est basée sur les objectifs non atteints
        const defiPrincipal = defis.principalDefi ? defis.principalDefi.nom : 'Aucun';

        console.log('[SPEC] Génération cible RàI pour DA', da, {
            pattern: pattern,
            defi: defiPrincipal
        });

        // Retourner un objet structuré compatible avec l'interface
        return {
            type: pattern,
            cible: defiPrincipal,
            strategies: [],  // À implémenter selon les besoins
            ressources: [],  // À implémenter selon les besoins
            niveau: pattern === 'risque' ? 3 : (pattern === 'difficulte' ? 2 : 1)
        };
    }

    /**
     * Calcule le niveau RàI (Réponse à l'Intervention)
     *
     * @param {string} da - Numéro de dossier d'admission
     * @param {number} indiceA - Assiduité (0-1)
     * @param {number} indiceC - Complétion (0-1)
     * @param {number} indiceP - Performance (0-1)
     * @returns {number} Niveau RàI (1, 2, ou 3)
     */
    calculerNiveauRai(da, indiceA, indiceC, indiceP) {
        // Logique RàI universelle basée sur A-C-P
        const engagement = indiceA * indiceC * indiceP;

        if (engagement >= 0.65) {
            return 1; // Universel
        } else if (engagement >= 0.50) {
            return 2; // Préventif
        } else {
            return 3; // Intensif
        }
    }

    /**
     * Détermine la cible d'intervention RàI
     *
     * @param {string} da - Numéro de dossier d'admission
     * @param {number} indiceA - Assiduité (0-1)
     * @param {number} indiceC - Complétion (0-1)
     * @param {number} indiceP - Performance (0-1)
     * @returns {string} Cible principale: 'A', 'C', ou 'P'
     */
    determinerCibleIntervention(da, indiceA, indiceC, indiceP) {
        // Trouver l'indice le plus faible
        const indices = { A: indiceA, C: indiceC, P: indiceP };
        let ciblePrincipale = 'P';
        let valeurMin = indiceP;

        if (indiceC < valeurMin) {
            ciblePrincipale = 'C';
            valeurMin = indiceC;
        }

        if (indiceA < valeurMin) {
            ciblePrincipale = 'A';
        }

        return ciblePrincipale;
    }

    /**
     * Obtient les données formatées pour le profil étudiant
     *
     * @param {string} da - Numéro de dossier d'admission
     * @param {Object} indices - Indices A, C, P
     * @returns {Object} Données structurées pour affichage
     */
    obtenirDonneesProfil(da, indices) {
        const evaluations = this._lireEvaluations();
        const evaluationsEleve = evaluations.filter(e =>
            e.etudiantDA === da &&
            !e.remplaceeParId &&
            e.noteFinale !== null
        );

        const objectifsAtteints = this._verifierObjectifsAtteints(da, evaluationsEleve);
        const noteActuelle = this._determinerNotePalier(objectifsAtteints);
        const defis = this.detecterDefis(da);

        return {
            noteFinale: noteActuelle,
            objectifsAtteints: objectifsAtteints.length,
            objectifsTotaux: Object.keys(this.config.mappingObjectifs).length,
            palierActuel: this._obtenirDescriptionPalier(noteActuelle),
            prochainPalier: defis.prochainPalier ? this._obtenirDescriptionPalier(defis.prochainPalier) : null,
            objectifsManquants: defis.defis.filter(d => d.type === 'objectif-manquant'),
            objectifsCritiques: defis.defis.filter(d => d.type === 'objectif-critique')
        };
    }

    // ========================================================================
    // MÉTHODES PRIVÉES (Logique interne)
    // ========================================================================

    /**
     * Vérifie quels objectifs sont atteints par l'étudiant
     *
     * @param {string} da - Numéro de dossier d'admission
     * @param {Array} evaluations - Évaluations de l'étudiant
     * @returns {Array<string>} Liste des objectifs atteints
     * @private
     */
    _verifierObjectifsAtteints(da, evaluations) {
        const objectifsAtteints = [];

        // Parcourir tous les objectifs configurés
        for (const [objectifId, mapping] of Object.entries(this.config.mappingObjectifs)) {
            if (this._verifierObjectif(objectifId, mapping, evaluations)) {
                objectifsAtteints.push(objectifId);
            }
        }

        return objectifsAtteints;
    }

    /**
     * Vérifie si un objectif spécifique est atteint
     *
     * @param {string} objectifId - Identifiant de l'objectif
     * @param {Object} mapping - Configuration du mapping
     * @param {Array} evaluations - Évaluations de l'étudiant
     * @returns {boolean} True si objectif atteint
     * @private
     */
    _verifierObjectif(objectifId, mapping, evaluations) {
        if (!mapping) {
            console.warn('[SPEC] Mapping introuvable pour objectif:', objectifId);
            return false;
        }

        // CAS 1 : Objectif simple (une production spécifique)
        if (mapping.type && mapping.identifiant) {
            const evaluation = evaluations.find(e => {
                const production = this._lireProductions().find(p => p.id === e.productionId);
                return production &&
                       production.type === mapping.type &&
                       (production.identifiant === mapping.identifiant || production.titre === mapping.identifiant);
            });

            if (!evaluation) return false;

            // Vérifier seuil de réussite (par défaut 60%)
            const seuilReussite = mapping.seuilReussite || 60;
            return evaluation.noteFinale >= seuilReussite;
        }

        // CAS 2 : Objectif composé avec opérateur logique (OU, ET)
        if (mapping.operateur && mapping.objectifs) {
            const resultatsObjectifs = mapping.objectifs.map(objId => {
                const subMapping = this.config.mappingObjectifs[objId];
                return this._verifierObjectif(objId, subMapping, evaluations);
            });

            if (mapping.operateur === 'OU') {
                return resultatsObjectifs.some(r => r === true);
            } else if (mapping.operateur === 'ET') {
                return resultatsObjectifs.every(r => r === true);
            }
        }

        // CAS 3 : Objectif basé sur nombre d'occurrences
        if (mapping.type && mapping.nombreMinimum) {
            const evaluationsType = evaluations.filter(e => {
                const production = this._lireProductions().find(p => p.id === e.productionId);
                return production && production.type === mapping.type;
            });

            const seuilReussite = mapping.seuilReussite || 60;
            const evaluationsReussies = evaluationsType.filter(e => e.noteFinale >= seuilReussite);

            return evaluationsReussies.length >= mapping.nombreMinimum;
        }

        console.warn('[SPEC] Type de mapping non reconnu:', mapping);
        return false;
    }

    /**
     * Détermine le palier de note atteint selon objectifs
     *
     * @param {Array<string>} objectifsAtteints - Liste des objectifs atteints
     * @returns {number} Note du palier atteint
     * @private
     */
    _determinerNotePalier(objectifsAtteints) {
        // Trier notes par ordre décroissant
        const notesFixes = [...this.config.notesFixes].sort((a, b) => b - a);

        // Trouver le palier le plus élevé dont tous les objectifs sont atteints
        for (const note of notesFixes) {
            const objectifsRequis = this.config.objectifsParNote[note]?.requis || [];

            // Vérifier si tous les objectifs requis sont atteints
            const tousAtteints = objectifsRequis.every(obj => objectifsAtteints.includes(obj));

            if (tousAtteints) {
                return note;
            }
        }

        // Aucun palier atteint, retourner note minimale
        return Math.min(...this.config.notesFixes);
    }

    /**
     * Obtient la description d'un palier de note
     *
     * @param {number} note - Note du palier
     * @returns {string} Description du palier
     * @private
     */
    _obtenirDescriptionPalier(note) {
        return this.config.objectifsParNote[note]?.description || `Note de ${note}%`;
    }

    /**
     * Lit les évaluations depuis localStorage
     * @private
     */
    _lireEvaluations() {
        const data = localStorage.getItem('evaluations');
        return data ? JSON.parse(data) : [];
    }

    /**
     * Lit les productions depuis localStorage
     * @private
     */
    _lireProductions() {
        const data = localStorage.getItem('productions');
        return data ? JSON.parse(data) : [];
    }
}

// ============================================================================
// AUTO-ENREGISTREMENT DANS LE REGISTRE
// ============================================================================

(function() {
    // Attendre que le registre soit disponible
    if (typeof window.enregistrerPratique !== 'function') {
        console.error(
            '[SPEC] Impossible d\'enregistrer PratiquePanSpecifications : ' +
            'Assurez-vous de charger pratique-registre.js avant pratique-pan-specifications.js'
        );
        return;
    }

    // Créer et enregistrer l'instance
    const instance = new PratiquePanSpecifications();

    try {
        window.enregistrerPratique('specifications', instance);
        console.log('✅ [SPEC] Pratique PAN-Spécifications enregistrée avec succès');
    } catch (error) {
        console.error('[SPEC] Erreur lors de l\'enregistrement:', error);
    }
})();

// Export de la classe pour utilisation directe
window.PratiquePanSpecifications = PratiquePanSpecifications;

console.log('✅ Module pratique-pan-specifications.js chargé');
