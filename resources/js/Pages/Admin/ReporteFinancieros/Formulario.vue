<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { useAxios } from "@/composables/axios/useAxios";
import { watch, ref, computed, defineEmits, onMounted, nextTick } from "vue";
import axios from "axios";
import { useReporteFinancieros } from "@/composables/reporte_financieros/useReporteFinancieros";
import Highcharts from "highcharts";
import accessibility from "highcharts/modules/accessibility";
import exporting from "highcharts/modules/exporting";
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
const props = defineProps({
    open_dialog: {
        type: Boolean,
        default: false,
    },
    accion_dialog: {
        type: Number,
        default: 0,
    },
});

const { oReporteFinanciero, limpiarReporteFinanciero } =
    useReporteFinancieros();
const { axiosGet } = useAxios();
const accion = ref(props.accion_dialog);
const dialog = ref(props.open_dialog);
let form = useForm(oReporteFinanciero.value);
const listTipoDocumentos = ref([]);
const listClientes = ref([]);
const generado = ref(false);
const obteniendoResultado = ref(false);
watch(
    () => props.open_dialog,
    async (newValue) => {
        dialog.value = newValue;
        if (dialog.value) {
            archivo1.value.value = null;
            archivo2.value.value = null;
            generado.value = false;
            document
                .getElementsByTagName("body")[0]
                .classList.add("modal-open");
            form = useForm(oReporteFinanciero.value);
            cargarListas();
        }
    }
);
watch(
    () => props.accion_dialog,
    (newValue) => {
        accion.value = newValue;
    }
);

const { flash, auth } = usePage().props;

const tituloDialog = computed(() => {
    return accion.value == 0
        ? `<i class="fa fa-plus"></i> Nuevo Reporte Financiero`
        : `<i class="fa fa-edit"></i> Editar Reporte Financiero`;
});

const enviarFormulario = () => {
    let url =
        form["_method"] == "POST"
            ? route("reporte_financieros.store")
            : route("reporte_financieros.update", form.id);

    form.post(url, {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
            dialog.value = false;
            Swal.fire({
                icon: "success",
                title: "Correcto",
                text: `${flash.bien ? flash.bien : "Proceso realizado"}`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: `Aceptar`,
            });
            limpiarReporteFinanciero();
            emits("envio-formulario");
        },
        onError: (err) => {
            console.log("ERROR");
            Swal.fire({
                icon: "info",
                title: "Error",
                text: `${
                    flash.error
                        ? flash.error
                        : err.error
                        ? err.error
                        : "Hay errores en el formulario"
                }`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: `Aceptar`,
            });
        },
    });
};

const emits = defineEmits(["cerrar-dialog", "envio-formulario"]);

const cargarListas = () => {
    getTipoDocumentos();
    getClientes();
};

const getTipoDocumentos = async () => {
    axios.get(route("tipo_documentos.listado")).then((response) => {
        listTipoDocumentos.value = response.data.tipo_documentos;
    });
};

const getClientes = async () => {
    axios.get(route("clientes.listado")).then((response) => {
        listClientes.value = response.data.clientes;
    });
};

const archivo1 = ref(null);
const archivo2 = ref(null);

const cargarArchivo1 = (event) => {
    form.doc1 = event.target.files[0];
};
const cargarArchivo2 = (event) => {
    form.doc2 = event.target.files[0];
};

const r2 = ref(0);
const getResultado = () => {
    console.log(form.doc1);
    console.log(form.doc2);
    // asd;
    if (form.doc1 && form.doc2) {
        obteniendoResultado.value = true;
        const formData = new FormData();
        formData.append("archivo1", form.doc1);
        formData.append("archivo2", form.doc2);
        axios
            .post(route("reporte_financieros.archivos"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                generado.value = true;
                form.res = response.data.porcentaje;
                r2.value = response.data.r2;
                grafico1(
                    response.data.regresion,
                    response.data.noapto,
                    response.data.apto,
                    response.data.nom1,
                    response.data.nom2
                );
            })
            .catch((err) => {
                generado.value = false;
                console.error(err);
            })
            .finally(() => {
                obteniendoResultado.value = false;
            });
    } else {
        Swal.fire({
            icon: "info",
            title: "Error",
            text: `Debes cargar los dos archivos de Requisitos y Créditos`,
            confirmButtonColor: "#3085d6",
            confirmButtonText: `Aceptar`,
        });
    }
};

