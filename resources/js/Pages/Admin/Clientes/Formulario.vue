<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { useClientes } from "@/composables/clientes/useClientes";
import { useAxios } from "@/composables/axios/useAxios";
import { watch, ref, computed, defineEmits, onMounted, nextTick } from "vue";
import axios from "axios";
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

const { oCliente, limpiarCliente } = useClientes();
const { axiosGet } = useAxios();
const accion = ref(props.accion_dialog);
const dialog = ref(props.open_dialog);
let form = useForm(oCliente.value);
watch(
    () => props.open_dialog,
    async (newValue) => {
        dialog.value = newValue;
        if (dialog.value) {
            document
                .getElementsByTagName("body")[0]
                .classList.add("modal-open");
            form = useForm(oCliente.value);
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
        ? `<i class="fa fa-plus"></i> Nuevo Cliente`
        : `<i class="fa fa-edit"></i> Editar Cliente`;
});

const listExpedido = [
    { value: "LP", label: "La Paz" },
    { value: "CB", label: "Cochabamba" },
    { value: "SC", label: "Santa Cruz" },
    { value: "CH", label: "Chuquisaca" },
    { value: "OR", label: "Oruro" },
    { value: "PT", label: "Potosi" },
    { value: "TJ", label: "Tarija" },
    { value: "PD", label: "Pando" },
    { value: "BN", label: "Beni" },
];

const listSexo = [
    { value: "HOMBRE", label: "HOMBRE" },
    { value: "MUJER", label: "MUJER" },
];

const listEstadoCivil = [
    { value: "SOLTERO", label: "SOLTERO" },
    { value: "CASADO", label: "CASADO" },
    { value: "DIVORCIADO", label: "DIVORCIADO" },
    { value: "CONCUBINATO", label: "CONCUBINATO" },
    { value: "VIUDO", label: "VIUDO" },
];

const enviarFormulario = () => {
    let url =
        form["_method"] == "POST"
            ? route("clientes.store")
            : route("clientes.update", form.id);

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
            limpiarCliente();
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
                            <h4 class="mt-2 mb-0">DATOS BÁSICOS</h4>
                            <div class="col-md-4 mt-2">
                                <label class="required">Nombre(s)</label>
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.nombre,
                                    }"
                                    v-model="form.nombre"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.nombre"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.nombre }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required">Apellido Paterno</label>
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.paterno,
                                    }"
                                    v-model="form.paterno"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.paterno"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.paterno }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="">Apellido Materno</label>
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.materno,
                                    }"
                                    v-model="form.materno"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.materno"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.materno }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Documento de Identidad</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.ci,
                                    }"
                                    v-model="form.ci"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.ci"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.ci }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="">Expedición Documento</label>
                                <el-select
                                    :class="{
                                        'parsley-error': form.errors?.ci_exp,
                                    }"
                                    placeholder="Seleccione"
                                    v-model="form.ci_exp"
                                >
                                    <el-option
                                        v-for="item in listExpedido"
                                        :value="item.value"
                                        :label="item.label"
                                    >
                                    </el-option>
                                </el-select>
                                <ul
                                    v-if="form.errors?.ci_exp"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.ci_exp }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required">Nacionalidad</label>
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.nacionalidad,
                                    }"
                                    v-model="form.nacionalidad"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.nacionalidad"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.nacionalidad }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="">Sexo</label>
                                <el-select
                                    :class="{
                                        'parsley-error': form.errors?.sexo,
                                    }"
                                    placeholder="Seleccione"
                                    v-model="form.sexo"
                                >
                                    <el-option
                                        v-for="item in listSexo"
                                        :value="item.value"
                                        :label="item.label"
                                    >
                                    </el-option>
                                </el-select>
                                <ul
                                    v-if="form.errors?.sexo"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.sexo }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Fecha de Nacimiento</label
                                >
                                <input
                                    type="date"
                                    class="form-control"
                                    :class="{
                                        'parsley-error': form.errors?.fecha_nac,
                                    }"
                                    v-model="form.fecha_nac"
                                    autosize
                                />
                                <ul
                                    v-if="form.errors?.fecha_nac"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.fecha_nac }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Dirección Domicilio</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.dir,
                                    }"
                                    v-model="form.dir"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.dir"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.dir }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required">Teléfono Celular</label>
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.fono,
                                    }"
                                    v-model="form.fono"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.fono"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.fono }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Correo Electrónico</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.correo,
                                    }"
                                    v-model="form.correo"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.correo"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.correo }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <h4 class="mt-2 mb-0">DATOS LABORALES</h4>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Nombre del Lugar de Trabajo</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.nom_lugartrabajo,
                                    }"
                                    v-model="form.nom_lugartrabajo"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.nom_lugartrabajo"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.nom_lugartrabajo }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Número de identificación tributaria
                                    NIT</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.nro_nit,
                                    }"
                                    v-model="form.nro_nit"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.nro_nit"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.nro_nit }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Empresa Unipersonal</label
                                >
                                <el-select
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.unipersonal,
                                    }"
                                    v-model="form.unipersonal"
                                    placeholder="Seleccione"
                                >
                                    <el-option
                                        :value="'SI'"
                                        :label="'SI'"
                                    ></el-option>
                                    <el-option
                                        :value="'NO'"
                                        :label="'NO'"
                                    ></el-option>
                                </el-select>
                                <ul
                                    v-if="form.errors?.unipersonal"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.unipersonal }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Actividad Económica</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.actividad,
                                    }"
                                    v-model="form.actividad"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.actividad"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.actividad }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Dirección laboral</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.dir_lab,
                                    }"
                                    v-model="form.dir_lab"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.dir_lab"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.dir_lab }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required">Teléfono Celular</label>
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.fono_lab,
                                    }"
                                    v-model="form.fono_lab"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.fono_lab"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.fono_lab }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Correo electrónico</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.correo_lab,
                                    }"
                                    v-model="form.correo_lab"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.correo_lab"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.correo_lab }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required">Cargo</label>
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.cargo_lab,
                                    }"
                                    v-model="form.cargo_lab"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.cargo_lab"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.cargo_lab }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Tiempo de servicio</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.tiempo_lab,
                                    }"
                                    v-model="form.tiempo_lab"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.tiempo_lab"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.tiempo_lab }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Fecha de ingreso al Trabajo</label
                                >
                                <input
                                    type="date"
                                    class="form-control"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.fecha_ingreso_lab,
                                    }"
                                    v-model="form.fecha_ingreso_lab"
                                    autosize
                                />
                                <ul
                                    v-if="form.errors?.fecha_ingreso_lab"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.fecha_ingreso_lab }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <h4 class="mt-2 mb-0">DATOS ADICIONALES</h4>
                            <div class="col-md-4 mt-2">
                                <label class="required">Estado Civil</label>
                                <el-select
                                    :class="{
                                        'parsley-error':
                                            form.errors?.estado_civil,
                                    }"
                                    v-model="form.estado_civil"
                                    placeholder="Seleccione"
                                >
                                    <el-option
                                        v-for="item in listEstadoCivil"
                                        :value="item.value"
                                        :label="item.label"
                                    ></el-option>
                                </el-select>
                                <ul
                                    v-if="form.errors?.estado_civil"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.estado_civil }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required">Vivienda</label>
                                <el-select
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.vivienda,
                                    }"
                                    v-model="form.vivienda"
                                    placeholder="Seleccione"
                                >
                                    <el-option
                                        :value="'PROPIA'"
                                        :label="'PROPIA'"
                                    ></el-option>
                                    <el-option
                                        :value="'ALQUILER'"
                                        :label="'ALQUILER'"
                                    ></el-option>
                                </el-select>
                                <ul
                                    v-if="form.errors?.vivienda"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.vivienda }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Grado de Instrucción</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.grado_instruccion,
                                    }"
                                    v-model="form.grado_instruccion"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.grado_instruccion"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.grado_instruccion }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required"
                                    >Situación Laboral</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.situacion_laboral,
                                    }"
                                    v-model="form.situacion_laboral"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.situacion_laboral"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.situacion_laboral }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="required">Profesión</label>
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error': form.errors?.profesion,
                                    }"
                                    v-model="form.profesion"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.profesion"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.profesion }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <h4 class="mt-2 mb-0">DATOS DEL CÓNYUGUE</h4>

                            <div class="col-md-4 mt-2">
                                <label
                                    :class="{
                                        required:
                                            form.estado_civil != 'SOLTERO' &&
                                            form.estado_civil != '',
                                    }"
                                    >Nombres</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.nom_conyugue,
                                    }"
                                    v-model="form.nom_conyugue"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.nom_conyugue"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.nom_conyugue }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label
                                    :class="{
                                        required:
                                            form.estado_civil != 'SOLTERO' &&
                                            form.estado_civil != '',
                                    }"
                                    >Apellido Paterno</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.paterno_conyugye,
                                    }"
                                    v-model="form.paterno_conyugye"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.paterno_conyugye"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.paterno_conyugye }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label>Apellido Materno</label>
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.materno_conyugye,
                                    }"
                                    v-model="form.materno_conyugye"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.materno_conyugye"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.materno_conyugye }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label
                                    :class="{
                                        required:
                                            form.estado_civil != 'SOLTERO' &&
                                            form.estado_civil != '',
                                    }"
                                    >Documento de Identidad</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.ci_conyugue,
                                    }"
                                    v-model="form.ci_conyugue"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.ci_conyugue"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.ci_conyugue }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label class="">Expedición Documento</label>
                                <el-select
                                    :class="{
                                        'parsley-error':
                                            form.errors?.ci_exp_conyugue,
                                    }"
                                    placeholder="Seleccione"
                                    v-model="form.ci_exp_conyugue"
                                    clearable
                                >
                                    <el-option
                                        v-for="item in listExpedido"
                                        :value="item.value"
                                        :label="item.label"
                                    >
                                    </el-option>
                                </el-select>
                                <ul
                                    v-if="form.errors?.ci_exp_conyugue"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.ci_exp_conyugue }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label
                                    :class="{
                                        required:
                                            form.estado_civil != 'SOLTERO' &&
                                            form.estado_civil != '',
                                    }"
                                    >Nacionalidad</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.nacionalidad_conyugye,
                                    }"
                                    v-model="form.nacionalidad_conyugye"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.nacionalidad_conyugye"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.nacionalidad_conyugye }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-4 mt-2">
                                <label
                                    :class="{
                                        required:
                                            form.estado_civil != 'SOLTERO' &&
                                            form.estado_civil != '',
                                    }"
                                    >Ocupación Actual</label
                                >
                                <el-input
                                    type="text"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.ocupacion_conyugue,
                                    }"
                                    v-model="form.ocupacion_conyugue"
                                    autosize
                                ></el-input>
                                <ul
                                    v-if="form.errors?.ocupacion_conyugue"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.ocupacion_conyugue }}
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
                    >
                        <i class="fa fa-save"></i>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
