import { defineStore } from "pinia";

export const useAppStore = defineStore("app_store", {
    state: () => ({
        loading: true,
    }),
    actions: {
        setLoading(value) {
            this.loading = value;
        },
    },
    getters: {},
});
