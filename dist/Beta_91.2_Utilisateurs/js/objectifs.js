/**
 * GESTION DES OBJECTIFS D'APPRENTISSAGE
 *
 * Ce module gère les ensembles d'objectifs réutilisables pour les pratiques
 * d'évaluation multi-objectifs.
 *
 * VERSION : 1.0
 * DATE : 26 novembre 2025
 * AUTEUR : Grégoire Bédard (Labo Codex)
 */

// ============================================================================
// INITIALISATION
// ============================================================================

/**
 * Initialise le module des objectifs
 */
function initialiserModuleObjectifs() {
    chargerEnsemblesObjectifs();
    afficherListeEnsemblesObjectifs();
    mettreAJourStatsObjectifs();
    console.log('✅ Module objectifs.js initialisé');
}

// ============================================================================
// GESTION DU STORAGE
// ============================================================================

/**
 * Charge les ensembles d'objectifs depuis le storage
 * @returns {Array} Liste des ensembles
 */
function chargerEnsemblesObjectifs() {
    return db.getSync('objectifsTemplates', []);
}

/**
 * Sauvegarde les ensembles d'objectifs dans le storage
 * @param {Array} ensembles - Liste des ensembles
 */
function sauvegarderEnsemblesObjectifs(ensembles) {
    db.setSync('objectifsTemplates', ensembles);
    mettreAJourStatsObjectifs();
    afficherListeEnsemblesObjectifs();
}

// ============================================================================
// AFFICHAGE DE LA LISTE
// ============================================================================

/**
 * Affiche la liste des ensembles d'objectifs dans la sidebar
 */
function afficherListeEnsemblesObjectifs() {
    const liste = document.getElementById('listeEnsemblesObjectifs');
    const ensembles = chargerEnsemblesObjectifs();

    if (ensembles.length === 0) {
        liste.innerHTML = '<p class="banque-vide">Aucun ensemble d\'objectifs</p>';
        return;
    }

    let html = '';
    ensembles.forEach((ensemble, index) => {
        const nbObjectifs = ensemble.objectifs ? ensemble.objectifs.length : 0;
        html += `
            <div class="sidebar-item" onclick="afficherEnsembleObjectifs('${ensemble.id}')">
                <div class="sidebar-item-titre">${ensemble.nom}</div>
                <div class="sidebar-item-badge">${nbObjectifs} objectifs</div>
            </div>
        `;
    });

    liste.innerHTML = html;
}

/**
 * Met à jour les statistiques
 */
function mettreAJourStatsObjectifs() {
    const ensembles = chargerEnsemblesObjectifs();
    const stat = document.getElementById('stat-objectifs-ensembles');
    if (stat) {
        stat.textContent = ensembles.length;
    }
}

// ============================================================================
// CRÉATION D'UN NOUVEL ENSEMBLE
// ============================================================================

/**
 * Crée un nouvel ensemble d'objectifs
 */
function creerNouvelEnsembleObjectifs() {
    const id = 'objectifs-' + Date.now();

    const nouvelEnsemble = {
        id: id,
        nom: 'Nouvel ensemble d\'objectifs',
        auteur: '',
        etablissement: '',
        discipline: '',
        description: '',
        version: '1.0',
        date_creation: new Date().toISOString().split('T')[0],
        objectifs: []
    };

    // Ajouter 3 objectifs par défaut
    nouvelEnsemble.objectifs.push(creerObjectifVide(1));
    nouvelEnsemble.objectifs.push(creerObjectifVide(2));
    nouvelEnsemble.objectifs.push(creerObjectifVide(3));

    // Sauvegarder
    const ensembles = chargerEnsemblesObjectifs();
    ensembles.push(nouvelEnsemble);
    sauvegarderEnsemblesObjectifs(ensembles);

    // Afficher l'éditeur
    afficherEnsembleObjectifs(id);
}

/**
 * Crée un objectif vide
 * @param {number} index - Index de l'objectif
 * @returns {object} Objectif vide
 */
function creerObjectifVide(index) {
    return {
        id: 'obj' + index,
        nom: '',
        poids: 0,
        type: 'fondamental'
    };
}

// ============================================================================
// AFFICHAGE ET ÉDITION D'UN ENSEMBLE
// ============================================================================

/**
 * Affiche un ensemble d'objectifs pour édition
 * @param {string} ensembleId - ID de l'ensemble
 */
