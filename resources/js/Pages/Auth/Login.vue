<script>
import Login from "@/Layouts/Login.vue";
import { onMounted, ref } from "vue";
export default {
    layout: Login,
};
</script>
<script setup>
import { Head, Link, router, useForm, usePage } from "@inertiajs/vue3";

import { useConfiguracion } from "@/composables/configuracion/useConfiguracion";
const { props } = usePage();
const { oConfiguracion } = useConfiguracion();
const form = useForm({
    usuario: "",
    password: "",
});

var url_assets = "";
var url_principal = "";
const muestra_password = ref(false);

const submit = () => {
    axios
        .post(route("login"), form)
        .then((response) => {
            form.reset("password");
            if (response.data.user.role_id != 2) {
                router.get(route("inicio"));
            } else {
                window.location.reload();
            }
        })
        .catch((error) => {
            console.log(error.response);
            if (error.response.data.errors) {
                const errors = error.response.data.errors;
                form.errors = {};
                for (const field in errors) {
                    if (errors.hasOwnProperty(field)) {
                        form.errors[field] = errors[field][0]; // Asignar solo el primer error
                    }
                }
            }
        });

    // form.post(route("login"), {
    //     onFinish: () => {
    //         window.location.reload();
    //     },
    // });
};

onMounted(() => {
    url_assets = props.url_assets;
    url_principal = props.url_principal;
});
</script>

<template>
    <Head title="Login"></Head>
    <div class="contenedor_login">
        <div id="app" class="app">
            <!-- BEGIN login -->
            <div class="login login-v2 fw-bold">
                <!-- BEGIN login-cover -->
                <div class="login-cover">
                    <div
                        class="login-cover-img"
                        data-id="login-cover-image"
                    ></div>
                    <div class="login-cover-bg"></div>
                </div>
                <!-- END login-cover -->
                <!-- BEGIN login-container -->
                <div class="login-container">
                    <div class="w-100 text-center">
                        <img
                            :src="oConfiguracion.url_logo"
                            alt="Logo"
                            class="logo_login"
                            lazy
                        />
                    </div>
                    <!-- BEGIN login-header -->
                    <div class="login-header">
                        <div class="brand">
                            <div class="d-flex align-items-center">
                                <b>{{ oConfiguracion.razon_social }}</b>
                            </div>
                        </div>

                        <div class="icon">
                            <i class="fa fa-lock"></i>
                        </div>
                    </div>
                    <!-- END login-header -->

                    <!-- BEGIN login-content -->
                    <div class="login-content">
                        <form @submit.prevent="submit()">
                            <div class="form-floating mb-20px">
                                <input
                                    type="text"
                                    name="usuario"
                                    class="form-control fs-13px h-45px border-0"
                                    placeholder="Usuario"
                                    id="name"
                                    v-model="form.usuario"
                                    autofocus
                                />
                                <label
                                    for="name"
                                    class="d-flex align-items-center text-gray-600 fs-13px"
                                    >Usuario</label
                                >
                            </div>
                            <div class="">
                                <div
                                    class="input-group mb-3 form-floating mb-20px"
                                >
                                    <input
                                        :type="
                                            muestra_password
                                                ? 'text'
                                                : 'password'
                                        "
                                        name="password"
                                        class="form-control fs-13px h-45px border-0"
                                        v-model="form.password"
                                        autocomplete="false"
                                        placeholder="Contraseña"
                                    />

                                    <label
                                        for="name"
                                        class="d-flex align-items-center text-gray-600 fs-13px" style="z-index: 100;"
                                        >Contraseña</label
                                    >
                                    <button
                                        class="btn btn-default"
                                        type="button"
                                        @click="
                                            muestra_password = !muestra_password
                                        "
                                    >
                                        <i
                                            class="fa"
                                            :class="[
                                                muestra_password
                                                    ? 'fa-eye'
                                                    : 'fa-eye-slash',
                                            ]"
                                        ></i>
                                    </button>
                                </div>
                            </div>
                            <div class="w-100" v-if="form.errors?.usuario">
                                <span
                                    class="invalid-feedback alert alert-danger"
                                    style="display: block"
                                    role="alert"
                                >
                                    <strong>{{ form.errors.usuario }}</strong>
                                </span>
                            </div>
                            <div class="mb-15px">
                                <button
                                    type="submit"
                                    class="btn btn-theme d-block w-100 h-45px btn-lg"
                                >
                                    Ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                    <!-- END login-content -->
                </div>
                <!-- END login-container -->
            </div>
            <!-- END login -->

            <!-- BEGIN scroll-top-btn -->
            <a
                href="javascript:;"
                class="btn btn-icon btn-circle btn-theme btn-scroll-to-top"
                data-toggle="scroll-to-top"
                ><i class="fa fa-angle-up"></i
            ></a>
            <!-- END scroll-top-btn -->
        </div>
    </div>
</template>

<style scoped>
.contenedor_login {
    justify-content: center;
    width: 100%;
    height: 100%;
}

.logo_login {
    width: 100%;
}

.login-cover .login-cover-bg {
    /* background: linear-gradient(to bottom, #153f59, #94b8d7); */
    background: var(--principal);
}
</style>
