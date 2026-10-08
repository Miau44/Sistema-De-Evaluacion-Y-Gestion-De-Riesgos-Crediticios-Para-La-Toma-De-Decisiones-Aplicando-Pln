import { defineStore } from "pinia";

export const useUserStore = defineStore("user_store", {
    state: () => ({
        oUser: {
            usuario: "",
            password: "",
            nombre: "",
            paterno: "",
            materno: "",
            ci: "",
            ci_exp: "",
            dir: "",
            email: "",
            fono: "",
            tipo: "",
            foto: "",
            acceso: "",
            fecha_registro: "",
            // appends
            full_name: "",
            full_name_abre: "",
            full_ci: "",
            path_image: "",
            fecha_registro_t: "",
            permisos: [],
        },
    }),
    actions: {
        setUser(value) {
            this.oUser = value;
        },
    },
});