function afficherEnsembleObjectifs(ensembleId) {
    const ensembles = chargerEnsemblesObjectifs();
    const ensemble = ensembles.find(e => e.id === ensembleId);

    if (!ensemble) {
        console.error('Ensemble introuvable:', ensembleId);
        return;
    }

    // Cacher le message d'accueil
    const messageAccueil = document.getElementById('messageAccueilObjectifs');
    if (messageAccueil) messageAccueil.classList.add('hidden');

    // Afficher la zone d'édition
    const zoneEdition = document.getElementById('editionEnsembleObjectifs');
    if (zoneEdition) {
        zoneEdition.classList.remove('hidden');
        // Générer le HTML
        zoneEdition.innerHTML = genererFormulaireEnsemble(ensemble);
    }

    // Calculer le total
    calculerTotalPoidsEnsemble();
}

/**
 * Génère le formulaire d'édition d'un ensemble
 * @param {object} ensemble - Ensemble d'objectifs
 * @returns {string} HTML du formulaire
 */
function genererFormulaireEnsemble(ensemble) {
    const objectifsHTML = ensemble.objectifs.map((obj, index) => `
        <div class="objectif-item" data-index="${index}">
            <input type="text"
                   class="controle-form"
                   placeholder="Nom de l'objectif"
                   value="${obj.nom}"
                   data-field="nom"
                   oninput="marquerEnsembleModifie()">
            <input type="number"
                   class="controle-form"
                   placeholder="Poids %"
                   value="${obj.poids}"
                   min="0"
                   max="100"
                   step="1"
                   data-field="poids"
                   oninput="calculerTotalPoidsEnsemble(); marquerEnsembleModifie()">
            <select class="controle-form" data-field="type" onchange="marquerEnsembleModifie()">
                <option value="fondamental" ${obj.type === 'fondamental' ? 'selected' : ''}>Fondamental</option>
                <option value="integrateur" ${obj.type === 'integrateur' ? 'selected' : ''}>Intégrateur</option>
                <option value="transversal" ${obj.type === 'transversal' ? 'selected' : ''}>Transversal</option>
            </select>
            <button type="button"
                    class="btn btn-tres-compact btn-supprimer"
                    onclick="retirerObjectifEnsemble(${index})">Supprimer</button>
        </div>
    `).join('');

    return `
        <input type="hidden" id="ensembleActuelId" value="${ensemble.id}">

        <h3>Édition de l'ensemble</h3>

        <!-- Informations générales -->
        <div class="carte-info-section">
            <h4>Informations générales</h4>

            <div class="groupe-form">
                <label>Nom de l'ensemble *</label>
                <input type="text"
                       id="ensembleNom"
                       class="controle-form"
                       value="${ensemble.nom}"
                       placeholder="Ex: Objectifs Calcul différentiel"
                       oninput="marquerEnsembleModifie()">
            </div>

            <div class="grid-2col">
                <div class="groupe-form">
                    <label>Auteur</label>
                    <input type="text"
                           id="ensembleAuteur"
                           class="controle-form"
                           value="${ensemble.auteur || ''}"
                           placeholder="Votre nom"
                           oninput="marquerEnsembleModifie()">
                </div>
                <div class="groupe-form">
                    <label>Établissement</label>
                    <input type="text"
                           id="ensembleEtablissement"
                           class="controle-form"
                           value="${ensemble.etablissement || ''}"
                           placeholder="Ex: Cégep de..."
                           oninput="marquerEnsembleModifie()">
                </div>
            </div>

            <div class="groupe-form">
                <label>Discipline</label>
                <input type="text"
                       id="ensembleDiscipline"
                       class="controle-form"
                       value="${ensemble.discipline || ''}"
                       placeholder="Ex: Mathématiques, Biologie..."
                       oninput="marquerEnsembleModifie()">
            </div>

            <div class="groupe-form">
                <label>Description</label>
                <textarea id="ensembleDescription"
                          class="controle-form"
                          rows="2"
                          placeholder="Description optionnelle de cet ensemble d'objectifs"
                          oninput="marquerEnsembleModifie()">${ensemble.description || ''}</textarea>
            </div>
        </div>

        <!-- Liste des objectifs -->
        <div class="objectifs-section">
            <div class="section-header">
                <h4>Objectifs (compétences)</h4>
                <button type="button" onclick="ajouterObjectifEnsemble()" class="btn btn-secondaire">
                    + Ajouter un objectif
                </button>
            </div>

            <div id="listeObjectifsEnsemble">
                ${objectifsHTML}
            </div>
        </div>

        <!-- Indicateur du total -->
        <div class="total-poids-container">
            <div class="total-poids-header">
                <span class="total-poids-label">Total des pondérations :</span>
                <span id="totalPoidsEnsemble" class="total-poids-valeur">
                    0%
                </span>
            </div>
            <p id="validationPoidsEnsemble" class="total-poids-message">
                Le total doit atteindre 100% pour que l'ensemble soit valide
            </p>
        </div>

        <!-- Boutons d'action -->
        <div class="btn-groupe" style="display: flex; justify-content: space-between; align-items: center;">
            <!-- Boutons gauche (actions sur l'ensemble) -->
            <div style="display: flex; gap: 10px;">
                <button onclick="dupliquerEnsembleObjectifs('${ensemble.id}')" class="btn btn-secondaire" title="Créer une copie de cet ensemble">
                    Dupliquer l'ensemble
                </button>
                <button onclick="exporterEnsembleObjectifs('${ensemble.id}')" class="btn btn-secondaire" title="Exporter cet ensemble">
                    Exporter l'ensemble
                </button>
                <button onclick="supprimerEnsembleObjectifs('${ensemble.id}')" class="btn btn-supprimer" title="Supprimer cet ensemble">
                    Supprimer l'ensemble
                </button>
            </div>
            <!-- Boutons droite (actions principales) -->
            <div style="display: flex; gap: 10px;">
                <button onclick="annulerEditionEnsemble()" class="btn btn-annuler">
                    Annuler
                </button>
                <button onclick="sauvegarderEnsembleObjectifs()" class="btn btn-confirmer" id="btnSauvegarderEnsemble">
                    Sauvegarder
                </button>
            </div>
        </div>
    `;
}

