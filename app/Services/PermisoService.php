<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class PermisoService
{
    protected $arrayPermisos = [
        "ADMINISTRADOR" => [
            "usuarios.api",
            "usuarios.index",
            "usuarios.listado",
            "usuarios.create",
            "usuarios.store",
            "usuarios.edit",
            "usuarios.show",
            "usuarios.update",
            "usuarios.destroy",
            "usuarios.password",

            "clientes.api",
            "clientes.listado",
            "clientes.index",
            "clientes.create",
            "clientes.store",
            "clientes.edit",
            "clientes.show",
            "clientes.update",
            "clientes.destroy",

            "tipo_documentos.api",
            "tipo_documentos.listado",
            "tipo_documentos.index",
            "tipo_documentos.create",
            "tipo_documentos.store",
            "tipo_documentos.edit",
            "tipo_documentos.show",
            "tipo_documentos.update",
            "tipo_documentos.destroy",

            "reporte_financieros.api",
            "reporte_financieros.listado",
            "reporte_financieros.index",
            "reporte_financieros.create",
            "reporte_financieros.store",
            "reporte_financieros.edit",
            "reporte_financieros.show",
            "reporte_financieros.update",
            "reporte_financieros.destroy",
            "reporte_financieros.archivos",

            "configuracions.index",
            "configuracions.create",
            "configuracions.edit",
            "configuracions.update",
            "configuracions.destroy",

            "reportes.usuarios",
            "reportes.r_usuarios",
            "reportes.clientes",
            "reportes.r_clientes",
            "reportes.reporte_financieros",
            "reportes.r_reporte_financieros",
            "reportes.greporte_financieros",
            "reportes.r_greporte_financieros"
        ],
        "EMPLEADO" => [
            "clientes.api",
            "clientes.listado",
            "clientes.index",
            "clientes.create",
            "clientes.store",
            "clientes.edit",
            "clientes.show",
            "clientes.update",
            "clientes.destroy",

            "tipo_documentos.api",
            "tipo_documentos.listado",
            "tipo_documentos.index",
            "tipo_documentos.create",
            "tipo_documentos.store",
            "tipo_documentos.edit",
            "tipo_documentos.show",
            "tipo_documentos.update",
            "tipo_documentos.destroy",

            "reporte_financieros.api",
            "reporte_financieros.listado",
            "reporte_financieros.index",
            "reporte_financieros.create",
            "reporte_financieros.store",
            "reporte_financieros.edit",
            "reporte_financieros.show",
            "reporte_financieros.update",
            "reporte_financieros.destroy",
            "reporte_financieros.archivos",

            "reportes.clientes",
            "reportes.r_clientes",
            "reportes.reporte_financieros",
            "reportes.r_reporte_financieros",
            "reportes.greporte_financieros",
            "reportes.r_greporte_financieros"
        ],
    ];

    public function getPermisosUser()
    {
        $user = Auth::user();
        $permisos = [];
        if ($user) {
            return $this->arrayPermisos[$user->tipo];
        }

        return $permisos;
    }
}
