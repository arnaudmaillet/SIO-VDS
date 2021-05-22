﻿/*
Objectif :
    Saisie d'une nouvelle épreuve

Tables utilisées :
    epreuve(id, nom, description, date)

Appels Ajax :
    ajax/ajouter.php : ajout dans la table épreuve

Remarque :
    utilisation ckEditor pour la description
    le champ description est facultatif

*/


"use strict";

// variables globales utilisées pour l'intervalle sur les dates des épreuves
let dateJ = new Date();
let max = dateJ.getFullYear() + 1 + "-12-31";
let min = dateJ.toFormatMySQL();

window.onload = init

function init() {

    // paramètrage du l'objet CkEditor
    let parametre = {
        toolbar: {
            items: [
                'fontColor', // couleur de police
                'fontSize', // Taille de la police
                'fontFamily', // police de caractères
                'bold', // Mise en gras
                'italic', // mise en italique
                'link', // lien
                'bulletedList', // liste à puces
                'numberedList', // liste numérotée
                '|',
                'indent', // augmenter le retrai
                'outdent', // diminuer le retrait
                '|',
                'imageUpload', // importation d'un image en base 64
                'blockQuote', // citation
                'insertTable', // insérer un tableau
                'undo', // annuler
                'redo', // restaurer
                'horizontalLine' // ajouter un trait horizontal
            ]
        },
        language: 'fr',
        image: {toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']},
        table: {contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']},
    };
    ClassicEditor.create(description, parametre).then(newEditor => {
        editor = newEditor;
    });

    // paramétrage des champs de saisie
    date.min = min;
    date.max = max;

    // Traitements événementiels sur les champs de saisie
    for (const input of document.querySelectorAll('input.ctrl')) {
        input.oninput = function() { Ctrl.controler(this); }
    }

    // traitement associé au bouton 'Ajouter'
    btnAjouter.onclick = controleAvantAjout;


}

function controlerDescription() {
    description.value = editor.getData();
    if (description.value.length < 30) {
        messageDescription.innerText = "Vous devez décrire cette épreuve de façon plus détaillée";
        return false;
    } else {
        messageDescription.innerText = "";
        return true;
    }
}

// Controle du nom, description et date
function controlerNom() {
    nom.value = nom.value.replace(/\s{2,}/, " ").trim();
    return Ctrl.controler(nom);
}


function controlerDate() {
    return Ctrl.controler(date);
}


function controleAvantAjout() {
    let nomOk = controlerNom();
    let descriptionOk = controlerDescription();
    let dateOk = controlerDate();
    if (nomOk && descriptionOk && dateOk) ajouter();
}


function ajouter() {
    $.ajax({
        url: 'ajax/ajouter.php',
        type: 'POST',
        data: {
            nom: nom.value,
            description: editor.getData(),
            date: date.value,
        },
        dataType: "json",
        error: function (request) {
            Std.afficherMessage({
                message: request.responseText,
                fermeture: 1
            })
        },
        success: function (id) {
            Std.afficherMessage({
                message: "Épreuve ajoutée",
                type: "success",
            })
        }
    })

}




