<?php
//Le script est lancé par la fonction supprimerinformation dans le fichier ../index.js
// et permet la suppression d'une information

//vérification du droit d'accées
require '../../include/fonction.php';
require '../../class/class.database.php';
$db = Database::getInstance();
if (!estAutorise(3, $db)) {
    echo "Accès interdit";
    exit;
}

// vérification de la présence du paramètre
if (!isset($_POST['id'])) {
    echo "Paramètres manquants";
    exit;
}
//Récupération des information, préparation de la requéte et execution de la requête
$id = $_POST['id'];
$sql = <<<EOD
delete 
from information 
where id = :id;
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam('id', $id);
$curseur->execute();

//Si un fichier relié à l'information était existant sur le serveur, alors il seras supprimer
if (isset($_POST['fichier'])) {
    $fichier = "../../document/" . $_POST['fichier'];
    if (file_exists($fichier))
        unlink($fichier);
}
echo 1;


