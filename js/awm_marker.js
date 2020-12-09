function AwmMarker(map, position, content, title, desc, address, icon, color, marker, preview, url, oi_preview, draggable)
{
	draggable = typeof draggable !== 'undefined' ? draggable : true;
	this.unique_id = makeid();
	
	var options = {
		position: position,
		draggable: draggable,
		icon : adm_path + "img/fakeMarker.png",
		map: map,
		labelContent: content,
		labelAnchor: new google.maps.Point(18, 48),
		labelClass: "labels", // the CSS class for the label
		labelStyle: {opacity: 1.0},
		labelInBackground: true,
		awm_title : title,
		awm_desc : desc,
		awm_address : address,
		awm_icon : icon,
		awm_icon_color : color,
		awm_marker : marker,
		sv_preview: preview,
		sv_url : url,
		oi_preview: oi_preview,
		marker_id : this.unique_id
	}

	// Create the new marker
	this.awm_marker = new MarkerWithLabel(options);
	
	this.getAwmMarker = function getAwmMarker() {
		return this.awm_marker;
	}
}

function printArray()
{
	console.log(this.markers_array);
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}