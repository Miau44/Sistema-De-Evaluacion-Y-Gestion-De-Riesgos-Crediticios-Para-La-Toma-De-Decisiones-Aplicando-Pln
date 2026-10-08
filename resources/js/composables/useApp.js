import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";

export const useApp = () => {
    const store = useAppStore();
    const { loading } = storeToRefs(store);

    const setLoading = (val) => {
        store.setLoading(val);
    };

    return {
        // propierdades
        loading,
        // metodos
        setLoading,
    };
};
