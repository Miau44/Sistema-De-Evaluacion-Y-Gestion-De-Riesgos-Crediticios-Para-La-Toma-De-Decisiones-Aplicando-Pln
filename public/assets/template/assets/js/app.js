var app = {
        id: "#app",
        class: "app",
        isMobile:
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            ) || window.innerWidth < 767,
        bootstrap: {
            tooltip: { attr: 'data-bs-toggle="tooltip"' },
            popover: { attr: 'data-bs-toggle="popover"' },
            modal: {
                attr: 'data-bs-toggle="modal"',
                dismissAttr: 'data-bs-dismiss="modal"',
                event: { hidden: "hidden.bs.modal" },
            },
            nav: {
                class: "nav",
                tabs: {
                    class: "nav-tabs",
                    activeClass: "active",
                    itemClass: "nav-item",
                    itemLinkClass: "nav-link",
                },
            },
        },
        ajax: {
            attr: 'data-toggle="ajax"',
            clearOption: "",
            clearElement:
                "#app-sidebar-float-submenu, .jvectormap-label, .jvector-label, .AutoFill_border ,#gritter-notice-wrapper, .ui-autocomplete, .colorpicker, .FixedHeader_Header, .FixedHeader_Cloned .lightboxOverlay, .lightbox, .introjs-hints, .nvtooltip, .sp-container, .dz-hidden-input, .lightboxOverlay, .ui-helper-hidden-accessible",
            emptyElement: '[data-id="app-extra-elm"]',
            loader: {
                id: "#app-content-loader",
                html: '<span class="spinner d-block mx-auto my-5"></span>',
                class: "app-content-loading",
            },
            error: {
                html: '<div class="px-3 text-center fs-20px"><i class="fa fa-warning fa-lg text-muted me-1"></i> <span class="fw-600 text-inverse">Error 404! Page not found.</span></div>',
            },
        },
        header: {
            id: "#header",
            class: "app-header",
            hasScrollClass: "has-scroll",
            brand: { class: "navbar-brand" },
            floatingForm: {
                toggleAttr: 'data-toggle="app-header-floating-form"',
                dismissAttr: 'data-dismiss="app-header-floating-form"',
                toggledClass: "app-header-floating-form-toggled",
            },
            inverse: { class: "app-header-inverse" },
        },
        sidebar: {
            id: "#sidebar",
            class: "app-sidebar",
            scrollBar: { localStorage: "appSidebarScrollPosition", dom: "" },
            bg: { class: "app-sidebar-bg" },
            menu: {
                class: "menu",
                disableAnimationAttr: "data-disable-slide-animation",
                disableAutoCollapseAttr: "data-disable-auto-collapse",
                animationTime: 250,
                headerClass: "menu-header",
                itemClass: "menu-item",
                itemLinkClass: "menu-link",
                hasSubClass: "has-sub",
                activeClass: "active",
                expandingClass: "expanding",
                expandClass: "expand",
                closingClass: "closing",
                closedClass: "closed",
                submenu: { class: "menu-submenu" },
            },
            profile: {
                class: "menu-profile",
                toggleAttr: 'data-toggle="app-sidebar-profile"',
                targetAttr: "data-target",
            },
            mobile: {
                toggleAttr: 'data-toggle="app-sidebar-mobile"',
                dismissAttr: 'data-dismiss="app-sidebar-mobile"',
                toggledClass: "app-sidebar-mobile-toggled",
                closedClass: "app-sidebar-mobile-closed",
                backdrop: { class: "app-sidebar-mobile-backdrop" },
            },
            minify: {
                toggleAttr: 'data-toggle="app-sidebar-minify"',
                toggledClass: "app-sidebar-minified",
                cookieName: "app-sidebar-minified",
            },
            floatSubmenu: {
                id: "#app-sidebar-float-submenu",
                dom: "",
                timeout: "",
                class: "app-sidebar-float-submenu",
                container: { class: "app-sidebar-float-submenu-container" },
                arrow: {
                    id: "#app-sidebar-float-submenu-arrow",
                    class: "app-sidebar-float-submenu-arrow",
                },
                line: {
                    id: "#app-sidebar-float-submenu-line",
                    class: "app-sidebar-float-submenu-line",
                },
                overflow: { class: "overflow-scroll mh-100vh" },
            },
            search: {
                class: "menu-search",
                toggleAttr: 'data-sidebar-search="true"',
                hideClass: "d-none",
                foundClass: "has-text",
            },
            hover: { class: "app-with-hover-sidebar" },
            transparent: { class: "app-sidebar-transparent" },
        },
        sidebarEnd: {
            class: "app-sidebar-end",
            toggleAttr: 'data-toggle="app-sidebar-end"',
            toggledClass: "app-sidebar-end-toggled",
            collapsedClass: "app-sidebar-end-collapsed",
            mobile: {
                toggleAttr: 'data-toggle="app-sidebar-end-mobile"',
                dismissAttr: 'data-dismiss="app-sidebar-end-mobile"',
                toggledClass: "app-sidebar-end-mobile-toggled",
                collapsedClass: "app-sidebar-end-mobile-collapsed",
                closedClass: "app-sidebar-end-mobile-closed",
            },
        },
        topMenu: {
            id: "#top-menu",
            class: "app-top-menu",
            mobile: { toggleAttr: 'data-toggle="app-top-menu-mobile"' },
            menu: {
                class: "menu",
                itemClass: "menu-item",
                itemLinkClass: "menu-link",
                activeClass: "active",
                hasSubClass: "has-sub",
                expandClass: "expand",
                submenu: { class: "menu-submenu" },
            },
            control: {
                class: "menu-control",
                startClass: "menu-control-start",
                endClass: "menu-control-end",
                showClass: "show",
                buttonPrev: {
                    class: "menu-control-start",
                    toggleAttr: 'data-toggle="app-top-menu-prev"',
                },
                buttonNext: {
                    class: "menu-control-end",
                    toggleAttr: 'data-toggle="app-top-menu-next"',
                },
            },
        },
        scrollBar: {
            attr: 'data-scrollbar="true"',
            skipMobileAttr: "data-skip-mobile",
            initAttr: "data-init",
            heightAttr: "data-height",
            wheelPropagationAttr: "data-wheel-propagation",
        },
        scrollTo: {
            toggleAttr: 'data-toggle="scroll-to"',
            targetAttr: "data-target",
        },
        content: {
            id: "#content",
            class: "app-content",
            fullHeight: { class: "app-content-full-height" },
            fullWidth: { class: "app-content-full-width" },
        },
        layout: {
            sidebarEnd: { class: "app-with-end-sidebar" },
            sidebarWide: { class: "app-with-wide-sidebar" },
            sidebarMinified: { class: "app-sidebar-minified" },
            sidebarTwo: { class: "app-with-two-sidebar" },
            withoutHeader: { class: "app-without-header" },
            withoutSidebar: { class: "app-without-sidebar" },
            topMenu: { class: "app-with-top-menu" },
            boxedLayout: { class: "boxed-layout" },
        },
        loader: {
            class: "app-loader",
            fadingClass: "fading",
            fadingTime: 200,
            loadedClass: "loaded",
        },
        panel: {
            class: "panel",
            headClass: "panel-heading",
            titleClass: "panel-title",
            bodyClass: "panel-body",
            expandClass: "panel-expand",
            loadingClass: "panel-loading",
            loader: {
                class: "panel-loader",
                html: '<span class="spinner spinner-sm"></span>',
            },
            toggle: {
                remove: {
                    attr: 'data-toggle="panel-remove"',
                    tooltipText: "Remove",
                },
                collapse: {
                    attr: 'data-toggle="panel-collapse"',
                    tooltipText: "Collapse / Expand",
                },
                reload: {
                    attr: 'data-toggle="panel-reload"',
                    tooltipText: "Reload",
                },
                expand: {
                    attr: 'data-toggle="panel-expand"',
                    tooltipText: "Expand / Compress",
                },
            },
            draggable: {
                disableAttr: 'data-sortable="false"',
                connectedTarget: ".row > [class*=col]",
                spinnerHtml:
                    '<i class="fa fa-spinner fa-spin ms-2" data-id="title-spinner"></i>',
            },
            sortable: {
                class: "ui-sortable",
                attr: "data-sortable-id",
                spinnerAttr: 'data-id="title-spinner"',
                disableAttr: 'data-sortable="false"',
                parentAttr: 'class*="col-"',
            },
            localStorage: {
                notSupportMessage:
                    "Your browser is not supported with the local storage",
                loadedEvent: "localstorage-position-loaded",
                reset: {
                    attr: 'data-toggle="reset-local-storage"',
                    modal: {
                        id: "#modalResetLocalStorage",
                        title: "Reset Local Storage Confirmation",
                        message:
                            "Would you like to RESET all your saved widgets and clear Local Storage?",
                        alert: "info",
                        confirmResetAttr:
                            'data-toggle="confirm-reset-local-storage"',
                    },
                },
            },
        },
        scrollToTopBtn: {
            showClass: "show",
            heightShow: 200,
            toggleAttr: 'data-toggle="scroll-to-top"',
            scrollSpeed: 500,
        },
        unlimitedTabs: {
            class: "tab-overflow",
            overflowLeft: { class: "overflow-left" },
            overflowRight: { class: "overflow-right" },
            buttonNext: {
                class: "next-button",
                toggleAttr: 'data-click="next-tab"',
            },
            buttonPrev: {
                class: "prev-button",
                toggleAttr: 'data-click="prev-tab"',
            },
        },
        themePanel: {
            class: "theme-panel",
            toggleAttr: 'data-toggle="theme-panel-expand"',
            cookieName: "theme-panel-expand",
            activeClass: "active",
            themeListCLass: "theme-list",
            themeListItemCLass: "theme-list-item",
            theme: {
                toggleAttr: 'data-toggle="theme-selector"',
                cookieName: "app-theme",
                activeClass: "active",
                classAttr: "data-theme-class",
            },
            themeHeader: {
                toggleAttr: 'name="app-header-inverse"',
                cookieName: "app-theme-header",
            },
            themeHeaderFixed: {
                class: "app-header-fixed",
                toggleAttr: 'name="app-header-fixed"',
                cookieName: "app-header-fixed",
                disabledClass: "app-header-fixed-disabled",
                errorMessage:
                    "Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar.",
            },
            themeSidebarGrid: {
                class: "app-sidebar-grid",
                toggleAttr: 'name="app-sidebar-grid"',
                cookieName: "app-sidebar-grid",
            },
            themeGradientEnabled: {
                class: "app-gradient-enabled",
                toggleAttr: 'name="app-gradient-enabled"',
                cookieName: "app-gradient-enabled",
            },
            themeSidebarFixed: {
                class: "app-sidebar-fixed",
                toggleAttr: 'name="app-sidebar-fixed"',
                cookieName: "app-sidebar-fixed",
                disabledClass: "app-sidebar-fixed-disabled",
                errorMessage:
                    "Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.",
                mobileErrorMessage: "Mobile view sidebar will always fixed",
            },
            themeDarkMode: {
                class: "dark-mode",
                toggleAttr: 'name="app-theme-dark-mode"',
                cookieName: "app-theme-dark-mode",
            },
        },
        animation: {
            attr: "data-animation",
            valueAttr: "data-value",
            speed: 300,
            effect: "swing",
        },
        dismissClass: {
            toggleAttr: "data-dismiss-class",
            targetAttr: "data-target",
        },
        toggleClass: {
            toggleAttr: "data-toggle-class",
            targetAttr: "data-target",
        },
        helper: {
            display: { none: "d-none" },
            margin: { left: { 0: "ms-0" }, right: { 0: "me-0" } },
        },
        darkMode: {
            attr: "data-bs-theme",
            value: "dark",
            eventName: "theme-reload",
        },
        font: {},
        color: {},
        variablePrefix: "bs-",
        variableFontList: [
            "body-font-family",
            "body-font-size",
            "body-font-weight",
            "body-line-height",
        ],
        variableColorList: [
            "theme",
            "theme-rgb",
            "theme-color",
            "theme-color-rgb",
            "component-color",
            "component-color-rgb",
            "component-bg",
            "component-bg-rgb",
            "component-secondary-bg",
            "component-bg-rgb",
            "component-tertiary-bg",
            "component-tertiary-bg-rgb",
            "default",
            "default-rgb",
            "primary",
            "primary-rgb",
            "primary-bg-subtle",
            "primary-text",
            "primary-border-subtle",
            "secondary",
            "secondary-rgb",
            "secondary-bg-subtle",
            "secondary-text",
            "secondary-border-subtle",
            "success",
            "success-rgb",
            "success-bg-subtle",
            "success-text",
            "success-border-subtle",
            "warning",
            "warning-rgb",
            "warning-bg-subtle",
            "warning-text",
            "warning-border-subtle",
            "info",
            "info-rgb",
            "info-bg-subtle",
            "info-text",
            "info-border-subtle",
            "danger",
            "danger-rgb",
            "danger-bg-subtle",
            "danger-text",
            "danger-border-subtle",
            "light",
            "light-rgb",
            "light-bg-subtle",
            "light-text",
            "light-border-subtle",
            "dark",
            "dark-rgb",
            "dark-bg-subtle",
            "dark-text",
            "dark-border-subtle",
            "black",
            "black-rgb",
            "blue",
            "blue-rgb",
            "inverse",
            "inverse-rgb",
            "white",
            "white-rgb",
            "red",
            "red-rgb",
            "teal",
            "teal-rgb",
            "indigo",
            "indigo-rgb",
            "orange",
            "orange-rgb",
            "purple",
            "purple-rgb",
            "yellow",
            "yellow-rgb",
            "green",
            "green-rgb",
            "pink",
            "pink-rgb",
            "cyan",
            "cyan-rgb",
            "gray",
            "gray-rgb",
            "lime",
            "lime-rgb",
            "gray-100",
            "gray-200",
            "gray-300",
            "gray-400",
            "gray-500",
            "gray-600",
            "gray-700",
            "gray-800",
            "gray-900",
            "gray-100-rgb",
            "gray-200-rgb",
            "gray-300-rgb",
            "gray-400-rgb",
            "gray-500-rgb",
            "gray-600-rgb",
            "gray-700-rgb",
            "gray-800-rgb",
            "gray-900-rgb",
            "muted",
            "muted-rgb",
            "emphasis-color",
            "emphasis-color-rgb",
            "heading-color",
            "body-bg",
            "body-bg-rgb",
            "body-color",
            "body-color-rgb",
            "secondary-color",
            "secondary-color-rgb",
            "secondary-bg",
            "secondary-bg-rgb",
            "tertiary-color",
            "tertiary-color-rgb",
            "tertiary-bg",
            "tertiary-bg-rgb",
            "link-color",
            "link-color-rgb",
            "link-hover-color",
            "link-hover-color-rgb",
            "border-color",
            "border-color-translucent",
        ],
        breakpoints: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            xxl: 1400,
            xxxl: 1800,
        },
    },
    slideUp = function (e, a = app.animation.speed) {
        e.classList.contains("transitioning") ||
            (e.classList.add("transitioning"),
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = a + "ms"),
            (e.style.boxSizing = "border-box"),
            (e.style.height = e.offsetHeight + "px"),
            e.offsetHeight,
            (e.style.overflow = "hidden"),
            (e.style.height = 0),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            window.setTimeout(() => {
                (e.style.display = "none"),
                    e.style.removeProperty("height"),
                    e.style.removeProperty("padding-top"),
                    e.style.removeProperty("padding-bottom"),
                    e.style.removeProperty("margin-top"),
                    e.style.removeProperty("margin-bottom"),
                    e.style.removeProperty("overflow"),
                    e.style.removeProperty("transition-duration"),
                    e.style.removeProperty("transition-property"),
                    e.classList.remove("transitioning");
            }, a));
    },
    slideDown = function (e, a = app.animation.speed) {
        if (!e.classList.contains("transitioning")) {
            e.classList.add("transitioning"), e.style.removeProperty("display");
            let t = window.getComputedStyle(e).display;
            "none" === t && (t = "block"), (e.style.display = t);
            let s = e.offsetHeight;
            (e.style.overflow = "hidden"),
                (e.style.height = 0),
                (e.style.paddingTop = 0),
                (e.style.paddingBottom = 0),
                (e.style.marginTop = 0),
                (e.style.marginBottom = 0),
                e.offsetHeight,
                (e.style.boxSizing = "border-box"),
                (e.style.transitionProperty = "height, margin, padding"),
                (e.style.transitionDuration = a + "ms"),
                (e.style.height = s + "px"),
                e.style.removeProperty("padding-top"),
                e.style.removeProperty("padding-bottom"),
                e.style.removeProperty("margin-top"),
                e.style.removeProperty("margin-bottom"),
                window.setTimeout(() => {
                    e.style.removeProperty("height"),
                        e.style.removeProperty("overflow"),
                        e.style.removeProperty("transition-duration"),
                        e.style.removeProperty("transition-property"),
                        e.classList.remove("transitioning");
                }, a);
        }
    },
    slideToggle = function (e, a = app.animation.speed) {
        return "none" === window.getComputedStyle(e).display
            ? slideDown(e, a)
            : slideUp(e, a);
    },
    setCookie = function (e, a) {
        var t = new Date(),
            s = t.getTime() + 36e6;
        t.setTime(s),
            (document.cookie =
                e + "=" + a + ";expires=" + t.toUTCString() + ";path=/");
    },
    getCookie = function (e) {
        let a = e + "=",
            t = decodeURIComponent(document.cookie).split(";");
        for (let e = 0; e < t.length; e++) {
            let s = t[e];
            for (; " " == s.charAt(0); ) s = s.substring(1);
            if (0 == s.indexOf(a)) return s.substring(a.length, s.length);
        }
        return "";
    },
    getParents = function (e, a) {
        void 0 === a && (a = document);
        for (var t = [], s = e.parentNode; s !== a; ) {
            var l = s;
            t.push(l), (s = l.parentNode);
        }
        return t.push(a), t;
    },
    setInnerHTML = function (e, a) {
        (e.innerHTML = a),
            Array.from(e.querySelectorAll("script")).forEach((e) => {
                const a = document.createElement("script");
                Array.from(e.attributes).forEach((e) =>
                    a.setAttribute(e.name, e.value)
                ),
                    a.appendChild(document.createTextNode(e.innerHTML)),
                    e.parentNode.replaceChild(a, e);
            });
    },
    handleScrollbar = function () {
        "use strict";
        for (
            var e = document.querySelectorAll("[" + app.scrollBar.attr + "]"),
                a = 0;
            a < e.length;
            a++
        )
            generateScrollbar(e[a]);
    },
    generateScrollbar = function (e) {
        "use strict";
        if (
            !(
                e.scrollbarInit ||
                (app.isMobile && e.getAttribute(app.scrollBar.skipMobileAttr))
            )
        ) {
            var a = e.getAttribute(app.scrollBar.heightAttr)
                ? e.getAttribute(app.scrollBar.heightAttr)
                : e.offsetHeight;
            if (((e.style.height = a), (e.scrollbarInit = !0), app.isMobile))
                e.style.overflowX = "scroll";
            else {
                var t =
                    !!e.getAttribute(app.scrollBar.wheelPropagationAttr) &&
                    e.getAttribute(app.scrollBar.wheelPropagationAttr);
                e.closest(
                    "." +
                        app.sidebar.class +
                        ":not(." +
                        app.sidebarEnd.class +
                        ")"
                ) &&
                0 !==
                    e.closest(
                        "." +
                            app.sidebar.class +
                            ":not(." +
                            app.sidebarEnd.class +
                            ")"
                    ).length
                    ? (app.sidebar.scrollBar.dom = new PerfectScrollbar(e, {
                          wheelPropagation: t,
                      }))
                    : new PerfectScrollbar(e, { wheelPropagation: t });
            }
        }
    },
    handleSidebarMenuToggle = function (e, a) {
        e.map(function (t) {
            t.onclick = function (t) {
                t.preventDefault();
                var s = this.nextElementSibling;
                e.map(function (e) {
                    var t = e.nextElementSibling;
                    t !== s &&
                        (slideUp(t, a),
                        t
                            .closest("." + app.sidebar.menu.itemClass)
                            .classList.remove(app.sidebar.menu.expandClass),
                        t
                            .closest("." + app.sidebar.menu.itemClass)
                            .classList.add(app.sidebar.menu.closedClass));
                });
                var l = s.closest("." + app.sidebar.menu.itemClass);
                l.classList.contains(app.sidebar.menu.expandClass) ||
                (l.classList.contains(app.sidebar.menu.activeClass) &&
                    !s.style.display)
                    ? (l.classList.remove(app.sidebar.menu.expandClass),
                      l.classList.add(app.sidebar.menu.closedClass),
                      slideToggle(s, a))
                    : (l.classList.add(app.sidebar.menu.expandClass),
                      l.classList.remove(app.sidebar.menu.closedClass),
                      slideToggle(s, a));
            };
        });
    },
    handleSidebarMenu = function () {
        "use strict";
        var e = document.querySelector(
                "." + app.sidebar.class + ":not(." + app.sidebarEnd.class + ")"
            ),
            a =
                e && e.getAttribute(app.sidebar.menu.disableAnimationAttr)
                    ? 0
                    : app.sidebar.menu.animationTime,
            t =
                (e && e.getAttribute(app.sidebar.menu.disableAutoCollapseAttr),
                "." +
                    app.sidebar.class +
                    " ." +
                    app.sidebar.menu.class +
                    " > ." +
                    app.sidebar.menu.itemClass +
                    "." +
                    app.sidebar.menu.hasSubClass),
            s =
                " > ." +
                app.sidebar.menu.submenu.class +
                " > ." +
                app.sidebar.menu.itemClass +
                "." +
                app.sidebar.menu.hasSubClass,
            l = t + " > ." + app.sidebar.menu.itemLinkClass,
            o = [].slice.call(document.querySelectorAll(l));
        o && handleSidebarMenuToggle(o, a);
        var r = t + s,
            n = [].slice.call(
                document.querySelectorAll(
                    r + " > ." + app.sidebar.menu.itemLinkClass
                )
            );
        n && handleSidebarMenuToggle(n, a);
        var i = t + s + s,
            p = [].slice.call(
                document.querySelectorAll(
                    i + " > ." + app.sidebar.menu.itemLinkClass
                )
            );
        p && handleSidebarMenuToggle(p, a);
    },
    handleSidebarToggle = function () {
        "use strict";
        [].slice
            .call(
                document.querySelectorAll(
                    "[" + app.sidebar.mobile.toggleAttr + "]"
                )
            )
            .map(function (e) {
                e.onclick = function (e) {
                    e.preventDefault(),
                        document
                            .querySelector("." + app.class)
                            .classList.add(app.sidebar.mobile.toggledClass),
                        document
                            .querySelector("." + app.class)
                            .classList.remove(app.sidebar.mobile.closedClass);
                };
            }),
            [].slice
                .call(
                    document.querySelectorAll(
                        "[" + app.sidebar.mobile.dismissAttr + "]"
                    )
                )
                .map(function (e) {
                    e.onclick = function (e) {
                        e.preventDefault(),
                            document
                                .querySelector("." + app.class)
                                .classList.remove(
                                    app.sidebar.mobile.toggledClass
                                ),
                            document
                                .querySelector("." + app.class)
                                .classList.add(app.sidebar.mobile.closedClass);
                    };
                }),
            [].slice
                .call(
                    document.querySelectorAll(
                        "." +
                            app.sidebar.class +
                            ":not(." +
                            app.sidebarEnd.class +
                            ")"
                    )
                )
                .map(function (e) {
                    e.addEventListener("animationend", function () {
                        document
                            .querySelector("." + app.class)
                            .classList.remove(app.sidebar.mobile.closedClass);
                    });
                });
    },
    handleSidebarEndToggle = function () {
        "use strict";
        [].slice
            .call(
                document.querySelectorAll("[" + app.sidebarEnd.toggleAttr + "]")
            )
            .map(function (e) {
                e.onclick = function (e) {
                    e.preventDefault();
                    var a = document.querySelector("." + app.class).classList;
                    a.contains(app.sidebarEnd.toggledClass) ||
                    a.contains(app.sidebarEnd.collapsedClass)
                        ? a.contains(app.sidebarEnd.toggledClass)
                            ? (a.remove(app.sidebarEnd.toggledClass),
                              a.add(app.sidebarEnd.collapsedClass))
                            : (a.remove(app.sidebarEnd.collapsedClass),
                              a.add(app.sidebarEnd.toggledClass))
                        : a.add(app.sidebarEnd.collapsedClass);
                };
            }),
            [].slice
                .call(
                    document.querySelectorAll(
                        "[" + app.sidebarEnd.mobile.toggleAttr + "]"
                    )
                )
                .map(function (e) {
                    e.onclick = function (e) {
                        e.preventDefault(),
                            document
                                .querySelector("." + app.class)
                                .classList.add(
                                    app.sidebarEnd.mobile.toggledClass
                                ),
                            document
                                .querySelector("." + app.class)
                                .classList.remove(
                                    app.sidebarEnd.mobile.closedClass
                                );
                    };
                }),
            [].slice
                .call(
                    document.querySelectorAll(
                        "[" + app.sidebarEnd.mobile.dismissAttr + "]"
                    )
                )
                .map(function (e) {
                    e.onclick = function (e) {
                        e.preventDefault(),
                            document
                                .querySelector("." + app.class)
                                .classList.remove(
                                    app.sidebarEnd.mobile.toggledClass
                                ),
                            document
                                .querySelector("." + app.class)
                                .classList.add(
                                    app.sidebarEnd.mobile.closedClass
                                );
                    };
                }),
            [].slice
                .call(
                    document.querySelectorAll(
                        "." + app.sidebar.class + "." + app.sidebarEnd.class
                    )
                )
                .map(function (e) {
                    e.addEventListener("animationend", function () {
                        document
                            .querySelector("." + app.class)
                            .classList.remove(
                                app.sidebarEnd.mobile.closedClass
                            );
                    });
                });
    },
    handleSidebarMinify = function () {
        "use strict";
        [].slice
            .call(
                document.querySelectorAll(
                    "[" + app.sidebar.minify.toggleAttr + "]"
                )
            )
            .map(function (e) {
                e.onclick = function (e) {
                    e.preventDefault();
                    var a = document.querySelector("." + app.class).classList,
                        t = !1;
                    a.contains(app.sidebar.minify.toggledClass)
                        ? a.remove(app.sidebar.minify.toggledClass)
                        : (a.add(app.sidebar.minify.toggledClass), (t = !0)),
                        document.querySelector(app.sidebar.floatSubmenu.id) &&
                            document
                                .querySelector(app.sidebar.floatSubmenu.id)
                                .remove(),
                        setCookie(app.sidebar.minify.cookieName, t);
                };
            }),
            getCookie(app.sidebar.minify.cookieName) &&
                "true" == getCookie(app.sidebar.minify.cookieName) &&
                document
                    .querySelector("." + app.class)
                    .classList.add(app.sidebar.minify.toggledClass);
    },
    handlePageLoader = function () {
        "use strict";
        var e = document.querySelector("." + app.loader.class);
        e &&
            (e.addEventListener("animationend", function () {
                e.classList.remove(app.loader.fadingClass),
                    e.classList.add(app.loader.loadedClass);
            }),
            e.classList.add(app.loader.fadingClass));
    },
    handlePanelAction = function () {
        "use strict";
        var e;
        [].slice
            .call(
                document.querySelectorAll(
                    "[" + app.panel.toggle.remove.attr + "]"
                )
            )
            .map(function (a) {
                (a.onmouseover = function (a) {
                    !this.hasAttribute("data-tooltip-init") &&
                        bootstrap &&
                        ((e = new bootstrap.Tooltip(this, {
                            title: app.panel.toggle.remove.tooltipText,
                            placement: "bottom",
                        })).show(),
                        this.setAttribute("data-tooltip-init", !0));
                }),
                    (a.onclick = function (e) {
                        e.preventDefault(),
                            document.querySelector(".tooltip").remove(),
                            this.closest("." + app.panel.class).remove();
                    });
            }),
            [].slice
                .call(
                    document.querySelectorAll(
                        "[" + app.panel.toggle.collapse.attr + "]"
                    )
                )
                .map(function (a) {
                    (a.onmouseover = function (a) {
                        !this.hasAttribute("data-tooltip-init") &&
                            bootstrap &&
                            ((e = new bootstrap.Tooltip(this, {
                                title: app.panel.toggle.collapse.tooltipText,
                                placement: "bottom",
                            })).show(),
                            this.setAttribute("data-tooltip-init", !0));
                    }),
                        (a.onclick = function (a) {
                            a.preventDefault(),
                                e.hide(),
                                slideToggle(
                                    this.closest(
                                        "." + app.panel.class
                                    ).querySelector("." + app.panel.bodyClass)
                                );
                        });
                }),
            [].slice
                .call(
                    document.querySelectorAll(
                        "[" + app.panel.toggle.reload.attr + "]"
                    )
                )
                .map(function (a) {
                    (a.onmouseover = function (a) {
                        !this.hasAttribute("data-tooltip-init") &&
                            bootstrap &&
                            ((e = new bootstrap.Tooltip(this, {
                                title: app.panel.toggle.reload.tooltipText,
                                placement: "bottom",
                            })).show(),
                            this.setAttribute("data-tooltip-init", !0));
                    }),
                        (a.onclick = function (a) {
                            a.preventDefault(), e && e.hide();
                            var t = this.closest("." + app.panel.class);
                            if (!t.classList.contains(app.panel.loadingClass)) {
                                var s = t.querySelector(
                                        "." + app.panel.bodyClass
                                    ),
                                    l = document.createElement("div");
                                l.classList.add(app.panel.loader.class),
                                    (l.innerHTML = app.panel.loader.html),
                                    t.classList.add(app.panel.loadingClass),
                                    s.appendChild(l),
                                    setTimeout(() => {
                                        t.classList.remove(
                                            app.panel.loadingClass
                                        ),
                                            t
                                                .querySelector(
                                                    "." + app.panel.loader.class
                                                )
                                                .remove();
                                    }, 2e3);
                            }
                        });
                }),
            [].slice
                .call(
                    document.querySelectorAll(
                        "[" + app.panel.toggle.expand.attr + "]"
                    )
                )
                .map(function (a) {
                    (a.onmouseover = function () {
                        !this.hasAttribute("data-tooltip-init") &&
                            bootstrap &&
                            ((e = new bootstrap.Tooltip(this, {
                                title: app.panel.toggle.expand.tooltipText,
                                placement: "bottom",
                            })).show(),
                            this.setAttribute("data-tooltip-init", !0));
                    }),
                        (a.onclick = function (a) {
                            a.preventDefault(), e && e.hide();
                            var t = this.closest("." + app.panel.class),
                                s = t.querySelector("." + app.panel.bodyClass);
                            if (s) {
                                var l = t.offsetTop;
                                s.offsetTop - l;
                            }
                            document.body.classList.contains(
                                app.panel.expandClass
                            ) && t.classList.contains(app.panel.expandClass)
                                ? (document.body.classList.remove(
                                      app.panel.expandClass
                                  ),
                                  t.classList.remove(app.panel.expandClass),
                                  t.removeAttribute("style"),
                                  s.removeAttribute("style"))
                                : (document.body.classList.add(
                                      app.panel.expandClass
                                  ),
                                  this.closest(
                                      "." + app.panel.class
                                  ).classList.add(app.panel.expandClass));
                        });
                });
    },
    handlePanelDraggable = function () {
        "use strict";
        if (jQuery) {
            var e = $(
                    "." +
                        app.panel.class +
                        ":not([" +
                        app.panel.draggable.disableAttr +
                        "])"
                ).parent("[class*=col]"),
                a = "." + app.panel.headClass,
                t = app.panel.draggable.connectedTarget;
            $(e).sortable({
                handle: a,
                connectWith: t,
                stop: function (e, a) {
                    a.item
                        .find("." + app.panel.titleClass)
                        .append(app.panel.draggable.spinnerHtml),
                        handleSavePanelPosition(a.item);
                },
            });
        }
    },
    handelTooltipPopoverActivation = function () {
        "use strict";
        if (
            0 !==
            document.querySelectorAll("[" + app.bootstrap.tooltip.attr + "]")
                .length
        )
            [].slice
                .call(
                    document.querySelectorAll(
                        "[" + app.bootstrap.tooltip.attr + "]"
                    )
                )
                .map(function (e) {
                    return new bootstrap.Tooltip(e);
                });
        if (
            0 !==
            document.querySelectorAll("[" + app.bootstrap.popover.attr + "]")
                .length
        )
            [].slice
                .call(
                    document.querySelectorAll(
                        "[" + app.bootstrap.popover.attr + "]"
                    )
                )
                .map(function (e) {
                    return new bootstrap.Popover(e);
                });
    },
    handleScrollToTopButton = function () {
        "use strict";
        (document.body.onscroll = function () {
            var e = this.scrollY,
                a = document.querySelector(
                    "[" + app.scrollToTopBtn.toggleAttr + "]"
                );
            a &&
                (e >= app.scrollToTopBtn.heightShow
                    ? a.classList.contains(app.scrollToTopBtn.showClass) ||
                      a.classList.add(app.scrollToTopBtn.showClass)
                    : a.classList.remove(app.scrollToTopBtn.showClass));
        }),
            [].slice
                .call(
                    document.querySelectorAll(
                        "[" + app.scrollToTopBtn.toggleAttr + "]"
                    )
                )
                .map(function (e) {
                    e.onclick = function (e) {
                        e.preventDefault(), window.scrollTo(0, 0);
                    };
                });
    },
    handleThemePanel = function () {
        "use strict";
        var e, a;
        ((a = document.querySelector("[" + app.themePanel.toggleAttr + "]")) &&
            (a.onclick = function (e) {
                e.preventDefault();
                var a = document.querySelector("." + app.themePanel.class),
                    t = !a.classList.contains(app.themePanel.activeClass);
                a.classList.toggle(app.themePanel.activeClass),
                    setCookie(app.themePanel.cookieName, t);
            }),
        (e = [].slice.call(
            document.querySelectorAll(
                "." +
                    app.themePanel.class +
                    " [" +
                    app.themePanel.theme.toggleAttr +
                    "]"
            )
        )) &&
            e.map(function (e) {
                e.onclick = function () {
                    for (
                        var a = this.getAttribute(
                                app.themePanel.theme.classAttr
                            ),
                            t = 0;
                        t < document.body.classList.length;
                        t++
                    ) {
                        var s = document.body.classList[t];
                        s.search("theme-") > -1 &&
                            document.body.classList.remove(s);
                    }
                    a && document.body.classList.add(a),
                        [].slice
                            .call(
                                document.querySelectorAll(
                                    "." +
                                        app.themePanel.class +
                                        " [" +
                                        app.themePanel.theme.toggleAttr +
                                        "]"
                                )
                            )
                            .map(function (a) {
                                a != e
                                    ? a
                                          .closest(
                                              "." +
                                                  app.themePanel
                                                      .themeListItemCLass
                                          )
                                          .classList.remove(
                                              app.themePanel.theme.activeClass
                                          )
                                    : a
                                          .closest(
                                              "." +
                                                  app.themePanel
                                                      .themeListItemCLass
                                          )
                                          .classList.add(
                                              app.themePanel.theme.activeClass
                                          );
                            }),
                        setCookie(app.themePanel.theme.cookieName, a);
                };
            }),
        (a = document.querySelector(
            "." +
                app.themePanel.class +
                " [" +
                app.themePanel.themeHeader.toggleAttr +
                "]"
        )) &&
            (a.onchange = function () {
                this.checked
                    ? document
                          .querySelector("." + app.header.class)
                          .setAttribute(app.darkMode.attr, app.darkMode.value)
                    : document
                          .querySelector("." + app.header.class)
                          .removeAttribute(app.darkMode.attr),
                    setCookie(
                        app.themePanel.themeHeader.cookieName,
                        !!this.checked
                    );
            }),
        (a = document.querySelector(
            "." +
                app.themePanel.class +
                " [" +
                app.themePanel.themeHeaderFixed.toggleAttr +
                "]"
        )) &&
            (a.onchange = function () {
                this.checked
                    ? document
                          .querySelector("." + app.class)
                          .classList.add(app.themePanel.themeHeaderFixed.class)
                    : (document.querySelector(
                          "[" +
                              app.themePanel.themeSidebarFixed.toggleAttr +
                              "]"
                      ).checked &&
                          !app.isMobile &&
                          (alert(app.themePanel.themeHeaderFixed.errorMessage),
                          (document.querySelector(
                              "[" +
                                  app.themePanel.themeSidebarFixed.toggleAttr +
                                  "]"
                          ).checked = !1),
                          document
                              .querySelector(
                                  "[" +
                                      app.themePanel.themeSidebarFixed
                                          .toggleAttr +
                                      "]"
                              )
                              .onchange()),
                      document
                          .querySelector("." + app.class)
                          .classList.remove(
                              app.themePanel.themeHeaderFixed.class
                          )),
                    setCookie(
                        app.themePanel.themeHeaderFixed.cookieName,
                        !!this.checked
                    );
            }),
        (a = document.querySelector(
            "." +
                app.themePanel.class +
                " [" +
                app.themePanel.themeSidebarGrid.toggleAttr +
                "]"
        )) &&
            (a.onchange = function () {
                this.checked
                    ? document
                          .querySelector("." + app.sidebar.class)
                          .classList.add(app.themePanel.themeSidebarGrid.class)
                    : document
                          .querySelector("." + app.sidebar.class)
                          .classList.remove(
                              app.themePanel.themeSidebarGrid.class
                          ),
                    setCookie(
                        app.themePanel.themeSidebarGrid.cookieName,
                        this.checked
                            ? app.themePanel.themeSidebarGrid.class
                            : ""
                    );
            }),
        (a = document.querySelector(
            "." +
                app.themePanel.class +
                " [" +
                app.themePanel.themeSidebarFixed.toggleAttr +
                "]"
        )) &&
            (a.onchange = function () {
                var e =
                    "." +
                    app.sidebar.class +
                    ":not(." +
                    app.sidebarEnd.class +
                    ") [" +
                    app.scrollBar.attr +
                    "]";
                app.isMobile
                    ? ((this.checked = !0),
                      alert(
                          app.themePanel.themeSidebarFixed.mobileErrorMessage
                      ))
                    : (this.checked
                          ? (document.querySelector(
                                "." +
                                    app.themePanel.class +
                                    " [" +
                                    app.themePanel.themeHeaderFixed.toggleAttr +
                                    "]"
                            ).checked ||
                                (alert(
                                    app.themePanel.themeSidebarFixed
                                        .errorMessage
                                ),
                                (document.querySelector(
                                    "[" +
                                        app.themePanel.themeHeaderFixed
                                            .toggleAttr +
                                        "]"
                                ).checked = !0),
                                document
                                    .querySelector(
                                        "[" +
                                            app.themePanel.themeHeaderFixed
                                                .toggleAttr +
                                            "]"
                                    )
                                    .onchange(),
                                document
                                    .querySelector("." + app.class)
                                    .classList.add(
                                        app.themePanel.themeHeaderFixed.class
                                    )),
                            document
                                .querySelector("." + app.class)
                                .classList.add(
                                    app.themePanel.themeSidebarFixed.class
                                ),
                            (document.querySelector(e).scrollbarInit = ""),
                            generateScrollbar(document.querySelector(e)))
                          : (document
                                .querySelector("." + app.class)
                                .classList.remove(
                                    app.themePanel.themeSidebarFixed.class
                                ),
                            app.sidebar.scrollBar.dom.destroy(),
                            (app.sidebar.scrollBar.dom = ""),
                            document
                                .querySelector(e)
                                .removeAttribute(app.scrollBar.initAttr)),
                      setCookie(
                          app.themePanel.themeSidebarFixed.cookieName,
                          !!this.checked
                      ));
            }),
        (a = document.querySelector(
            "." +
                app.themePanel.class +
                " [" +
                app.themePanel.themeGradientEnabled.toggleAttr +
                "]"
        )) &&
            (a.onchange = function () {
                this.checked
                    ? document
                          .querySelector("." + app.class)
                          .classList.add(
                              app.themePanel.themeGradientEnabled.class
                          )
                    : document
                          .querySelector("." + app.class)
                          .classList.remove(
                              app.themePanel.themeGradientEnabled.class
                          ),
                    setCookie(
                        app.themePanel.themeGradientEnabled.cookieName,
                        this.checked
                            ? app.themePanel.themeGradientEnabled.class
                            : ""
                    );
            }),
        (e = [].slice.call(
            document.querySelectorAll(
                "." +
                    app.themePanel.class +
                    " [" +
                    app.themePanel.themeDarkMode.toggleAttr +
                    "]"
            )
        )).map(function (e) {
            e.onchange = function () {
                this.checked
                    ? document
                          .querySelector("html")
                          .setAttribute(app.darkMode.attr, app.darkMode.value)
                    : document
                          .querySelector("html")
                          .removeAttribute(app.darkMode.attr),
                    App.initVariable(),
                    setCookie(
                        app.themePanel.themeDarkMode.cookieName,
                        this.checked ? app.themePanel.themeDarkMode.class : ""
                    ),
                    document.dispatchEvent(
                        new CustomEvent(app.darkMode.eventName)
                    );
            };
        }),
        getCookie(app.themePanel.cookieName) &&
            "true" == getCookie(app.themePanel.cookieName)) &&
            (a = document.querySelector(
                "." +
                    app.themePanel.class +
                    " [" +
                    app.themePanel.toggleAttr +
                    "]"
            )) &&
            a.click();
        getCookie(app.themePanel.theme.cookieName) &&
            (a = document.querySelector(
                "." +
                    app.themePanel.class +
                    " [" +
                    app.themePanel.theme.toggleAttr +
                    "][" +
                    app.themePanel.theme.classAttr +
                    '="' +
                    getCookie(app.themePanel.theme.cookieName) +
                    '"]'
            )) &&
            a.click();
        getCookie(app.themePanel.themeDarkMode.cookieName) &&
            (a = document.querySelector(
                "." +
                    app.themePanel.class +
                    " [" +
                    app.themePanel.themeDarkMode.toggleAttr +
                    "]"
            )) &&
            ((a.checked = !0), a.onchange());
        getCookie(app.themePanel.themeGradientEnabled.cookieName) &&
            (a = document.querySelector(
                "." +
                    app.themePanel.class +
                    " [" +
                    app.themePanel.themeGradientEnabled.toggleAttr +
                    "]"
            )) &&
            ((a.checked = !0), a.onchange());
        getCookie(app.themePanel.themeSidebarGrid.cookieName) &&
            (a = document.querySelector(
                "." +
                    app.themePanel.class +
                    " [" +
                    app.themePanel.themeSidebarGrid.toggleAttr +
                    "]"
            )) &&
            ((a.checked = !0), a.onchange());
        "false" == getCookie(app.themePanel.themeSidebarFixed.cookieName) &&
            (a = document.querySelector(
                "." +
                    app.themePanel.class +
                    " [" +
                    app.themePanel.themeSidebarFixed.toggleAttr +
                    "]"
            )) &&
            ((a.checked = !1), a.onchange());
        "false" == getCookie(app.themePanel.themeHeaderFixed.cookieName) &&
            (a = document.querySelector(
                "." +
                    app.themePanel.class +
                    " [" +
                    app.themePanel.themeHeaderFixed.toggleAttr +
                    "]"
            )) &&
            ((a.checked = !1), a.onchange());
        "true" == getCookie(app.themePanel.themeHeader.cookieName) &&
            (a = document.querySelector(
                "." +
                    app.themePanel.class +
                    " [" +
                    app.themePanel.themeHeader.toggleAttr +
                    "]"
            )) &&
            ((a.checked = !0), a.onchange());
    },
    handleSavePanelPosition = function (e) {
        "use strict";
        if (jQuery && 0 !== $("." + app.panel.sortable.class).length) {
            var a = [];
            $.when(
                $("." + app.panel.sortable.class).each(function () {
                    var e = $(this).find("[" + app.panel.sortable.attr + "]");
                    if (0 !== e.length) {
                        var t = [];
                        $(e).each(function () {
                            var e = $(this).attr(app.panel.sortable.attr);
                            t.push({ id: e });
                        }),
                            a.push(t);
                    } else a.push([]);
                    0;
                })
            ).done(function () {
                var t = window.location.href;
                (t = (t = t.split("?"))[0]),
                    localStorage.setItem(t, JSON.stringify(a)),
                    $(e)
                        .find("[" + app.panel.sortable.spinnerAttr + "]")
                        .delay(500)
                        .fadeOut(500, function () {
                            $(this).remove();
                        });
            });
        }
    },
    handleLocalStorage = function () {
        "use strict";
        try {
            if (
                "undefined" != typeof Storage &&
                "undefined" != typeof localStorage &&
                jQuery
            ) {
                var e = window.location.href;
                e = (e = e.split("?"))[0];
                var a = localStorage.getItem(e);
                if (a) {
                    a = JSON.parse(a);
                    var t = 0;
                    $.when(
                        $(
                            "." +
                                app.panel.class +
                                ":not([" +
                                app.panel.sortable.disableAttr +
                                "])"
                        )
                            .parent("[" + app.panel.sortable.parentAttr + "]")
                            .each(function () {
                                var e = a[t],
                                    s = $(this);
                                e &&
                                    $.each(e, function (e, a) {
                                        var t = $(
                                            "[" +
                                                app.panel.sortable.attr +
                                                '="' +
                                                a.id +
                                                '"]'
                                        ).not('[data-init="true"]');
                                        if (0 !== $(t).length) {
                                            var l = $(t).clone();
                                            $(t).remove(),
                                                $(s).append(l),
                                                $(
                                                    "[" +
                                                        app.panel.sortable
                                                            .attr +
                                                        '="' +
                                                        a.id +
                                                        '"]'
                                                ).attr("data-init", "true");
                                        }
                                    }),
                                    t++;
                            })
                    ).done(function () {
                        window.dispatchEvent(
                            new CustomEvent(app.panel.localStorage.loadedEvent)
                        );
                    });
                }
            } else alert(app.panel.localStorage.notSupportMessage);
        } catch (e) {
            console.log(e);
        }
    },
    handleResetLocalStorage = function () {
        "use strict";
        var e = document.querySelector(
            "[" + app.panel.localStorage.reset.attr + "]"
        );
        e &&
            (e.onclick = function (e) {
                e.preventDefault();
                var a = document.createElement("div");
                a.classList.add("modal"),
                    a.classList.add("fade"),
                    a.setAttribute(
                        "data-modal-id",
                        app.panel.localStorage.reset.modal.id
                    ),
                    (a.innerHTML =
                        '    <div class="modal-dialog">        <div class="modal-content">            <div class="modal-header">                <h4 class="modal-title"><i class="fa fa-redo me-1"></i> ' +
                        app.panel.localStorage.reset.modal.title +
                        '</h4>                <button type="button" class="btn-close" ' +
                        app.bootstrap.modal.dismissAttr +
                        '></button>            </div>            <div class="modal-body">                <div class="alert alert-' +
                        app.panel.localStorage.reset.modal.alert +
                        ' mb-0">' +
                        app.panel.localStorage.reset.modal.message +
                        '</div>            </div>            <div class="modal-footer">                <a href="javascript:;" class="btn btn-sm btn-default" ' +
                        app.bootstrap.modal.dismissAttr +
                        '><i class="fa fa-times me-1"></i> No</a>                <a href="javascript:;" class="btn btn-sm btn-inverse" ' +
                        app.panel.localStorage.reset.modal.confirmResetAttr +
                        '><i class="fa fa-check me-1"></i> Yes</a>            </div>        </div>    </div>'),
                    document.body.appendChild(a);
                var t = document.querySelector(
                    '[data-modal-id="' +
                        app.panel.localStorage.reset.modal.id +
                        '"]'
                );
                new bootstrap.Modal(t).show(),
                    t.addEventListener(
                        app.bootstrap.modal.event.hidden,
                        function () {
                            t.remove();
                        }
                    );
                var s = document.querySelector(
                    "[" +
                        app.panel.localStorage.reset.modal.confirmResetAttr +
                        "]"
                );
                s &&
                    (s.onclick = function (e) {
                        e.preventDefault();
                        var a = window.location.href;
                        (a = (a = a.split("?"))[0]),
                            localStorage.removeItem(a),
                            location.reload();
                    });
            });
    },
    handleUnlimitedTabsRender = function () {
        function e(e, a) {
            var t = e.closest("." + app.unlimitedTabs.class),
                s = window.getComputedStyle(document.body),
                l = window.getComputedStyle(
                    t.querySelector("." + app.bootstrap.nav.tabs.class)
                ),
                o =
                    "rtl" == s.getPropertyValue("direction")
                        ? "margin-right"
                        : "margin-left",
                r = parseInt(l.getPropertyValue(o)),
                n = t.clientWidth,
                i = 0,
                p = [].slice.call(t.querySelectorAll("li"));
            switch (
                (p &&
                    p.map(function (e) {
                        e.classList.contains(
                            app.unlimitedTabs.buttonNext.class
                        ) ||
                            e.classList.contains(
                                app.unlimitedTabs.buttonPrev.class
                            ) ||
                            (i += e.clientWidth);
                    }),
                a)
            ) {
                case "next":
                    var c = -1 * r + (n = n - 85) + n,
                        d = 0,
                        u = !1;
                    c >= (i = i - 85)
                        ? ((d = i - n), (u = !0))
                        : c < i && (d = c - n),
                        ((m = t.querySelector(
                            "." + app.bootstrap.nav.tabs.class
                        )).style.transitionProperty =
                            "height, margin, padding"),
                        (m.style.transitionDuration =
                            app.animation.speed + "ms"),
                        "rtl" != s.getPropertyValue("direction")
                            ? ((m.style.marginLeft = "-" + d + "px"),
                              u &&
                                  t.classList.remove(
                                      app.unlimitedTabs.overflowRight.class
                                  ),
                              t.classList.add(
                                  app.unlimitedTabs.overflowLeft.class
                              ))
                            : ((m.style.marginRight = "-" + d + "px"),
                              u &&
                                  t.classList.remove(
                                      app.unlimitedTabs.overflowLeft.class
                                  ),
                              t.classList.add(
                                  app.unlimitedTabs.overflowRight.class
                              )),
                        setTimeout(function () {
                            (m.style.transitionProperty = ""),
                                (m.style.transitionDuration = "");
                        }, app.animation.speed);
                    break;
                case "prev":
                    i = i - 85;
                    var m,
                        b = !1;
                    (d = -1 * r - (n = n - 85)) <= 0 && (d = 0),
                        d <= 0 && (b = !0),
                        ((m = t.querySelector(
                            "." + app.bootstrap.nav.tabs.class
                        )).style.transitionProperty =
                            "height, margin, padding"),
                        (m.style.transitionDuration =
                            app.animation.speed + "ms"),
                        "rtl" != s.getPropertyValue("direction")
                            ? ((m.style.marginLeft = "-" + d + "px"),
                              t.classList.add(
                                  app.unlimitedTabs.overflowRight.class
                              ),
                              b &&
                                  t.classList.remove(
                                      app.unlimitedTabs.overflowLeft.class
                                  ))
                            : ((m.style.marginRight = "-" + d + "px"),
                              t.classList.add(
                                  app.unlimitedTabs.overflowLeft.class
                              ),
                              b &&
                                  t.classList.remove(
                                      app.unlimitedTabs.overflowRight.class
                                  )),
                        setTimeout(function () {
                            (m.style.transitionProperty = ""),
                                (m.style.transitionDuration = "");
                        }, app.animation.speed);
            }
        }
        function a() {
            var e = [].slice.call(
                document.querySelectorAll("." + app.unlimitedTabs.class)
            );
            e &&
                e.map(function (e) {
                    !(function (e, a) {
                        var t =
                            "." +
                            app.bootstrap.nav.tabs.itemClass +
                            " ." +
                            app.bootstrap.nav.tabs.activeClass;
                        e.querySelector(
                            "." + app.bootstrap.nav.tabs.itemClass
                        ) &&
                            (t = e
                                .querySelector(
                                    "." +
                                        app.bootstrap.nav.tabs.itemClass +
                                        " ." +
                                        app.bootstrap.nav.tabs.activeClass
                                )
                                .closest(
                                    "." + app.bootstrap.nav.tabs.itemClass
                                ));
                        var s = window.getComputedStyle(
                                document.querySelector("body")
                            ),
                            l =
                                "rtl" == s.getPropertyValue("direction")
                                    ? "margin-right"
                                    : "margin-left",
                            o = window.getComputedStyle(e),
                            r =
                                (parseInt(o.getPropertyValue(l)),
                                e.clientWidth),
                            n =
                                "object" == typeof t
                                    ? t.clientWidth
                                    : e.querySelector(t).clientWidth,
                            i = a > -1 ? a : app.animation.speed,
                            p = 0,
                            c = [].slice.call(
                                e.querySelectorAll(
                                    "." + app.bootstrap.nav.tabs.itemClass
                                )
                            ),
                            d = !1;
                        if (
                            (c &&
                                c.map(function (e) {
                                    (p += e.clientWidth),
                                        d || (n += e.clientWidth),
                                        e
                                            .querySelector(".nav-link")
                                            .classList.contains("active") &&
                                            (d = !0);
                                }),
                            n >= r)
                        ) {
                            var u = n - r;
                            p != n && (u += 40);
                            var m = e.querySelector(
                                "." + app.bootstrap.nav.tabs.class
                            );
                            (m.style.transitionProperty =
                                "height, margin, padding"),
                                (m.style.transitionDuration = i + "ms"),
                                "rtl" == s.getPropertyValue("direction")
                                    ? (m.style.marginRight = "-" + u + "px")
                                    : (m.style.marginLeft = "-" + u + "px"),
                                setTimeout(function () {
                                    (m.style.transitionProperty = ""),
                                        (m.style.transitionDuration = "");
                                }, i);
                        }
                        n != p && p >= r
                            ? e.classList.add(
                                  app.unlimitedTabs.overflowRight.class
                              )
                            : e.classList.remove(
                                  app.unlimitedTabs.overflowRight.class
                              ),
                            n >= r && p >= r
                                ? e.classList.add(
                                      app.unlimitedTabs.overflowLeft.class
                                  )
                                : e.classList.remove(
                                      app.unlimitedTabs.overflowLeft.class
                                  );
                    })(e, 0);
                });
        }
        var t;
        (t = [].slice.call(
            document.querySelectorAll(
                "[" + app.unlimitedTabs.buttonNext.toggleAttr + "]"
            )
        )) &&
            t.map(function (a) {
                a.onclick = function (a) {
                    a.preventDefault(), e(this, "next");
                };
            }),
            (t = [].slice.call(
                document.querySelectorAll(
                    "[" + app.unlimitedTabs.buttonPrev.toggleAttr + "]"
                )
            )) &&
                t.map(function (a) {
                    a.onclick = function (a) {
                        a.preventDefault(), e(this, "prev");
                    };
                }),
            window.addEventListener("resize", function () {
                var e = document.querySelector(
                    "." +
                        app.unlimitedTabs.class +
                        " ." +
                        app.bootstrap.nav.tabs.class
                );
                e && (e.removeAttribute("style"), a());
            }),
            a();
    },
    handleUnlimitedTopMenuRender = function () {
        "use strict";
        function e(e, a) {
            var t = e.closest("." + app.topMenu.menu.class),
                s = window.getComputedStyle(t),
                l = window.getComputedStyle(document.querySelector("body")),
                o =
                    "rtl" == l.getPropertyValue("direction")
                        ? "margin-right"
                        : "margin-left",
                r = parseInt(s.getPropertyValue(o)),
                n =
                    document.querySelector("." + app.topMenu.class)
                        .clientWidth -
                    2 *
                        document.querySelector("." + app.topMenu.class)
                            .clientHeight,
                i = 0,
                p = 0,
                c = t.querySelector(".menu-control-start"),
                d = c ? c.clientWidth : 0,
                u = t.querySelector(".menu-control-end"),
                m = d + (c ? u.clientWidth : 0),
                b = [].slice.call(
                    t.querySelectorAll("." + app.topMenu.menu.itemClass)
                );
            switch (
                (b &&
                    b.map(function (e) {
                        e.classList.contains(app.topMenu.control.class) ||
                            (i += e.clientWidth);
                    }),
                a)
            ) {
                case "next":
                    (g = i + r - n) <= n
                        ? ((p = g - r - m),
                          setTimeout(function () {
                              t.querySelector(
                                  "." +
                                      app.topMenu.control.class +
                                      "." +
                                      app.topMenu.control.buttonNext.class
                              ).classList.remove("show");
                          }, app.animation.speed))
                        : (p = n - r - m),
                        0 !== p &&
                            ((t.style.transitionProperty =
                                "height, margin, padding"),
                            (t.style.transitionDuration =
                                app.animation.speed + "ms"),
                            "rtl" != l.getPropertyValue("direction")
                                ? (t.style.marginLeft = "-" + p + "px")
                                : (t.style.marginRight = "-" + p + "px"),
                            setTimeout(function () {
                                (t.style.transitionProperty = ""),
                                    (t.style.transitionDuration = ""),
                                    t
                                        .querySelector(
                                            "." +
                                                app.topMenu.control.class +
                                                "." +
                                                app.topMenu.control.buttonPrev
                                                    .class
                                        )
                                        .classList.add("show");
                            }, app.animation.speed));
                    break;
                case "prev":
                    var g;
                    (g = -r) <= n
                        ? (t
                              .querySelector(
                                  "." +
                                      app.topMenu.control.class +
                                      "." +
                                      app.topMenu.control.buttonPrev.class
                              )
                              .classList.remove("show"),
                          (p = 0))
                        : (p = g - n + m),
                        (t.style.transitionProperty =
                            "height, margin, padding"),
                        (t.style.transitionDuration =
                            app.animation.speed + "ms"),
                        "rtl" != l.getPropertyValue("direction")
                            ? (t.style.marginLeft = "-" + p + "px")
                            : (t.style.marginRight = "-" + p + "px"),
                        setTimeout(function () {
                            (t.style.transitionProperty = ""),
                                (t.style.transitionDuration = ""),
                                t
                                    .querySelector(
                                        "." +
                                            app.topMenu.control.class +
                                            "." +
                                            app.topMenu.control.buttonNext.class
                                    )
                                    .classList.add("show");
                        }, app.animation.speed);
            }
        }
        function a() {
            var e = document.querySelector(
                "." + app.topMenu.class + " ." + app.topMenu.menu.class
            );
            if (e) {
                var a = window.getComputedStyle(e),
                    t = window.getComputedStyle(document.body),
                    s =
                        "rtl" == t.getPropertyValue("direction")
                            ? "margin-right"
                            : "margin-left",
                    l =
                        (parseInt(a.getPropertyValue(s)),
                        document.querySelector("." + app.topMenu.class)
                            .clientWidth),
                    o = 0,
                    r = 0,
                    n = e.querySelector(".menu-control-start"),
                    i =
                        (n && n.clientWidth,
                        e.querySelector(".menu-control-end")),
                    p = n ? i.clientWidth : 0,
                    c = 0,
                    d = [].slice.call(
                        document.querySelectorAll(
                            "." +
                                app.topMenu.class +
                                " ." +
                                app.topMenu.menu.class +
                                " > ." +
                                app.topMenu.menu.itemClass
                        )
                    );
                if (d) {
                    var u = !1;
                    d.map(function (e) {
                        e.classList.contains("menu-control") ||
                            ((r += e.clientWidth),
                            u || (o += e.clientWidth),
                            e.classList.contains("active") && (u = !0));
                    });
                }
                var m = e.querySelector(
                    "." +
                        app.topMenu.control.class +
                        "." +
                        app.topMenu.control.buttonNext.class
                );
                o != r && r >= l
                    ? (m.classList.add(app.topMenu.control.showClass), (c += p))
                    : m.classList.remove(app.topMenu.control.showClass);
                m = e.querySelector(
                    "." +
                        app.topMenu.control.class +
                        "." +
                        app.topMenu.control.buttonPrev.class
                );
                if (
                    (o >= l && r >= l
                        ? m.classList.add(app.topMenu.control.showClass)
                        : m.classList.remove(app.topMenu.control.showClass),
                    o >= l)
                ) {
                    var b = o - l + c;
                    "rtl" != t.getPropertyValue("direction")
                        ? (e.style.marginLeft = "-" + b + "px")
                        : (e.style.marginRight = "-" + b + "px");
                }
            }
        }
        var t;
        function s(e) {
            const a = document.querySelector(e);
            if (!a) return;
            const t = a.querySelector(".menu"),
                s = t.querySelectorAll(".menu-item:not(.menu-control)");
            let l,
                o,
                r,
                n = 0,
                i = 0;
            s.forEach((e) => {
                n += e.offsetWidth;
            }),
                a.addEventListener("mousedown", (e) => {
                    (r = !0),
                        (l = e.pageX),
                        (o = t.style.marginLeft
                            ? parseInt(t.style.marginLeft)
                            : 0),
                        (i = a.offsetWidth - n);
                }),
                a.addEventListener("touchstart", (e) => {
                    r = !0;
                    const s = e.targetTouches[0];
                    (l = s.pageX),
                        (o = t.style.marginLeft
                            ? parseInt(t.style.marginLeft)
                            : 0),
                        (i = a.offsetWidth - n);
                }),
                a.addEventListener("mouseup", () => {
                    r = !1;
                }),
                a.addEventListener("touchend", () => {
                    r = !1;
                }),
                a.addEventListener("mousemove", (e) => {
                    if (!l || !r) return;
                    if (window.innerWidth < app.breakpoints.md) return;
                    e.preventDefault();
                    const s = e.pageX;
                    var p = o + 1 * (s - l);
                    p <= i
                        ? ((p = i),
                          t
                              .querySelector(
                                  "." +
                                      app.topMenu.control.class +
                                      "." +
                                      app.topMenu.control.buttonNext.class
                              )
                              .classList.remove("show"))
                        : t
                              .querySelector(
                                  "." +
                                      app.topMenu.control.class +
                                      "." +
                                      app.topMenu.control.buttonNext.class
                              )
                              .classList.add("show"),
                        n < a.offsetWidth &&
                            t
                                .querySelector(
                                    "." +
                                        app.topMenu.control.class +
                                        "." +
                                        app.topMenu.control.buttonPrev.class
                                )
                                .classList.remove("show"),
                        i > 0 &&
                            t
                                .querySelector(
                                    "." +
                                        app.topMenu.control.class +
                                        "." +
                                        app.topMenu.control.buttonNext.class
                                )
                                .classList.remove("show"),
                        p > 0
                            ? ((p = 0),
                              t
                                  .querySelector(
                                      "." +
                                          app.topMenu.control.class +
                                          "." +
                                          app.topMenu.control.buttonPrev.class
                                  )
                                  .classList.remove("show"))
                            : t
                                  .querySelector(
                                      "." +
                                          app.topMenu.control.class +
                                          "." +
                                          app.topMenu.control.buttonPrev.class
                                  )
                                  .classList.add("show"),
                        (t.style.marginLeft = p + "px");
                }),
                a.addEventListener("touchmove", (e) => {
                    if (!l || !r) return;
                    if (window.innerWidth < app.breakpoints.md) return;
                    e.preventDefault();
                    const s = e.targetTouches[0].pageX;
                    var p = o + 1 * (s - l);
                    p <= i
                        ? ((p = i),
                          t
                              .querySelector(
                                  "." +
                                      app.topMenu.control.class +
                                      "." +
                                      app.topMenu.control.buttonNext.class
                              )
                              .classList.remove("show"))
                        : t
                              .querySelector(
                                  "." +
                                      app.topMenu.control.class +
                                      "." +
                                      app.topMenu.control.buttonNext.class
                              )
                              .classList.add("show"),
                        n < a.offsetWidth &&
                            t
                                .querySelector(
                                    "." +
                                        app.topMenu.control.class +
                                        "." +
                                        app.topMenu.control.buttonPrev.class
                                )
                                .classList.remove("show"),
                        i > 0 &&
                            t
                                .querySelector(
                                    "." +
                                        app.topMenu.control.class +
                                        "." +
                                        app.topMenu.control.buttonNext.class
                                )
                                .classList.remove("show"),
                        p > 0
                            ? ((p = 0),
                              t
                                  .querySelector(
                                      "." +
                                          app.topMenu.control.class +
                                          "." +
                                          app.topMenu.control.buttonPrev.class
                                  )
                                  .classList.remove("show"))
                            : t
                                  .querySelector(
                                      "." +
                                          app.topMenu.control.class +
                                          "." +
                                          app.topMenu.control.buttonPrev.class
                                  )
                                  .classList.add("show"),
                        (t.style.marginLeft = p + "px");
                });
        }
        (t = document.querySelector(
            "[" + app.topMenu.control.buttonNext.toggleAttr + "]"
        )) &&
            (t.onclick = function (a) {
                a.preventDefault(), e(this, "next");
            }),
            (t = document.querySelector(
                "[" + app.topMenu.control.buttonPrev.toggleAttr + "]"
            )) &&
                (t.onclick = function (a) {
                    a.preventDefault(), e(this, "prev");
                }),
            window.addEventListener("resize", function () {
                if (window.innerWidth >= app.breakpoints.md) {
                    var e = document.querySelector("." + app.topMenu.class);
                    e && e.removeAttribute("style");
                    var t = document.querySelector(
                        "." + app.topMenu.class + " ." + app.topMenu.menu.class
                    );
                    t && t.removeAttribute("style");
                    var l = document.querySelectorAll(
                        "." +
                            app.topMenu.class +
                            " ." +
                            app.topMenu.menu.submenu.class
                    );
                    l &&
                        l.forEach((e) => {
                            e.removeAttribute("style");
                        }),
                        a();
                }
                s("." + app.topMenu.class);
            }),
            window.innerWidth >= app.breakpoints.md &&
                (a(), s("." + app.topMenu.class));
    },
    handleTopMenuToggle = function (e, a = !1) {
        e.map(function (t) {
            t.onclick = function (t) {
                if (
                    (t.preventDefault(),
                    !a || (a && document.body.clientWidth < 768))
                ) {
                    var s = this.nextElementSibling;
                    e.map(function (e) {
                        var a = e.nextElementSibling;
                        a !== s &&
                            (slideUp(a),
                            a
                                .closest("." + app.topMenu.menu.itemClass)
                                .classList.remove(app.topMenu.menu.expandClass),
                            a
                                .closest("." + app.topMenu.menu.itemClass)
                                .classList.add(app.topMenu.menu.closedClass));
                    }),
                        slideToggle(s);
                }
            };
        });
    },
    handleTopMenuSubMenu = function () {
        "use strict";
        var e =
                "." +
                app.topMenu.class +
                " ." +
                app.topMenu.menu.class +
                " > ." +
                app.topMenu.menu.itemClass +
                "." +
                app.topMenu.menu.hasSubClass,
            a =
                " > ." +
                app.topMenu.menu.submenu.class +
                " > ." +
                app.topMenu.menu.itemClass +
                "." +
                app.topMenu.menu.hasSubClass,
            t = e + " > ." + app.topMenu.menu.itemLinkClass,
            s = [].slice.call(document.querySelectorAll(t));
        handleTopMenuToggle(s, !0);
        var l = e + a,
            o = [].slice.call(
                document.querySelectorAll(
                    l + " > ." + app.topMenu.menu.itemLinkClass
                )
            );
        handleTopMenuToggle(o);
        var r = e + a + a,
            n = [].slice.call(
                document.querySelectorAll(
                    r + " > ." + app.topMenu.menu.itemLinkClass
                )
            );
        handleTopMenuToggle(n),
            window.addEventListener("resize", function () {
                [].slice
                    .call(
                        document.querySelectorAll(
                            "." +
                                app.topMenu.class +
                                " ." +
                                app.topMenu.menu.submenu.class
                        )
                    )
                    .map(function (e) {
                        e.removeAttribute("style");
                    });
            });
    },
    handleTopMenuMobileToggle = function () {
        "use strict";
        var e = document.querySelector(
            "[" + app.topMenu.mobile.toggleAttr + "]"
        );
        e &&
            (e.onclick = function (e) {
                e.preventDefault(),
                    slideToggle(
                        document.querySelector("." + app.topMenu.class)
                    );
            }),
            window.addEventListener("resize", function () {
                var e = document.querySelector("." + app.topMenu.class);
                e && e.removeAttribute("style");
            });
    },
    handlePageScrollClass = function () {
        var e = function () {
            var e = document.querySelector("." + app.class);
            window.scrollY > 0
                ? e.classList.add(app.header.hasScrollClass)
                : e.classList.remove(app.header.hasScrollClass);
        };
        window.addEventListener("scroll", function () {
            e();
        }),
            e();
    },
    handleToggleNavProfile = function () {
        var e = document.querySelector(
            "[" + app.sidebar.profile.toggleAttr + "]"
        );
        e &&
            (e.onclick = function (e) {
                e.preventDefault();
                var a = document.querySelector(
                        "." +
                            app.sidebar.class +
                            ":not(." +
                            app.sidebarEnd.class +
                            ")"
                    ),
                    t = this.closest("." + app.sidebar.profile.class),
                    s = document.querySelector(
                        this.getAttribute(app.sidebar.profile.targetAttr)
                    ),
                    l =
                        a &&
                        a.getAttribute(app.sidebar.menu.disableAnimationAttr)
                            ? 0
                            : app.sidebar.menu.animationTime;
                s &&
                    ("block" == s.style.display
                        ? t.classList.remove(app.sidebar.menu.activeClass)
                        : t.classList.add(app.sidebar.menu.activeClass),
                    slideToggle(s, l),
                    s.classList.toggle(app.sidebar.menu.expandClass));
            });
    },
    handleSidebarScrollMemory = function () {
        if (!app.isMobile)
            try {
                if (
                    "undefined" != typeof Storage &&
                    "undefined" != typeof localStorage
                ) {
                    var e = document.querySelector(
                        "." +
                            app.sidebar.class +
                            ":not(." +
                            app.sidebarEnd.class +
                            ") [" +
                            app.scrollBar.attr +
                            "]"
                    );
                    if (e) {
                        e.addEventListener("scroll", function (e) {
                            localStorage.setItem(
                                app.sidebar.scrollBar.localStorage,
                                e.target.scrollTop
                            );
                        });
                        var a = localStorage.getItem(
                            app.sidebar.scrollBar.localStorage
                        );
                        a && (e.scrollTop = a);
                    }
                }
            } catch (e) {
                console.log(e);
            }
    },
    handleGetHiddenMenuHeight = function (e) {
        e.setAttribute(
            "style",
            "position: absolute; visibility: hidden; display: block !important"
        );
        var a = e.clientHeight;
        return e.removeAttribute("style"), a;
    },
    handleSidebarMinifyFloatMenuClick = function () {
        var e = [].slice.call(
            document.querySelectorAll(
                app.sidebar.floatSubmenu.id +
                    " ." +
                    app.sidebar.menu.itemClass +
                    "." +
                    app.sidebar.menu.hasSubClass +
                    " > ." +
                    app.sidebar.menu.itemLinkClass
            )
        );
        e &&
            e.map(function (e) {
                e.onclick = function (e) {
                    e.preventDefault();
                    var a = this.closest(
                            "." + app.sidebar.menu.itemClass
                        ).querySelector("." + app.sidebar.menu.submenu.class),
                        t = getComputedStyle(a),
                        s = "none" != t.getPropertyValue("display"),
                        l = "none" == t.getPropertyValue("display");
                    slideToggle(a);
                    var o = setInterval(function () {
                        var e = document.querySelector(
                                app.sidebar.floatSubmenu.id
                            ),
                            a = document.querySelector(
                                app.sidebar.floatSubmenu.arrow.id
                            ),
                            t = document.querySelector(
                                app.sidebar.floatSubmenu.line.id
                            ),
                            o = e.clientHeight,
                            r = e.getBoundingClientRect(),
                            n = e.getAttribute("data-offset-top"),
                            i = e.getAttribute("data-menu-offset-top"),
                            p = r.top,
                            c = document.body.clientHeight;
                        if (
                            (s &&
                                p > n &&
                                ((p = p > n ? n : p),
                                (e.style.top = p + "px"),
                                (e.style.bottom = "auto"),
                                (a.style.top = "20px"),
                                (a.style.bottom = "auto"),
                                (t.style.top = "20px"),
                                (t.style.bottom = "auto")),
                            l)
                        ) {
                            if (c - p < o) {
                                var d = c - i - 22;
                                (e.style.top = "auto"),
                                    (e.style.bottom = 0),
                                    (a.style.top = "auto"),
                                    (a.style.bottom = d + "px"),
                                    (t.style.top = "20px"),
                                    (t.style.bottom = d + "px");
                            }
                            var u = document.querySelector(
                                app.sidebar.floatSubmenu.id +
                                    " ." +
                                    app.sidebar.floatSubmenu.class
                            );
                            if (o > c && u)
                                for (
                                    var m =
                                            app.sidebar.floatSubmenu.overflow.class.split(
                                                " "
                                            ),
                                        b = 0;
                                    b < m.length;
                                    b++
                                )
                                    u.classList.add(m[b]);
                        }
                    }, 1);
                    setTimeout(function () {
                        clearInterval(o);
                    }, app.animation.speed);
                };
            }),
            handleAjaxMode.initToggler();
    },
    handleSidebarMinifyFloatMenu = function () {
        var e = [].slice.call(
            document.querySelectorAll(
                "." +
                    app.sidebar.class +
                    " ." +
                    app.sidebar.menu.class +
                    " > ." +
                    app.sidebar.menu.itemClass +
                    "." +
                    app.sidebar.menu.hasSubClass +
                    " > ." +
                    app.sidebar.menu.itemLinkClass
            )
        );
        e &&
            e.map(function (e) {
                (e.onmouseenter = function () {
                    var e = document.querySelector("." + app.class);
                    if (
                        e &&
                        e.classList.contains(app.sidebar.minify.toggledClass)
                    ) {
                        clearTimeout(app.sidebar.floatSubmenu.timeout);
                        var a = this.closest(
                            "." + app.sidebar.menu.itemClass
                        ).querySelector("." + app.sidebar.menu.submenu.class);
                        if (
                            app.sidebar.floatSubmenu.dom == this &&
                            document.querySelector(app.sidebar.floatSubmenu.id)
                        )
                            return;
                        app.sidebar.floatSubmenu.dom = this;
                        var t = a.innerHTML;
                        if (t) {
                            var s = getComputedStyle(document.body),
                                l = document.querySelector(app.sidebar.id),
                                o = l.getBoundingClientRect(),
                                r = parseInt(l.clientWidth),
                                n =
                                    e.classList.contains(
                                        app.sidebarEnd.class
                                    ) ||
                                    "rtl" == s.getPropertyValue("direction")
                                        ? document.body.clientWidth - o.left
                                        : o.left + r,
                                i = handleGetHiddenMenuHeight(a),
                                p = this.getBoundingClientRect().top,
                                c =
                                    e.classList.contains(
                                        app.sidebarEnd.class
                                    ) ||
                                    "rtl" == s.getPropertyValue("direction")
                                        ? "auto"
                                        : n,
                                d =
                                    e.classList.contains(
                                        app.sidebarEnd.class
                                    ) ||
                                    "rtl" == s.getPropertyValue("direction")
                                        ? n
                                        : "auto",
                                u =
                                    l.getAttribute(app.darkMode.attr) ==
                                    app.darkMode.value,
                                m = document.body.clientHeight;
                            if (
                                document.querySelector(
                                    app.sidebar.floatSubmenu.id
                                )
                            ) {
                                var b = document.querySelector(
                                        app.sidebar.floatSubmenu.id
                                    ),
                                    g = document.querySelector(
                                        app.sidebar.floatSubmenu.id +
                                            " ." +
                                            app.sidebar.floatSubmenu.class
                                    );
                                if (i > m && g)
                                    for (
                                        var h =
                                                app.sidebar.floatSubmenu.overflow.class.split(
                                                    " "
                                                ),
                                            f = 0;
                                        f < h.length;
                                        f++
                                    )
                                        g.classList.add(h[f]);
                                b.setAttribute("data-offset-top", p),
                                    b.setAttribute("data-menu-offset-top", p),
                                    (g.innerHTML = t);
                            } else {
                                var y = "";
                                i > m &&
                                    (y =
                                        app.sidebar.floatSubmenu.overflow
                                            .class);
                                var v = document.createElement("div");
                                u &&
                                    v.setAttribute(
                                        app.darkMode.attr,
                                        app.darkMode.value
                                    ),
                                    v.setAttribute(
                                        "id",
                                        app.sidebar.floatSubmenu.id.replace(
                                            "#",
                                            ""
                                        )
                                    ),
                                    v.setAttribute(
                                        "class",
                                        app.sidebar.floatSubmenu.container.class
                                    ),
                                    v.setAttribute("data-offset-top", p),
                                    v.setAttribute("data-menu-offset-top", p),
                                    (v.innerHTML =
                                        '\t<div class="' +
                                        app.sidebar.floatSubmenu.arrow.class +
                                        '" id="' +
                                        app.sidebar.floatSubmenu.arrow.id.replace(
                                            "#",
                                            ""
                                        ) +
                                        '"></div>\t<div class="' +
                                        app.sidebar.floatSubmenu.line.class +
                                        '" id="' +
                                        app.sidebar.floatSubmenu.line.id.replace(
                                            "#",
                                            ""
                                        ) +
                                        '"></div>\t<div class="' +
                                        app.sidebar.floatSubmenu.class +
                                        " " +
                                        y +
                                        '">' +
                                        t +
                                        "</div>"),
                                    e.appendChild(v);
                                var S = document.getElementById(
                                    app.sidebar.floatSubmenu.id.replace("#", "")
                                );
                                (S.onmouseover = function () {
                                    clearTimeout(
                                        app.sidebar.floatSubmenu.timeout
                                    );
                                }),
                                    (S.onmouseout = function () {
                                        app.sidebar.floatSubmenu.timeout =
                                            setTimeout(() => {
                                                document
                                                    .querySelector(
                                                        app.sidebar.floatSubmenu
                                                            .id
                                                    )
                                                    .remove();
                                            }, app.animation.speed);
                                    });
                            }
                            (i = document.querySelector(
                                app.sidebar.floatSubmenu.id
                            ).clientHeight),
                                (g = document.querySelector(
                                    app.sidebar.floatSubmenu.id
                                ));
                            var C = document.querySelector(
                                    app.sidebar.floatSubmenu.arrow.id
                                ),
                                A = document.querySelector(
                                    app.sidebar.floatSubmenu.line.id
                                );
                            if (m - p > i)
                                g &&
                                    ((g.style.top = p + "px"),
                                    (g.style.left = c + "px"),
                                    (g.style.bottom = "auto"),
                                    (g.style.right = d + "px")),
                                    C &&
                                        ((C.style.top = "20px"),
                                        (C.style.bottom = "auto")),
                                    A &&
                                        ((A.style.top = "20px"),
                                        (A.style.bottom = "auto"));
                            else {
                                var L = m - p - 21;
                                g &&
                                    ((g.style.top = "auto"),
                                    (g.style.left = c + "px"),
                                    (g.style.bottom = 0),
                                    (g.style.right = d + "px")),
                                    C &&
                                        ((C.style.top = "auto"),
                                        (C.style.bottom = L + "px")),
                                    A &&
                                        ((A.style.top = "20px"),
                                        (A.style.bottom = L + "px"));
                            }
                            handleSidebarMinifyFloatMenuClick();
                        } else
                            document
                                .querySelector(app.sidebar.floatSubmenu.line.id)
                                .remove(),
                                (app.sidebar.floatSubmenu.dom = "");
                    }
                }),
                    (e.onmouseleave = function () {
                        var e = document.querySelector("." + app.class);
                        e &&
                            e.classList.contains(
                                app.sidebar.minify.toggledClass
                            ) &&
                            (app.sidebar.floatSubmenu.timeout = setTimeout(
                                () => {
                                    var e = document.querySelector(
                                        app.sidebar.floatSubmenu.line.id
                                    );
                                    e && e.remove(),
                                        (app.sidebar.floatSubmenu.dom = "");
                                },
                                250
                            ));
                    });
            });
    },
    handleAjaxMode = (function () {
        var e;
        return {
            emptyHtml: "",
            init: function (a) {
                a && (e = a),
                    this.initDefaultUrl(),
                    this.initHashChange(),
                    this.initToggler();
            },
            initDefaultUrl: function () {
                if (
                    ((this.emptyHtml =
                        e && e.emptyHtml ? e.emptyHtml : app.ajax.error.html),
                    (this.defaultUrl =
                        e && e.ajaxDefaultUrl ? e.ajaxDefaultUrl : ""),
                    (this.defaultUrl = window.location.hash
                        ? window.location.hash
                        : this.defaultUrl),
                    "" === this.defaultUrl)
                ) {
                    var a = document.querySelector("." + app.content.class);
                    a && (a.innerHTML = emptyHtml);
                } else this.renderAjax(this.defaultUrl, "", !0);
            },
            initHashChange: function () {
                window.addEventListener("hashchange", function () {
                    window.location.hash
                        ? handleAjaxMode.renderAjax(
                              window.location.hash,
                              "",
                              !0
                          )
                        : handleAjaxMode.renderAjax(defaultUrl, "", !0);
                });
            },
            initToggler: function () {
                var e = [].slice.call(
                    document.querySelectorAll("[" + app.ajax.attr + "]")
                );
                e &&
                    e.map(function (e) {
                        e.onclick = function (e) {
                            e.preventDefault(),
                                handleAjaxMode.renderAjax(
                                    this.getAttribute("href"),
                                    this
                                );
                        };
                    });
            },
            emptyElement: function () {
                var e = document.querySelector(app.ajax.emptyElement);
                e && (e.innerHTML = "");
            },
            clearElement: function () {
                for (
                    var e = app.ajax.clearElement.split(","), a = 0;
                    a < e.length;
                    a++
                ) {
                    var t = [].slice.call(document.querySelectorAll(e[a]));
                    t &&
                        t.map(function (e) {
                            e.remove();
                        });
                }
                var s;
                if (
                    ((s = document.getElementById(
                        app.sidebar.floatSubmenu.id
                    )) && s.remove(),
                    jQuery && $.fn.DataTable)
                )
                    try {
                        $(".dataTable").DataTable().destroy();
                    } catch (e) {}
                (s = document.querySelector("." + app.class)) &&
                    s.classList.contains(app.sidebar.mobile.toggledClass) &&
                    s.classList.remove(app.sidebar.mobile.toggledClass);
            },
            checkSidebarActive: function (e) {
                var a = document.querySelector(
                    app.sidebar.id +
                        " [" +
                        app.ajax.attr +
                        '][href="' +
                        e +
                        '"]'
                );
                if (a) {
                    (t = [].slice.call(
                        document.querySelectorAll(
                            app.sidebar.id + " ." + app.sidebar.menu.itemClass
                        )
                    )) &&
                        t.map(function (e) {
                            e.classList.remove(app.sidebar.menu.activeClass);
                        });
                    var t,
                        s = a.closest("." + app.sidebar.menu.itemClass);
                    s && s.classList.add(app.sidebar.menu.activeClass),
                        (t = getParents(a)) &&
                            t.map(function (e) {
                                e.classList &&
                                    e.classList.contains(
                                        app.sidebar.menu.itemClass
                                    ) &&
                                    e.classList.add(
                                        app.sidebar.menu.activeClass
                                    );
                            });
                }
            },
            checkPushState: function (e) {
                var a = e.replace("#", ""),
                    t = window.navigator.userAgent.indexOf("MSIE ");
                t && t > 0 && t < 9
                    ? (window.location.href = a)
                    : history.pushState("", "", "#" + a);
            },
            checkClearOption: function () {
                app.ajax.clearOption &&
                    (App.clearPageOption(app.ajax.clearOption),
                    (app.ajax.clearOption = ""));
            },
            checkLoading: function (e) {
                if (e) {
                    var a = document.querySelector(app.ajax.loader.id);
                    a && a.remove(),
                        (t = document.querySelector("." + app.content.class)) &&
                            t.classList.remove("position-relative"),
                        document.body.classList.remove(app.ajax.loader.class);
                } else {
                    var t;
                    if (!document.querySelector(app.ajax.loader.id))
                        if (
                            (document.body.classList.add(app.ajax.loader.class),
                            (t = document.querySelector(
                                "." + app.content.class
                            )))
                        ) {
                            var s = document.createElement("div");
                            s.setAttribute(
                                "id",
                                app.ajax.loader.id.replace("#", "")
                            ),
                                s.setAttribute(
                                    "class",
                                    "position-absolute top-0 bottom-0 start-0 end-0 bg-light bg-opacity-75"
                                ),
                                (s.style.zIndex = 9999),
                                (s.innerHTML = app.ajax.loader.html),
                                t.classList.add("position-relative"),
                                t.appendChild(s);
                        }
                }
            },
            renderAjax: function (a, t, s) {
                Pace && Pace.restart(),
                    handleAjaxMode.checkLoading(!1),
                    handleAjaxMode.clearElement(),
                    handleAjaxMode.emptyElement(),
                    handleAjaxMode.checkSidebarActive(a),
                    handleAjaxMode.checkClearOption(),
                    s || handleAjaxMode.checkPushState(a);
                var l = document.querySelector("." + app.content.class);
                if (l) {
                    var o = a.replace("#", ""),
                        r = e && e.ajaxType ? e.ajaxType : "GET",
                        n = e && e.ajaxDataType ? e.ajaxDataType : "html";
                    t &&
                        ((n = t.getAttribute("data-type")
                            ? t.getAttribute("data-type")
                            : n),
                        (targetDataDataType = t.getAttribute("data-data-type")
                            ? t.getAttribute("data-data-type")
                            : n));
                    var i = new XMLHttpRequest();
                    (i.onreadystatechange = function () {
                        i.readyState == XMLHttpRequest.DONE &&
                            (200 == i.status
                                ? setInnerHTML(l, i.responseText)
                                : 400 == i.status
                                ? (console.log("There was an error 400"),
                                  setInnerHTML(l, emptyHtml))
                                : console.log(
                                      "something else other than 200 was returned"
                                  ),
                            handleAjaxMode.checkLoading(!0),
                            (document.body.scrollTop = 0),
                            App.initComponent());
                    }),
                        i.open(r, o, !0),
                        i.send();
                }
            },
        };
    })(),
    handleSetPageOption = function (e) {
        var a = document.querySelector("." + app.class);
        if (a) {
            if (
                (e.appContentFullHeight &&
                    a.classList.add(app.content.fullHeight.class),
                e.appSidebarLight)
            ) {
                var t = document.querySelector(
                    "." +
                        app.class +
                        " ." +
                        app.sidebar.class +
                        ":not(." +
                        app.sidebarEnd.class +
                        ")"
                );
                if (!t) return;
                t.removeAttribute(app.darkMode.attr);
            }
            var s;
            if (
                (e.appSidebarEnd &&
                    a.classList.add(app.layout.sidebarEnd.class),
                e.appSidebarWide &&
                    a.classList.add(app.layout.sidebarWide.class),
                e.appSidebarMinified &&
                    a.classList.add(app.layout.sidebarMinified.class),
                e.appSidebarTwo)
            )
                a.classList.add(app.layout.sidebarTwo.class),
                    a.classList.add(app.sidebarEnd.toggledClass),
                    (s = document.querySelector(
                        "." +
                            app.header.class +
                            " [" +
                            app.sidebarEnd.mobile.toggleAttr +
                            "]"
                    )) && s.classList.remove(app.helper.display.none),
                    (s = document.querySelector(
                        "." + app.header.class + " ." + app.header.brand.class
                    )) && s.classList.remove(app.helper.margin.left[0]);
            if (e.appSidebarTransparent)
                (s = document.querySelector("." + app.sidebar.class)) &&
                    s.classList.add(app.sidebar.transparent.class);
            if (e.appSidebarSearch)
                (s = document.querySelector(
                    "." + app.sidebar.class + " ." + app.sidebar.search.class
                )) && s.classList.remove(app.sidebar.search.hideClass);
            if (
                (e.appSidebarHover && a.classList.add(app.sidebar.hover.class),
                e.appTopMenu)
            )
                a.classList.add(app.layout.topMenu.class),
                    (s = document.querySelector(
                        "." +
                            app.header.class +
                            " [" +
                            app.topMenu.mobile.toggleAttr +
                            "]"
                    )) && s.classList.remove(app.helper.display.none);
            if (e.appWithoutHeader)
                a.classList.add(app.layout.withoutHeader.class),
                    (s = document.querySelector("." + app.header.class)) &&
                        (s.style.display = "none");
            if (e.appWithoutSidebar)
                a.classList.add(app.layout.withoutSidebar.class),
                    (s = document.querySelector(
                        "." +
                            app.header.class +
                            " [" +
                            app.sidebar.mobile.toggleAttr +
                            "]"
                    )) && s.classList.add(app.helper.display.none),
                    (s = document.querySelector("." + app.sidebar.class)) &&
                        (s.style.display = "none"),
                    (s = document.querySelector("." + app.sidebar.bg.class)) &&
                        (s.style.display = "none"),
                    (s = document.querySelector(
                        "." + app.sidebar.mobile.backdrop.class
                    )) && (s.style.display = "none");
            if (e.appHeaderInverse)
                (s = document.querySelector("." + app.header.class)) &&
                    s.setAttribute(app.darkMode.attr, app.darkMode.value);
            if (e.pageContentFullWidth)
                (s = document.querySelector("." + app.content.class)) &&
                    s.classList.add(app.content.fullWidth.class);
            if (e.appClass)
                for (var l = e.appClass.split(" "), o = 0; o < l.length; o++)
                    a.classList.add(l[o]);
            if (e.appContentClass)
                if ((s = document.querySelector("." + app.content.class)))
                    for (
                        l = e.appContentClass.split(" "), o = 0;
                        o < l.length;
                        o++
                    )
                        s.classList.add(l[o]);
            if (e.bodyClass)
                for (l = e.bodyClass.split(" "), o = 0; o < l.length; o++)
                    document.body.classList.add(l[o]);
            e.appBoxedLayout &&
                document.body.classList.add(app.layout.boxedLayout.class),
                e.clearOptionOnLeave && (app.ajax.clearOption = e);
        }
    },
    handleClearPageOption = function (e) {
        var a = document.querySelector("." + app.class);
        if (a) {
            if (
                (e.appContentFullHeight &&
                    a.classList.remove(app.content.fullHeight.class),
                e.appSidebarLight)
            ) {
                var t = document.querySelector(
                    "." +
                        app.class +
                        " ." +
                        app.sidebar.class +
                        ":not(." +
                        app.sidebarEnd.class +
                        ")"
                );
                if (!t) return;
                t.setAttribute(app.darkMode.attr, app.darkMode.value);
            }
            var s;
            if (
                (e.appSidebarEnd &&
                    a.classList.remove(app.layout.sidebarEnd.class),
                e.appSidebarWide &&
                    a.classList.remove(app.layout.sidebarWide.class),
                e.appSidebarMinified &&
                    a.classList.remove(app.layout.sidebarMinified.class),
                e.appSidebarTwo)
            )
                a.classList.remove(app.layout.sidebarTwo.class),
                    a.classList.remove(app.sidebarEnd.toggledClass),
                    (s = document.querySelector(
                        "." +
                            app.header.class +
                            " [" +
                            app.sidebarEnd.mobile.toggleAttr +
                            "]"
                    )) && s.classList.add(app.helper.display.none),
                    (s = document.querySelector(
                        "." + app.header.class + " ." + app.header.brand.class
                    )) && s.classList.add(app.helper.margin.left[0]);
            if (e.appSidebarTransparent)
                (s = document.querySelector("." + app.sidebar.class)) &&
                    s.classList.remove(app.sidebar.transparent.class);
            if (e.appSidebarSearch)
                (s = document.querySelector(
                    "." + app.sidebar.class + " ." + app.sidebar.search.class
                )) && s.classList.add(app.sidebar.search.hideClass);
            if (
                (e.appSidebarHover &&
                    a.classList.remove(app.sidebar.hover.class),
                e.appTopMenu)
            )
                a.classList.remove(app.layout.topMenu.class),
                    (s = document.querySelector(
                        "." +
                            app.header.class +
                            " [" +
                            app.topMenu.mobile.toggleAttr +
                            "]"
                    )) && s.classList.add(app.helper.display.none);
            if (e.appHeaderInverse)
                (s = document.querySelector("." + app.header.class)) &&
                    s.removeAttribute(app.darkMode.attr);
            if (e.appWithoutSidebar)
                a.classList.remove(app.layout.withoutSidebar.class),
                    (s = document.querySelector(
                        "." +
                            app.header.class +
                            " [" +
                            app.sidebar.mobile.toggleAttr +
                            "]"
                    )) && s.classList.remove(app.helper.display.none),
                    (s = document.querySelector("." + app.sidebar.class)) &&
                        s.removeAttribute("style"),
                    (s = document.querySelector("." + app.sidebar.bg.class)) &&
                        s.removeAttribute("style"),
                    (s = document.querySelector(
                        "." + app.sidebar.mobile.backdrop.class
                    )) && s.removeAttribute("style");
            if (e.appWithoutHeader)
                a.classList.remove(app.layout.withoutHeader.class),
                    (s = document.querySelector("." + app.header.class)) &&
                        s.removeAttribute("style");
            if (e.appContentFullWidth)
                (s = document.querySelector("." + app.content.class)) &&
                    s.classList.remove(app.content.fullWidth.class);
            if (e.appContentClass)
                if ((s = document.querySelector("." + app.content.class)))
                    for (
                        var l = e.appContentClass.split(" "), o = 0;
                        o < l.length;
                        o++
                    )
                        s.classList.remove(l[o]);
            if (e.appClass)
                for (l = e.appClass.split(" "), o = 0; o < l.length; o++)
                    a.classList.remove(l[o]);
            if (e.bodyClass)
                for (l = e.bodyClass.split(" "), o = 0; o < l.length; o++)
                    document.body.classList.remove(l[o]);
            e.appBoxedLayout &&
                document.body.classList.remove(app.layout.boxedLayout.class);
        }
    },
    handleToggleNavbarSearch = function () {
        var e;
        (e = document.querySelector(
            "[" + app.header.floatingForm.toggleAttr + "]"
        )) &&
            (e.onclick = function (e) {
                e.preventDefault(),
                    document
                        .querySelector("." + app.header.class)
                        .classList.add(app.header.floatingForm.toggledClass);
            }),
            (e = document.querySelector(
                "[" + app.header.floatingForm.dismissAttr + "]"
            )) &&
                (e.onclick = function (e) {
                    e.preventDefault(),
                        document
                            .querySelector("." + app.header.class)
                            .classList.remove(
                                app.header.floatingForm.toggledClass
                            );
                });
    },
    convertNumberWithCommas = function (e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    checkIsFloat = function (e) {
        return Number(e) === e && e % 1 != 0;
    },
    checkIsInt = function (e) {
        return Number(e) === e && e % 1 == 0;
    },
    countDecimals = function (e) {
        var a = e.toString().split(".");
        return a[1] ? a[1].length : 0;
    },
    handleAnimation = function () {
        var e = [].slice.call(
            document.querySelectorAll("[" + app.animation.attr + "]")
        );
        e &&
            e.map(function (e) {
                var a = e.getAttribute(app.animation.attr),
                    t = e.getAttribute(app.animation.valueAttr);
                switch (a) {
                    case "width":
                        e.style.width = t;
                        break;
                    case "height":
                        e.style.height = t;
                        break;
                    case "number":
                        for (var s = e, l = countDecimals(t), o = l; o > 0; )
                            10, o--;
                        const a = () => {
                            const e = +t.replace(",", ""),
                                o = +(s.count ? s.count : 0),
                                r = e / app.animation.speed;
                            if (o < e) {
                                var n = o + r;
                                (s.innerText = convertNumberWithCommas(
                                    n.toFixed(l)
                                )),
                                    (s.count = n),
                                    setTimeout(a, 1);
                            } else s.innerText = convertNumberWithCommas(e);
                        };
                        a();
                        break;
                    case "class":
                        e.classList.add(t);
                }
            });
    },
    handleSidebarSearch = function () {
        var e = [].slice.call(
            document.querySelectorAll("[" + app.sidebar.search.toggleAttr + "]")
        );
        e &&
            e.map(function (e) {
                e.onkeyup = function () {
                    var e,
                        a = this.value;
                    (a = a.toLowerCase())
                        ? ((e = [].slice.call(
                              document.querySelectorAll(
                                  "." +
                                      app.sidebar.class +
                                      ":not(." +
                                      app.sidebarEnd.class +
                                      ") ." +
                                      app.sidebar.menu.class +
                                      " > ." +
                                      app.sidebar.menu.itemClass +
                                      ":not(." +
                                      app.sidebar.profile.class +
                                      "):not(." +
                                      app.sidebar.menu.headerClass +
                                      "):not(." +
                                      app.sidebar.search.class +
                                      "), ." +
                                      app.sidebar.class +
                                      ":not(." +
                                      app.sidebarEnd.class +
                                      ") ." +
                                      app.sidebar.menu.submenu.class +
                                      " > ." +
                                      app.sidebar.menu.itemClass
                              )
                          )) &&
                              e.map(function (e) {
                                  e.classList.add(app.sidebar.search.hideClass);
                              }),
                          (e = [].slice.call(
                              document.querySelectorAll(
                                  "." +
                                      app.sidebar.class +
                                      ":not(." +
                                      app.sidebarEnd.class +
                                      ") ." +
                                      app.sidebar.search.foundClass
                              )
                          )) &&
                              e.map(function (e) {
                                  e.classList.remove(
                                      app.sidebar.search.foundClass
                                  );
                              }),
                          (e = [].slice.call(
                              document.querySelectorAll(
                                  "." +
                                      app.sidebar.class +
                                      ":not(." +
                                      app.sidebarEnd.class +
                                      ") ." +
                                      app.sidebar.menu.expandClass
                              )
                          )) &&
                              e.map(function (e) {
                                  e.classList.remove(
                                      app.sidebar.menu.expandClass
                                  );
                              }),
                          (e = [].slice.call(
                              document.querySelectorAll(
                                  "." +
                                      app.sidebar.class +
                                      ":not(." +
                                      app.sidebarEnd.class +
                                      ") ." +
                                      app.sidebar.menu.class +
                                      " > ." +
                                      app.sidebar.menu.itemClass +
                                      ":not(." +
                                      app.sidebar.profile.class +
                                      "):not(." +
                                      app.sidebar.menu.headerClass +
                                      "):not(." +
                                      app.sidebar.search.class +
                                      ") > ." +
                                      app.sidebar.menu.itemLinkClass +
                                      ", ." +
                                      app.sidebar.class +
                                      " ." +
                                      app.sidebar.menu.submenu.class +
                                      " > ." +
                                      app.sidebar.menu.itemClass +
                                      " > ." +
                                      app.sidebar.menu.itemLinkClass
                              )
                          )) &&
                              e.map(function (e) {
                                  var t = e.textContent;
                                  if ((t = t.toLowerCase()).search(a) > -1) {
                                      var s;
                                      if (
                                          ((s = e.closest(
                                              "." + app.sidebar.menu.itemClass
                                          )) &&
                                              (s.classList.remove(
                                                  app.sidebar.search.hideClass
                                              ),
                                              s.classList.add(
                                                  app.sidebar.search.foundClass
                                              )),
                                          (s = e.closest(
                                              "." +
                                                  app.sidebar.menu.itemClass +
                                                  "." +
                                                  app.sidebar.menu.hasSubClass
                                          )))
                                      )
                                          (s = s.querySelector(
                                              "." +
                                                  app.sidebar.menu.submenu
                                                      .class +
                                                  " ." +
                                                  app.sidebar.menu.itemClass +
                                                  "." +
                                                  app.sidebar.search.hideClass
                                          )) &&
                                              s.classList.remove(
                                                  app.sidebar.search.hideClass
                                              );
                                      if (
                                          (s = e.closest(
                                              "." +
                                                  app.sidebar.menu.submenu.class
                                          ))
                                      )
                                          if (
                                              ((s.style.display = "block"),
                                              (s = s.querySelector(
                                                  "." +
                                                      app.sidebar.menu
                                                          .itemClass +
                                                      ":not(." +
                                                      app.sidebar.search
                                                          .foundClass +
                                                      ")"
                                              )) &&
                                                  s.classList.add(
                                                      app.sidebar.search
                                                          .hideClass
                                                  ),
                                              (s = e.closest(
                                                  "." +
                                                      app.sidebar.menu
                                                          .hasSubClass +
                                                      ":not(." +
                                                      app.sidebar.search
                                                          .foundClass +
                                                      ")"
                                              )))
                                          )
                                              s.classList.remove(
                                                  app.sidebar.search.hideClass
                                              ),
                                                  s.classList.add(
                                                      app.sidebar.menu
                                                          .expandClass
                                                  ),
                                                  (s = s.closest(
                                                      "." +
                                                          app.sidebar.menu
                                                              .hasSubClass +
                                                          ":not(." +
                                                          app.sidebar.search
                                                              .foundClass +
                                                          ")"
                                                  )) &&
                                                      (s.classList.remove(
                                                          app.sidebar.search
                                                              .hideClass
                                                      ),
                                                      s.classList.add(
                                                          app.sidebar.menu
                                                              .expandClass
                                                      ));
                                  }
                              }))
                        : ((e = [].slice.call(
                              document.querySelectorAll(
                                  "." +
                                      app.sidebar.class +
                                      ":not(." +
                                      app.sidebarEnd.class +
                                      ") ." +
                                      app.sidebar.menu.class +
                                      " > ." +
                                      app.sidebar.menu.itemClass +
                                      ":not(." +
                                      app.sidebar.profile.class +
                                      "):not(." +
                                      app.sidebar.menu.headerClass +
                                      "):not(." +
                                      app.sidebar.search.class +
                                      ")." +
                                      app.sidebar.menu.hasSubClass +
                                      " ." +
                                      app.sidebar.menu.submenu.class
                              )
                          )) &&
                              e.map(function (e) {
                                  e.removeAttribute("style");
                              }),
                          (e = [].slice.call(
                              document.querySelectorAll(
                                  "." +
                                      app.sidebar.class +
                                      ":not(." +
                                      app.sidebarEnd.class +
                                      ") ." +
                                      app.sidebar.menu.class +
                                      " > ." +
                                      app.sidebar.menu.itemClass +
                                      ":not(." +
                                      app.sidebar.profile.class +
                                      "):not(." +
                                      app.sidebar.menu.headerClass +
                                      "):not(." +
                                      app.sidebar.search.class +
                                      ")"
                              )
                          )) &&
                              e.map(function (e) {
                                  e.classList.remove(
                                      app.sidebar.search.hideClass
                                  );
                              }),
                          (e = [].slice.call(
                              document.querySelectorAll(
                                  "." +
                                      app.sidebar.class +
                                      ":not(." +
                                      app.sidebarEnd.class +
                                      ") ." +
                                      app.sidebar.menu.submenu.class +
                                      " > ." +
                                      app.sidebar.menu.itemClass
                              )
                          )) &&
                              e.map(function (e) {
                                  e.classList.remove(
                                      app.sidebar.search.hideClass
                                  );
                              }),
                          (e = [].slice.call(
                              document.querySelectorAll(
                                  "." +
                                      app.sidebar.class +
                                      ":not(." +
                                      app.sidebarEnd.class +
                                      ") ." +
                                      app.sidebar.menu.expandClass
                              )
                          )) &&
                              e.map(function (e) {
                                  e.classList.remove(
                                      app.sidebar.menu.expandClass
                                  );
                              }));
                };
            });
    },
    handleToggleClass = function () {
        var e = [].slice.call(
            document.querySelectorAll("[" + app.toggleClass.toggleAttr + "]")
        );
        e &&
            e.map(function (e) {
                e.onclick = function (e) {
                    e.preventDefault();
                    var a = this.getAttribute(app.toggleClass.targetAttr)
                            ? this.getAttribute(app.toggleClass.targetAttr)
                            : "",
                        t = this.getAttribute(app.toggleClass.toggleAttr),
                        s = document.querySelector(a);
                    s && s.classList.toggle(t);
                };
            });
    },
    handleDismissClass = function () {
        var e = [].slice.call(
            document.querySelectorAll("[" + app.dismissClass.toggleAttr + "]")
        );
        e &&
            e.map(function (e) {
                e.onclick = function (e) {
                    e.preventDefault();
                    var a = this.getAttribute(app.dismissClass.targetAttr)
                            ? this.getAttribute(app.dismissClass.targetAttr)
                            : "",
                        t = this.getAttribute(app.dismissClass.toggleAttr),
                        s = document.querySelector(a);
                    s && s.classList.remove(t);
                };
            });
    },
    stringToColor = function (e) {
        for (var a = 0, t = 0; t < e.length; t++)
            a = e.charCodeAt(t) + ((a << 5) - a);
        var s = "#";
        for (t = 0; t < 3; t++) {
            s += ("00" + ((a >> (8 * t)) & 255).toString(16)).substr(-2);
        }
        return s;
    },
    hexToRgba = function (e, a = 1, t = !1) {
        var s;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(e))
            return (
                3 == (s = e.substring(1).split("")).length &&
                    (s = [s[0], s[0], s[1], s[1], s[2], s[2]]),
                "rgba(" +
                    [
                        ((s = "0x" + s.join("")) >> 16) & 255,
                        (s >> 8) & 255,
                        255 & s,
                    ].join(",") +
                    "," +
                    a +
                    ")"
            );
        if (!t) return (e = stringToColor(e)), hexToRgba(e, a, !0);
        throw new Error("Bad Hex");
    },
    handleCssVariable = function () {
        var e = getComputedStyle(document.body);
        if (app.variableFontList && app.variablePrefix)
            for (var a = 0; a < app.variableFontList.length; a++)
                app.font[
                    app.variableFontList[a].replace(/-([a-z|0-9])/g, (e, a) =>
                        a.toUpperCase()
                    )
                ] = e
                    .getPropertyValue(
                        "--" + app.variablePrefix + app.variableFontList[a]
                    )
                    .trim();
        if (app.variableColorList && app.variablePrefix)
            for (a = 0; a < app.variableColorList.length; a++)
                app.color[
                    app.variableColorList[a].replace(/-([a-z|0-9])/g, (e, a) =>
                        a.toUpperCase()
                    )
                ] = e
                    .getPropertyValue(
                        "--" + app.variablePrefix + app.variableColorList[a]
                    )
                    .trim();
    },
    handleScrollTo = function () {
        [].slice
            .call(
                document.querySelectorAll("[" + app.scrollTo.toggleAttr + "]")
            )
            .map(function (e) {
                e.onclick = function (a) {
                    a.preventDefault();
                    var t = e.getAttribute(app.scrollTo.targetAttr)
                            ? this.getAttribute(app.scrollTo.targetAttr)
                            : this.getAttribute("href"),
                        s = document.querySelectorAll(t)[0],
                        l = document.querySelectorAll("." + app.header.class)[0]
                            .offsetHeight,
                        o = document.querySelector("." + app.content.class),
                        r = window.getComputedStyle(o),
                        n = r ? parseInt(r.getPropertyValue("padding-top")) : 0;
                    if (s) {
                        var i = s.offsetTop - l - n;
                        window.scrollTo({ top: i, behavior: "smooth" });
                    }
                };
            });
    },
    App = (function () {
        "use strict";
        var e;
        return {
            init: function (a) {
                a && (e = a),
                    this.initLocalStorage(),
                    this.initTopMenu(),
                    this.initComponent(),
                    this.initPageLoad(),
                    this.initSidebar(),
                    this.initThemePanel(),
                    this.initVariable(),
                    window.dispatchEvent(new CustomEvent("load")),
                    e && e.ajaxMode && this.initAjax();
            },
            settings: function (a) {
                a && (e = a);
            },
            initSidebar: function () {
                handleSidebarMenu(),
                    handleSidebarToggle(),
                    handleSidebarEndToggle(),
                    handleSidebarMinify(),
                    handleSidebarMinifyFloatMenu(),
                    handleToggleNavProfile(),
                    handleToggleNavbarSearch(),
                    handleSidebarSearch(),
                    (!e || (e && !e.disableSidebarScrollMemory)) &&
                        handleSidebarScrollMemory();
            },
            initTopMenu: function () {
                handleUnlimitedTopMenuRender(),
                    handleTopMenuSubMenu(),
                    handleTopMenuMobileToggle();
            },
            initPageLoad: function () {
                handlePageLoader();
            },
            initComponent: function () {
                (!e || (e && !e.disableDraggablePanel)) &&
                    handlePanelDraggable(),
                    handleScrollbar(),
                    handleScrollTo(),
                    handleUnlimitedTabsRender(),
                    handlePanelAction(),
                    handleScrollToTopButton(),
                    handlePageScrollClass(),
                    handleAnimation(),
                    handleToggleClass(),
                    handleDismissClass(),
                    handleAjaxMode.initToggler(),
                    document.body.clientWidth > 767 &&
                        handelTooltipPopoverActivation();
            },
            initLocalStorage: function () {
                (!e || (e && !e.disableLocalStorage)) && handleLocalStorage();
            },
            initThemePanel: function () {
                handleThemePanel(), handleResetLocalStorage();
            },
            initAjax: function () {
                handleAjaxMode.init(e);
            },
            initVariable: function () {
                handleCssVariable();
            },
            setPageTitle: function (e) {
                document.title = e;
            },
            setPageOption: function (e) {
                handleSetPageOption(e);
            },
            clearPageOption: function (e) {
                handleClearPageOption(e);
            },
            restartGlobalFunction: function () {
                for (
                    var e = [".jvectormap-tip", ".daterangepicker"], a = 0;
                    a < e.length;
                    a++
                ) {
                    var t = [].slice.call(document.querySelectorAll(e[a]));
                    t &&
                        t.map(function (e) {
                            e.remove();
                        });
                }
                this.initLocalStorage(), this.initComponent();
            },
            scrollTop: function () {
                document.body.scrollTop = 0;
            },
        };
    })();
"loading" !== document.readyState
    ? (App.init(), App.restartGlobalFunction())
    : document.addEventListener("DOMContentLoaded", function () {
          App.init(), App.restartGlobalFunction();
      });
