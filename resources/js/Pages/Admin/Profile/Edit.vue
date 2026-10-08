<script setup>
import { ref, onMounted } from "vue";
import { useApp } from "@/composables/useApp";
import { router, useForm, usePage, Head } from "@inertiajs/vue3";
import { useUser } from "@/composables/useUser";
const { setLoading } = useApp();
onMounted(() => {
    setTimeout(() => {
        setLoading(false);
    }, 300);
});

const props = defineProps({
    user: {
        type: Object,
    },
});

const url_aux = ref(props.user.url_foto);

const foto = ref(null);
const imagen_cargada = ref(false);

function cargaImagen(e) {
    foto.value = e.target.files[0];
    props.user.url_foto = URL.createObjectURL(foto.value);
    imagen_cargada.value = true;
}

const { getUser } = useUser();

function guardarImagen() {
    router.post(
        route("profile.update_foto"),
        { foto: foto.value, _method: "patch" },
        {
            forceFormData: true,
            onSuccess: () => {
                getUser();
                Swal.fire({
                    icon: "success",
                    title: "Correcto",
                    text: `${flash.bien ? flash.bien : "Proceso realizado"}`,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: `Aceptar`,
                });
                imagen_cargada.value = false;
            },
            onError: (err) => {
                Swal.fire({
                    icon: "info",
                    title: "Error",
                    text: `${
                        flash.error
                            ? flash.error
                            : "Tienes errores en el formulario"
                    }`,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: `Aceptar`,
                });
                console.log(err);
            },
        }
    );
}

function cancelarImagen() {
    imagen_cargada.value = false;
    props.user.url_foto = url_aux.value;
}

const form = useForm({
    password_actual: "",
    password: "",
    password_confirmation: "",
    _method: "patch",
});

const { flash } = usePage().props;

const enviaFormulario = () => {
    form.errors = {};
    form.post(route("profile.update"), {
        preserveScroll: true,
        onSuccess: () => {
            form.clearErrors();
            Swal.fire({
                icon: "success",
                title: "Correcto",
                text: `${flash.bien ? flash.bien : "Proceso realizado"}`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: `Aceptar`,
            });
            form.reset();
        },
        onError: (err) => {
            Swal.fire({
                icon: "info",
                title: "Error",
                text: `${
                    flash.error
                        ? flash.error
                        : "Tienes errores en el formulario"
                }`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: `Aceptar`,
            });
            console.log(err);
        },
    });
};
</script>

<template>
    <Head title="Perfil"></Head>

    <!-- BEGIN breadcrumb -->
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:;">Inicio</a></li>
        <li class="breadcrumb-item active">Perfil</li>
    </ol>
    <!-- END breadcrumb -->
    <!-- BEGIN page-header -->
    <h1 class="page-header">Perfil</h1>
    <!-- END page-header -->

    <div class="row">
        <div class="col-md-4">
            <div class="panel panel-inverse">
                <div class="panel-body">
                    <div class="row">
                        <div clas="col-12">
                            <div class="info_foto">
                                <img class="image" :src="user.url_foto" />
                                <br />
                                <h4 class="mt-1 mb-3">
                                    {{ user.role?.nombre }}
                                </h4>
                                <label
                                    v-if="!imagen_cargada"
                                    class="btn_principal"
                                    for="file_foto"
                                    ><b>Cambiar foto</b
                                    ><input
                                        type="file"
                                        id="file_foto"
                                        accept="image/png, image/gif, image/jpeg"
                                        hidden
                                        @change="cargaImagen"
                                /></label>
                                <button
                                    v-if="imagen_cargada"
                                    class="w-50 mb-1 btn btn-success btn-sm"
                                    @click="guardarImagen"
                                >
                                    Guardar cambios
                                </button>
                                <br />
                                <button
                                    v-if="imagen_cargada"
                                    class="w-50 mb-1 btn"
                                    @click="cancelarImagen"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                        <div cols="12">
                            <div class="row">
                                <div class="text-right font-weight-bold col-4">
                                    Usuario:
                                </div>
                                <div class="col-8">{{ user.usuario }}</div>
                            </div>
                            <div class="row">
                                <div class="text-right font-weight-bold col-4">
                                    Nombre:
                                </div>
                                <div class="col-8">{{ user.full_name }}</div>
                            </div>
                            <div class="row">
                                <div class="text-right font-weight-bold col-4">
                                    Fecha Registro:
                                </div>
                                <div class="col-8">
                                    {{ user.fecha_registro_t }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="panel panel-inverse pa-3">
                <div class="panel-heading">Cambiar contraseña</div>
                <div class="panel-body">
                    <form>
                        <div class="row mt-2">
                            <div class="col-12">
                                <label>Contraseña actual</label>
                                <input
                                    placeholder="Contraseña actual"
                                    autocomplete="false"
                                    v-model="form.password_actual"
                                    type="password"
                                    class="form-control"
                                    :class="{
                                        'parsley-error':
                                            form.errors?.password_actual,
                                    }"
                                />
                                <ul
                                    v-if="form.errors?.password_actual"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.password_actual }}
                                    </li>
                                </ul>
                                <label>Ingresa la nueva contraseña</label>
                                <input
                                    placeholder="Ingresa la nueva contraseña"
                                    prepend-inner-icon="mdi-lock-outline"
                                    autocomplete="false"
                                    v-model="form.password"
                                    type="password"
                                    class="form-control mt-2"
                                    :class="{
                                        'parsley-error': form.errors?.password,
                                    }"
                                />
                                <ul
                                    v-if="form.errors?.password"
                                    class="parsley-errors-list filled"
                                >
                                    <li class="parsley-required">
                                        {{ form.errors?.password }}
                                    </li>
                                </ul>
                                <label>Repite la nueva contraseña</label>
                                <input
                                    placeholder="Repite la nueva contraseña"
                                    autocomplete="false"
                                    v-model="form.password_confirmation"
                                    type="password"
                                    class="form-control mt-2 mb-3"
                                />
                            </div>
                            <div class="col-md-3">
                                <button
                                    type="button"
                                    class="btn btn-primary w-100"
                                    @click="enviaFormulario"
                                >
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.info_foto {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.info_foto img.image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: solid 1px gray;
}
</style>
