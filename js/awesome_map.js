//<![CDATA[

$(document).ready(function() {
    // Street View Service
    var sv_service = new google.maps.StreetViewService();

	// Create the MAP
	var map = new google.maps.Map(document.getElementById("awm_map"), {
		center: new google.maps.LatLng(40.713, -74.0005),
		zoom: 13,
		mapTypeId: 'roadmap'
	});
	
	var theme_array  = { 
    	"snazzy" :  [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#333739"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2ecc71"}]},{"featureType":"poi","stylers":[{"color":"#2ecc71"},{"lightness":-7}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-28}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"visibility":"on"},{"lightness":-15}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-18}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-34}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#333739"},{"weight":0.8}]},{"featureType":"poi.park","stylers":[{"color":"#2ecc71"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#333739"},{"weight":0.3},{"lightness":10}]}],
		"pale" : [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}],
		"bright" : [{"featureType":"water","stylers":[{"color":"#19a0d8"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":6}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e85113"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-40}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-20}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"road.highway","elementType":"labels.icon"},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"lightness":20},{"color":"#efe9e4"}]},{"featureType":"landscape.man_made","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"hue":"#11ff00"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"hue":"#4cff00"},{"saturation":58}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#f0e4d3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-10}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"}]}],
		"neutral" : [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]}],
		"blue"	: [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}],
		"subtle"	 : [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
	};
	
	var lastid;
	
	// Save the list of markers
	var markers = [];
	var markerCluster;
	
	var marker_array = [];
    
    var geocoder = new google.maps.Geocoder();
    
    var infoBox = new InfoBox({
         disableAutoPan: false,
         boxStyle: {
            background: "#FFF",
            opacity: 1,
            border: "1px solid #959595"
        },
        pane: "floatPane",
        closeBoxMargin: "6px 6px 0px 0px",
        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
        infoBoxClearance: new google.maps.Size(1, 1)
    });
    
	var streetview = document.createElement("div");
	streetview.className = "streetview";
	
	
	google.maps.event.addListener(infoBox,'domready',function() {
		
					
		// Delete a marker
		$(".admin_delete").click( function(e) {
			e.preventDefault();
			
			var marker_id = $(this).attr("data-id");
			
			var markerToDelete = getAwmMarkerByUniqueId(marker_id);
									
			var r = confirm("Are you sure that you want to delete this marker ?");
			if (r == true) {
			
				// Remove from the array
				var markerindex = $.inArray(markerToDelete, markers);
				if(markerindex != -1)
				{
					markers.splice(markerindex, 1);
				}	
			
				// Remove from the map
				markerToDelete.getAwmMarker().setMap(null);
				infoBox.setMap(null);
			}
		});
	});
			
	// Retrieve the markers from the database
	$.ajax({
	    url: adm_path + "/ajax/get_markers.php",
	    type: "POST",
	    success: function(data) {
			
			// Get markers infos
	    	if(typeof data.markers != 'undefined' && data.markers.length > 0) {			    	
	    					    	
			    $.each(data.markers, function(i, marker) {					    							
			    	var point = new google.maps.LatLng(marker.lat,marker.lng);
			    	
			    	// Get the formatted address of the marker					 
					var html = document.createElement("div");
					html.className = "contentbox";
					
					var htmlinner = document.createElement("div");
					htmlinner.className = "contentbox_inner";
					
					var title = document.createElement("div");
					title.className = "awm_title";
					title.innerHTML = marker.name;
					
					var descnode = document.createElement("div");
					descnode.className = "awm_desc";
					descnode.innerHTML = marker.desc;
					
					var addressnode = document.createElement("div");
					
					addressnode.className = "awm_address";
					addressnode.innerHTML = "<i class='fa fa-location-arrow'></i> " + marker.address;
					
					htmlinner.appendChild(title);
					htmlinner.appendChild(descnode);
					htmlinner.appendChild(addressnode);
					
					html.appendChild(htmlinner);
					
					var streetview = "";
					
					if(marker.preview == "true" || marker.oi_preview == "true") {
						streetview = document.createElement("div");
						streetview.className = "streetview";
						streetview.innerHTML = marker.sv_url;
						
						html.appendChild(streetview);
					}
					 
					// Create the new marker
					var marker = new AwmMarker(map, point, marker.content, marker.name, marker.desc, marker.address, marker.icon, marker.icon_color, marker.marker, marker.preview, marker.sv_url, marker.oi_preview, false);
					markers.push(marker);
																			
					var newMarker = marker.getAwmMarker();
					
					// Add Click Event for the marker
					bindinfoBox(newMarker, map, infoBox, "<div class='contentbox'>"+html.innerHTML+"</div>");
			    });
			    
			    			    
		    	// Get map infos
		    	if(data.map.lat != null && data.map.lng != null) {
		    		var center = new google.maps.LatLng(data.map.lat,data.map.lng);
		    	
			    	map.setCenter(center);
			    	map.setZoom(parseInt(data.map.zoom));
			    				    	
			    	var cluster_status = data.map.cluster;
			    	var search_status = data.map.search;
			    	
			    	var theme = data.map.theme;
		
					map.set("styles", theme_array[theme]);
			    				    	
			    	if(search_status == 1) {
			    		$(".check_search_bar").attr("checked", "checked");
			    		
			    		// Add the search box
			    		$(".awm_search").show();
			    	} else {
				    	$(".awm_search").hide();
			    	}
			    					    					    	
			    	if(cluster_status == 1) {
				    	$(".check_cluster").attr("checked", "checked");
				    	
					    // Cluster the markers
					    clusterMarkers(markers);
			    	}
		    	}
		    }
	    }
	});
	
	// Autocomplete place
	$("#location").keypress(function(e) {
		if (e.which == 13) {
			e.preventDefault();
		}
	});
	
	var input_places = document.getElementById('location');
	
	var autocomplete = new google.maps.places.Autocomplete(input_places);
	autocomplete.bindTo('bounds', map);

	google.maps.event.addListener(autocomplete, 'place_changed', function() {
									
		var place = autocomplete.getPlace();
						
		if (!place.geometry) {
			return;
		}
	
		// If the place has a geometry, then present it on a map.
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);  // Why 17? Because it looks good.
		}
										
	});
	
	function clusterMarkers(markers)
	{
		var markersToCluster = [];
		
		$.each(markers, function(i, marker) {
			markersToCluster.push(marker.awm_marker);
		});
		
		markerCluster = new MarkerClusterer(map, markersToCluster)
	}
	
	// Convert the markers Array for the DB
	function convertAwmMarkersForDB(markers)
	{
		var db_markers = [];
		
		$.each(markers, function(i, marker) {
			var tmp_marker = marker.getAwmMarker();
		
			var marker_values = {
				name : tmp_marker.awm_title,
				desc : tmp_marker.awm_desc,
				lat	: tmp_marker.position.lat(),
				lng : tmp_marker.position.lng(),
				address : tmp_marker.awm_address,
				content : tmp_marker.labelContent,
				icon : tmp_marker.awm_icon,
				icon_color : tmp_marker.awm_icon_color,
				marker : tmp_marker.awm_marker,
				preview : tmp_marker.sv_preview,
				sv_url : tmp_marker.sv_url,
				unique_id : tmp_marker.marker_id
			};
			
			db_markers.push(marker_values);
		});
		
		return db_markers;
	}
	
	// Find a marker by its unique id
	function getAwmMarkerByUniqueId(unique_id)
	{
		var markerFound;
		
		$.each(markers, function(i, currMarker) {
			if(currMarker.getAwmMarker().marker_id == unique_id) {
				markerFound = currMarker;
			}
		});
		
		return markerFound;
	}
				
	// Click Listener (to add a new place)
	function bindinfoBox(marker, map, infoBox, html) {
		google.maps.event.addListener(marker, 'click', function() {	
		
			lastmarker = marker;	
			
			infoBox.setContent(html);
								
			infoBox.open(map, marker);
		});
	}
    
    function entityForSymbolInContainer(selector) {
	    var code = $(selector).text().charCodeAt(0);
	    var codeHex = code.toString(16).toUpperCase();
	    while (codeHex.length < 4) {
	        codeHex = "0" + codeHex;
	    }
	
	    return "&#x" + codeHex + ";";
	}
	
	function doNothing() {}
});

//]]>