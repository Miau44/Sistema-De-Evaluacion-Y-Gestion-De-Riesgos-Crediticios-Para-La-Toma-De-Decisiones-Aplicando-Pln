import { useMenuStore } from "@/stores/menuStore";
import { storeToRefs } from "pinia";
import { router } from "@inertiajs/vue3";
import { useApp } from "@/composables/useApp";
import { onMounted, onUnmounted } from "vue";

export const useMenu = () => {
    const { setLoading } = useApp();
    const store = useMenuStore();
    const {menu_open, url_actual } =
        storeToRefs(store);

    const setMenuOpen = (val) => {
        store.setMenuOpen(val);
    };

    const cambiarUrl = (
        url,
        method = "get",
        info = { data: {}, value: "" }
    ) => {
        setLoading(true);

        if (method == "get") {
            router.get(url, info.data);
        } else {
            if (url.indexOf("logout") != -1) {
                clearInterval(interval_notificacions);
            }
            router.post(url, info.data);
        }
    };

    return {
        // propiedaes
        setMenuOpen,
        cambiarUrl,
    };
};
