/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 5
Version: 5.3.3
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/
*/

var handleGoogleMapSetting = function() {
	"use strict";
	var mapOptions = {
		zoom: 4,
		center: new google.maps.LatLng(37.09024, -95.712891),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
	};
	var mapDefault = new google.maps.Map(document.getElementById('google-map'), mapOptions);
};

var Profile = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleGoogleMapSetting();
		}
	};
}();

$(document).ready(function() {
	Profile.init();
});