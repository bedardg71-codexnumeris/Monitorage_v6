/**
 * SCRIPT D'INITIALISATION DES PRATIQUES PRÉDÉFINIES
 *
 * Ce script utilise la fonction intégrée PratiqueManager pour charger
 * toutes les pratiques prédéfinies (incluant les 3 nouvelles).
 *
 * INSTRUCTIONS :
 * 1. Ouvrir la console (Cmd+Opt+I)
 * 2. Copier-coller ce script
 * 3. Appuyer sur Entrée
 * 4. Recharger la page
 */

(async function initialiserPratiques() {
    console.log('🚀 Initialisation des pratiques prédéfinies...\n');

    // Vérifier que PratiqueManager existe
    if (!window.PratiqueManager) {
        console.error('❌ PratiqueManager non disponible');
        console.log('Vérifie que le fichier pratique-manager.js est bien chargé');
        return;
    }

    // Vérifier que les pratiques prédéfinies existent
    if (!window.PRATIQUES_PREDEFINES) {
        console.error('❌ PRATIQUES_PREDEFINES non disponible');
        console.log('Vérifie que le fichier pratiques-predefines.js est bien chargé');
        return;
    }

    console.log('✅ PratiqueManager disponible');
    console.log('✅ PRATIQUES_PREDEFINES disponible');
    console.log(`📊 Nombre de pratiques prédéfinies: ${Object.keys(window.PRATIQUES_PREDEFINES).length}\n`);

    // Afficher les pratiques disponibles
    console.log('📋 Pratiques prédéfinies disponibles:');
    Object.keys(window.PRATIQUES_PREDEFINES).forEach((key, index) => {
        const p = window.PRATIQUES_PREDEFINES[key];
        console.log(`   ${index + 1}. ${p.nom} (${p.auteur})`);
    });

    console.log('\n🔄 Chargement des pratiques...');

    try {
        // Appeler la fonction d'initialisation
        await PratiqueManager.initialiserPratiquesPredefines();

        // Vérifier le résultat
        const pratiques = db.getSync('pratiquesConfigurables', []);
        console.log(`\n✅ Succès !`);
        console.log(`📊 Total pratiques dans IndexedDB: ${pratiques.length}`);

        // Afficher les IDs des pratiques
        console.log('\n📋 Pratiques chargées:');
        pratiques.forEach((p, index) => {
            console.log(`   ${index + 1}. ${p.nom}`);
        });

        console.log('\n✨ Recharge la page pour voir les changements !');
        console.log('   (Cmd+R ou F5)\n');

        // Proposer de recharger automatiquement
        const reload = confirm('Recharger la page maintenant ?');
        if (reload) {
            location.reload();
        }

    } catch (error) {
        console.error('❌ Erreur lors du chargement:', error);
        console.log('\n📝 Détails de l\'erreur:', error.message);
    }
})();
