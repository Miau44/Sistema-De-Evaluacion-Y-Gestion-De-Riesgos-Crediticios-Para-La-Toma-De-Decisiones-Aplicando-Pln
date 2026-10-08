/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 5
Version: 5.3.3
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/
*/


/* Controller
------------------------------------------------ */
$(document).ready(function() {
	const sections = document.querySelectorAll('#bsSpyContent > div');
	const navLinks = document.querySelectorAll('#bsSpyTarget > a');
	const lastElHeight = sections[sections.length - 1].getBoundingClientRect().height;

	function activateNavLink(id) {
		navLinks.forEach((link) => {
			if (link && link.classList) {
				link.classList.remove('active');
			}
		});
		var target = document.querySelector(`nav a[href*='${id}']`);
		if (target) {
			target.classList.add('active');
		}
	}

	function isElementInViewport(el) {
		const rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
		);
	}

	function handleViewport() {
		let activeSection = null;
		for (let i = sections.length - 1; i >= 0; i--) {
			if (isElementInViewport(sections[i])) {
				activeSection = sections[i].getAttribute('id');
				activateNavLink(activeSection);
				break;
			}
		}

		let combinedHeight = 0;
		let sectionIndex = Array.from(sections).findIndex((section) => section.getAttribute('id') === activeSection);
		for (let i = sectionIndex; i < sections.length; i++) {
			combinedHeight += (sections[i] && sections[i].offsetHeight) ? sections[i].offsetHeight : 0;
		}
		if (combinedHeight <= window.innerHeight) {
			activateNavLink(activeSection);
		}
	}

	window.onscroll = handleViewport;
});