//<![CDATA[

$(document).ready(function() {

	// Change the select to show Font-Awesome icons in all browsers
	$('.mapaw_icon').selectpicker();
		    
    // Street View Service
    var sv_service = new google.maps.StreetViewService();
    
    var theme_array  = { 
    	"snazzy" :  [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#333739"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2ecc71"}]},{"featureType":"poi","stylers":[{"color":"#2ecc71"},{"lightness":-7}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-28}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"visibility":"on"},{"lightness":-15}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-18}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-34}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#333739"},{"weight":0.8}]},{"featureType":"poi.park","stylers":[{"color":"#2ecc71"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#333739"},{"weight":0.3},{"lightness":10}]}],
		"pale" : [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}],
		"bright" : [{"featureType":"water","stylers":[{"color":"#19a0d8"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":6}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e85113"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-40}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-20}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"road.highway","elementType":"labels.icon"},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"lightness":20},{"color":"#efe9e4"}]},{"featureType":"landscape.man_made","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"hue":"#11ff00"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"hue":"#4cff00"},{"saturation":58}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#f0e4d3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-10}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"}]}],
		"neutral" : [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]}],
		"blue"	: [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}],
		"subtle"	 : [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
	};

	// Create the MAP
	var map = new google.maps.Map(document.getElementById("awm_map"), {
		center: new google.maps.LatLng(40.713, -74.0005),
		zoom: 13,
		mapTypeId: 'roadmap'
	});
	
	// Create the main marker
	var mainmarker = new google.maps.Marker({
		map: map,
		draggable:true,
		position: new google.maps.LatLng(40.713, -74.0005)
	});
	
	var lastmarker;
	
	var lastid;
	
	// Save the list of markers
	var markers = [];
	var markerCluster;
	
	var marker_array = [];
	
	// Create the infoBox			
	var maininfoBox = new InfoBox({
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

	// TinyMCE Textarea
	$('textarea.mapaw_desc').tinymce({
		script_url : "js/tinymce/tinymce.min.js",
		menubar: false,
		plugins: ['link'],
		toolbar: 'bold italic underline | link | hr | alignleft aligncenter alignright | blockquote bullist numlist outdent indent | code',
	});	
	
	// TinyMCE Modal Fix
	$(document).on('focusin', function(e) {
	    if ($(e.target).closest(".mce-window").length) {
	        e.stopImmediatePropagation();
	    }
	});
	
	// Reset Modal on Close
	$('#pin_creator').on('hidden.bs.modal', function () {
		$(".mapaw_part1").show();
		$(".mapaw_part2").hide();
		
		$(".icon-preview .pin_marker").empty();
		
		$(".mapaw_name").val("");
		$(".mapaw_desc").val("");
		
		$(".sv_preview").attr('checked', false);
		$(".oi_preview").attr('checked', false);
		
		$(".oi_well").hide();
		$(".oi_preview_up").empty();
		$(".oi_preview_up").hide();
		$(".oi_image").val("");
		
		if($("#pin_creator").hasClass("pin_editor")) {
			$("#pin_creator").removeClass("pin_editor");
		}
		
		$(".mapaw_submit").html("Go to Step 2 &rarr;");
		
		$(".modal_address").empty();
		
	});
	
	// Select a marker
	$(document).on("click", ".marker-preview img", function() {
		$(".marker-preview").find("img").removeClass("selected");
		
		$(this).addClass("selected");
		
		var pinimg = $(this).attr("src");
						
		$(".pin_marker.preview").css("background-image", "url('" + pinimg + "')");
	});
	
	// Check the cluster checkbox
	$(document).on("change", ".check_cluster", function() {
		if($(this).is(":checked")) {
			clusterMarkers(markers);
		} else {
			markerCluster.setMap();
		}
	});
	
	// Checkbox Preview 
	$(document).on("change", "input.sv_preview", function() {
		if($(this).is(":checked")) {
			$("input.oi_preview").prop("checked", false);
			$(".oi_well").fadeOut();
		}
	});
	
	$(document).on("change", "input.oi_preview", function() {
		if($(this).is(":checked")) {
			$("input.sv_preview").prop("checked", false);
			$(".oi_well").fadeIn();
		} else {
			$(".oi_well").fadeOut();
		}
	});
	
	// Checbox themes
	$(document).on("change", ".btn-theme input", function() {
		$(".btn-theme label").removeClass("active");
		$(".btn-theme input").attr("checked", "");
		
		var theme = $(this).closest("label").attr("data-value");
		
		map.set("styles", theme_array[theme]);
		
		$(this).attr("checked", "checked");
		$(this).addClass("active");
	});
	
	// Check the search bar checkbox
	$(document).on("change", ".check_search_bar", function() {
		if($(this).is(":checked")) {
			$(".awm_search").show();
		} else {
			$(".awm_search").hide();
		}
	});
	
	$('#pin_creator').on('show.bs.modal', function () {
		$(".icon-preview .pin_marker").empty().append($("select.mapaw_icon option:selected").text());
		$(".icon-preview .pin_marker").css("color", $(".mapaw_color").val());
		
		infoBox.close();
	});
	
	// Icon preview
	$(document).on("change", "select.mapaw_icon", function() {
		$(".icon-preview .pin_marker").empty().append($(this).find("option:selected").text());
	});
	
	$(document).on("change", ".mapaw_color", function() {
		$(".icon-preview .pin_marker").css("color", $(this).val());
	});
	
	// Font Size Validator
	$(".mapaw_size").keydown(function(event) {
        // Allow only backspace and delete
    	if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39) {
    		// let it happen, don't do anything
    	}
    	else {
    		// Ensure that it is a number and stop the keypress
    		if (event.keyCode < 48 || event.keyCode > 57 ) {
    			event.preventDefault();	
    		}	
    	}
    });
    
    // Ajax Upload
    $(document).on('change', '.oi_image', function()
	{
		$(".oi_preview_up").html('');
		$(".oi_preview_up").html('<i class="fa fa-refresh fa-spin"></i>');
		$(".oi_preview_up").show();
		$("#up_form").ajaxForm(
		{
			target: '.oi_preview_up'
		}).submit();
	});
    
	// Go to Step 2 button
	$(document).on("click", ".mapaw_submit", function() {
	
		if($(".mapaw_part1").is(":visible")) {
			$(".mapaw_part1").hide();
			$(".mapaw_part2").fadeIn();
			
			if($("#pin_creator").hasClass("pin_editor")) {
				$(this).html("Edit this Pin !");
			} else {
				$(this).html("Create this Pin !");
			}
		} else {
			// If we are in the pin_editor, we remove the old marker to create the new one
			if($("#pin_creator").hasClass("pin_editor")) {
				var marker_id = $(this).attr("data-id");
				var markerToDelete = getAwmMarkerByUniqueId(marker_id);
				
				var markerindex = $.inArray(markerToDelete, markers);
				
				if(markerindex != -1)
				{
					markers.splice(markerindex, 1);
				}
				
				markerToDelete.awm_marker.setMap(null);
				infoBox.setMap(null);						
			}
		
			var name = $(".mapaw_name").val();
			var desc = $(".mapaw_desc").val();
							
			var lat = $(".mapaw_lat").val();
			var lng = $(".mapaw_lng").val();
			
			var address = $(".modal_address").html();
			
			var color = $(".mapaw_color").val();
			
			var icon = $(".mapaw_icon").find(":selected").val();
			
			if(color == "") {
				color = "000";
			}
		
			var bgImage = $(".marker-preview img.selected").attr("src");
								
			if($(".sv_preview").is(":checked")) {
				var sv_preview = "true";
			} else {
				var sv_preview = "false";
			}		
						
			if($(".oi_preview").is(":checked")) {
				var oi_preview = "true";
				var oi_image   = $(".oi_image_p");
			} else {
				var oi_preview = "false";
				var oi_image   = "";
			}		
			
			var mapaw_marker = $(".marker-preview .selected").attr("data-id");
			
			var content = "<div class='pin_marker' style='background-image:url(" + bgImage + ");'><i class='fa' style='color: #" + color + ";'>" + $("select.mapaw_icon option:selected").html(); + "</i></div>";
			var point = new google.maps.LatLng(lat,lng);
													
			// Get the formatted address of the marker					 
			var html = document.createElement("div");
			html.className = "contentbox";
			
			var htmlinner = document.createElement("div");
			htmlinner.className = "contentbox_inner";
			
			var title = document.createElement("div");
			title.className = "awm_title";
			title.innerHTML = name;
			
			var descnode = document.createElement("div");
			descnode.className = "awm_desc";
			descnode.innerHTML = desc;
			
			var addressnode = document.createElement("div");
			
			addressnode.className = "awm_address";
			addressnode.innerHTML = "<i class='fa fa-location-arrow'></i> " + address;
			
			htmlinner.appendChild(title);
			htmlinner.appendChild(descnode);
			htmlinner.appendChild(addressnode);
			
			html.appendChild(htmlinner);
			
			var svv_preview = "false";	
			var url = "";	
							
			if($(".sv_preview").is(":checked")) {
				var svlat = point.lat();
				var svlng = point.lng();
				
				svv_preview = "true";	
			
				url = "<img src='http://maps.googleapis.com/maps/api/streetview?size=500x150&location="+ svlat +"," + svlng + "&fov=100&heading=500&pitch=0&sensor=false' alt='streetview' />";
						
				streetview.innerHTML = url;
			
				html.appendChild(streetview);	
			} else if($(".oi_preview").is(":checked")) {
				svv_preview = "false";	
							
				url = "<img src='" + oi_image[0].src + "' alt='streetview' />";
						
				streetview.innerHTML = url;
			
				html.appendChild(streetview);
			}
			
			// Create the new marker
			var marker = new AwmMarker(map, point, content, name, desc, address, icon, color, mapaw_marker, svv_preview, url, oi_preview);
			markers.push(marker);
			
			var newMarker = marker.getAwmMarker();
			
			// Add Drag Event for the marker
			bindDragMarker(newMarker);
			
			// Add Click Event for the marker
			bindinfoBox(newMarker, map, infoBox, "<div data-id='" + newMarker.marker_id + "' class='pull-left admin_marker'><a data-id='" + newMarker.marker_id + "' class='admin_edit' href=''>Edit</a> | <a data-id='" + newMarker.marker_id + "' class='admin_delete' href=''>Delete</a></div><div class='contentbox'>"+html.innerHTML+"</div>");
								 					
			// Hide the modal
			$("#pin_creator").modal("hide");
		}
	});
	
	// Save the map
	$(document).on("click", ".save_this_map", function(e) {
		e.preventDefault();
		
		// Convert the markers array to something that we can save to the DB
		var db_markers = convertAwmMarkersForDB(markers);
		var that = $(this);
				
		$(this).empty().html('<i class="fa fa-refresh fa-spin"></i> Saving...');
		
		var actual_map = {
			lat : map.center.lat(),
			lng : map.center.lng(),
			zoom : map.zoom
		};
		
		var check_cluster = $(".check_cluster");
		var cluster_status = 0;
		
		if(check_cluster.is(':checked')) {
			cluster_status = 1;	
		}
		
		var check_search = $(".check_search_bar");
		var search_status = 0;
		
		if(check_search.is(':checked')) {
			search_status = 1;	
		}
		
		var theme = $(".btn-theme label.active").attr("data-value");
											
		// Save the markers
		$.ajax({
		    url: "ajax/save_markers.php",
		    type: "POST",
		    dataType: "json",
		    data: {
		        markers: db_markers,
		        map : actual_map,
		        cluster : cluster_status,
		        search : search_status,
		        theme : theme
		    },
		    complete : function(data, textStatus, jqXHR) {
				setTimeout(
					function() 
					{
						
						that.empty().html("<i class='fa fa-check'></i> Save the Map");
						$(".success-saved").fadeIn().delay(4000).fadeOut();

					}, 1000
					
				);
				
		    }
		});
						
	});
	
	// Register Custom "drag" event for the main marker
	google.maps.event.addListener(mainmarker,'drag',function(event) {
        // Hide info window when drag begins
        maininfoBox.close();
    });

	// Register Custom "dragend" Event
	google.maps.event.addListener(mainmarker, 'dragend', function(event) {
		// Get the Current position, where the pointer was dropped
		var point = mainmarker.getPosition();
						
		// Update Latitude and Longitude
		$(".mapaw_lat").val(event.latLng.lat());
		$(".mapaw_lng").val(event.latLng.lng());
		
		// Center the map at given point
		map.panTo(point);
		
		var html = "<a class='btn btn-primary btn-create-pin btn-block' href='#'>Create a pin here</a>";
		
		maininfoBox.setContent("<div class='contentbox'><div class='contentbox_inner'>"+html+"<div class='mainmarker awm_address'><i class='fa fa-location-arrow'></i> </div></div></div>");
		
						
		geocoder.geocode({"latLng":point},function(data,status) {
		
			if(status == google.maps.GeocoderStatus.OK) {
				
				$(".mainmarker.awm_address").append(data[1].formatted_address);
			}
		});
		
		// Show the infoBox to create a new pin
		maininfoBox.open(map, mainmarker);
	});
						
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
		
		// Edit a marker
		$(".admin_edit").click( function(e) {
			e.preventDefault();
			
			var marker_id = $(this).attr("data-id");
			
			var markerToEdit 	= getAwmMarkerByUniqueId(marker_id);
			var markerindex 	= $.inArray(markerToEdit, markers);
			
			if(markerindex != -1)
			{
				markerToEdit = markers[markerindex].awm_marker;
				
				$("#pin_creator").addClass("pin_editor");
				$(".mapaw_submit").attr("data-id", marker_id);
														
				// Add the informations to the modal box
				$(".mapaw_lng").val(markerToEdit.getPosition().lng());
				$(".mapaw_lat").val(markerToEdit.getPosition().lat());
						
				$(".modal_address").html(markerToEdit.awm_address);
				
				$(".mapaw_name").val(markerToEdit.awm_title);
				$(".mapaw_desc").val(markerToEdit.awm_desc);
														
				if(markerToEdit.sv_preview == "true") {
					$(".sv_preview").prop("checked", true);
				}
				
				
				if(markerToEdit.oi_preview == "true") {
					$(".oi_preview").prop("checked", true);
					$(".oi_preview_up").html(markerToEdit.sv_url);
					$(".oi_preview_up img").addClass("oi_image_p preview img-responsive col-md-12");
					$(".oi_well").fadeIn();
					$(".oi_preview_up").fadeIn();
				}
									
				$("select.mapaw_icon").selectpicker("val", markerToEdit.awm_icon);
								
				$(".marker-preview img").removeClass("selected");
				$(".marker-preview img[data-id=" + markerToEdit.awm_marker + "]").addClass("selected");				
				
				document.getElementById('mapaw_color').color.fromString(markerToEdit.awm_icon_color);
										
				$(".icon-preview .pin_marker.preview").attr("style", "background-image : url(" + $(".marker-preview img.selected").attr("src") + ")");
				$(".icon-preview .pin_marker.preview").css("color", markerToEdit.awm_icon_color);
				$(".icon-preview .pin_marker.preview").empty().html(markerToEdit.awm_icon);
									
				$("#pin_creator").modal("show");
			} else {
				alert("Woops. A little error occured. Please refresh the page.");
			}
								
		});
	});
	
	google.maps.event.addListener(maininfoBox,'domready',function(){
				
		// Create a new pin
    	$(".btn-create-pin").click( function(e) {
	    	e.preventDefault();
	    	
	    	// Get the formatted address of the marker					 
			geocoder.geocode({"latLng":mainmarker.getPosition()},function(data,status) {
				if(status == google.maps.GeocoderStatus.OK) {
				 	
					$(".modal_address").append(data[1].formatted_address);
				}
			});
			
			$("#pin_creator").modal("show");

    	});
		
	}); 
	
	// Retrieve the markers from the database
	$.ajax({
	    url: "ajax/get_markers.php",
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
					var marker = new AwmMarker(map, point, marker.content, marker.name, marker.desc, marker.address, marker.icon, marker.icon_color, marker.marker, marker.preview, marker.sv_url, marker.oi_preview);
					markers.push(marker);
																			
					var newMarker = marker.getAwmMarker();
												
					// Add Drag Event for the marker
					bindDragMarker(newMarker);
					
					// Add Click Event for the marker
					bindinfoBox(newMarker, map, infoBox, "<div class='pull-left admin_marker'><a data-id='" + newMarker.marker_id + "' class='admin_edit' href=''>Edit</a> | <a data-id='" + newMarker.marker_id + "' class='admin_delete' href=''>Delete</a></div><div class='contentbox'>"+html.innerHTML+"</div>");
			    });
			    
			    			    
		    	// Get map infos
		    	if(data.map.lat != null && data.map.lng != null) {
		    		var center = new google.maps.LatLng(data.map.lat,data.map.lng);
		    	
			    	map.setCenter(center);
			    	map.setZoom(parseInt(data.map.zoom));
			    	
			    	mainmarker.setPosition(center);
			    	
			    	var cluster_status = data.map.cluster;
			    	var search_status = data.map.search;
			    	
			    	var theme = data.map.theme;
		
					map.set("styles", theme_array[theme]);
					
					$(".btn-theme label input").attr("checked", "");
					$(".btn-theme label[data-value=" + theme + "] input").attr("checked", "checked");
					$(".btn-theme label").removeClass("active");
					$(".btn-theme label[data-value=" + theme + "]").addClass("active");
			    				    	
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
							
		mainmarker.setVisible(false);
		
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
		
		mainmarker.setPosition(place.geometry.location);
		mainmarker.setVisible(true);
										
		// Update Latitude and Longitude
		$(".mapaw_lat").val(mainmarker.getPosition().lat());
		$(".mapaw_lng").val(mainmarker.getPosition().lng());
		
		geocoder.geocode({"latLng":mainmarker.getPosition()},function(data,status) {
			if(status == google.maps.GeocoderStatus.OK) {
				var html = "<a class='btn btn-primary btn-create-pin btn-block' href='#'>Create a pin here</a>";				
				
				html += "<div class='awm_address'><i class='fa fa-location-arrow'></i> " + data[1].formatted_address + "</div>";
				
				// Show the infoBox to create a new pin
				maininfoBox.setContent("<div class='contentbox'><div class='contentbox_inner'>"+html+"</div></div>");
				maininfoBox.open(map, mainmarker);
			}
		});
		
	
		var address = '';
		if (place.address_components) {
			address = [
			(place.address_components[0] && place.address_components[0].short_name || ''),
			(place.address_components[1] && place.address_components[1].short_name || ''),
			(place.address_components[2] && place.address_components[2].short_name || '')
			].join(' ');
		}
	});
	
	function bindDragMarker(marker) {
		// Register drag event for the added markers
		google.maps.event.addListener(marker,'dragend',function(event) {
			
			var marker_tmp_url = marker.sv_url;	
			marker.sv_url = "http://maps.googleapis.com/maps/api/streetview?size=500x150&location="+ marker.getPosition().lat() +"," + marker.getPosition().lng() + "&fov=100&heading=500&pitch=0&sensor=false";
		
			// Get the formatted address of the marker					 
			geocoder.geocode({"latLng":marker.getPosition()},function(data,status) {
				if(status == google.maps.GeocoderStatus.OK) {
										 	
					marker.awm_address = data[1].formatted_address;
										
					if(marker.sv_preview == "true")
					{
						var streetview_state = "<div class='streetview'><img src='" + marker.sv_url + "' alt='streetview' /></div>";
						marker.sv_url = "<img src='" + marker.sv_url + "' alt='' />";
						
						marker.sv_preview = "true";
					}
					else if(marker.oi_preview == "true")
					{
						var streetview_state = "<div class='streetview'>" + marker_tmp_url + "</div>";
						marker.sv_url = marker_tmp_url;
						
						marker.oi_preview = "true";
					}
					else
						var streetview_state = "";
																						
					// Update the marker's position							
					$.each(markers, function(i, marker) {
						if(marker.awm_marker.marker_id == marker.marker_id)
						{
							marker.awm_marker.position.d = marker.getPosition().lat();
							marker.awm_marker.position.e = marker.getPosition().lng();
						}
					});
					
					infoBox.setContent("<div class='pull-left admin_marker'><a data-id='" + marker.marker_id + "' class='admin_edit' href=''>Edit</a> | <a data-id='" + marker.marker_id + "' class='admin_delete' href=''>Delete</a></div><div class='contentbox'><div class='contentbox_inner'><div class='awm_title'>" + marker.awm_title + "</div><div class='awm_desc'>" + marker.awm_desc + "</div><div class='awm_address'><i class='fa fa-location-arrow'></i> " + marker.awm_address + "</div></div>" + streetview_state + "</div>");
					infoBox.open(map, marker);
					
					// Update click event
					bindinfoBox(marker, map, infoBox, infoBox.getContent());
				}
			});
		});
		
		// Register Custom "drag" event for the markers
		google.maps.event.addListener(marker,'drag',function(event) {
			// Hide info window when drag begins
			infoBox.close();
		});
	}
	
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
				oi_preview : tmp_marker.oi_preview,
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