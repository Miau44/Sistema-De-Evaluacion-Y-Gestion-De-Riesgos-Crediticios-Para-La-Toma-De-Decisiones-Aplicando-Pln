import axios from "axios";
import { usePage } from "@inertiajs/vue3";

export const useAxios = () => {
    let flash = null;
    const axiosGet = async (url, data = {}) => {
        try {
            const response = await axios.get(url, {
                headers: { Accept: "application/json" },
                params: data,
            });
            flash = usePage().props.flash;
            return response.data;
        } catch (err) {
            flash = usePage().props.flash;
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${
                    flash.error
                        ? flash.error
                        : err.response?.data
                        ? err.response?.data?.message
                        : "Ocurrió un error inesperado y no se pudieron obtener los registros"
                }`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: `Aceptar`,
            });
            throw err;
        } finally {
            flash = null;
        }
    };
    const axiosPostFormData = async (url, formdata) => {
        try {
            const response = await axios.post(url, formdata, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            });
            flash = usePage().props.flash;
            Swal.fire({
                icon: "success",
                title: "Correcto",
                html: `${
                    flash.bien
                        ? flash.bien
                        : response.data.message
                        ? response.data.message
                        : "Proceso realizado"
                }`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: `Aceptar`,
            });
            return response.data;
        } catch (err) {
            flash = usePage().props.flash;
            const errors = err.response.data.errors;
            let mensaje_error = flash.error;
            if (errors) {
                mensaje_error = "<ul>";
                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        // Mostrar el primer error de cada clave
                        if (errors[key][0]) {
                            mensaje_error += `<li class="text-left">${errors[key][0]}</li>`;
                        }
                    }
                }
                mensaje_error += "</ul>";
            }

            Swal.fire({
                icon: "error",
                title: "Error",
                html: `${
                    mensaje_error
                        ? mensaje_error
                        : "Hay errores en el formulario"
                }`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: `Aceptar`,
            });
            throw err;
        } finally {
            flash = null;
        }
    };

    const axiosPost = async (url, data) => {
        try {
            const response = await axios.post(url, data, {
                headers: { Accept: "application/json" },
            });
            flash = usePage().props.flash;
            Swal.fire({
                icon: "success",
                title: "Correcto",
                text: `${flash.bien ? flash.bien : "Proceso realizado"}`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: `Aceptar`,
            });
            return response.data;
        } catch (err) {
            flash = usePage().props.flash;
            const errors = err.response.data.errors;
            let mensaje_error = flash.error;
            if (errors) {
                mensaje_error = "<ul>";
                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        // Mostrar el primer error de cada clave
                        if (errors[key][0]) {
                            mensaje_error += `<li class="text-left">${errors[key][0]}</li>`;
                        }
                    }
                }
                mensaje_error += "</ul>";
            }

            Swal.fire({
                icon: "error",
                title: "Error",
                html: `${
                    mensaje_error
                        ? mensaje_error
                        : "Hay errores en el formulario"
                }`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: `Aceptar`,
            });
            throw err;
        } finally {
            flash = null;
        }
    };

    const axiosDelete = async (url) => {
        try {
            const response = await axios.delete(url, {
                headers: { Accept: "application/json" },
            });
            flash = usePage().props.flash;
            Swal.fire({
                icon: "success",
                title: "Correcto",
                text: `${flash.bien ? flash.bien : "Proceso realizado"}`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: `Aceptar`,
            });
            return response.data;
        } catch (err) {
            flash = usePage().props.flash;
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${
                    flash.error
                        ? flash.error
                        : err.response?.data
                        ? err.response?.data?.message
                        : "Ocurrió un error inesperado, no se pudo ejecutar la función"
                }`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: `Aceptar`,
            });
            throw err;
        } finally {
            flash = null;
        }
    };

    return {
        axiosGet,
        axiosPost,
        axiosDelete,
        axiosPostFormData,
    };
};
