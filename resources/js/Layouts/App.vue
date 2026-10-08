<script setup>
// includes
import { usePage, Link } from "@inertiajs/vue3";
import { ref } from "vue";
import Footer from "./includes/Footer.vue";
import NavBar from "./includes/NavBar.vue";
import SideBar from "./includes/SideBar.vue";
import { useApp } from "@/composables/useApp";
import { onMounted } from "vue";
import { useAppOptionStore } from '@/stores/app-option';
const appOption = useAppOptionStore();
const { props } = usePage();
var url_assets = "";
var url_principal = "";
const { loading, setLoading } = useApp();
setLoading(true);

onMounted(() => {
    setTimeout(() => {
        setLoading(false);
    }, 300);

    url_assets = props.url_assets;
    url_principal = props.url_principal;
});
</script>
<template>
    <!-- BEGIN #loader -->
	<!-- <div id="loader" class="app-loader"> -->
		<!-- <span class="spinner"></span> -->
	<!-- </div> -->
	<!-- END #loader -->
	<!-- BEGIN #app -->
	<div class="app app-header-fixed app-sidebar-fixed" :class="{
		'app-sidebar-minified':appOption.appSidebarMinified,
		'app-sidebar-mobile-toggled':appOption.appSidebarMobileToggled,
	}">
		<NavBar></NavBar>
	
		<SideBar></SideBar>
		
		<!-- BEGIN #content -->
		<div id="content" class="app-content">
            <slot></slot>
		</div>
		<!-- END #content -->
	</div>
	<!-- END #app -->
</template>
