import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

export const useUser = () => {
    const store = useUserStore();
    const { oUser } = storeToRefs(store);

    const getUser = async () => {
        try {
            const response = await axios.get(route("users.getUser"), {
                headers: { Accept: "application/json" },
            });
            store.setUser(response.data.user);
            return response.data.user;
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            throw error; // Puedes manejar el error según tus necesidades
        }
    };

    onMounted(() => {
        getUser();
    });

    return {
        oUser,
        getUser,
    };
};