const grafico1 = (regresion, noapto, apto, nom1, nom2) => {
    // Configurar el gráfico con Highcharts
    Highcharts.chart("container1", {
        title: {
            text: "Reporte Financiero",
        },
        xAxis: {
            title: {
                text: "Puntuación obtenida",
            },
            min: 0,
        },
        yAxis: {
            title: {
                text: "Puntuación esperada",
            },
        },
        series: [
            {
                name: "Línea de Regresión",
                data: regresion,
                type: "line",
                color: "red",
                marker: {
                    enabled: false,
                },
            },
            {
                name: nom1,
                data: noapto,
                type: "scatter",
                color: "blue",
                marker: {
                    symbol: "circle",
                    radius: 6, // Tamaño del punto para el equipo A
                },
            },
            {
                name: nom2,
                data: apto,
                type: "scatter",
                color: "green",
                marker: {
                    symbol: "square",
                    radius: 6, // Tamaño del punto para el equipo B
                },
            },
        ],
        tooltip: {
            formatter: function () {
                return (
                    "Puntuación esperada: <b>" +
                    this.x.toFixed(2) +
                    "</b><br>Puntuación obtenida: <b>" +
                    this.y.toFixed(2) +
                    "</b>"
                );
            },
        },
    });
};

const textoResultado = (porcentaje) => {
    if (porcentaje >= 90) {
        form.tipo = "BAJO";
        return `Cliente con Bajo Riesgo de Pago de Crédito`;
    } else if (porcentaje >= 70) {
        form.tipo = "MEDIO";
        return `Cliente con Riesgo Medio de Pago de Crédito`;
    } else if (porcentaje >= 50) {
        form.tipo = "ALTO";
        return `Cliente con Alto Riesgo de Pago de Crédito`;
    }
    form.tipo = "NO APTO";
    return `Cliente No Apto para Crédito`;
};

watch(dialog, (newVal) => {
    if (!newVal) {
        emits("cerrar-dialog");
    }
});

const cerrarDialog = () => {
    dialog.value = false;
    document.getElementsByTagName("body")[0].classList.remove("modal-open");
};

onMounted(() => {});
</script>

