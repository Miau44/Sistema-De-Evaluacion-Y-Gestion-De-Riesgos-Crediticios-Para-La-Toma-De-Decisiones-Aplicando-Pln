<script setup>
import App from "@/Layouts/App.vue";
defineOptions({
    layout: App,
});

import { onMounted, ref } from "vue";
// componentes
import { usePage, Head, useForm } from "@inertiajs/vue3";
const props_page = defineProps({
    configuracion: {
        type: Object,
        default: null,
    },
});
const { props } = usePage();

let form = null;
if (props_page.configuracion != null) {
    props_page.configuracion["_method"] = "put";
    form = useForm(props_page.configuracion);
} else {
    form = useForm({
        _method: "put",
        id: 0,
        nombre_sistema: "",
        alias: "",
        razon_social: "",
        nit: "",
        dir: "",
        fono: "",
        web: "",
        actividad: "",
        correo: "",
        logo: "",
    });
}

const enviarFormulario = () => {
    form.post(route("configuracions.update", form.id), {
        onSuccess: () => {
            // Mostrar mensaje de éxito
            console.log("correcto");
            limpiaRefs();
            Swal.fire({
                icon: "success",
                title: "Correcto",
                html: `<strong>Proceso realizado con éxito</strong>`,
                showCancelButton: false,
                confirmButtonColor: "#056ee9",
                confirmButtonText: "Aceptar",
            });
        },
        onError: (err, code) => {
            console.log(code);
            console.log(err.response);
            console.log("error");
        },
    });
};
const logo = ref(null);
function cargaArchivo(e, key) {
    form[key] = null;
    form[key] = e.target.files[0];

    // Generar la URL del archivo cargado
    const fileUrl = URL.createObjectURL(form[key]);
    form["url_" + key] = fileUrl;
}
function limpiaRefs() {
    logo.value = null;
}
onMounted(() => {});
</script>
<template>
    <Head title="Parametrización"></Head>
    <h3 class="text-center text-h4">CONFIGURACIÓN</h3>
    <div class="row">
        <form @submit.prevent="enviarFormulario()">
            <div class="col-12">
                <div class="row">
                    <div class="col-md-4 form-group mb-3">
                        <label for="">Nombre del sistema*</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.nombre_sistema"
                        />
                        <span
                            class="text-danger"
                            v-if="form.errors?.nombre_sistema"
                            >{{ form.errors.nombre_sistema }}</span
                        >
                    </div>
                    <div class="col-md-4 form-group mb-3">
                        <label for="">Alias*</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.alias"
                        />
                        <span class="text-danger" v-if="form.errors?.alias">{{
                            form.errors.alias
                        }}</span>
                    </div>
                    <div class="col-md-4 form-group mb-3">
                        <label for="">Razón Social*</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.razon_social"
                        />
                        <span
                            class="text-danger"
                            v-if="form.errors?.razon_social"
                            >{{ form.errors.razon_social }}</span
                        >
                    </div>
                    <div class="col-md-4 form-group mb-3">
                        <label for="">NIT</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.nit"
                        />
                        <span
                            class="text-danger"
                            v-if="form.errors?.nit"
                            >{{ form.errors.nit }}</span
                        >
                    </div>
                    <div class="col-md-4 form-group mb-3">
                        <label for="">Dirección*</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.dir"
                        />
                        <span
                            class="text-danger"
                            v-if="form.errors?.dir"
                            >{{ form.errors.dir }}</span
                        >
                    </div>
                    <div class="col-md-4 form-group mb-3">
                        <label for="">Teléfono*</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.fono"
                        />
                        <span
                            class="text-danger"
                            v-if="form.errors?.fono"
                            >{{ form.errors.fono }}</span
                        >
                    </div>
                    <div class="col-md-4 form-group mb-3">
                        <label for="">Web</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.web"
                        />
                        <span
                            class="text-danger"
                            v-if="form.errors?.web"
                            >{{ form.errors.web }}</span
                        >
                    </div>
                    <div class="col-md-4 form-group mb-3">
                        <label for="">Actividad*</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.actividad"
                        />
                        <span
                            class="text-danger"
                            v-if="form.errors?.actividad"
                            >{{ form.errors.actividad }}</span
                        >
                    </div>
                    <div class="col-md-4 form-group mb-3">
                        <label for="">Correo</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.correo"
                        />
                        <span
                            class="text-danger"
                            v-if="form.errors?.correo"
                            >{{ form.errors.correo }}</span
                        >
                    </div>
                    <div class="col-md-4 form-group mb-3">
                        <label for="">Logo</label>
                        <input
                            type="file"
                            class="form-control"
                            @change="cargaArchivo($event, 'logo')"
                            ref="logo"
                        />
                        <div class="logo_muestra w-100 text-center">
                            <img
                                :src="form.url_logo"
                                alt=""
                                v-if="form.url_logo"
                                width="80%"
                            />
                        </div>
                        <span class="text-danger" v-if="form.errors?.logo">{{
                            form.errors.logo
                        }}</span>
                    </div>
                </div>
            </div>
            <div
                class="col-12"
                v-if="
                    props.auth.user.permisos == '*' ||
                    props.auth.user.permisos.includes('configuracions.edit')
                "
            >
                <button type="submit" class="btn btn-primary">
                    Guardar cambios
                </button>
            </div>
        </form>
    </div>
</template>
<style scoped>
.logo_muestra {
    margin-top: 10px;
    width: 100%;
    text-align: center;
}
.logo_muestra img {
    max-width: 100%;
}
</style>