// ============================================================================
// GESTION DES OBJECTIFS DANS L'ENSEMBLE
// ============================================================================

/**
 * Ajoute un objectif à l'ensemble en cours d'édition
 */
function ajouterObjectifEnsemble() {
    const ensembleId = document.getElementById('ensembleActuelId').value;
    const ensembles = chargerEnsemblesObjectifs();
    const ensembleIndex = ensembles.findIndex(e => e.id === ensembleId);

    if (ensembleIndex === -1) return;

    // D'abord, sauvegarder les modifications en cours du formulaire
    const nom = document.getElementById('ensembleNom').value.trim();
    const auteur = document.getElementById('ensembleAuteur').value.trim();
    const etablissement = document.getElementById('ensembleEtablissement').value.trim();
    const discipline = document.getElementById('ensembleDiscipline').value.trim();
    const description = document.getElementById('ensembleDescription').value.trim();

    // Récupérer les objectifs actuels
    const objectifsElements = document.querySelectorAll('#listeObjectifsEnsemble .objectif-item');
    const objectifs = [];

    objectifsElements.forEach((elem, idx) => {
        const nomObj = elem.querySelector('[data-field="nom"]').value.trim();
        const poids = parseFloat(elem.querySelector('[data-field="poids"]').value) || 0;
        const type = elem.querySelector('[data-field="type"]').value;

        objectifs.push({
            id: 'obj' + (idx + 1),
            nom: nomObj,
            poids: poids,
            type: type
        });
    });

    // Ajouter le nouvel objectif
    const nouvelObjectif = creerObjectifVide(objectifs.length + 1);
    objectifs.push(nouvelObjectif);

    // Mettre à jour l'ensemble
    ensembles[ensembleIndex].nom = nom;
    ensembles[ensembleIndex].auteur = auteur;
    ensembles[ensembleIndex].etablissement = etablissement;
    ensembles[ensembleIndex].discipline = discipline;
    ensembles[ensembleIndex].description = description;
    ensembles[ensembleIndex].objectifs = objectifs;
    ensembles[ensembleIndex].date_modification = new Date().toISOString().split('T')[0];

    // Sauvegarder l'ensemble modifié pour mettre à jour le badge
    sauvegarderEnsemblesObjectifs(ensembles);

    // Réafficher
    afficherEnsembleObjectifs(ensembleId);
    marquerEnsembleModifie();
}

/**
 * Retire un objectif de l'ensemble
 * @param {number} index - Index de l'objectif à retirer
 */
