<?php
//Le script est lancé par la fonction supprimerFichier dans le fichier ../index.js
// et permet la suppression d'un fichier

//vérification du droit d'accées
require '../../include/fonction.php';
require '../../class/class.database.php';
$db = Database::getInstance();
if (!estAutorise(3, $db)) {
    echo "Accès interdit";
    exit;
}

// vérification des paramètres
if (!isset($_POST['fichier'])) {
    echo "Demande incomplète";
    exit;
}
$fichier = "../../document/" . $_POST['fichier'];
if (file_exists($fichier)) {
    unlink($fichier);
    echo 1;
} else {
    echo 2; 
}

