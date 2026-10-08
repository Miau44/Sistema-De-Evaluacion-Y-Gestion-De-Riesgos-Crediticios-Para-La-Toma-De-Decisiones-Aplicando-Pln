import { onMounted, ref } from "vue";

const oTipoDocumento = ref({
    id: 0,
    nombre: "",
    descripcion: "",
    fecha_registro: "",
    _method: "POST",
});

export const useTipoDocumentos = () => {
    const setTipoDocumento = (item = null) => {
        if (item) {
            oTipoDocumento.value.id = item.id;
            oTipoDocumento.value.nombre = item.nombre;
            oTipoDocumento.value.descripcion = item.descripcion;
            oTipoDocumento.value.fecha_registro = item.fecha_registro;
            oTipoDocumento.value._method = "PUT";
            return oTipoDocumento;
        }
        return false;
    };

    const limpiarTipoDocumento = () => {
        oTipoDocumento.value.id = 0;
        oTipoDocumento.value.nombre = "";
        oTipoDocumento.value.descripcion = "";
        oTipoDocumento.value.fecha_registro = "";
        oTipoDocumento.value._method = "POST";
    };

    onMounted(() => {});

    return {
        oTipoDocumento,
        setTipoDocumento,
        limpiarTipoDocumento,
    };
};