function retirerObjectifEnsemble(index) {
    const ensembleId = document.getElementById('ensembleActuelId').value;
    const ensembles = chargerEnsemblesObjectifs();
    const ensembleIndex = ensembles.findIndex(e => e.id === ensembleId);

    if (ensembleIndex === -1) return;

    const ensemble = ensembles[ensembleIndex];
    if (!ensemble.objectifs[index]) return;

    if (!confirm(`Retirer l'objectif "${ensemble.objectifs[index].nom || '(sans nom)'}" ?`)) {
        return;
    }

    // D'abord, sauvegarder les modifications en cours du formulaire
    const nom = document.getElementById('ensembleNom').value.trim();
    const auteur = document.getElementById('ensembleAuteur').value.trim();
    const etablissement = document.getElementById('ensembleEtablissement').value.trim();
    const discipline = document.getElementById('ensembleDiscipline').value.trim();
    const description = document.getElementById('ensembleDescription').value.trim();

    // Récupérer les objectifs actuels (sauf celui à supprimer)
    const objectifsElements = document.querySelectorAll('#listeObjectifsEnsemble .objectif-item');
    const objectifs = [];

    objectifsElements.forEach((elem, idx) => {
        if (idx !== index) { // Exclure l'objectif à supprimer
            const nomObj = elem.querySelector('[data-field="nom"]').value.trim();
            const poids = parseFloat(elem.querySelector('[data-field="poids"]').value) || 0;
            const type = elem.querySelector('[data-field="type"]').value;

            objectifs.push({
                id: 'obj' + (objectifs.length + 1),
                nom: nomObj,
                poids: poids,
                type: type
            });
        }
    });

    // Mettre à jour l'ensemble
    ensembles[ensembleIndex].nom = nom;
    ensembles[ensembleIndex].auteur = auteur;
    ensembles[ensembleIndex].etablissement = etablissement;
    ensembles[ensembleIndex].discipline = discipline;
    ensembles[ensembleIndex].description = description;
    ensembles[ensembleIndex].objectifs = objectifs;
    ensembles[ensembleIndex].date_modification = new Date().toISOString().split('T')[0];

    // Sauvegarder l'ensemble modifié pour mettre à jour le badge
    sauvegarderEnsemblesObjectifs(ensembles);

    // Réafficher
    afficherEnsembleObjectifs(ensembleId);
    marquerEnsembleModifie();
}

/**
 * Calcule le total des pondérations
 */
function calculerTotalPoidsEnsemble() {
    const objectifs = document.querySelectorAll('#listeObjectifsEnsemble .objectif-item');
    let total = 0;

    objectifs.forEach(obj => {
        const poidsInput = obj.querySelector('[data-field="poids"]');
        const poids = parseFloat(poidsInput.value) || 0;
        total += poids;
    });

    // Mettre à jour l'affichage
    const totalSpan = document.getElementById('totalPoidsEnsemble');
    const validationP = document.getElementById('validationPoidsEnsemble');

    if (!totalSpan || !validationP) return;

    totalSpan.textContent = total + '%';

    // Changer la couleur selon la validité
    if (total === 100) {
        totalSpan.style.color = '#4caf50'; // Vert
        validationP.textContent = '✓ Total valide ! L\'ensemble peut être utilisé.';
        validationP.style.color = '#4caf50';
    } else if (total > 100) {
        totalSpan.style.color = '#dc3545'; // Rouge
        validationP.textContent = '⚠ Le total dépasse 100% (' + total + '%). Ajustez les pondérations.';
        validationP.style.color = '#dc3545';
    } else {
        totalSpan.style.color = '#f0ad4e'; // Orange
        validationP.textContent = 'Le total doit atteindre 100% (actuellement ' + total + '%)';
        validationP.style.color = '#f0ad4e';
    }

    return total;
}

/**
 * Marque l'ensemble comme modifié
 */
function marquerEnsembleModifie() {
    const btnSauvegarder = document.getElementById('btnSauvegarderEnsemble');
    if (btnSauvegarder) {
        btnSauvegarder.textContent = 'Sauvegarder *';
        // Le bouton reste vert (btn-confirmer) même avec des modifications
    }
}

// ============================================================================
// SAUVEGARDE ET ANNULATION
// ============================================================================

/**
 * Sauvegarde les modifications de l'ensemble
 */
