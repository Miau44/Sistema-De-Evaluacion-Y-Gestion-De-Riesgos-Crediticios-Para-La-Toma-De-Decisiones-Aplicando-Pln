import { onMounted, ref } from "vue";

const oCliente = ref({
    id: 0,
    nombre: "",
    paterno: "",
    materno: "",
    ci: "",
    ci_exp: "",
    nacionalidad: "",
    sexo: "",
    fecha_nac: "",
    dir: "",
    fono: "",
    correo: "",
    nom_lugartrabajo: "",
    nro_nit: "",
    unipersonal: "",
    actividad: "",
    dir_lab: "",
    fono_lab: "",
    correo_lab: "",
    cargo_lab: "",
    tiempo_lab: "",
    fecha_ingreso_lab: "",
    estado_civil: "",
    vivienda: "",
    grado_instruccion: "",
    situacion_laboral: "",
    profesion: "",
    nom_conyugue: "",
    paterno_conyugye: "",
    materno_conyugye: "",
    ci_conyugue: "",
    ci_exp_conyugue: "",
    nacionalidad_conyugye: "",
    ocupacion_conyugue: "",
    _method: "POST",
});

export const useClientes = () => {
    const setCliente = (item = null) => {
        if (item) {
            oCliente.value.id = item.id;
            oCliente.value.nombre = item.nombre;
            oCliente.value.paterno = item.paterno;
            oCliente.value.materno = item.materno;
            oCliente.value.ci = item.ci;
            oCliente.value.ci_exp = item.ci_exp;
            oCliente.value.nacionalidad = item.nacionalidad;
            oCliente.value.sexo = item.sexo;
            oCliente.value.fecha_nac = item.fecha_nac;
            oCliente.value.dir = item.dir;
            oCliente.value.fono = item.fono;
            oCliente.value.correo = item.correo;
            oCliente.value.nom_lugartrabajo = item.nom_lugartrabajo;
            oCliente.value.nro_nit = item.nro_nit;
            oCliente.value.unipersonal = item.unipersonal;
            oCliente.value.actividad = item.actividad;
            oCliente.value.dir_lab = item.dir_lab;
            oCliente.value.fono_lab = item.fono_lab;
            oCliente.value.correo_lab = item.correo_lab;
            oCliente.value.cargo_lab = item.cargo_lab;
            oCliente.value.tiempo_lab = item.tiempo_lab;
            oCliente.value.fecha_ingreso_lab = item.fecha_ingreso_lab;
            oCliente.value.estado_civil = item.estado_civil;
            oCliente.value.vivienda = item.vivienda;
            oCliente.value.grado_instruccion = item.grado_instruccion;
            oCliente.value.situacion_laboral = item.situacion_laboral;
            oCliente.value.profesion = item.profesion;
            oCliente.value.nom_conyugue = item.nom_conyugue;
            oCliente.value.paterno_conyugye = item.paterno_conyugye;
            oCliente.value.materno_conyugye = item.materno_conyugye;
            oCliente.value.ci_conyugue = item.ci_conyugue;
            oCliente.value.ci_exp_conyugue = item.ci_exp_conyugue;
            oCliente.value.nacionalidad_conyugye = item.nacionalidad_conyugye;
            oCliente.value.ocupacion_conyugue = item.ocupacion_conyugue;
            oCliente.value._method = "PUT";
            return oCliente;
        }
        return false;
    };

    const limpiarCliente = () => {
        oCliente.value.id = 0;
        oCliente.value.nombre = "";
        oCliente.value.paterno = "";
        oCliente.value.materno = "";
        oCliente.value.ci = "";
        oCliente.value.ci_exp = "";
        oCliente.value.nacionalidad = "";
        oCliente.value.sexo = "";
        oCliente.value.fecha_nac = "";
        oCliente.value.dir = "";
        oCliente.value.fono = "";
        oCliente.value.correo = "";
        oCliente.value.nom_lugartrabajo = "";
        oCliente.value.nro_nit = "";
        oCliente.value.unipersonal = "";
        oCliente.value.actividad = "";
        oCliente.value.dir_lab = "";
        oCliente.value.fono_lab = "";
        oCliente.value.correo_lab = "";
        oCliente.value.cargo_lab = "";
        oCliente.value.tiempo_lab = "";
        oCliente.value.fecha_ingreso_lab = "";
        oCliente.value.estado_civil = "";
        oCliente.value.vivienda = "";
        oCliente.value.grado_instruccion = "";
        oCliente.value.situacion_laboral = "";
        oCliente.value.profesion = "";
        oCliente.value.nom_conyugue = "";
        oCliente.value.paterno_conyugye = "";
        oCliente.value.materno_conyugye = "";
        oCliente.value.ci_conyugue = "";
        oCliente.value.ci_exp_conyugue = "";
        oCliente.value.nacionalidad_conyugye = "";
        oCliente.value.ocupacion_conyugue = "";
        oCliente.value._method = "POST";
    };

    onMounted(() => {});

    return {
        oCliente,
        setCliente,
        limpiarCliente,
    };
};
