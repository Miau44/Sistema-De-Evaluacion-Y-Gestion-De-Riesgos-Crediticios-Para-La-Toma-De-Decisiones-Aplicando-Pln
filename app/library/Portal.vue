<script setup>
import { ref, provide } from "vue";
import { usePage, Link } from "@inertiajs/vue3";
import Navbar from "./includes_portal/Navbar.vue";
import Footer from "./includes_portal/Footer.vue";
const { props: props_page } = usePage();

const url_asset = ref(props_page.url_assets);
const user = ref(props_page.auth.user);
const dialog_atencion = ref(false);

const verificaUser = () => {
    if (user.value) {
        console.log("LOGEADO");
        return true;
    }

    dialog_atencion.value = true;
    console.log("SIN LOGEAR");
    return false;
};

const verificarPujaUser = async (user_id, publicacion_id) => {
    try {
        const response = await axios.get(
            route("subasta_clientes.verificaSubastaCliente"),
            {
                params: {
                    user_id,
                    publicacion_id,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

provide("verificaUser", verificaUser);
provide("verificarPujaUser", verificarPujaUser);
</script>
<template>
    <!-- BEGIN #app -->
    <div id="app" class="fade show">
        <Navbar></Navbar>
        <slot></slot>
        <Footer></Footer>
    </div>

    <div
        class="modal fade"
        :class="{
            show: dialog_atencion,
        }"
        id="modal-dialog-info"
        :style="{
            display: dialog_atencion ? 'block' : 'none',
        }"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body bg-principal border">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h4 class="w-100 text-center">
                                Debes iniar sesión o registrarte
                            </h4>
                            <a
                                :href="route('login')"
                                class="btn btn-primary mb-2"
                                >Ir al login</a
                            ><br />
                            <a :href="route('registro')" class="btn btn-success"
                                >Registrarse</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END #app -->
</template>
<style scoped>
#modal-dialog-info {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.678);
}
#modal-dialog-info .modal-dialog {
    height: 80%;
    display: flex;
    align-items: center;
}
</style>
