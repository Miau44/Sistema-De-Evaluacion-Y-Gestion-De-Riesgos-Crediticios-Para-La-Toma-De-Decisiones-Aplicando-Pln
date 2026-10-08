<script setup>
import { useMenu } from "@/composables/useMenu";
import { useAppOptionStore } from "@/stores/app-option";
import { onMounted, ref, nextTick } from "vue";
import { usePage, router, Link } from "@inertiajs/vue3";
import { useUser } from "@/composables/useUser";
import { slideToggle } from "@/composables/slideToggle.js";
const { oUser } = useUser();

// data
const {
    mobile,
    drawer,
    rail,
    width,
    menu_open,
    setMenuOpen,
    cambiarUrl,
    toggleDrawer,
} = useMenu();

const user_logeado = ref({
    permisos: [],
});
const appOption = useAppOptionStore();

const toggleAppSidebarMinified = () => {
    appOption.appSidebarMinified = !appOption.appSidebarMinified;
};

const open_menu_mobile = (e) => {
    e.stopPropagation();
    appOption.appSidebarMobileToggled = !appOption.appSidebarMobileToggled;
};

function appSidebarProfileToggle(e) {
    var targetSidebar = document.querySelector(
        ".app-sidebar:not(.app-sidebar-end)"
    );
    var targetMenu = e.target.closest(".menu-profile");
    var targetProfile = document.querySelector("#appSidebarProfileMenu");
    var expandTime =
        targetSidebar &&
        targetSidebar.getAttribute("data-disable-slide-animation")
            ? 0
            : 250;

    if (targetProfile) {
        if (targetProfile.style.display == "block") {
            targetMenu.classList.remove("active");
        } else {
            targetMenu.classList.add("active");
        }
        slideToggle(targetProfile, expandTime);
        targetProfile.classList.toggle("expand");
    }
}

