/**
 * SCRIPT DE DÉBOGAGE - Voir les pratiques actuelles
 *
 * Copie-colle ce script dans la console pour voir la structure exacte
 * des pratiques actuellement chargées.
 */

(function debugPratiques() {
    console.log('🔍 DÉBOGAGE DES PRATIQUES\n');

    // 1. Vérifier IndexedDB
    console.log('=== IndexedDB ===');
    const pratiquesDB = db.getSync('pratiquesConfigurables', []);
    console.log('Nombre de pratiques dans IndexedDB:', pratiquesDB.length);
    console.log('Pratiques:', pratiquesDB);

    if (pratiquesDB.length > 0) {
        console.log('\n📋 Structure première pratique:');
        console.log(JSON.stringify(pratiquesDB[0], null, 2));
    }

    // 2. Vérifier ce que retourne PratiqueManager
    console.log('\n=== PratiqueManager ===');
    if (window.PratiqueManager) {
        PratiqueManager.listerPratiques().then(pratiques => {
            console.log('Pratiques codées:', pratiques.codees?.length || 0);
            console.log('Pratiques configurables:', pratiques.configurables?.length || 0);

            if (pratiques.configurables?.length > 0) {
                console.log('\n📋 Première pratique configurable:');
                console.log(JSON.stringify(pratiques.configurables[0], null, 2));
            }
        });
    } else {
        console.log('⚠️ PratiqueManager non disponible');
    }

    // 3. Vérifier les pratiques prédéfinies
    console.log('\n=== Pratiques prédéfinies ===');
    if (window.PRATIQUES_PREDEFINES) {
        const keys = Object.keys(window.PRATIQUES_PREDEFINES);
        console.log('Nombre de pratiques prédéfinies:', keys.length);
        console.log('IDs:', keys);
    } else {
        console.log('⚠️ PRATIQUES_PREDEFINES non chargé');
    }

    // 4. Vérifier le DOM
    console.log('\n=== Interface DOM ===');
    const container = document.getElementById('listePratiques');
    if (container) {
        const cartes = container.querySelectorAll('.carte');
        console.log('Nombre de cartes affichées:', cartes.length);
    } else {
        console.log('⚠️ Element #listePratiques introuvable');
    }

    console.log('\n✅ Débogage terminé');
})();
