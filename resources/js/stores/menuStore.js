import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
    state: () => ({
        url_actual: "/",
        menu_open: [],
    }),
    actions: {
        setMenuOpen(value) {
            this.menu_open = value;
        },
    },
});
