import "./bootstrap";
// import '../css/app.css';

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";

// vue multiselect
import "vue-multiselect/dist/vue-multiselect.css";
import Multiselect from "vue-multiselect";

// sweetalert2
import Swal from "sweetalert2";
window.Swal = Swal;

// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

// Pinia
import { createPinia } from "pinia";
const pinia = createPinia();

// mis scripts
import "./assets/css/config.css";
import "./assets/css/datatables.css";
import "./assets/css/form.css";
// import "./assets/css/fullCalendarConfig.css";

// ELEMENT-UI
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';


// Default Layout
import App from "@/Layouts/App.vue";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        );
        page.then((module) => {
            module.default.layout = module.default.layout ?? App;
        });
        return page;
    },
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(pinia)
            .use(ElementPlus)
            .component("multiselect", Multiselect)
            .mount(el);
    },
    progress: {
        color: "#4B5563",
    },
});