var appSidebarFloatSubmenuTimeout = "";
var appSidebarFloatSubmenuDom = "";
function handleSidebarMinifyFloatMenu() {
    var elms = [].slice.call(
        document.querySelectorAll(
            ".app-sidebar .menu > .menu-item.has-sub > .menu-link"
        )
    );
    if (elms) {
        elms.map(function (elm) {
            elm.onmouseenter = function () {
                var appElm = document.querySelector(".app");
                if (
                    appElm &&
                    appElm.classList.contains("app-sidebar-minified")
                ) {
                    clearTimeout(appSidebarFloatSubmenuTimeout);
                    var targetMenu =
                        this.closest(".menu-item").querySelector(
                            ".menu-submenu"
                        );
                    if (
                        appSidebarFloatSubmenuDom == this &&
                        document.querySelector("#app-sidebar-float-submenu")
                    ) {
                        return;
                    } else {
                        appSidebarFloatSubmenuDom = this;
                    }
                    var targetMenuHtml = targetMenu.innerHTML;
                    if (targetMenuHtml) {
                        var bodyStyle = getComputedStyle(document.body);
                        var sidebar = document.querySelector("#sidebar");
                        var sidebarOffset = sidebar.getBoundingClientRect();
                        var sidebarWidth = parseInt(sidebar.clientWidth);
                        var sidebarX =
                            !appElm.classList.contains("app-sidebar-end") &&
                            bodyStyle.getPropertyValue("direction") != "rtl"
                                ? sidebarOffset.left + sidebarWidth
                                : document.body.clientWidth -
                                  sidebarOffset.left;
                        var targetHeight =
                            handleGetHiddenMenuHeight(targetMenu);
                        var targetOffset = this.getBoundingClientRect();
                        var targetTop = targetOffset.top;
                        var targetLeft =
                            !appElm.classList.contains("app-sidebar-end") &&
                            bodyStyle.getPropertyValue("direction") != "rtl"
                                ? sidebarX
                                : "auto";
                        var targetRight =
                            !appElm.classList.contains("app-sidebar-end") &&
                            bodyStyle.getPropertyValue("direction") != "rtl"
                                ? "auto"
                                : sidebarX;
                        var darkMode =
                            sidebar.getAttribute("data-bs-theme") == "dark"
                                ? true
                                : false;
                        var windowHeight = document.body.clientHeight;

                        if (
                            !document.querySelector(
                                "#app-sidebar-float-submenu"
                            )
                        ) {
                            var overflowClass = "";
                            if (targetHeight > windowHeight) {
                                overflowClass = "overflow-scroll mh-100vh";
                            }
                            var html = document.createElement("div");
                            if (darkMode) {
                                html.setAttribute("data-bs-theme", "dark");
                            }
                            html.setAttribute(
                                "id",
                                "app-sidebar-float-submenu"
                            );
                            html.setAttribute(
                                "class",
                                "app-sidebar-float-submenu-container"
                            );
                            html.setAttribute("data-offset-top", targetTop);
                            html.setAttribute(
                                "data-menu-offset-top",
                                targetTop
                            );
                            html.innerHTML =
                                "" +
                                '	<div class="app-sidebar-float-submenu-arrow" id="app-sidebar-float-submenu-arrow"></div>' +
                                '	<div class="app-sidebar-float-submenu-line" id="app-sidebar-float-submenu-line"></div>' +
                                '	<div class="app-sidebar-float-submenu ' +
                                overflowClass +
                                '">' +
                                targetMenuHtml +
                                "</div>";
                            appElm.appendChild(html);

                            var elm = document.getElementById(
                                "app-sidebar-float-submenu"
                            );
                            elm.onmouseover = function () {
                                clearTimeout(appSidebarFloatSubmenuTimeout);
                            };
                            elm.onmouseout = function () {
                                appSidebarFloatSubmenuTimeout = setTimeout(
                                    () => {
                                        document
                                            .querySelector(
                                                "#app-sidebar-float-submenu"
                                            )
                                            .remove();
                                    },
                                    250
                                );
                            };
                        } else {
                            var floatSubmenu = document.querySelector(
                                "#app-sidebar-float-submenu"
                            );
                            var floatSubmenuElm = document.querySelector(
                                "#app-sidebar-float-submenu" +
                                    " .app-sidebar-float-submenu"
                            );

                            if (targetHeight > windowHeight) {
                                if (floatSubmenuElm) {
                                    var splitClass =
                                        "overflow-scroll mh-100vh".split(" ");
                                    for (
                                        var i = 0;
                                        i < splitClass.length;
                                        i++
                                    ) {
                                        floatSubmenuElm.classList.add(
                                            splitClass[i]
                                        );
                                    }
                                }
                            }
                            floatSubmenu.setAttribute(
                                "data-offset-top",
                                targetTop
                            );
                            floatSubmenu.setAttribute(
                                "data-menu-offset-top",
                                targetTop
                            );
                            floatSubmenuElm.innerHTML = targetMenuHtml;
                        }

                        var targetHeight = document.querySelector(
                            "#app-sidebar-float-submenu"
                        ).clientHeight;
                        var floatSubmenuElm = document.querySelector(
                            "#app-sidebar-float-submenu"
                        );
                        var floatSubmenuArrowElm = document.querySelector(
                            "#app-sidebar-float-submenu-arrow"
                        );
                        var floatSubmenuLineElm = document.querySelector(
                            "#app-sidebar-float-submenu-line"
                        );
                        if (windowHeight - targetTop > targetHeight) {
                            if (floatSubmenuElm) {
                                floatSubmenuElm.style.top = targetTop + "px";
                                floatSubmenuElm.style.left = targetLeft + "px";
                                floatSubmenuElm.style.bottom = "auto";
                                floatSubmenuElm.style.right =
                                    targetRight + "px";
                            }
                            if (floatSubmenuArrowElm) {
                                floatSubmenuArrowElm.style.top = "20px";
                                floatSubmenuArrowElm.style.bottom = "auto";
                            }
                            if (floatSubmenuLineElm) {
                                floatSubmenuLineElm.style.top = "20px";
                                floatSubmenuLineElm.style.bottom = "auto";
                            }
                        } else {
                            var arrowBottom = windowHeight - targetTop - 21;
                            if (floatSubmenuElm) {
                                floatSubmenuElm.style.top = "auto";
                                floatSubmenuElm.style.left = targetLeft + "px";
                                floatSubmenuElm.style.bottom = 0;
                                floatSubmenuElm.style.right =
                                    targetRight + "px";
                            }
                            if (floatSubmenuArrowElm) {
                                floatSubmenuArrowElm.style.top = "auto";
                                floatSubmenuArrowElm.style.bottom =
                                    arrowBottom + "px";
                            }
                            if (floatSubmenuLineElm) {
                                floatSubmenuLineElm.style.top = "20px";
                                floatSubmenuLineElm.style.bottom =
                                    arrowBottom + "px";
                            }
                        }
                        handleSidebarMinifyFloatMenuClick();
                    } else {
                        document
                            .querySelector("#app-sidebar-float-submenu-line")
                            .remove();
                        appSidebarFloatSubmenuDom = "";
                    }
                }
            };
            elm.onmouseleave = function () {
                var elm = document.querySelector(".app");
                if (elm && elm.classList.contains("app-sidebar-minified")) {
                    appSidebarFloatSubmenuTimeout = setTimeout(() => {
                        var elm = document.querySelector(
                            "#app-sidebar-float-submenu-line"
                        );
                        if (elm) {
                            elm.remove();
                        }
                        appSidebarFloatSubmenuDom = "";
                    }, 250);
                }
            };
        });
    }
}

