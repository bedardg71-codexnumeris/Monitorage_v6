/**
 * SCRIPT D'AJOUT DES 3 NOUVELLES PRATIQUES
 *
 * Ce script ajoute directement les 3 nouvelles pratiques à IndexedDB
 * pour qu'elles apparaissent dans l'interface des pratiques configurables.
 *
 * INSTRUCTIONS :
 * 1. Ouvrir l'application dans Safari/Chrome
 * 2. Ouvrir la console (F12 ou Cmd+Opt+I)
 * 3. Copier-coller tout ce script dans la console
 * 4. Appuyer sur Entrée
 * 5. Recharger la page pour voir les 3 nouvelles pratiques
 */

(async function ajouterNouvellesPratiques() {
    console.log('🚀 Début ajout des 3 nouvelles pratiques...');

    // Récupérer les pratiques existantes
    const pratiques = db.getSync('pratiquesConfigurables', []);
    console.log(`📊 Pratiques existantes : ${pratiques.length}`);

    // Pratique 1 : Michel Baillargeon - PAN-Objectifs pondérés
    const pratiqueMichel = {
        id: 'pan-objectifs-ponderes-michel',
        nom: 'PAN-Objectifs pondérés (Michel Baillargeon)',
        auteur: 'Michel Baillargeon',
        etablissement: 'Cégep (Mathématiques)',
        description: '13 objectifs évalués en mode PAN avec pondérations variables selon importance',
        discipline: 'Mathématiques - Calcul différentiel',
        version: '1.0',
        date_creation: '2025-11-26',
        config: {
            id: 'pan-objectifs-ponderes-michel',
            nom: 'PAN-Objectifs pondérés (Michel Baillargeon)',
            auteur: 'Michel Baillargeon',
            etablissement: 'Cégep (Mathématiques)',
            description: '13 objectifs évalués en mode PAN avec pondérations variables',
            discipline: 'Mathématiques - Calcul différentiel',

            echelle: {
                type: 'niveaux',
                niveaux: [
                    { code: 'I', label: 'Insuffisant', valeur_numerique: 1, valeur_pourcentage: 50, couleur: '#FF6B6B', ordre: 1 },
                    { code: 'D', label: 'Développement', valeur_numerique: 2, valeur_pourcentage: 70, couleur: '#FFD93D', ordre: 2 },
                    { code: 'M', label: 'Maîtrisé', valeur_numerique: 3, valeur_pourcentage: 80, couleur: '#6BCF7F', ordre: 3 },
                    { code: 'E', label: 'Étendu', valeur_numerique: 4, valeur_pourcentage: 92.5, couleur: '#4D96FF', ordre: 4 }
                ]
            },

            structure_evaluations: {
                type: 'objectifs-multiples',
                objectifs: [
                    { id: 'obj1', nom: 'Limites et continuité', poids: 8, type: 'fondamental' },
                    { id: 'obj2', nom: 'Dérivées simples', poids: 8, type: 'fondamental' },
                    { id: 'obj3', nom: 'Dérivées composées', poids: 10, type: 'integrateur' },
                    { id: 'obj4', nom: 'Applications des dérivées', poids: 12, type: 'integrateur' },
                    { id: 'obj5', nom: 'Optimisation', poids: 15, type: 'integrateur' },
                    { id: 'obj6', nom: 'Analyse graphique', poids: 7, type: 'fondamental' },
                    { id: 'obj7', nom: 'Théorèmes fondamentaux', poids: 10, type: 'integrateur' },
                    { id: 'obj8', nom: 'Intégration', poids: 12, type: 'integrateur' },
                    { id: 'obj9', nom: 'Applications des intégrales', poids: 8, type: 'fondamental' },
                    { id: 'obj10', nom: 'Séries', poids: 5, type: 'fondamental' },
                    { id: 'obj11', nom: 'Modélisation mathématique', poids: 5, type: 'fondamental' },
                    { id: 'obj12', nom: 'Communication mathématique', poids: 5, type: 'transversal' },
                    { id: 'obj13', nom: 'Rigueur démonstrative', poids: 5, type: 'transversal' }
                ],
                poids_total: 100
            },

            calcul_note: {
                methode: 'pan-par-objectif',
                nombre_artefacts_par_objectif: 3
            },

            seuils: {
                type: 'pourcentage',
                va_bien: 80,
                difficulte: 70,
                grande_difficulte: 60
            }
        }
    };

    // Pratique 2 : Jordan Raymond - Sommative avec remplacement
    const pratiqueJordan = {
        id: 'sommative-remplacement-jordan',
        nom: 'Sommative avec remplacement (Jordan Raymond)',
        auteur: 'Jordan Raymond',
        etablissement: 'Cégep (Philosophie)',
        description: 'Évaluation finale peut remplacer mi-session si note supérieure. Valorise la progression.',
        discipline: 'Philosophie 101',
        version: '1.0',
        date_creation: '2025-11-26',
        config: {
            id: 'sommative-remplacement-jordan',
            nom: 'Sommative avec remplacement (Jordan Raymond)',
            auteur: 'Jordan Raymond',
            etablissement: 'Cégep (Philosophie)',
            description: 'Évaluation finale peut remplacer mi-session si supérieure',
            discipline: 'Philosophie 101',

            echelle: {
                type: 'pourcentage',
                min: 0,
                max: 100,
                precision: 0.5
            },

            structure_evaluations: {
                type: 'sommative-progressive',
                paires_remplacement: [
                    {
                        id: 'paire_examens',
                        evaluation_initiale: { nom: 'Examen mi-session', poids: 10 },
                        evaluation_finale: { nom: 'Examen final', poids: 20 },
                        regle_remplacement: 'max'
                    },
                    {
                        id: 'paire_textes',
                        evaluation_initiale: { nom: 'Texte mi-session', poids: 20 },
                        evaluation_finale: { nom: 'Texte final', poids: 40 },
                        regle_remplacement: 'max'
                    }
                ],
                autres_evaluations: [
                    { nom: 'Activités en classe', poids: 10 }
                ]
            },

            calcul_note: {
                methode: 'remplacement-progression'
            },

            seuils: {
                type: 'pourcentage',
                va_bien: 80,
                difficulte: 60,
                grande_difficulte: 50
            }
        }
    };

    // Pratique 3 : Isabelle Ménard - PAN-Jugement global
    const pratiqueIsabelle = {
        id: 'pan-jugement-global-isabelle',
        nom: 'PAN-Jugement global (Isabelle Ménard)',
        auteur: 'Isabelle Ménard',
        etablissement: 'Cégep (Biologie)',
        description: 'Calcul mode statistique comme suggestion. Jugement professionnel de l\'enseignante requis.',
        discipline: 'Biologie - Anatomie et physiologie 3',
        version: '1.0',
        date_creation: '2025-11-26',
        config: {
            id: 'pan-jugement-global-isabelle',
            nom: 'PAN-Jugement global (Isabelle Ménard)',
            auteur: 'Isabelle Ménard',
            etablissement: 'Cégep (Biologie)',
            description: 'Mode statistique comme suggestion + jugement professionnel',
            discipline: 'Biologie - Anatomie et physiologie 3',

            echelle: {
                type: 'niveaux',
                niveaux: [
                    { code: 'I', label: 'Insuffisant', valeur_numerique: 1, valeur_pourcentage: 50, couleur: '#FF6B6B', ordre: 1 },
                    { code: 'D', label: 'Développement', valeur_numerique: 2, valeur_pourcentage: 70, couleur: '#FFD93D', ordre: 2 },
                    { code: 'M', label: 'Maîtrisé', valeur_numerique: 3, valeur_pourcentage: 80, couleur: '#6BCF7F', ordre: 3 },
                    { code: 'E', label: 'Étendu', valeur_numerique: 4, valeur_pourcentage: 92.5, couleur: '#4D96FF', ordre: 4 }
                ]
            },

            structure_evaluations: {
                type: 'portfolio-integral',
                nombre_total_evaluations: 11
            },

            calcul_note: {
                methode: 'mode-statistique-avec-jugement',
                fenetre_recente: 4
            },

            seuils: {
                type: 'contextuel',
                note: 'Pas de seuils chiffrés rigides - jugement contextuel'
            }
        }
    };

    // Vérifier si les pratiques existent déjà
    const idsMichel = 'pan-objectifs-ponderes-michel';
    const idsJordan = 'sommative-remplacement-jordan';
    const idsIsabelle = 'pan-jugement-global-isabelle';

    let ajoutees = 0;

    // Ajouter Michel si pas déjà présent
    if (!pratiques.find(p => p.id === idsMichel)) {
        pratiques.push(pratiqueMichel);
        console.log('✅ Ajouté : Michel Baillargeon (Objectifs pondérés)');
        ajoutees++;
    } else {
        console.log('ℹ️  Déjà présent : Michel Baillargeon');
    }

    // Ajouter Jordan si pas déjà présent
    if (!pratiques.find(p => p.id === idsJordan)) {
        pratiques.push(pratiqueJordan);
        console.log('✅ Ajouté : Jordan Raymond (Remplacement)');
        ajoutees++;
    } else {
        console.log('ℹ️  Déjà présent : Jordan Raymond');
    }

    // Ajouter Isabelle si pas déjà présent
    if (!pratiques.find(p => p.id === idsIsabelle)) {
        pratiques.push(pratiqueIsabelle);
        console.log('✅ Ajouté : Isabelle Ménard (Jugement global)');
        ajoutees++;
    } else {
        console.log('ℹ️  Déjà présent : Isabelle Ménard');
    }

    // Sauvegarder dans IndexedDB
    if (ajoutees > 0) {
        db.setSync('pratiquesConfigurables', pratiques);
        console.log(`\n🎉 ${ajoutees} nouvelle(s) pratique(s) ajoutée(s) !`);
        console.log(`📊 Total pratiques : ${pratiques.length}`);
        console.log('\n✨ Recharge la page pour voir les changements !');
        console.log('   (Cmd+R ou F5)');
    } else {
        console.log('\n✅ Toutes les pratiques sont déjà présentes !');
        console.log(`📊 Total pratiques : ${pratiques.length}`);
    }

    return pratiques;
})();
