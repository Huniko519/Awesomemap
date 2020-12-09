<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
		
		<title>Awesome Map</title>
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        
		<link href='http://fonts.googleapis.com/css?family=Duru+Sans' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<link href="css/font-awesome.min.css" rel="stylesheet">
		<link href="css/styles.css" rel="stylesheet">
		
		<script src="js/jquery-1.10.2.min.js" type="text/javascript"></script>
		<script src="js/bootstrap.min.js" type="text/javascript"></script>
  	</head>

	<body>
		<?php
		$error_msg = "";
		$success_msg = "";
		$database_host		=	""	;
		$database_name		=	""	;
		$database_username	=	""	;
		$database_password	=	""	;
		
		$admin_name			=	"";
		$admin_password		=	"";
		$admin_password_2	=	"";
		$admin_email		=	"";
		
		// Launch the Install Process
		if (isset($_POST['submit'])) {
		
			// Input Informations
			$database_host		=	isset($_POST['host_db'])	?	$_POST['host_db']	:	""	;
			$database_name		=	isset($_POST['name_db'])	?	$_POST['name_db']	:	""	;
			$database_username	=	isset($_POST['username_db'])?	$_POST['username_db']	:	""	;
			$database_password	=	isset($_POST['password_db'])?	$_POST['password_db']	:	""	;
			
			$admin_name			=	isset($_POST['admin_username'])	?	$_POST['admin_username']	:	"";
			$admin_password		=	isset($_POST['admin_password'])	?	$_POST['admin_password']	:	"";
			$admin_password_2	=	isset($_POST['admin_password_2'])	?	$_POST['admin_password_2']	:	"";
			$admin_email		=	isset($_POST['admin_email'])	?	$_POST['admin_email']	:	"";
			
			if (empty($admin_name) || empty($admin_password) || empty($admin_password_2) || empty($admin_email) || empty($database_host) || empty($database_password) || empty($database_username) || empty($database_name)) {
				$error_msg .= "All the fields are required !<br />";
			} else {
				if(!filter_var($admin_email, FILTER_VALIDATE_EMAIL)){  
					$error_msg .= "Please enter a valid email address.";
				} else if($admin_password != $admin_password_2) {
					$error_msg .= "Your password and the confirmation one are different.";		
				} else {
					
					$connection = mysql_connect($database_host, $database_username, $database_password);
					if ($connection) {
						// Create the DB if not exists
						mysql_query("CREATE DATABASE IF NOT EXISTS " . mysql_real_escape_string($database_name) . ";");
						// Select the DB
						$db_selected = mysql_select_db(mysql_real_escape_string($database_name), $connection);
						
						// Execute the queries
						$file = 'queries.sql';
						if ($sql = file($file)) {
						
							$query = '';
							
							foreach($sql as $line) {
							
								$tsl = trim($line);
								
								if (($sql != '') && (substr($tsl, 0, 2) != "--") && (substr($tsl, 0, 1) != '#')) {
								
									$query .= $line;
					  
									if (preg_match('/;\s*$/', $line)) {
					  
										mysql_query($query, $connection);
										
										$err = mysql_error();
										
										if (!empty($err))
											break;
											
										$query = '';
									}
								}
							}
						}
						
						// Put the DB infos in the db.php file
						$f = @fopen("includes/db.php","w");
						$database_inf="<?php
define('DATABASE_HOST', '".$database_host."');
define('DATABASE_NAME', '".$database_name."');
define('DATABASE_USERNAME', '".$database_username."');
define('DATABASE_PASSWORD', '".$database_password."');
?>";
						
						$file_opened = false;
						
						if (@fwrite($f,$database_inf) > 0) {
							fclose($f);
							$file_opened = true;
						}
						
						// Add the new admin in the DB
						mysql_query("INSERT INTO admin 
									 SET 
									 username = '" . mysql_real_escape_string($admin_name) . "', 
									 password = '" . mysql_real_escape_string(md5($admin_password)) . "',
									 email = '" . mysql_real_escape_string($admin_email) . "'");
									 
						mysql_close($connection);
						
						if($file_opened) {
							$success_msg .= "<div class='alert alert-success'>Congrats! The DB has been set up and the new admin has been added.</div>";
							$success_msg .= "<div class='alert alert-danger'><strong>For security reasons, before using Awesome Maps, please remove the \"install.php\" file from your server.</strong></div>";
							$success_msg .= "<p style='color:white;text-align:center;'>Once this is done, please <a href='login.php'>click here</a> to log in and to use \"Awesome Maps\" for the first time :-) !</p>";
						} else {
							$success_msg .= "<div class='alert alert-success'>Congrats! The DB has been set up and the new admin has been added...</div><br /><p style='color:white;text-align:center;'>However we couldn't open the <strong>includes/db.php</strong> file. To enjoy \"Awesome Maps\", you need to copy and paste the following code in the file \"includes/db.php\" : </p>";
							$success_msg .= "<br /><textarea class='form-control' rows='8'>" . $database_inf . "</textarea></p><br />";
							$success_msg .= "<div class='alert alert-danger'><strong>For security reasons, before using Awesome Maps, please remove the \"install.php\" file from your server.</strong></div>";
							$success_msg .= "<p style='color:white;text-align:center;'>Once this is done, please <a href='login.php'>click here</a> to log in and to use \"Awesome Maps\" for the first time :-) !</p>";
						}
						
					} else {
						$error_msg .= "Woops... We could not connect to your database. Please verify and correct your DB informations.";
					}
				}
			}
			
		}
		?>
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
			<?php
			if($success_msg != "") {
			?>
				<?php echo $success_msg; ?>
			<?php	
			} else {
			?>
			<div class="well">
				<form method="POST" action="" class="install">
					<fieldset>
						<legend>Database Informations</legend>
						<div class="alert alert-info">
							In this part, we will set up the database. Just copy and paste your DB infos in the form below.
						</div>
						<div class="form-group">
							<label for="host_db">Hostname</label>
							<input value="<?php echo $database_host ?>" type="text" class="form-control" name="host_db" id="host_db" placeholder="Your DB hostname (localhost or something else)">
						</div>
						<div class="form-group">
							<label for="username_db">Username</label>
							<input value="<?php echo $database_username ?>" type="text" class="form-control" id="username_db" name="username_db" placeholder="Your DB username">
						</div>
						<div class="form-group">
							<label for="password_db">Password</label>
							<input value="<?php echo $database_password ?>" type="password" class="form-control" id="password_db" name="password_db" placeholder="Your DB password">
						</div>
						<div class="form-group">
							<label for="name_db">Database Name</label>
							<input value="<?php echo $database_name ?>" type="text" class="form-control" id="name_db" name="name_db" placeholder="Your DB name">
						</div>
					</fieldset>
					<fieldset>
						<legend>Admin Informations</legend>
						<div class="form-group">
							<label for="admin_username">Username</label>
							<input value="<?php echo $admin_name ?>" type="text" class="form-control" name="admin_username" id="admin_username" placeholder="Your admin username">
						</div>
						<div class="form-group">
							<label for="admin_password">Password</label>
							<input value="<?php echo $admin_password ?>" type="password" class="form-control" name="admin_password" id="admin_password" placeholder="Your admin password">
						</div>
						<div class="form-group">
							<label for="admin_password_2">Confirm your Password</label>
							<input value="<?php echo $admin_password_2 ?>" type="password" class="form-control" name="admin_password_2" id="admin_password_2" placeholder="Enter your password again">
						</div>
						<div class="form-group">
							<label for="admin_email">Email</label>
							<input value="<?php echo $admin_email ?>" type="email" class="form-control" name="admin_email" id="admin_email" placeholder="Enter your email address">
						</div>
						<div class="alert alert-warning">
							Be sure that the file <strong>"incudes/db.php"</strong> has the writing access (chmod 666).
						</div>
						<hr />
						<div style="text-align:center;">
							<input name="submit" type="submit" value="Launch the Install Process &rarr;" class="btn btn-primary" />
						</div>
					</fieldset>
				</form>
			</div>
			<?php
			}
			?>
		</div>
		
	</body>
</html>
