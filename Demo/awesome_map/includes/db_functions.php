<?php
include("db.php");

// Opens a connection to a mySQL server
$connection = mysql_connect (DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD);
if (!$connection) {
	die('Not connected : ' . mysql_error());
}

// Set the active mySQL database
$db_selected = mysql_select_db(DATABASE_NAME, $connection);
if (!$db_selected) {
	die ('Can\'t use db : ' . mysql_error());
}

function curPageURL() {
	return '//'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']);
}

function getVar($key) {
    if (get_magic_quotes_gpc()) {
        return stripslashes($key);
    } else {
        return $key;
    }
}
?>