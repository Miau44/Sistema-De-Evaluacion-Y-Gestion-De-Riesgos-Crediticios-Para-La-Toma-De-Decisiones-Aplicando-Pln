<script>
const breadbrums = [
    {
        title: "Inicio",
        disabled: false,
        url: route("inicio"),
        name_url: "inicio",
    },
    {
        title: "Usuarios",
        disabled: false,
        url: "",
        name_url: "",
    },
];
</script>
<script setup>
import { useApp } from "@/composables/useApp";
import { Head, Link, usePage } from "@inertiajs/vue3";
import { useUsuarios } from "@/composables/usuarios/useUsuarios";
import { initDataTable } from "@/composables/datatable.js";
import { ref, onMounted, onBeforeUnmount } from "vue";
import PanelToolbar from "@/Components/PanelToolbar.vue";
// import { useMenu } from "@/composables/useMenu";
import Formulario from "./Formulario.vue";
import FormPassword from "./FormPassword.vue";
// const { mobile, identificaDispositivo } = useMenu();
const { props: props_page } = usePage();
const { setLoading } = useApp();
onMounted(() => {
    setTimeout(() => {
        setLoading(false);
    }, 300);
});

const { getUsuarios, setUsuario, limpiarUsuario, deleteUsuario } =
    useUsuarios();

const columns = [
    {
        title: "",
        data: "id",
    },
    {
        title: "",
        data: "url_foto",
        sortable: false,
        render: function (data, type, row) {
            return `<img src="${data}" class="rounded h-30px my-n1 mx-n1"/>`;
        },
    },
    {
        title: "USUARIO",
        data: "usuario",
    },
    {
        title: "NOMBRE COMPLETO",
        data: "full_name",
    },
    {
        title: "C.I.",
        data: "full_ci",
    },
    {
        title: "DIRECCIÓN",
        data: "dir",
    },
    {
        title: "CORREO",
        data: "correo",
    },
    {
        title: "TELÉFONO",
        data: "fono",
    },
    {
        title: "TIPO",
        data: "tipo",
    },
    {
        title: "ACCESO",
        data: "acceso",
        sortable: false,
        render: function (data, type, row) {
            if (data == 1) {
                return `<span class="badge bg-success">HABILITADO</span>`;
            } else {
                return `<span class="badge bg-danger">DESHABILITADO</span>`;
            }
        },
    },
    {
        title: "ACCIONES",
        sortable: false,
        data: null,
        render: function (data, type, row) {
            let buttons = ``;

            if (
                props_page.auth?.user.permisos == "*" ||
                props_page.auth?.user.permisos.includes("usuarios.edit")
            ) {
                buttons += `<button class="mx-0 rounded-0 btn btn-info password" data-id="${row.id}"><i class="fa fa-key"></i></button>
                     <button class="mx-0 rounded-0 btn btn-warning editar" data-id="${row.id}"><i class="fa fa-edit"></i></button> `;
            }

            if (
                props_page.auth?.user.permisos == "*" ||
                props_page.auth?.user.permisos.includes("usuarios.destroy")
            ) {
                buttons += `<button class="mx-0 rounded-0 btn btn-danger eliminar"
                 data-id="${row.id}"
                 data-nombre="${row.full_name}"
                 data-url="${route(
                     "usuarios.destroy",
                     row.id
                 )}"><i class="fa fa-trash"></i></button>`;
            }

            return buttons;
        },
    },
];
const loading = ref(false);
const accion_dialog = ref(0);
const open_dialog = ref(false);
const accion_dialog_pass = ref(0);
const open_dialog_pass = ref(false);

const agregarRegistro = () => {
    limpiarUsuario();
    accion_dialog.value = 0;
    open_dialog.value = true;
};