function handleSidebarMinifyFloatMenuClick() {
    var elms = [].slice.call(
        document.querySelectorAll(
            "#app-sidebar-float-submenu .menu-item.has-sub > .menu-link"
        )
    );
    if (elms) {
        elms.map(function (elm) {
            elm.onclick = function (e) {
                e.preventDefault();
                var targetItem = this.closest(".menu-item");
                var target = targetItem.querySelector(".menu-submenu");
                var targetStyle = getComputedStyle(target);
                var close =
                    targetStyle.getPropertyValue("display") != "none"
                        ? true
                        : false;
                var expand =
                    targetStyle.getPropertyValue("display") != "none"
                        ? false
                        : true;

                slideToggle(target);

                var loopHeight = setInterval(function () {
                    var targetMenu = document.querySelector(
                        "#app-sidebar-float-submenu"
                    );
                    var targetMenuArrow = document.querySelector(
                        "#app-sidebar-float-submenu-arrow"
                    );
                    var targetMenuLine = document.querySelector(
                        "#app-sidebar-float-submenu-line"
                    );
                    var targetHeight = targetMenu.clientHeight;
                    var targetOffset = targetMenu.getBoundingClientRect();
                    var targetOriTop =
                        targetMenu.getAttribute("data-offset-top");
                    var targetMenuTop = targetMenu.getAttribute(
                        "data-menu-offset-top"
                    );
                    var targetTop = targetOffset.top;
                    var windowHeight = document.body.clientHeight;
                    if (close) {
                        if (targetTop > targetOriTop) {
                            targetTop =
                                targetTop > targetOriTop
                                    ? targetOriTop
                                    : targetTop;
                            targetMenu.style.top = targetTop + "px";
                            targetMenu.style.bottom = "auto";
                            targetMenuArrow.style.top = "20px";
                            targetMenuArrow.style.bottom = "auto";
                            targetMenuLine.style.top = "20px";
                            targetMenuLine.style.bottom = "auto";
                        }
                    }
                    if (expand) {
                        if (windowHeight - targetTop < targetHeight) {
                            var arrowBottom = windowHeight - targetMenuTop - 22;
                            targetMenu.style.top = "auto";
                            targetMenu.style.bottom = 0;
                            targetMenuArrow.style.top = "auto";
                            targetMenuArrow.style.bottom = arrowBottom + "px";
                            targetMenuLine.style.top = "20px";
                            targetMenuLine.style.bottom = arrowBottom + "px";
                        }
                        var floatSubmenuElm = document.querySelector(
                            "#app-sidebar-float-submenu .app-sidebar-float-submenu"
                        );
                        if (targetHeight > windowHeight) {
                            if (floatSubmenuElm) {
                                var splitClass =
                                    "overflow-scroll mh-100vh".split(" ");
                                for (var i = 0; i < splitClass.length; i++) {
                                    floatSubmenuElm.classList.add(
                                        splitClass[i]
                                    );
                                }
                            }
                        }
                    }
                }, 1);
                setTimeout(function () {
                    clearInterval(loopHeight);
                }, 250);
            };
        });
    }
}

