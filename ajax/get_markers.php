<?php
// We open the MySQL Connection
include("../includes/db_functions.php");

// Get the markers
$markers = mysql_query("SELECT * FROM `markers`");

$json = array();

while ($marker = mysql_fetch_assoc($markers)) {
    $json['markers'][] = $marker;
}

// Get the map infos
$maps = mysql_query("SELECT * FROM map_infos");
$map_infos = mysql_fetch_array($maps);
	
$json['map']["lat"] 		= $map_infos["lat"];
$json['map']["lng"] 		= $map_infos["lng"];
$json['map']["zoom"] 		= $map_infos["zoom"];
$json['map']["cluster"] 	= $map_infos["cluster"];
$json['map']["search"] 		= $map_infos["search"];
$json['map']["theme"] 		= $map_infos["theme"];

header("Content-Type: text/json");
echo json_encode($json);
?>