function sauvegarderEnsembleObjectifs() {
    const ensembleId = document.getElementById('ensembleActuelId').value;
    const ensembles = chargerEnsemblesObjectifs();
    const index = ensembles.findIndex(e => e.id === ensembleId);

    if (index === -1) {
        console.error('Ensemble introuvable:', ensembleId);
        return;
    }

    // Récupérer les valeurs du formulaire
    const nom = document.getElementById('ensembleNom').value.trim();
    const auteur = document.getElementById('ensembleAuteur').value.trim();
    const etablissement = document.getElementById('ensembleEtablissement').value.trim();
    const discipline = document.getElementById('ensembleDiscipline').value.trim();
    const description = document.getElementById('ensembleDescription').value.trim();

    // Valider
    if (!nom) {
        alert('Le nom de l\'ensemble est obligatoire.');
        return;
    }

    // Récupérer les objectifs
    const objectifsElements = document.querySelectorAll('#listeObjectifsEnsemble .objectif-item');
    const objectifs = [];

    objectifsElements.forEach((elem, idx) => {
        const nomObj = elem.querySelector('[data-field="nom"]').value.trim();
        const poids = parseFloat(elem.querySelector('[data-field="poids"]').value) || 0;
        const type = elem.querySelector('[data-field="type"]').value;

        objectifs.push({
            id: 'obj' + (idx + 1),
            nom: nomObj,
            poids: poids,
            type: type
        });
    });

    // Valider le total
    const total = calculerTotalPoidsEnsemble();
    if (total !== 100) {
        if (!confirm(`Le total des pondérations est de ${total}% au lieu de 100%.\n\nVoulez-vous quand même sauvegarder ?`)) {
            return;
        }
    }

    // Mettre à jour l'ensemble
    ensembles[index].nom = nom;
    ensembles[index].auteur = auteur;
    ensembles[index].etablissement = etablissement;
    ensembles[index].discipline = discipline;
    ensembles[index].description = description;
    ensembles[index].objectifs = objectifs;
    ensembles[index].date_modification = new Date().toISOString().split('T')[0];

    // Sauvegarder
    sauvegarderEnsemblesObjectifs(ensembles);

    // Réinitialiser le bouton
    const btnSauvegarder = document.getElementById('btnSauvegarderEnsemble');
    if (btnSauvegarder) {
        btnSauvegarder.textContent = 'Sauvegarder';
        btnSauvegarder.style.background = '';
    }

    alert('✅ Ensemble d\'objectifs sauvegardé !');
}

/**
 * Annule l'édition
 */
function annulerEditionEnsemble() {
    const zoneEdition = document.getElementById('editionEnsembleObjectifs');
    const messageAccueil = document.getElementById('messageAccueilObjectifs');

    if (zoneEdition) zoneEdition.classList.add('hidden');
    if (messageAccueil) messageAccueil.classList.remove('hidden');
}

// ============================================================================
// SUPPRESSION
// ============================================================================

/**
 * Supprime un ensemble d'objectifs
 * @param {string} ensembleId - ID de l'ensemble à supprimer
 */
function supprimerEnsembleObjectifs(ensembleId) {
    const ensembles = chargerEnsemblesObjectifs();
    const ensemble = ensembles.find(e => e.id === ensembleId);

    if (!ensemble) return;

    if (!confirm(`Supprimer l'ensemble "${ensemble.nom}" ?\n\nCette action est irréversible.`)) {
        return;
    }

    // Retirer l'ensemble
    const nouveauxEnsembles = ensembles.filter(e => e.id !== ensembleId);
    sauvegarderEnsemblesObjectifs(nouveauxEnsembles);

    // Masquer l'éditeur
    annulerEditionEnsemble();

    alert('Ensemble supprimé avec succès.');
}

/**
 * Duplique un ensemble d'objectifs
 * @param {string} ensembleId - ID de l'ensemble à dupliquer
 */
function dupliquerEnsembleObjectifs(ensembleId) {
    const ensembles = chargerEnsemblesObjectifs();
    const ensembleOriginal = ensembles.find(e => e.id === ensembleId);

    if (!ensembleOriginal) {
        console.error('Ensemble introuvable:', ensembleId);
        return;
    }

    // Créer une copie profonde
    const copie = JSON.parse(JSON.stringify(ensembleOriginal));

    // Générer un nouvel ID unique
    copie.id = 'ensemble-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);

    // Modifier le nom pour indiquer que c'est une copie
    copie.nom = ensembleOriginal.nom + ' - Copie';

    // Ajouter la date de création
    copie.dateCreation = new Date().toISOString();
    copie.dateModification = new Date().toISOString();

    // Ajouter le nouvel ensemble
    ensembles.push(copie);
    sauvegarderEnsemblesObjectifs(ensembles);

    // Rafraîchir la liste et afficher le nouvel ensemble
    afficherListeEnsemblesObjectifs();
    mettreAJourStatsObjectifs();
    afficherEnsembleObjectifs(copie.id);

    alert('✅ Ensemble dupliqué avec succès !\n\nVous pouvez maintenant modifier la copie.');
}

// ============================================================================
// EXPORT / IMPORT
// ============================================================================

/**
 * Exporte un ensemble d'objectifs
 * @param {string} ensembleId - ID de l'ensemble à exporter
 */
