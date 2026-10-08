/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 5
Version: 5.3.3
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/
*/

import PhotoSwipeLightbox from '../../plugins/photoswipe/dist/photoswipe-lightbox.esm.js';
const lightbox = new PhotoSwipeLightbox({
	gallery: '#gallery',
	children: 'a',
	pswpModule: () => import('../../plugins/photoswipe/dist/photoswipe.esm.js')
});
lightbox.init();