<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;

class CargarArchivoService
{
    /**
     * Cargar archvos
     *
     * @param UploadedFile $file
     * @param string $ruta
     * @param string|null $nombre
     * @return string
     */
    public function cargarArchivo(UploadedFile $file, string $ruta, string $nombre = null): string
    {
        $nombre_archivo = time();
        if ($nombre) {
            $nombre_archivo = $nombre;
        }
        $extension = "." . $file->getClientOriginalExtension();
        $nombre_archivo .= $extension;
        $file->move($ruta, $nombre_archivo);

        return $nombre_archivo;
    }
}
