function MarkerLabel_(a) {
    this.marker_ = a;
    this.labelDiv_ = document.createElement("div");
    this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;";
    this.eventDiv_ = document.createElement("div");
    this.eventDiv_.style.cssText = this.labelDiv_.style.cssText
}
MarkerLabel_.prototype = new google.maps.OverlayView();
MarkerLabel_.prototype.onAdd = function () {
    var c = this;
    var h = false;
    var f = false;
    var j;
    var b;
    var d, cLngOffset;
    var i;
    var g = function (e) {
        if (e.preventDefault) {
            e.preventDefault()
        }
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation()
        }
    };
    this.getPanes().overlayImage.appendChild(this.labelDiv_);
    this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_);
    this.listeners_ = [google.maps.event.addDomListener(document, "mouseup", function (a) {
        if (f) {
            a.latLng = j;
            i = true;
            google.maps.event.trigger(c.marker_, "dragend", a)
        }
        h = false;
        google.maps.event.trigger(c.marker_, "mouseup", a)
    }), google.maps.event.addListener(c.marker_.getMap(), "mousemove", function (a) {
        if (h && c.marker_.getDraggable()) {
            a.latLng = new google.maps.LatLng(a.latLng.lat() - d, a.latLng.lng() - cLngOffset);
            j = a.latLng;
            if (f) {
                google.maps.event.trigger(c.marker_, "drag", a)
            } else {
                d = a.latLng.lat() - c.marker_.getPosition().lat();
                cLngOffset = a.latLng.lng() - c.marker_.getPosition().lng();
                google.maps.event.trigger(c.marker_, "dragstart", a)
            }
        }
    }), google.maps.event.addDomListener(this.eventDiv_, "mouseover", function (e) {
        c.eventDiv_.style.cursor = "pointer";
        google.maps.event.trigger(c.marker_, "mouseover", e)
    }), google.maps.event.addDomListener(this.eventDiv_, "mouseout", function (e) {
        c.eventDiv_.style.cursor = c.marker_.getCursor();
        google.maps.event.trigger(c.marker_, "mouseout", e)
    }), google.maps.event.addDomListener(this.eventDiv_, "click", function (e) {
        if (i) {
            i = false
        } else {
            g(e);
            google.maps.event.trigger(c.marker_, "click", e)
        }
    }), google.maps.event.addDomListener(this.eventDiv_, "dblclick", function (e) {
        g(e);
        google.maps.event.trigger(c.marker_, "dblclick", e)
    }), google.maps.event.addDomListener(this.eventDiv_, "mousedown", function (e) {
        h = true;
        f = false;
        d = 0;
        cLngOffset = 0;
        g(e);
        google.maps.event.trigger(c.marker_, "mousedown", e)
    }), google.maps.event.addListener(this.marker_, "dragstart", function (a) {
        f = true;
        b = c.marker_.getZIndex()
    }), google.maps.event.addListener(this.marker_, "drag", function (a) {
        c.marker_.setPosition(a.latLng);
        c.marker_.setZIndex(1000000)
    }), google.maps.event.addListener(this.marker_, "dragend", function (a) {
        f = false;
        c.marker_.setZIndex(b)
    }), google.maps.event.addListener(this.marker_, "position_changed", function () {
        c.setPosition()
    }), google.maps.event.addListener(this.marker_, "zindex_changed", function () {
        c.setZIndex()
    }), google.maps.event.addListener(this.marker_, "visible_changed", function () {
        c.setVisible()
    }), google.maps.event.addListener(this.marker_, "labelvisible_changed", function () {
        c.setVisible()
    }), google.maps.event.addListener(this.marker_, "title_changed", function () {
        c.setTitle()
    }), google.maps.event.addListener(this.marker_, "labelcontent_changed", function () {
        c.setContent()
    }), google.maps.event.addListener(this.marker_, "labelanchor_changed", function () {
        c.setAnchor()
    }), google.maps.event.addListener(this.marker_, "labelclass_changed", function () {
        c.setStyles()
    }), google.maps.event.addListener(this.marker_, "labelstyle_changed", function () {
        c.setStyles()
    })]
};
MarkerLabel_.prototype.onRemove = function () {
    var i;
    this.labelDiv_.parentNode.removeChild(this.labelDiv_);
    this.eventDiv_.parentNode.removeChild(this.eventDiv_);
    for (i = 0; i < this.listeners_.length; i++) {
        google.maps.event.removeListener(this.listeners_[i])
    }
};
MarkerLabel_.prototype.draw = function () {
    this.setContent();
    this.setTitle();
    this.setStyles()
};
MarkerLabel_.prototype.setContent = function () {
    var a = this.marker_.get("labelContent");
    if (typeof a.nodeType === "undefined") {
        this.labelDiv_.innerHTML = a;
        this.eventDiv_.innerHTML = this.labelDiv_.innerHTML
    } else {
        this.labelDiv_.appendChild(a);
        a = a.cloneNode(true);
        this.eventDiv_.appendChild(a)
    }
};
MarkerLabel_.prototype.setTitle = function () {
    this.eventDiv_.title = this.marker_.getTitle() || ""
};
MarkerLabel_.prototype.setStyles = function () {
    var i, labelStyle;
    this.labelDiv_.className = this.marker_.get("labelClass");
    this.eventDiv_.className = this.labelDiv_.className;
    this.labelDiv_.style.cssText = "";
    this.eventDiv_.style.cssText = "";
    labelStyle = this.marker_.get("labelStyle");
    for (i in labelStyle) {
        if (labelStyle.hasOwnProperty(i)) {
            this.labelDiv_.style[i] = labelStyle[i];
            this.eventDiv_.style[i] = labelStyle[i]
        }
    }
    this.setMandatoryStyles()
};
MarkerLabel_.prototype.setMandatoryStyles = function () {
    this.labelDiv_.style.position = "absolute";
    this.labelDiv_.style.overflow = "hidden";
    if (typeof this.labelDiv_.style.opacity !== "undefined") {
        this.labelDiv_.style.filter = "alpha(opacity=" + (this.labelDiv_.style.opacity * 100) + ")"
    }
    this.eventDiv_.style.position = this.labelDiv_.style.position;
    this.eventDiv_.style.overflow = this.labelDiv_.style.overflow;
    this.eventDiv_.style.opacity = 0.01;
    this.eventDiv_.style.filter = "alpha(opacity=1)";
    this.setAnchor();
    this.setPosition();
    this.setVisible()
};
MarkerLabel_.prototype.setAnchor = function () {
    var a = this.marker_.get("labelAnchor");
    this.labelDiv_.style.marginLeft = -a.x + "px";
    this.labelDiv_.style.marginTop = -a.y + "px";
    this.eventDiv_.style.marginLeft = -a.x + "px";
    this.eventDiv_.style.marginTop = -a.y + "px"
};
MarkerLabel_.prototype.setPosition = function () {
    var a = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
    this.labelDiv_.style.left = a.x + "px";
    this.labelDiv_.style.top = a.y + "px";
    this.eventDiv_.style.left = this.labelDiv_.style.left;
    this.eventDiv_.style.top = this.labelDiv_.style.top;
    this.setZIndex()
};
MarkerLabel_.prototype.setZIndex = function () {
    var a = (this.marker_.get("labelInBackground") ? -1 : +1);
    if (typeof this.marker_.getZIndex() === "undefined") {
        this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + a;
        this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex
    } else {
        this.labelDiv_.style.zIndex = this.marker_.getZIndex() + a;
        this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex
    }
};
MarkerLabel_.prototype.setVisible = function () {
    if (this.marker_.get("labelVisible")) {
        this.labelDiv_.style.display = this.marker_.getVisible() ? "block" : "none"
    } else {
        this.labelDiv_.style.display = "none"
    }
    this.eventDiv_.style.display = this.labelDiv_.style.display
};

function MarkerWithLabel(a) {
    a = a || {};
    a.labelContent = a.labelContent || "";
    a.labelAnchor = a.labelAnchor || new google.maps.Point(0, 0);
    a.labelClass = a.labelClass || "markerLabels";
    a.labelStyle = a.labelStyle || {};
    a.labelInBackground = a.labelInBackground || false;
    if (typeof a.labelVisible === "undefined") {
        a.labelVisible = true
    }
    this.label = new MarkerLabel_(this);
    google.maps.Marker.apply(this, arguments)
}
MarkerWithLabel.prototype = new google.maps.Marker();
MarkerWithLabel.prototype.setMap = function (a) {
    google.maps.Marker.prototype.setMap.apply(this, arguments);
    this.label.setMap(a)
};