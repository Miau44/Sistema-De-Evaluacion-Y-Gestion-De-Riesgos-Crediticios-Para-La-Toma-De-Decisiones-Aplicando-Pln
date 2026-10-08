/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 5
Version: 5.3.3
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/
*/

var handleFileManagerClick = function() {
	var fileHasSubNodes = document.querySelectorAll(".file-node.has-sub");

	fileHasSubNodes.forEach(node => {
		var fileArrow = node.querySelector(".file-link > .file-arrow");
		
		fileArrow.addEventListener("click", function (event) {
			event.preventDefault();
			node.classList.toggle("expand");
		});
	});
	
	var fileInfoNodes = document.querySelectorAll(".file-node");

	fileInfoNodes.forEach(node => {
		var fileInfo = node.querySelector(".file-link > .file-info");
		
		fileInfo.addEventListener("click", function (event) {
			event.preventDefault();
			fileInfoNodes.forEach(otherNode => {
				if (otherNode !== node) {
					otherNode.classList.remove("selected");
				}
			});
			node.classList.add("expand");
			node.classList.add("selected");
		});
	});
};

/* Controller
------------------------------------------------ */
$(document).ready(function() {
  handleFileManagerClick();
});