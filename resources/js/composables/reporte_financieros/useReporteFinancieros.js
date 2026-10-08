import { onMounted, ref } from "vue";

const oReporteFinanciero = ref({
    id: 0,
    tipo_documento_id: "",
    cliente_id: "",
    doc1: "",
    doc2: "",
    res: "",
    tipo: "",
    _method: "POST",
});

export const useReporteFinancieros = () => {
    const setReporteFinanciero = (item = null) => {
        if (item) {
            oReporteFinanciero.value.id = item.id;
            oReporteFinanciero.value.tipo_documento_id = item.tipo_documento_id;
            oReporteFinanciero.value.cliente_id = item.cliente_id;
            oReporteFinanciero.value.doc1 = "";
            oReporteFinanciero.value.doc2 = "";
            oReporteFinanciero.value.res = item.res;
            oReporteFinanciero.value.tipo = item.tipo;
            oReporteFinanciero.value._method = "PUT";
            return oReporteFinanciero;
        }
        return false;
    };

    const limpiarReporteFinanciero = () => {
        oReporteFinanciero.value.id = 0;
        oReporteFinanciero.value.tipo_documento_id = "";
        oReporteFinanciero.value.cliente_id = "";
        oReporteFinanciero.value.doc1 = "";
        oReporteFinanciero.value.doc2 = "";
        oReporteFinanciero.value.res = "";
        oReporteFinanciero.value.tipo = "";
        oReporteFinanciero.value._method = "POST";
    };

    onMounted(() => {});

    return {
        oReporteFinanciero,
        setReporteFinanciero,
        limpiarReporteFinanciero,
    };
};