function handleGetHiddenMenuHeight(elm) {
    elm.setAttribute(
        "style",
        "position: absolute; visibility: hidden; display: block !important"
    );
    var targetHeight = elm.clientHeight;
    elm.removeAttribute("style");
    return targetHeight;
}

const open_menus = () => {
    $(".has-sub")
        .off("click")
        .on("click", function () {
            $(this).toggleClass("expand");
            if ($(this).hasClass("expand")) {
                $(this).children(".menu-submenu").css("display", "block");
            } else {
                $(this).children(".menu-submenu").css("display", "none");
            }
        });
};

const submenus = {
    "reportes.usuarios": "Reportes",
};

const route_current = ref("");

router.on("navigate", (event) => {
    route_current.value = route().current();
    // console.log(route_current.value);
    appOption.appSidebarMobileToggled = false;
    // if (mobile.value) {
    //     toggleDrawer(false);
    // }
});

const { props: props_page } = usePage();

onMounted(async () => {
    await nextTick();
    let route_actual = route().current();
    // buscar en submenus y abrirlo si uno de sus elementos esta activo
    setMenuOpen([]);
    if (submenus[route_actual]) {
        setMenuOpen([submenus[route_actual]]);
    }

    if (props_page.auth) {
        user_logeado.value = props_page.auth?.user;
        // console.log(user_logeado.value.permisos);
    }

    setTimeout(() => {
        open_menus();
        handleSidebarMinifyFloatMenu();
        scrollActive();
    }, 400);
});

const scrollActive = () => {
    let sidebar = document.querySelector("#sidebar");
    let menu = null;
    let activeChild = null;
    if (sidebar) {
        menu = sidebar.querySelector(".v-navigation-drawer__content");
        activeChild = sidebar.querySelector(".active");
    }
    // Verifica si se encontró un hijo activo
    if (activeChild) {
        let offsetTop = activeChild.offsetTop - sidebar.offsetTop;
        // setTimeout(() => {
        //     menu.scrollTo({
        //         top: offsetTop,
        //         behavior: "smooth", // desplazamiento suave
        //     });
        // }, 500);
    }
};

