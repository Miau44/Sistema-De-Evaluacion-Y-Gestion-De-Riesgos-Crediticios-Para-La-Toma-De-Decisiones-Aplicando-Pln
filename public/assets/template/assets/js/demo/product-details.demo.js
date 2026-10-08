/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 5
Version: 5.3.3
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/
*/

var ProductDetails = function () {
	"use strict";
	return {
		//main function
		init: function () {
			$('#wysihtml5').wysihtml5();
			$("#tag-size, #tag-color, #tag-material, #tags").tagit();
		}
	};
}();

$(document).ready(function() {
	ProductDetails.init();
  
  $(document).on('theme-reload', function() {
		$('.wysihtml5-sandbox, input[name="_wysihtml5_mode"], .wysihtml5-toolbar').remove();
		$('#wysihtml5').show();
		$('#wysihtml5').wysihtml5();
	});
});