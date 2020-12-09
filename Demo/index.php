<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
		
		<title>Awesome Map</title>
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        
        <link href='http://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Actor' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Duru+Sans' rel='stylesheet' type='text/css'>
        <link href="awesome_map/css/bootstrap.min.css" rel="stylesheet">
		<link href="awesome_map/css/font-awesome.min.css" rel="stylesheet">
		<link href="awesome_map/css/styles.css" rel="stylesheet">
		<link href="awesome_map/css/awesome_map.css" rel="stylesheet">
		
		<script src="awesome_map/js/jquery-1.10.2.min.js" type="text/javascript"></script>
		<script type="text/javascript">
        	var adm_path = "awesome_map/";
        </script>
		<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places" type="text/javascript"></script>
		<script src="awesome_map/js/infobox.js" type="text/javascript"></script>
		<script src="awesome_map/js/markerwithlabel.js" type="text/javascript"></script>
		<script src="awesome_map/js/awm_marker.js" type="text/javascript"></script>
		<script src="awesome_map/js/markerclusterer.js" type="text/javascript"></script>
		<script src="awesome_map/js/awesome_map.js" type="text/javascript"></script>
  	</head>

	<body>
		<div class="container demo">
			<div class="title">
				Awesome Map
			</div>
			<div class="alert alert-info">
				Here is just a simple example of what you can make with <strong>Awesome Map</strong>...<br />But don't just stay on this page : all the awesomeness happens on the admin page, where you can customize the map, the markers, the search bar...
				<hr style="border-color:#DADADA;">
				<div style="text-align:center">
					<a class="btn btn-primary" href="awesome_map/admin.php">Try the Awesome Map Admin</a>
				</div>
			</div>
			<form class="awm_search">
				<input type="text" class="form-control" id="location" placeholder="Enter the location where you want to go.">
			</form>
			<div id="awm_map" class="col-md-12 map"></div>
			<hr />
			<div class="features">
				<h3 class="feature_title"><i class="fa fa-map-marker"></i> Pin Creator</h3>
				<p>
					With our great Pin Creator, you can entirely customize your markers / pins. Choose the icon, the marker style, the color... And it's dramatically easy to use!
					<br /><br />
					<div style="text-align:center">
						<img src="screenshots/capt11.png" alt="" />
					</div>
				</p>				
				<hr />
				<h3 class="feature_title"><i class="fa fa-plus"></i> 369 icons for your markers</h3>
				<p>
					Choose between 369 cutomizable icons for your markers thanks to the great <a target="_blank" style="color:white;" href="http://fortawesome.github.io/Font-Awesome/icons/">Font-Awesome</a> library.
				</p>
				<br />
				<p>
					<img src="screenshots/capt14.png" alt="" />
				</p>
				<hr />
				<h3 class="feature_title"><i class="fa fa-eye"></i> 7 Custom Map Themes</h3>
				<p>
					Choose between 7 different map themes.
				</p>
				<div class="list_map_themes">
					<div class="row">
						<img class="img-responsive col-md-3" src="screenshots/capt1.png" /> 
						<img class="img-responsive col-md-3" src="screenshots/capt2.png" />
						<img class="img-responsive col-md-3" src="screenshots/capt3.png" /> 
						<img class="img-responsive col-md-3" src="screenshots/capt4.png" /> 
					</div>
					<br />
					<div class="row"> 
						<img class="img-responsive col-md-3" src="screenshots/capt5.png" /> 
						<img class="img-responsive col-md-3" src="screenshots/capt6.png" /> 
						<img class="img-responsive col-md-3" src="screenshots/capt7.png" /> 
					</div>
				</div>
				<hr />
				<h3 class="feature_title"><i class="fa fa-info-circle"></i> Custom infobox</h3>
				<p>
					The infobox which appears on the markers is highly customizable too.
				</p>
				<hr style="border-style: dashed;width:200px;" />
				<h4><i class="fa fa-check-circle-o"></i> Streetview integration</h4>
				<p>
					Check the streetview integration option in the Pin Creator and a streetview preview image will appear in the marker's infobox.
				</p>
				<p style="text-align:center;">
					<img alt="" src="screenshots/capt12.png" />
				</p>
				<hr style="border-style: dashed;width:200px;" />
				<h4><i class="fa fa-check-circle-o"></i> TinyMCE integration</h4>
				<p>
					The TinyMCE editor is integrated in this item. You can write and style your infobox thanks to this great jQuery plugin.
				</p>
				<p style="text-align:center;">
					<img alt="" src="screenshots/capt13.png" />
				</p>
				<hr style="border-style: dashed;width:200px;" />
				<h4><i class="fa fa-check-circle-o"></i> Drag & Drop automation</h4>
				<p>
					Once you have created your markers with the awesome "Pin Creator", you can just drag & drop them to the place you want : the informations (address, streetview preview) will be automatically updated.
				</p>
				<p style="text-align:center;font-size:100px;color:white;">
					<i class="fa fa-arrows"></i>
				</p>
				<hr />
				<h3 class="feature_title"><i class="fa fa-crosshairs"></i> Marker Clusterer</h3>
				<p>
					Enable / Disable the Marker Clusterer feature in the Awesome Map Admin.<br />
					Marker Clusterer shows a clickable icon (<img src="awesome_map/img/markerclusterer/m1.png" alt="" />) when there are a lot of markers in one location.
				</p>
				<hr />
				<div class="alert alert-info">
					Discover all of the other features in the admin part of Awesome Map !
					<hr style="border-color:#DADADA;">
					<div style="text-align:center">
						<a class="btn btn-primary" href="awesome_map/admin.php">Try the Awesome Map Admin</a>
					</div>
				</div>
			</div>
		</div>		
	</body>
</html>
