<template>
    <div
        class="dropzone"
        @dragover.stop="handleDragOver"
        @dragleave.stop="handleDragLeave"
        @drop.stop="handleDrop"
        @click="openFilePicker"
    >
        <div
            :style="`max-height:${
                archivos_existentes.length > 0 ? '200px;' : '0px;'
            }`"
            class="archivos_cargados w-100"
        >
            <template v-for="(item, index) in archivos_existentes">
                <div class="archivo">
                    <button
                        type="button"
                        class="btn_quitar"
                        @click.stop="quitarArchivo(index)"
                    >
                        <i class="mdi mdi-close"></i>
                    </button>
                    <button
                        v-if="item.id != 0"
                        type="button"
                        class="btn_descargar"
                        @click.stop="descargarArchivo(item.url_archivo)"
                    >
                        <i class="mdi mdi-download"></i>
                    </button>
                    <span
                        class="check"
                        :class="[
                            item.id != 0
                                ? 'text-success'
                                : 'text-grey-darken-1',
                        ]"
                        ><i
                            class="mdi"
                            :class="[
                                item.id != 0
                                    ? 'mdi-check-circle'
                                    : 'mdi-upload-circle',
                            ]"
                        ></i
                    ></span>
                    <div class="thumbail">
                        <img :src="item.url_file" alt="Icon" />
                    </div>
                    <div class="info_archivo">
                        <p class="nombre">
                            {{ item.name }}
                        </p>
                    </div>
                </div>
            </template>
        </div>
        <div class="contenedor_info mt-3">
            <div v-if="!dragging" class="msj_drag">
                Arrastra y suelta archivos aquí o haz clic para seleccionar
                archivos
            </div>
            <div v-else class="zona_drop">Suelta los archivos aquí</div>
        </div>
        <input
            type="file"
            multiple
            style="display: none"
            ref="fileInput"
            id="fileInput"
            @change="handleFiles"
        />
    </div>
</template>

<script>
export default {
    props: {
        nro_etapa: {
            type: Number,
            default: 0,
        },
        nro_nombre: {
            type: Number,
            default: 0,
        },
        files: {
            type: Array,
            default: [],
        },
        maximo: {
            type: Number,
            default: 10,
        },
    },
    watch: {
        files(newFiles) {
            this.archivos_existentes = [...newFiles];
        },
    },
    data() {
        return {
            dragging: false,
            archivos_existentes: [...this.files],
            eliminados: [],
        };
    },
    mounted() {},
    methods: {
        quitarArchivo(index) {
            if (this.archivos_existentes[index].id != 0) {
                // existente en BD
                this.eliminados.push(this.archivos_existentes[index].id);
                console.log(this.eliminados);
                this.$emit(
                    "addEliminados",
                    this.eliminados,
                    this.nro_etapa,
                    this.nro_nombre
                );
            }
            this.archivos_existentes.splice(index, 1);
            this.$emit(
                "UpdateFiles",
                this.archivos_existentes,
                this.nro_etapa,
                this.nro_nombre
            );
        },
        descargarArchivo(url) {
            window.open(url, "_blank");
        },
        handleDrop(event) {
            event.preventDefault();
            this.dragging = false;
            const files = event.dataTransfer.files;
            let self = this;
            setTimeout(() => {
                self.handleFiles(files);
            }, 500);
        },
        handleFiles(eventOrFiles) {
            let files = [];
            if (eventOrFiles instanceof Event) {
                // Si se inició la carga mediante clic
                files = eventOrFiles.target.files;
            } else {
                // Si se inició la carga mediante arrastrar y soltar
                files = eventOrFiles;
            }
            let total_cargados =
                parseInt(files.length) +
                parseInt(this.archivos_existentes.length);
            if (total_cargados <= this.maximo) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    this.generateThumbnail(file);
                }
                this.$refs.fileInput.value = null;
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Error",
                    text: `No es posible cargar mas de ${this.maximo} archivos`,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: `Aceptar`,
                });
            }
        },
        openFilePicker() {
            // Simula el clic en el input de tipo file
            this.$refs.fileInput.click();
        },
        handleDragOver(event) {
            event.preventDefault();
            this.dragging = true;
        },
        handleDragLeave(event) {
            event.preventDefault();
            this.dragging = false;
        },
        generateThumbnail(file) {
            const reader = new FileReader();
            console.log(url_assets);
            if (file.type.startsWith("image/")) {
                reader.onload = (e) => {
                    this.archivos_existentes.push({
                        id: 0,
                        name: file.name,
                        url_file: e.target.result,
                        file: file,
                    });
                    this.$emit(
                        "UpdateFiles",
                        [...this.archivos_existentes],
                        this.nro_etapa,
                        this.nro_nombre
                    );
                };
            } else {
                this.archivos_existentes.push({
                    id: 0,
                    name: file.name,
                    url_file: url_assets + "imgs/attach.png",
                    file: file,
                });
                this.$emit(
                    "UpdateFiles",
                    [...this.archivos_existentes],
                    this.nro_etapa,
                    this.nro_nombre
                );
            }
            reader.readAsDataURL(file);
        },
    },
};
</script>

<style scoped>
.dropzone {
    padding: 20px;
    width: 100%;
    border: dashed 2px black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.dropzone .archivos {
    width: 100%;
    text-align: center;
}

.dropzone button {
    width: 20%;
    margin: auto;
    margin-top: 20px;
}

.dropzone .contenedor_info {
    cursor: pointer;
    text-align: center;
    width: 100%;
}
.dropzone .msj_drag,
.dropzone .zona_drop {
    padding: 20px;
    width: 100%;
    height: 100%;
    background: #ececec;
}

.dropzone .zona_drop {
    background-color: rgb(145, 255, 231);
}

.archivos_cargados {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
    overflow: auto;
}

.archivos_cargados .archivo {
    position: relative;
    width: 200px;
    max-width: 100%;
    padding: 10px;
    background-color: rgb(235, 235, 235);
    border: solid 1px rgb(182, 182, 182);
}

.archivos_cargados .archivo .thumbail {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    overflow: hidden;
    height: 90px;
}
.archivos_cargados .archivo .thumbail img {
    margin-top: 19px;
    height: 100%;
}

.archivos_cargados .archivo .info_archivo {
    width: 100%;
}
.archivos_cargados .archivo .info_archivo .nombre {
    font-size: 0.9em;
}

.archivos_cargados .archivo .btn_quitar {
    padding: 3px 0px;
    border-radius: 3px;
    position: absolute;
    margin: 0px;
    top: 0px;
    right: 0px;
    font-size: 1.3em;
    transition: all 0.3s;
    color: red;
}

.archivos_cargados .archivo .btn_quitar:hover {
    background-color: rgb(250, 210, 210);
    color: red;
}

.archivos_cargados .archivo .btn_descargar {
    padding: 3px 0px;
    border-radius: 3px;
    position: absolute;
    margin: 0px;
    top: 0px;
    right: 40px;
    font-size: 1.3em;
    transition: all 0.3s;
    color: rgb(2, 146, 241);
}

.archivos_cargados .archivo .btn_descargar:hover {
    background-color: rgb(2, 146, 241);
    color: white;
}

.archivos_cargados .archivo .check {
    padding: 3px 2px;
    border-radius: 3px;
    position: absolute;
    margin: 0px;
    top: 0px;
    left: 0px;
    font-size: 1.3em;
}

p.nombre {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