function exporterEnsembleObjectifs(ensembleId) {
    const ensembles = chargerEnsemblesObjectifs();
    const ensemble = ensembles.find(e => e.id === ensembleId);

    if (!ensemble) return;

    // Préparer le contenu pour l'export
    let contenuExport = { ...ensemble };

    // Si l'ensemble a été importé avec des métadonnées CC, ajouter l'utilisateur actuel comme contributeur
    if (ensemble.metadata_cc) {
        // Demander le nom de l'utilisateur s'il modifie le matériel
        const nomUtilisateur = prompt(
            'Vous allez exporter un matériel créé par ' + ensemble.metadata_cc.auteur_original + '.\n\n' +
            'Entrez votre nom pour être crédité comme contributeur :\n' +
            '(Laissez vide si vous n\'avez fait aucune modification)'
        );

        if (nomUtilisateur && nomUtilisateur.trim()) {
            // Ajouter le contributeur
            const contributeurs = ensemble.metadata_cc.contributeurs || [];
            contributeurs.push({
                nom: nomUtilisateur.trim(),
                date: new Date().toISOString().split('T')[0],
                modifications: 'Modifications et adaptations'
            });

            // Créer les métadonnées enrichies
            contenuExport.metadata_cc = {
                ...ensemble.metadata_cc,
                contributeurs: contributeurs
            };
        }
    }

    // Ajouter les métadonnées CC
    const exportAvecCC = ajouterMetadonnéesCC(contenuExport, 'ensemble-objectifs', ensemble.nom);

    const json = JSON.stringify(exportAvecCC, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `objectifs-${ensemble.nom.replace(/[^a-z0-9]/gi, '-')}-CC-BY-SA-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Exporte tous les ensembles
 */
function exporterTousObjectifs() {
    const ensembles = chargerEnsemblesObjectifs();

    if (ensembles.length === 0) {
        alert('Aucun ensemble à exporter.');
        return;
    }

    // Ajouter les métadonnées CC
    const exportAvecCC = ajouterMetadonnéesCC(ensembles, 'ensembles-objectifs', `Tous les ensembles (${ensembles.length})`);

    const json = JSON.stringify(exportAvecCC, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tous-objectifs-CC-BY-SA-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Déclenche l'import
 */
function importerObjectifs() {
    document.getElementById('importObjectifsInput').click();
}

/**
 * Traite le fichier importé
 * @param {Event} event - Événement du file input
 */
function traiterImportObjectifs(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            let ensemblesAImporter = [];
            let metadata = null;

            // Détecter si c'est un fichier avec métadonnées CC
            if (data.metadata && data.contenu) {
                metadata = data.metadata;

                // Extraire le contenu
                if (Array.isArray(data.contenu)) {
                    ensemblesAImporter = data.contenu;
                } else if (data.contenu.id && data.contenu.objectifs) {
                    ensemblesAImporter = [data.contenu];
                } else {
                    throw new Error('Format du contenu non reconnu');
                }
            }
            // Détecter si c'est un ensemble unique ou un tableau (ancien format)
            else if (Array.isArray(data)) {
                ensemblesAImporter = data;
            } else if (data.id && data.objectifs) {
                ensemblesAImporter = [data];
            } else {
                throw new Error('Format non reconnu');
            }

            // Afficher les informations CC si disponibles
            if (metadata && metadata.licence) {
                const infosCC = `
📋 Matériel sous licence ${metadata.licence}
👤 Auteur original : ${metadata.auteur_original}
📅 Date de création : ${metadata.date_creation}

Vous pouvez utiliser, modifier et partager ce matériel selon les conditions de la licence CC BY-NC-SA 4.0.
                `.trim();

                if (!confirm(infosCC + '\n\nImporter ce matériel ?')) {
                    return;
                }
            }

            // Valider et importer
            const ensemblesExistants = chargerEnsemblesObjectifs();
            let nbImportes = 0;

            ensemblesAImporter.forEach(ensemble => {
                // Vérifier que l'ID n'existe pas déjà
                if (ensemblesExistants.find(e => e.id === ensemble.id)) {
                    ensemble.id = ensemble.id + '-import-' + Date.now();
                }

                // Préserver les métadonnées CC dans l'ensemble importé
                if (metadata) {
                    ensemble.metadata_cc = {
                        auteur_original: metadata.auteur_original,
                        date_creation: metadata.date_creation,
                        licence: metadata.licence,
                        contributeurs: metadata.contributeurs || []
                    };
                }

                ensemblesExistants.push(ensemble);
                nbImportes++;
            });

            sauvegarderEnsemblesObjectifs(ensemblesExistants);
            alert(`✅ ${nbImportes} ensemble(s) importé(s) !`);

        } catch (error) {
            alert('❌ Erreur lors de l\'import : ' + error.message);
        }
    };
    reader.readAsText(file);

    // Réinitialiser l'input
    event.target.value = '';
}

// ============================================================================
// DONNÉES DE DÉMONSTRATION
// ============================================================================

/**
 * Crée l'ensemble d'objectifs de Michel Baillargeon pour le calcul différentiel
 * Exemple réaliste avec 13 objectifs pondérés
 */
function creerEnsembleMichelBaillargeon() {
    const ensemble = {
        id: 'objectifs-michel-calcul-diff',
        nom: 'Calcul différentiel (201-NYA)',
        auteur: 'Michel Baillargeon',
        etablissement: 'Cégep de Sainte-Foy',
        discipline: 'Mathématiques',
        description: 'Objectifs d\'apprentissage pour le cours de calcul différentiel 201-NYA-05. ' +
                     'Cette structure permet d\'évaluer chaque objectif séparément avec des artefacts spécifiques, ' +
                     'tout en maintenant une pondération cohérente reflétant l\'importance de chaque concept.',
        version: '1.0',
        date_creation: '2025-11-26',
        objectifs: [
            {
                id: 'obj1',
                nom: 'Limites et continuité',
                poids: 6,
                type: 'fondamental',
                description: 'Comprendre et calculer les limites de fonctions, identifier la continuité'
            },
            {
                id: 'obj2',
                nom: 'Dérivées - Définition et interprétation',
                poids: 8,
                type: 'fondamental',
                description: 'Maîtriser la définition de la dérivée comme taux de variation instantané'
            },
            {
                id: 'obj3',
                nom: 'Règles de dérivation de base',
                poids: 8,
                type: 'fondamental',
                description: 'Appliquer les règles de dérivation (puissance, somme, produit, quotient)'
            },
            {
                id: 'obj4',
                nom: 'Dérivées de fonctions composées',
                poids: 7,
                type: 'fondamental',
                description: 'Utiliser la règle de dérivation en chaîne pour des fonctions composées'
            },
            {
                id: 'obj5',
                nom: 'Dérivées de fonctions trigonométriques',
                poids: 6,
                type: 'fondamental',
                description: 'Calculer les dérivées des fonctions sin, cos, tan et leurs inverses'
            },
            {
                id: 'obj6',
                nom: 'Dérivées de fonctions exponentielles et logarithmiques',
                poids: 5,
                type: 'fondamental',
                description: 'Maîtriser les dérivées de e^x, ln(x) et leurs compositions'
            },
            {
                id: 'obj7',
                nom: 'Taux de variation liés',
                poids: 5,
                type: 'fondamental',
                description: 'Résoudre des problèmes impliquant des taux de variation reliés'
            },
            {
                id: 'obj8',
                nom: 'Analyse de fonctions',
                poids: 12,
                type: 'integrateur',
                description: 'Étudier le comportement d\'une fonction (croissance, décroissance, concavité)'
            },
            {
                id: 'obj9',
                nom: 'Extremums et points d\'inflexion',
                poids: 10,
                type: 'integrateur',
                description: 'Identifier et classifier les extremums locaux et absolus, points d\'inflexion'
            },
            {
                id: 'obj10',
                nom: 'Optimisation',
                poids: 15,
                type: 'integrateur',
                description: 'Résoudre des problèmes d\'optimisation appliqués (géométrie, économie, physique)'
            },
            {
                id: 'obj11',
                nom: 'Approximations linéaires et différentielles',
                poids: 8,
                type: 'integrateur',
                description: 'Utiliser les approximations linéaires et calculer des différentielles'
            },
            {
                id: 'obj12',
                nom: 'Règle de L\'Hospital',
                poids: 6,
                type: 'integrateur',
                description: 'Appliquer la règle de L\'Hospital pour lever les indéterminations'
            },
            {
                id: 'obj13',
                nom: 'Théorème de la valeur intermédiaire',
                poids: 4,
                type: 'fondamental',
                description: 'Comprendre et appliquer le théorème de la valeur intermédiaire'
            }
        ]
    };

    // Vérifier que le total = 100%
    const total = ensemble.objectifs.reduce((sum, obj) => sum + obj.poids, 0);
    if (total !== 100) {
        console.warn(`⚠️ Total des pondérations: ${total}% (devrait être 100%)`);
    }

    // Sauvegarder
    const ensembles = chargerEnsemblesObjectifs();

    // Vérifier si l'ensemble existe déjà
    const existant = ensembles.find(e => e.id === ensemble.id);
    if (existant) {
        console.log('ℹ️ Ensemble de Michel déjà existant, non recréé');
        return ensemble.id;
    }

    ensembles.push(ensemble);
    sauvegarderEnsemblesObjectifs(ensembles);

    console.log(`✅ Ensemble créé: "${ensemble.nom}" (${ensemble.objectifs.length} objectifs, ${total}%)`);
    return ensemble.id;
}

// ============================================================================
// CONFIGURATION PRATIQUE MULTI-OBJECTIFS
// ============================================================================

/**
 * Active la pratique multi-objectifs avec un ensemble spécifique
 *
 * @param {string} ensembleId - ID de l'ensemble d'objectifs à activer
 * @returns {boolean} - true si activation réussie
 *
 * EXEMPLE:
 * activerPratiqueMultiObjectifs('objectifs-michel-calcul-diff');
 */
function activerPratiqueMultiObjectifs(ensembleId) {
    const ensembles = chargerEnsemblesObjectifs();
    const ensemble = ensembles.find(e => e.id === ensembleId);

    if (!ensemble) {
        console.error('[Multi-Objectifs] Ensemble introuvable:', ensembleId);
        return false;
    }

    // Lire la configuration actuelle
    const modalites = db.getSync('modalitesEvaluation', {});

    // Créer configPAN si nécessaire
    if (!modalites.configPAN) {
        modalites.configPAN = {};
    }

    // Activer la pratique multi-objectifs
    modalites.configPAN.ensembleObjectifsId = ensembleId;

    // Sauvegarder
    db.setSync('modalitesEvaluation', modalites);

    console.log(`✅ [Multi-Objectifs] Pratique activée avec ensemble "${ensemble.nom}" (${ensemble.objectifs.length} objectifs)`);

    return true;
}

/**
 * Désactive la pratique multi-objectifs (retour à la pratique PAN classique)
 *
 * @returns {boolean} - true si désactivation réussie
 */
function desactiverPratiqueMultiObjectifs() {
    const modalites = db.getSync('modalitesEvaluation', {});

    if (modalites.configPAN) {
        delete modalites.configPAN.ensembleObjectifsId;
        db.setSync('modalitesEvaluation', modalites);
        console.log('✅ [Multi-Objectifs] Pratique désactivée');
        return true;
    }

    return false;
}

/**
 * Vérifie si la pratique multi-objectifs est active
 *
 * @returns {Object|null} - { actif: boolean, ensembleId: string, ensemble: Object } ou null
 */
function verifierPratiqueMultiObjectifs() {
    const modalites = db.getSync('modalitesEvaluation', {});
    const ensembleId = modalites.configPAN?.ensembleObjectifsId;

    if (!ensembleId) {
        return { actif: false, ensembleId: null, ensemble: null };
    }

    const ensembles = chargerEnsemblesObjectifs();
    const ensemble = ensembles.find(e => e.id === ensembleId);

    return {
        actif: true,
        ensembleId: ensembleId,
        ensemble: ensemble || null
    };
}

// ============================================================================
// EXPORTS
// ============================================================================

window.initialiserModuleObjectifs = initialiserModuleObjectifs;
window.creerNouvelEnsembleObjectifs = creerNouvelEnsembleObjectifs;
window.afficherEnsembleObjectifs = afficherEnsembleObjectifs;
window.ajouterObjectifEnsemble = ajouterObjectifEnsemble;
window.retirerObjectifEnsemble = retirerObjectifEnsemble;
window.calculerTotalPoidsEnsemble = calculerTotalPoidsEnsemble;
window.marquerEnsembleModifie = marquerEnsembleModifie;
window.sauvegarderEnsembleObjectifs = sauvegarderEnsembleObjectifs;
window.annulerEditionEnsemble = annulerEditionEnsemble;
window.supprimerEnsembleObjectifs = supprimerEnsembleObjectifs;
window.dupliquerEnsembleObjectifs = dupliquerEnsembleObjectifs;
window.exporterEnsembleObjectifs = exporterEnsembleObjectifs;
window.exporterTousObjectifs = exporterTousObjectifs;
window.importerObjectifs = importerObjectifs;
window.traiterImportObjectifs = traiterImportObjectifs;
window.creerEnsembleMichelBaillargeon = creerEnsembleMichelBaillargeon;
window.chargerEnsemblesObjectifs = chargerEnsemblesObjectifs;

// Nouvelles fonctions pour pratique multi-objectifs
window.activerPratiqueMultiObjectifs = activerPratiqueMultiObjectifs;
window.desactiverPratiqueMultiObjectifs = desactiverPratiqueMultiObjectifs;
window.verifierPratiqueMultiObjectifs = verifierPratiqueMultiObjectifs;

console.log('✅ Module objectifs.js chargé');
