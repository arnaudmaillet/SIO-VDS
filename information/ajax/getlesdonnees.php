<?php
//Le script est lancé au chargement du fichier ../ajout.js
// et permet le chargement des types d'informations dans la base de données

// le membre a t'il un droit d'accès sur cette fonction
require '../../include/fonction.php';
require '../../class/class.database.php';
$db = Database::getInstance();
if (!estAutorise(2, $db)) {
    echo "Accès interdit";
    exit;
}

$sql =<<<EOD
    Select id, nom
    from type
    order by nom;
EOD;
$curseur = $db->query($sql);
$lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);
$curseur->closeCursor();

echo json_encode($lesLignes);
