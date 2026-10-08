/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 5
Version: 5.3.3
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/
*/

var handleSelectTable = function() {
	"use strict";
	
	$(document).on('click', '[data-toggle="select-table"]', function(e) {
		e.preventDefault();
		
		var targetTable = $(this).closest('.pos-table');
		
		if ($(targetTable).hasClass('in-use')) {
			$('[data-toggle="select-table"]').not(this).closest('.pos-table').removeClass('selected');
			$(targetTable).toggleClass('selected');
			$('#pos').toggleClass('pos-sidebar-mobile-toggled');
		}
	});
};

$(document).ready(function() {
	handleSelectTable();
});