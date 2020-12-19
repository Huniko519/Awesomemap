<?php
session_start();

include("includes/db_functions.php");
		
$error_msg = "";

$admin_name			=	"";
$admin_password		=	"";

// Launch the Install Process
if (isset($_POST['submit'])) {

	// Input Informations
	$admin_name			=	isset($_POST['username'])	?	$_POST['username']	:	"";
	$admin_password		=	isset($_POST['password'])	?	$_POST['password']	:	"";
	
	// Check if the username and password are correct
	$admin_infos = mysql_query("SELECT id, username, password
						  		FROM admin
						  		WHERE username = '" . mysql_real_escape_string($admin_name) . "'
						  		AND password = '" . md5(mysql_real_escape_string($admin_password)) . "'");
						
	// Login is correct
	if(mysql_num_rows($admin_infos) > 0) {
		$admin = mysql_fetch_object($admin_infos); 
	
		$_SESSION["ID"] = $admin->id;
		$_SESSION["USERNAME"] = $admin->username;
		$_SESSION["IS_OPEN"] = true;
		
		header("Location: admin.php");
	} else {
		$error_msg .= "Incorrect username or password.";
	}
}
?>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8"/>

        <title>Awesome Map</title>

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

        <link
            href='http://fonts.googleapis.com/css?family=Duru+Sans'
            rel='stylesheet'
            type='text/css'>
        <link
            href='http://fonts.googleapis.com/css?family=Kaushan+Script'
            rel='stylesheet'
            type='text/css'>
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/font-awesome.min.css" rel="stylesheet">
        <link href="css/styles.css" rel="stylesheet">

        <script src="js/jquery-1.10.2.min.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
    </head>

    <body>
        <div class="container">
            <div class="title">
                Awesome Map
            </div>
            <?php
			if($error_msg != "") {
			?>
            <div class="alert alert-danger">
                <?php echo $error_msg; ?>
            </div>
            <?php	
			}
			?>
            <div class="well">
                <form method="POST" action="" class="install">
                    <fieldset>
                        <legend>Admin Login</legend>
                        <div class="alert alert-info">
                            Please enter your admin username and the password.
                        </div>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input
                                type="text"
                                class="form-control"
                                id="username"
                                name="username"
                                placeholder="Admin Username">
                        </div>
                        <div class="form-group">
                            <label for="password_db">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="password"
                                name="password"
                                placeholder="Admin Password">
                        </div>
                        <div style="text-align:center;">
                            <input
                                name="submit"
                                type="submit"
                                value="Login &rarr;"
                                class="btn btn-primary"/>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
        <script>
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                },
                i[r].l = 1 * new Date();
                a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m
                    .parentNode
                    .insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-37805539-15', 'axelhardy.com');
            ga('send', 'pageview');
        </script>
    </body>
</html>