<template>
    <div
        class="modal fade"
        :class="{
            show: dialog,
        }"
        id="modal-dialog-form"
        :style="{
            display: dialog ? 'block' : 'none',
        }"
    >
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h4 class="modal-title" v-html="tituloDialog"></h4>
                    <button
                        type="button"
                        class="btn-close"
                        @click="cerrarDialog()"
                    ></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="enviarFormulario()">
                        <div class="row">
                            <div class="col-12">
                                <small class="text-muted"
                                    >Todos los campos con
                                    <span class="text-danger">(*)</span> son
                                    obligatorios</small
                                >
                            </div>
                            <div class="col-md-6 mt-3">
                                <label class="required"
                                    >Seleccionar Tipo de Documento</label
                                >
                                <el-select
                                    class="w-100"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.tipo_documento_id,
                                    }"
                                    v-model="form.tipo_documento_id"
                                    filterable
                                    placeholder="- Seleccione -"
                                    no-data-text="Sin datos"
                                >
                                    <el-option
                                        v-for="item in listTipoDocumentos"
                                        :key="item.id"
                                        :value="item.id"
                                        :label="item.nombre"
                                    ></el-option>
                                </el-select>
                                <ul
                                    v-if="form.errors?.tipo_documento_id"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.tipo_documento_id }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-6 mt-3">
                                <label class="required"
                                    >Seleccionar Cliente</label
                                >
                                <el-select
                                    class="w-100"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.cliente_id,
                                    }"
                                    v-model="form.cliente_id"
                                    filterable
                                    placeholder="- Seleccione -"
                                    no-data-text="Sin datos"
                                >
                                    <el-option
                                        v-for="item in listClientes"
                                        :key="item.id"
                                        :value="item.id"
                                        :label="item.full_name"
                                    ></el-option>
                                </el-select>
                                <ul
                                    v-if="form.errors?.cliente_id"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.cliente_id }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row" v-show="!obteniendoResultado">
                            <div class="col-md-6 mt-3">
                                <label class="required h5"
                                    ><i class="fa fa-file-excel"></i> Formulario
                                    de requisitos</label
                                ><br />
                                <input
                                    type="file"
                                    ref="archivo1"
                                    accept=".xls,.xlsx"
                                    @change="cargarArchivo1"
                                />
                                <ul
                                    v-if="form.errors?.doc1"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.doc1 }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-6 mt-3">
                                <label class="required h5"
                                    ><i class="fa fa-file-excel"></i> Formulario
                                    de Créditos</label
                                ><br />
                                <input
                                    type="file"
                                    ref="archivo2"
                                    accept=".xls,.xlsx"
                                    @change="cargarArchivo2"
                                />
                                <ul
                                    v-if="form.errors?.doc2"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.doc2 }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-12 text-center mt-2">
                                <button
                                    class="btn btn-outline-success"
                                    type="button"
                                    @click="getResultado"
                                >
                                    Generar <i class="fa fa-arrow-right"></i>
                                </button>
                            </div>
                            <div class="col-12 mt-3 text-center mb-2">
                                <label class="h4">Resultado</label>
                                <br />
                                <div
                                    class="text-md alert alert-info font-weight-bold"
                                    v-if="form.res"
                                >
                                    {{ textoResultado(form.res) }}
                                </div>
                                <div
                                    class="row mt-2"
                                    v-show="form.res && generado"
                                >
                                    <div class="col-12">
                                        <div
                                            class="font-weight-bold text-md text-left badge bg-primary"
                                        >
                                            R^2 = {{ r2 }}%
                                        </div>
                                        <div id="container1"></div>
                                    </div>
                                </div>
                                <div
                                    v-if="!form.res"
                                    class="h5 alert alert-gray"
                                >
                                    Carga los archivos para generar el resultado
                                </div>
                            </div>
                        </div>
                        <div
                            class="row contenedor_loading"
                            v-show="obteniendoResultado"
                        >
                            <div class="h5 w-100 text-center text-white">
                                OBTENIENDO EL RESULTADO...
                            </div>
                            <div class="loader">
                                <div class="book-wrapper">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="white"
                                        viewBox="0 0 126 75"
                                        class="book"
                                    >
                                        <rect
                                            stroke-width="5"
                                            stroke="#e05452"
                                            rx="7.5"
                                            height="70"
                                            width="121"
                                            y="2.5"
                                            x="2.5"
                                        ></rect>
                                        <line
                                            stroke-width="5"
                                            stroke="#e05452"
                                            y2="75"
                                            x2="63.5"
                                            x1="63.5"
                                        ></line>
                                        <path
                                            stroke-linecap="round"
                                            stroke-width="4"
                                            stroke="#c18949"
                                            d="M25 20H50"
                                        ></path>
                                        <path
                                            stroke-linecap="round"
                                            stroke-width="4"
                                            stroke="#c18949"
                                            d="M101 20H76"
                                        ></path>
                                        <path
                                            stroke-linecap="round"
                                            stroke-width="4"
                                            stroke="#c18949"
                                            d="M16 30L50 30"
                                        ></path>
                                        <path
                                            stroke-linecap="round"
                                            stroke-width="4"
                                            stroke="#c18949"
                                            d="M110 30L76 30"
                                        ></path>
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#ffffff74"
                                        viewBox="0 0 65 75"
                                        class="book-page"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-width="4"
                                            stroke="#c18949"
                                            d="M40 20H15"
                                        ></path>
                                        <path
                                            stroke-linecap="round"
                                            stroke-width="4"
                                            stroke="#c18949"
                                            d="M49 30L15 30"
                                        ></path>
                                        <path
                                            stroke-width="5"
                                            stroke="#e05452"
                                            d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div
                            class="row"
                            v-if="form.errors?.res || form.errors?.tipo"
                        >
                            <div class="col-12">
                                <ul
                                    v-if="form.errors?.res"
                                    class="parsley-errors-list filled w-100 text-center"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.res }}
                                    </li>
                                </ul>
                                <ul
                                    v-if="form.errors?.tipo"
                                    class="parsley-errors-list filled w-100 text-center"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.tipo }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <a
                        href="javascript:;"
                        class="btn btn-white"
                        @click="cerrarDialog()"
                        ><i class="fa fa-times"></i> Cerrar</a
                    >
                    <button
                        type="button"
                        @click="enviarFormulario()"
                        class="btn btn-primary"
                        :disabled="!generado"
                    >
                        <i class="fa fa-save"></i>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.contenedor_loading {
    margin: 20px 0px 5px 5px;
    background-color: var(--principal_transparent);
    padding: 20px 0px;
}

.loader {
    display: flex;
    align-items: center;
    justify-content: center;
}
.book-wrapper {
    width: 150px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
}
.book {
    width: 100%;
    height: auto;
    filter: drop-shadow(10px 10px 5px rgba(0, 0, 0, 0.137));
}
.book-wrapper .book-page {
    width: 50%;
    height: auto;
    position: absolute;
    animation: paging 0.3s linear infinite;
    transform-origin: left;
}
@keyframes paging {
    0% {
        transform: rotateY(0deg) skewY(0deg);
    }
    50% {
        transform: rotateY(90deg) skewY(-20deg);
    }
    100% {
        transform: rotateY(180deg) skewY(0deg);
    }
}
</style>