const accionesRow = () => {
    // editar
    $("#table-usuario").on("click", "button.editar", function (e) {
        e.preventDefault();
        let id = $(this).attr("data-id");
        axios.get(route("usuarios.show", id)).then((response) => {
            console.log(response.data)
            setUsuario(response.data);
            accion_dialog.value = 1;
            open_dialog.value = true;
        });
    });
    // eliminar
    $("#table-usuario").on("click", "button.eliminar", function (e) {
        e.preventDefault();
        let nombre = $(this).attr("data-nombre");
        let id = $(this).attr("data-id");
        Swal.fire({
            title: "¿Quierés eliminar este registro?",
            html: `<strong>${nombre}</strong>`,
            showCancelButton: true,
            confirmButtonColor: "#B61431",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No, cancelar",
            denyButtonText: `No, cancelar`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let respuesta = await deleteUsuario(id);
                if (respuesta && respuesta.sw) {
                    updateDatatable();
                }
            }
        });
    });
    // password
    $("#table-usuario").on("click", "button.password", function (e) {
        e.preventDefault();
        let id = $(this).attr("data-id");
        axios.get(route("usuarios.show", id)).then((response) => {
            setUsuario(response.data);
            accion_dialog_pass.value = 1;
            open_dialog_pass.value = true;
        });
    });
};

var datatable = null;
var input_search = null;
var debounceTimeout = null;
const loading_table = ref(false);
const datatableInitialized = ref(false);
const updateDatatable = () => {
    datatable.ajax.reload();
};

onMounted(async () => {
    datatable = initDataTable("#table-usuario", columns, route("usuarios.api"));
    input_search = document.querySelector('input[type="search"]');

    // Agregar un evento 'keyup' al input de búsqueda con debounce
    input_search.addEventListener("keyup", () => {
        loading_table.value = true;
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            datatable.search(input_search.value).draw(); // Realiza la búsqueda manualmente
            loading_table.value = false;
        }, 500);
    });

    datatableInitialized.value = true;
    accionesRow();
});
onBeforeUnmount(() => {
    if (datatable) {
        datatable.clear();
        datatable.destroy(false); // Destruye la instancia del DataTable
        datatable = null;
        datatableInitialized.value = false;
    }
});
</script>
<template>
    <Head title="Usuarios"></Head>

    <!-- BEGIN breadcrumb -->
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:;">Inicio</a></li>
        <li class="breadcrumb-item active">Usuarios</li>
    </ol>
    <!-- END breadcrumb -->
    <!-- BEGIN page-header -->
    <h1 class="page-header">Usuarios</h1>
    <!-- END page-header -->

    <div class="row">
        <div class="col-md-12">
            <!-- BEGIN panel -->
            <div class="panel panel-inverse">
                <!-- BEGIN panel-heading -->
                <div class="panel-heading">
                    <h4 class="panel-title btn-nuevo">
                        <button
                            v-if="
                                props_page.auth?.user.permisos == '*' ||
                                props_page.auth?.user.permisos.includes(
                                    'usuarios.create'
                                )
                            "
                            type="button"
                            class="btn btn-primary"
                            @click="agregarRegistro"
                        >
                            <i class="fa fa-plus"></i> Nuevo Usuario
                        </button>
                        <a
                            v-if="
                                props_page.auth?.user.permisos == '*' ||
                                props_page.auth?.user.permisos.includes(
                                    'roles.index'
                                )
                            "
                            :href="route('roles.index')"
                            class="btn btn-info d-inline-block ml-1"
                        >
                            <i class="fa fa-list-alt"></i> Roles
                        </a>
                    </h4>
                    <!-- <panel-toolbar
                        :mostrar_loading="loading"
                        @loading="updateDatatable"
                    /> -->
                </div>
                <!-- END panel-heading -->
                <!-- BEGIN panel-body -->
                <div class="panel-body">
                    <table
                        id="table-usuario"
                        width="100%"
                        class="table table-striped table-bordered align-middle text-nowrap tabla_datos"
                    >
                        <thead>
                            <tr>
                                <th width="2%"></th>
                                <th width="2%"></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th width="5%"></th>
                            </tr>
                        </thead>
                        <div class="loading_table" v-show="loading_table">
                            Cargando...
                        </div>
                        <tbody></tbody>
                    </table>
                </div>
                <!-- END panel-body -->
            </div>
            <!-- END panel -->
        </div>
    </div>

    <Formulario
        :open_dialog="open_dialog"
        :accion_dialog="accion_dialog"
        @envio-formulario="updateDatatable"
        @cerrar-dialog="open_dialog = false"
    ></Formulario>
    <FormPassword
        :open_dialog="open_dialog_pass"
        :accion_dialog="accion_dialog_pass"
        @envio-formulario="open_dialog_pass = false"
        @cerrar-dialog="open_dialog_pass = false"
    ></FormPassword>
</template>
