<script setup>
import App from "@/Layouts/App.vue";
defineOptions({
    layout: App,
});
import { onMounted, ref, nextTick, computed } from "vue";
import { useApp } from "@/composables/useApp";
// componentes
import { useConfiguracion } from "@/composables/configuracion/useConfiguracion";
import { usePage, Head, Link } from "@inertiajs/vue3";
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import accessibility from "highcharts/modules/accessibility";
import DarkUnica from "highcharts/themes/dark-unica";
const { auth } = usePage().props;
const user = ref(auth.user);

DarkUnica(Highcharts);
exporting(Highcharts);
accessibility(Highcharts);
Highcharts.setOptions({
    lang: {
        downloadPNG: "Descargar PNG",
        downloadJPEG: "Descargar JPEG",
        downloadPDF: "Descargar PDF",
        downloadSVG: "Descargar SVG",
        printChart: "Imprimir gráfico",
        contextButtonTitle: "Menú de exportación",
        viewFullscreen: "Pantalla completa",
        exitFullscreen: "Salir de pantalla completa",
    },
});

const props_page = defineProps({
    array_infos: {
        type: Array,
    },
});

const { setLoading } = useApp();
onMounted(() => {
    setTimeout(() => {
        setLoading(false);
    }, 300);
});
const { oConfiguracion } = useConfiguracion();

const { props } = usePage();

onMounted(() => {
    setTimeout(() => {
        setLoading(false);
    }, 300);
});
</script>
<template>
    <Head title="Inicio"></Head>
    <!-- BEGIN breadcrumb -->
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:;">Inicio</a></li>
    </ol>
    <!-- END breadcrumb -->
    <!-- BEGIN page-header -->
    <!-- <h1 class="page-header">Panel</h1> -->
    <!-- END page-header -->
    <div class="row">
        <div class="col-12">
            <h4 class="text-center text-h4">
                Bienvenid@ {{ props.auth.user.full_name }}
            </h4>
        </div>
    </div>
    <div class="row">
        <!-- BEGIN col-3 -->
        <div class="col-xl-3 col-md-6" v-for="item in array_infos">
            <div class="widget widget-stats" :class="[item.color]">
                <div class="stats-icon">
                    <i class="fa" :class="[item.icon]"></i>
                </div>
                <div class="stats-info text-white">
                    <h4>{{ item.label }}</h4>
                    <p>{{ item.cantidad }}</p>
                </div>
                <div class="stats-link">
                    <Link :href="route(item.url)"
                        >Ver más <i class="fa fa-arrow-alt-circle-right"></i
                    ></Link>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.item_btn {
    margin: 10px;
}

.contenido_item i {
    color: black;
}

.contenido_item {
    transition: all 0.8s;
    color: black;
    padding: 10px;
    cursor: pointer;
    background-color: rgb(248, 229, 229);
    border: solid 2px rgb(243, 211, 211);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.3em;
    flex-direction: column;
}
</style>