const logout = () => {
    router.post(route("logout"));
};
</script>
<template>
    <!-- BEGIN #sidebar -->
    <div id="sidebar" class="app-sidebar bg-dark">
        <!-- BEGIN scrollbar -->
        <div
            class="app-sidebar-content"
            data-scrollbar="true"
            data-height="100%"
        >
            <!-- BEGIN menu -->
            <div class="menu">
                <div class="menu-profile">
                    <a
                        href="javascript:;"
                        class="menu-profile-link"
                        @click.prevent="appSidebarProfileToggle($event)"
                    >
                        <div class="menu-profile-cover with-shadow"></div>
                        <div class="menu-profile-image">
                            <img :src="oUser?.url_foto" alt="" />
                        </div>
                        <div class="menu-profile-info">
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 text-white">
                                    {{ oUser.full_name }}
                                </div>
                                <div class="menu-caret ms-auto"></div>
                            </div>
                            <small>{{ oUser.tipo }}</small>
                        </div>
                    </a>
                </div>
                <div id="appSidebarProfileMenu" class="collapse">
                    <div class="menu-item pt-5px">
                        <Link :href="route('profile.edit')" class="menu-link">
                            <div class="menu-icon">
                                <i class="fa fa-cog"></i>
                            </div>
                            <div class="menu-text">Perfil</div>
                        </Link>
                    </div>
                    <div class="menu-item pb-5px">
                        <a href="#" @click.prevent="logout()" class="menu-link">
                            <div class="menu-icon">
                                <i class="fa fa-sign-out"></i>
                            </div>
                            <div class="menu-text">Cerrar sesión</div>
                        </a>
                    </div>
                    <div class="menu-divider m-0"></div>
                </div>
                <div
                    class="menu-item"
                    :class="[route_current == 'inicio' ? 'active' : '']"
                >
                    <Link :href="route('inicio')" class="menu-link">
                        <div class="menu-icon">
                            <i class="fa fa-home"></i>
                        </div>
                        <div class="menu-text">Inicio</div>
                    </Link>
                </div>
                <div
                    class="menu-header"
                    v-if="
                        user_logeado.permisos == '*' ||
                        user_logeado.permisos.includes('usuarios.index') ||
                        user_logeado.permisos.includes(
                            'tipo_documentos.index'
                        ) ||
                        user_logeado.permisos.includes(
                            'reporte_financieros.index'
                        ) ||
                        user_logeado.permisos.includes('clientes.index')
                    "
                >
                    ADMINISTRACIÓN
                </div>
                <div
                    v-if="
                        user_logeado.permisos == '*' ||
                        user_logeado.permisos.includes('clientes.index')
                    "
                    class="menu-item"
                    :class="[
                        route_current == 'clientes.index' ? 'active' : 'none',
                    ]"
                >
                    <Link :href="route('clientes.index')" class="menu-link">
                        <div class="menu-icon">
                            <i class="fa fa-list"></i>
                        </div>
                        <div class="menu-text">Clientes</div>
                    </Link>
                </div>
                <div
                    v-if="
                        user_logeado.permisos == '*' ||
                        user_logeado.permisos.includes(
                            'reporte_financieros.index'
                        )
                    "
                    class="menu-item"
                    :class="[
                        route_current == 'reporte_financieros.index'
                            ? 'active'
                            : 'none',
                    ]"
                >
                    <Link
                        :href="route('reporte_financieros.index')"
                        class="menu-link"
                    >
                        <div class="menu-icon">
                            <i class="fa fa-list"></i>
                        </div>
                        <div class="menu-text">Reporte Financiero</div>
                    </Link>
                </div>
                <div
                    v-if="
                        user_logeado.permisos == '*' ||
                        user_logeado.permisos.includes('tipo_documentos.index')
                    "
                    class="menu-item"
                    :class="[
                        route_current == 'tipo_documentos.index'
                            ? 'active'
                            : 'none',
                    ]"
                >
                    <Link
                        :href="route('tipo_documentos.index')"
                        class="menu-link"
                    >
                        <div class="menu-icon">
                            <i class="fa fa-list"></i>
                        </div>
                        <div class="menu-text">Tipo de documentos</div>
                    </Link>
                </div>
                <div
                    v-if="
                        user_logeado.permisos == '*' ||
                        user_logeado.permisos.includes('usuarios.index')
                    "
                    class="menu-item"
                    :class="[
                        route_current == 'usuarios.index' ? 'active' : 'none',
                    ]"
                >
                    <Link :href="route('usuarios.index')" class="menu-link">
                        <div class="menu-icon">
                            <i class="fa fa-users"></i>
                        </div>
                        <div class="menu-text">Usuarios</div>
                    </Link>
                </div>
                <div
                    class="menu-header"
                    v-if="
                        user_logeado.permisos == '*' ||
                        user_logeado.permisos.includes('reportes.usuarios') ||
                        user_logeado.permisos.includes('reportes.clientes')
                    "
                >
                    REPORTES
                </div>
                <div
                    v-if="
                        user_logeado.permisos == '*' ||
                        user_logeado.permisos.includes('reportes.usuarios')
                    "
                    class="menu-item"
                    :class="[
                        route_current == 'reportes.usuarios'
                            ? 'active'
                            : 'none',
                    ]"
                >
                    <Link :href="route('reportes.usuarios')" class="menu-link">
                        <div class="menu-icon">
                            <i class="fa fa-file-alt"></i>
                        </div>
                        <div class="menu-text">Lista de Usuarios</div>
                    </Link>
                </div>
                <div
                    v-if="
                        user_logeado.permisos == '*' ||
                        user_logeado.permisos.includes('reportes.clientes')
                    "
                    class="menu-item"
                    :class="[
                        route_current == 'reportes.clientes'
                            ? 'active'
                            : 'none',
                    ]"
                >
                    <Link :href="route('reportes.clientes')" class="menu-link">
                        <div class="menu-icon">
                            <i class="fa fa-file-alt"></i>
                        </div>
                        <div class="menu-text">Lista de Clientes</div>
                    </Link>
                </div>
                <div
                    v-if="
                        user_logeado.permisos == '*' ||
                        user_logeado.permisos.includes(
                            'reportes.reporte_financieros'
                        )
                    "
                    class="menu-item"
                    :class="[
                        route_current == 'reportes.reporte_financieros'
                            ? 'active'
                            : 'none',
                    ]"
                >
                    <Link
                        :href="route('reportes.reporte_financieros')"
                        class="menu-link"
                    >
                        <div class="menu-icon">
                            <i class="fa fa-file-alt"></i>
                        </div>
                        <div class="menu-text">Reporte Financiero</div>
                    </Link>
                </div>
                <div
                    v-if="
                        user_logeado.permisos == '*' ||
                        user_logeado.permisos.includes(
                            'reportes.greporte_financieros'
                        )
                    "
                    class="menu-item"
                    :class="[
                        route_current == 'reportes.greporte_financieros'
                            ? 'active'
                            : 'none',
                    ]"
                >
                    <Link
                        :href="route('reportes.greporte_financieros')"
                        class="menu-link"
                    >
                        <div class="menu-icon">
                            <i class="fa fa-chart-column"></i>
                        </div>
                        <div class="menu-text">G. Reporte Financiero</div>
                    </Link>
                </div>
                <div class="menu-header">OTROS</div>
                <div
                    v-if="
                        user_logeado.permisos == '*' ||
                        user_logeado.permisos.includes('configuracions.index')
                    "
                    class="menu-item"
                    :class="[
                        route_current == 'configuracions.index' ? 'active' : '',
                    ]"
                >
                    <Link
                        :href="route('configuracions.index')"
                        class="menu-link"
                    >
                        <div class="menu-icon">
                            <i class="fa fa-cog"></i>
                        </div>
                        <div class="menu-text">Configuración del sistema</div>
                    </Link>
                </div>
                <div class="menu-item">
                    <a href="#" class="menu-link" @click.prevent="logout">
                        <div class="menu-icon">
                            <i class="fa fa-power-off"></i>
                        </div>
                        <div class="menu-text">Salir</div>
                    </a>
                </div>

                <!-- BEGIN minify-button -->
                <div class="menu-item d-flex">
                    <a
                        href="javascript:;"
                        class="app-sidebar-minify-btn ms-auto d-flex align-items-center text-decoration-none"
                        data-toggle="app-sidebar-minify"
                        @click.prevent="toggleAppSidebarMinified()"
                        ><i class="fa fa-angle-double-left"></i
                    ></a>
                </div>
                <!-- END minify-button -->
            </div>
            <!-- END menu -->
        </div>
        <!-- END scrollbar -->
    </div>
    <div class="app-sidebar-bg"></div>
    <div class="app-sidebar-mobile-backdrop" @click="open_menu_mobile($event)">
        <a
            href="#"
            data-dismiss="app-sidebar-mobile"
            class="stretched-link"
        ></a>
    </div>
    <!-- END #sidebar -->
</template>
<style scoped>
.menu {
    padding: 0px;
}

.menu .menu-profile {
    padding: 15px 15px;
    border-bottom: 1px solid white;
    margin-bottom: 10px;
}
.app-sidebar.bg-dark .menu-header {
    background-color: var(--bg_blue_dark);
    padding: 5px;
    padding-left: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-transform: uppercase;
}
</style>
