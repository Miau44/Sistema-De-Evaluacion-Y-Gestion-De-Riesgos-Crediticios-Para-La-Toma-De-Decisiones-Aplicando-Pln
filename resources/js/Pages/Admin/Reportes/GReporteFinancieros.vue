<script setup>
import { useApp } from "@/composables/useApp";
import { computed, onMounted, ref, nextTick } from "vue";
import { Head, usePage } from "@inertiajs/vue3";
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import accessibility from "highcharts/modules/accessibility";
import Highcharts3D from "highcharts/highcharts-3d";
import cylinder from "highcharts/modules/cylinder";
import { useFormater } from "@/composables/useFormater";
const { getFormatoMoneda } = useFormater();
const { auth } = usePage().props;
const user = ref(auth.user);
exporting(Highcharts);
accessibility(Highcharts);
Highcharts3D(Highcharts);
cylinder(Highcharts);
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
const { setLoading } = useApp();
const generando = ref(false);
const txtBtn = computed(() => {
    if (generando.value) {
        return "Generando Grafico...";
    }
    return "Generar Grafico";
});

const listTipos = ref([
    { value: "todos", label: "TODOS" },
    { value: "BAJO", label: "BAJO" },
    { value: "MEDIO", label: "MEDIO" },
    { value: "ALTO", label: "ALTO" },
    { value: "NO APTO", label: "NO APTO" },
]);

const obtenerFechaActual = () => {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes empieza desde 0
    const dia = String(fecha.getDate()).padStart(2, "0"); // Día del mes
    return `${anio}-${mes}-${dia}`;
};

const form = ref({
    tipo: "todos",
    fecha_ini: obtenerFechaActual(),
    fecha_fin: obtenerFechaActual(),
});

const generarGrafico = async () => {
    generando.value = true;
    axios
        .get(route("reportes.r_greporte_financieros"), {
            params: form.value,
        })
        .then((response) => {
            nextTick(() => {
                const containerId = `container`;
                const container = document.getElementById(containerId);
                // Verificar que el contenedor exista y tenga un tamaño válido
                if (container) {
                    renderChart(
                        containerId,
                        response.data.categories,
                        response.data.data
                    );
                } else {
                    console.error(`Contenedor ${containerId} no válido.`);
                }
            });
            // Create the chart
            generando.value = false;
        });
};

const renderChart = (containerId, categories, data) => {
    const rowHeight = 80;
    const minHeight = 200;
    const calculatedHeight = Math.max(minHeight, categories.length * rowHeight);
    Highcharts.chart(containerId, {
        chart: {
            type: "cylinder",
            options3d: {
                enabled: true,
                alpha: 20,
                beta: 4,
                depth: 40,
                viewDistance: 0,
            },
            height: calculatedHeight,
        },
        title: {
            align: "center",
            text: `REPORTE FINANCIERO`,
        },
        subtitle: {
            align: "center",
            text: ``,
        },
        accessibility: {
            announceNewData: {
                enabled: true,
            },
        },
        xAxis: {
            type: "category",
        },
        yAxis: {
            title: {
                text: "TOTAL",
            },
        },
        legend: {
            enabled: true,
        },
        plotOptions: {
            series: {
                depth: 100,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    // format: "{point.y}",
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                    },
                },
            },
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return `
                    <div style="text-align:center;">
                        <div style="display:inline-block; width:12px; height:12px; background:${this.point.color}; border-radius:50%; margin-right:5px;"></div>
                        <strong style="color:${this.point.color};">${this.point.name}</strong>
                        <br>
                        <span class="text-md"><strong>Total:</strong> ${this.point.y}</span>
                    </div>
                    `;
            },
        },

        series: [
            {
                name: "Reporte Financiero",
                data: data,
                colorByPoint: true,
            },
        ],
    });
};

onMounted(() => {
    setTimeout(() => {
        setLoading(false);
    }, 300);
});
</script>
<template>
    <Head title="Reporte Financiero"></Head>
    <!-- BEGIN breadcrumb -->
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:;">Inicio</a></li>
        <li class="breadcrumb-item active">Gráficas > Reporte Financiero</li>
    </ol>
    <!-- END breadcrumb -->
    <!-- BEGIN page-header -->
    <h1 class="page-header">Gráficas > Reporte Financiero</h1>
    <!-- END page-header -->
    <div class="row">
        <div class="col-md-6 mx-auto">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="generarReporte">
                        <div class="row">
                            <div class="col-md-12">
                                <label>Seleccionar Tipo de riesgo*</label>
                                <select
                                    :hide-details="
                                        form.errors?.tipo ? false : true
                                    "
                                    :error="form.errors?.tipo ? true : false"
                                    :error-messages="
                                        form.errors?.tipo
                                            ? form.errors?.tipo
                                            : ''
                                    "
                                    v-model="form.tipo"
                                    class="form-control"
                                >
                                    <option
                                        v-for="item in listTipos"
                                        :value="item.value"
                                    >
                                        {{ item.label }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label>Rango de fechas</label>
                                <div class="row">
                                    <div class="col-md-6">
                                        <input
                                            type="date"
                                            class="form-control"
                                            v-model="form.fecha_ini"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <input
                                            type="date"
                                            class="form-control"
                                            v-model="form.fecha_fin"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 text-center mt-3">
                                <button
                                    class="btn btn-primary"
                                    block
                                    @click="generarGrafico"
                                    :disabled="generando"
                                    v-text="txtBtn"
                                ></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="row overflow-auto" style="max-height: 600px">
        <div class="col-12 mt-3" id="container"></div>
    </div>
</template>
