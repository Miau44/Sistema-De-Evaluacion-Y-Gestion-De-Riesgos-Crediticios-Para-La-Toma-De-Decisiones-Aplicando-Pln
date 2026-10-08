<script>
import { Tooltip } from "bootstrap";
import { slideToggle } from "@/composables/slideToggle.js";

export default {
    props: ["mostrar_loading"],
    watch: {
        mostrar_loading(newVal, oldVal) {
            console.log(newVal);
            if (newVal) {
                this.agregarLoading();
            }
        },
    },
    data() {
        return {
            reloadTooltip: null,
        };
    },
    mounted() {
        if (this.mostrar_loading) {
            this.agregarLoading();
        }

        // expand tooltip
        new Tooltip(this.$refs.expandToggler, {
            title: "Expand / Compress",
            placement: "bottom",
            trigger: "hover",
            container: "body",
        });

        // expand
        this.$refs.expandToggler.onclick = function (e) {
            e.preventDefault();

            var target = this.closest(".panel");
            var targetClass = "panel-expand";
            var targetTop = 40;

            if (
                document.body.classList.contains(targetClass) &&
                target.classList.contains(targetClass)
            ) {
                target.removeAttribute("style");
                target.classList.remove(targetClass);
                document.body.classList.remove(targetClass);
            } else {
                document.body.classList.add(targetClass);
                target.classList.add(targetClass);
            }

            window.dispatchEvent(new Event("resize"));
        };

        // collapse tooltip
        var collapseTooltip = new Tooltip(this.$refs.collapseToggler, {
            title: "Collapse / Expand",
            placement: "bottom",
            trigger: "hover",
            container: "body",
        });

        // collapse
        this.$refs.collapseToggler.onclick = function (e) {
            e.preventDefault();

            collapseTooltip.hide();
            slideToggle(this.closest(".panel").querySelector(".panel-body"));
        };

        // remove tooltip
        new Tooltip(this.$refs.removeToggler, {
            title: "Remove",
            placement: "bottom",
            trigger: "hover",
            container: "body",
        });

        // remove
        this.$refs.removeToggler.onclick = function (e) {
            e.preventDefault();

            document.querySelector(".tooltip").remove();
            this.closest(".panel").remove();
        };

        // reload tooltip
        this.reloadTooltip = new Tooltip(this.$refs.reloadToggler, {
            title: "Reload",
            placement: "bottom",
            trigger: "hover",
            container: "body",
        });

        // reload
        this.$refs.reloadToggler.onclick = this.agregarLoadingClick;
    },
    methods: {
        agregarLoadingClick(e) {
            e.preventDefault();
            if (this.reloadTooltip) {
                this.reloadTooltip.hide();
            }
            var target = e.target.closest(".panel");
            if (!target.classList.contains("panel-loading")) {
                var targetBody = target.querySelector(".panel-body");
                var spinnerHtml = document.createElement("div");
                spinnerHtml.classList.add("panel-loader");
                spinnerHtml.innerHTML =
                    '<span class="spinner spinner-sm"></span>';
                target.classList.add("panel-loading");
                targetBody.appendChild(spinnerHtml);

                this.$emit("loading");
                setTimeout(() => {
                    target.classList.remove("panel-loading");
                    target.querySelector(".panel-loader").remove();
                }, 2000);
            }
        },
        agregarLoading() {
            if (this.reloadTooltip) {
                this.reloadTooltip.hide();
            }
            var target = this.$refs.reloadToggler.closest(".panel");
            if (!target.classList.contains("panel-loading")) {
                var targetBody = target.querySelector(".panel-body");
                var spinnerHtml = document.createElement("div");
                spinnerHtml.classList.add("panel-loader");
                spinnerHtml.innerHTML =
                    '<span class="spinner spinner-sm"></span>';
                target.classList.add("panel-loading");
                targetBody.appendChild(spinnerHtml);

                setTimeout(() => {
                    target.classList.remove("panel-loading");
                    target.querySelector(".panel-loader").remove();
                }, 2000);
            }
        },
    },
};
</script>
<template>
    <div class="panel-heading-btn">
        <a
            href="javascript:;"
            class="btn btn-xs btn-icon btn-default"
            ref="expandToggler"
            ><i class="fa fa-expand"></i
        ></a>
        <a
            href="javascript:;"
            class="btn btn-xs btn-icon btn-success"
            ref="reloadToggler"
            ><i class="fa fa-redo"></i
        ></a>
        <a
            href="javascript:;"
            class="btn btn-xs btn-icon btn-warning"
            ref="collapseToggler"
            ><i class="fa fa-minus"></i
        ></a>
        <a
            href="javascript:;"
            class="btn btn-xs btn-icon btn-danger"
            ref="removeToggler"
            ><i class="fa fa-times"></i
        ></a>
    </div>
</template>
