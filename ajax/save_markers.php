<?php
set_magic_quotes_runtime(0);

// We open the MySQL Connection
include("../includes/db_functions.php");

// Get the markers
if(isset($_POST["markers"]))
	$markers = $_POST["markers"];
	
$map 	 = $_POST["map"];
$cluster = $_POST["cluster"];
$search  = $_POST["search"];
$theme   = $_POST["theme"];

// First of all, we remove the old markers
mysql_query("DELETE FROM `markers`");

$lat 	= getVar(mysql_real_escape_string($map["lat"]));
$lng 	= getVar(mysql_real_escape_string($map["lng"]));
$zoom 	= intval($map["zoom"]);

// Reset
mysql_query("DELETE FROM `map_infos`");

// Update the map infos
mysql_query("INSERT INTO `map_infos` SET `lat` = '$lat', `lng` = '$lng', `zoom` = $zoom, `cluster` = $cluster, `search` = $search, `theme` = '$theme'");

if(isset($markers)) {
	foreach($markers as $marker) {
		
		// Prepare and secure the marker's data
		$name 		= getVar(mysql_real_escape_string($marker["name"]));
		$desc 		= getVar(mysql_real_escape_string($marker["desc"]));
		$address 	= getVar(mysql_real_escape_string($marker["address"]));
		$lat		= getVar(mysql_real_escape_string($marker["lat"]));
		$lng		= getVar(mysql_real_escape_string($marker["lng"]));
		$content	= getVar(mysql_real_escape_string($marker["content"]));
		$icon		= getVar(mysql_real_escape_string($marker["icon"]));
		$icon_color	= getVar(mysql_real_escape_string($marker["icon_color"]));
		$markeri	= getVar(mysql_real_escape_string($marker["marker"]));
		$preview	= getVar(mysql_real_escape_string($marker["preview"]));
		$oi_preview	= getVar(mysql_real_escape_string($marker["oi_preview"]));
		$sv_url		= getVar(mysql_real_escape_string($marker["sv_url"]));
		$id			= getVar(mysql_real_escape_string($marker["unique_id"]));
			
		// Insert the marker in the DB
		mysql_query("INSERT INTO `markers` SET
					 `name` = '$name',
					 `desc` = '$desc',
					 `address` = '$address',
					 `lat` = '$lat',
					 `lng` = '$lng',
					 `content` = '$content',
					 `icon` = '$icon',
					 `icon_color` = '$icon_color',
					 `marker` = $markeri,
					 `preview` = '$preview',
					 `sv_url` = '$sv_url',
					 `unique_id` = '$id',
					 `oi_preview` = '$oi_preview'"
				   );
	}
}

header("Content-Type: text/json");
echo json_encode("200");
?>