/**
 * CONFIGURATION EXEMPLE : Pratique de François Arseneault-Hubert (Chimie 202)
 *
 * Ce fichier montre comment configurer une instance de PratiquePanSpecifications
 * pour reproduire la pratique réelle de François.
 *
 * NOTES FIXES : 50%, 60%, 80%, 100%
 *
 * OBJECTIFS POUR 60% :
 * - Réussir AU MOINS 1 des 2 tests (test1 OU test2)
 * - Remettre 1 prise de position acceptable
 * - Présenter 1 découverte de manière acceptable
 *
 * OBJECTIFS POUR 80% :
 * - Réussir les 2 tests (test1 ET test2)
 * - Tout ce qui précède pour 60%
 * - Présenter son bilan personnel via portfolio (entrevue finale)
 *
 * OBJECTIFS POUR 100% :
 * - Tout ce qui précède pour 80%
 * - Remettre une 2e prise de position acceptable
 * - Critères supérieurs pour le bilan final
 *
 * VERSION : 1.0
 * DATE : 26 novembre 2025
 * AUTEUR : Grégoire Bédard (Labo Codex)
 */

// ============================================================================
// CONFIGURATION DE LA PRATIQUE
// ============================================================================

const CONFIG_FRANCOIS_CHIMIE = {
    // Notes fixes possibles
    notesFixes: [50, 60, 80, 100],

    // Seuils
    seuilReussite: 60,
    seuilExcellence: 80,

    // Objectifs requis par palier de note
    objectifsParNote: {
        60: {
            requis: [
                'test1_ou_test2',           // Au moins 1 test réussi
                'prise_position_1',         // 1 prise de position
                'presentation_decouverte'   // 1 présentation
            ],
            description: "Note de passage - maîtrise des bases"
        },
        80: {
            requis: [
                'test1',                    // Test 1 réussi
                'test2',                    // Test 2 réussi
                'prise_position_1',         // 1 prise de position
                'presentation_decouverte',  // 1 présentation
                'bilan_portfolio'           // Entrevue finale
            ],
            description: "Bonne performance - maîtrise complète"
        },
        100: {
            requis: [
                'test1',                    // Test 1 réussi
                'test2',                    // Test 2 réussi
                'prise_position_1',         // 1ère prise de position
                'prise_position_2',         // 2e prise de position
                'presentation_decouverte',  // 1 présentation
                'bilan_portfolio_superieur' // Entrevue avec critères élevés
            ],
            description: "Excellence - maîtrise avancée"
        }
    },

    // Mapping des objectifs → évaluations concrètes
    mappingObjectifs: {
        // Test 1 : Examen identifié "test-1"
        'test1': {
            type: 'examen',
            identifiant: 'test-1',
            seuilReussite: 60
        },

        // Test 2 : Examen identifié "test-2"
        'test2': {
            type: 'examen',
            identifiant: 'test-2',
            seuilReussite: 60
        },

        // Test1 OU Test2 : Opérateur logique OU
        'test1_ou_test2': {
            operateur: 'OU',
            objectifs: ['test1', 'test2']
        },

        // Prise de position 1 : Travail identifié "prise-position-1"
        'prise_position_1': {
            type: 'travail',
            identifiant: 'prise-position-1',
            seuilReussite: 60  // "Acceptable"
        },

        // Prise de position 2 : Travail identifié "prise-position-2"
        'prise_position_2': {
            type: 'travail',
            identifiant: 'prise-position-2',
            seuilReussite: 60
        },

        // Présentation découverte : Présentation identifiée "presentation-decouverte"
        'presentation_decouverte': {
            type: 'presentation',
            identifiant: 'presentation-decouverte',
            seuilReussite: 60
        },

        // Bilan portfolio : Portfolio + entrevue
        'bilan_portfolio': {
            type: 'autre',  // Type "autre" pour entrevue
            identifiant: 'bilan-portfolio',
            seuilReussite: 60
        },

        // Bilan portfolio supérieur : Portfolio avec critères plus élevés
        'bilan_portfolio_superieur': {
            type: 'autre',
            identifiant: 'bilan-portfolio',
            seuilReussite: 75  // Critères supérieurs
        }
    }
};

// ============================================================================
// FONCTION D'INITIALISATION
// ============================================================================

/**
 * Configure une instance de PratiquePanSpecifications avec les paramètres de François
 *
 * @returns {PratiquePanSpecifications} Instance configurée
 */
function creerPratiqueFrancoisChimie() {
    if (typeof window.PratiquePanSpecifications !== 'function') {
        console.error('PratiquePanSpecifications n\'est pas disponible');
        return null;
    }

    const instance = new PratiquePanSpecifications();
    instance.configurerPratique(CONFIG_FRANCOIS_CHIMIE);

    console.log('✅ Pratique de François (Chimie 202) configurée');
    console.log('   • Notes fixes:', CONFIG_FRANCOIS_CHIMIE.notesFixes);
    console.log('   • Objectifs 60%:', CONFIG_FRANCOIS_CHIMIE.objectifsParNote[60].requis.length);
    console.log('   • Objectifs 80%:', CONFIG_FRANCOIS_CHIMIE.objectifsParNote[80].requis.length);
    console.log('   • Objectifs 100%:', CONFIG_FRANCOIS_CHIMIE.objectifsParNote[100].requis.length);

    return instance;
}

// ============================================================================
// EXEMPLE D'UTILISATION
// ============================================================================

/**
 * Exemple de test de la pratique de François
 *
 * À exécuter dans la console du navigateur après avoir créé des évaluations de test
 */
function testerPratiqueFrancois() {
    console.log('📋 Test de la pratique de François...\n');

    // 1. Créer l'instance configurée
    const pratique = creerPratiqueFrancoisChimie();

    if (!pratique) {
        console.error('Impossible de créer la pratique');
        return;
    }

    // 2. Simuler un étudiant avec évaluations
    const da = '1234567';  // Remplacer par un DA réel

    // 3. Calculer performance et complétion
    const performance = pratique.calculerPerformance(da);
    const completion = pratique.calculerCompletion(da);

    console.log('📊 Résultats pour DA', da);
    console.log('   • Performance (P):', performance ? `${(performance * 100).toFixed(1)}%` : 'N/A');
    console.log('   • Complétion (C):', completion ? `${(completion * 100).toFixed(1)}%` : 'N/A');

    // 4. Détecter défis
    const defis = pratique.detecterDefis(da);

    console.log('\n🎯 Défis détectés:');
    if (defis.defis.length === 0) {
        console.log('   • Aucun défi (tous les objectifs atteints pour ce palier)');
    } else {
        defis.defis.forEach((defi, index) => {
            console.log(`   ${index + 1}. [${defi.priorite}] ${defi.type}: ${defi.objectif}`);
            if (defi.palier) {
                console.log(`      → Requis pour atteindre ${defi.palier}%`);
            }
        });
    }

    // 5. Identifier pattern
    const pattern = pratique.identifierPattern(da);
    console.log('\n📈 Pattern identifié:', pattern);

    return {
        performance,
        completion,
        defis,
        pattern
    };
}

// ============================================================================
// EXPORTS
// ============================================================================

window.CONFIG_FRANCOIS_CHIMIE = CONFIG_FRANCOIS_CHIMIE;
window.creerPratiqueFrancoisChimie = creerPratiqueFrancoisChimie;
window.testerPratiqueFrancois = testerPratiqueFrancois;

console.log('✅ Configuration François (Chimie) chargée');
console.log('   • Utiliser: creerPratiqueFrancoisChimie()');
console.log('   • Tester: testerPratiqueFrancois()');
