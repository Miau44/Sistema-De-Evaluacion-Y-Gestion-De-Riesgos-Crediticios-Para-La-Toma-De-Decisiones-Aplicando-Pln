<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Cliente;
use App\Models\Material;
use App\Models\Producto;
use App\Models\Publicacion;
use App\Models\ReporteFinanciero;
use App\Models\Tarea;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{

    public function permisosUsuario(Request $request)
    {
        return response()->JSON([
            "permisos" => Auth::user()->permisos
        ]);
    }

    public function getUser()
    {
        return response()->JSON([
            "user" => Auth::user()
        ]);
    }

    public static function getInfoBoxUser()
    {
        $permisos = [];
        $array_infos = [];
        if (Auth::check()) {
            $oUser = new User();
            $permisos = $oUser->permisos;
            if ($permisos == '*' || (is_array($permisos) && in_array('usuarios.index', $permisos))) {
                $array_infos[] = [
                    'label' => 'USUARIOS',
                    'cantidad' => User::where('id', '!=', 1)->count(),
                    'color' => 'bg-principal',
                    'icon' => "fa-users",
                    "url" => "usuarios.index"
                ];
            }


            if ($permisos == '*' || (is_array($permisos) && in_array('clientes.index', $permisos))) {
                $total = Cliente::count();
                $array_infos[] = [
                    'label' => 'CLIENTES',
                    'cantidad' => $total,
                    'color' => 'bg-principal',
                    'icon' => "fa-list",
                    "url" => "clientes.index"
                ];
            }

            if ($permisos == '*' || (is_array($permisos) && in_array('reporte_financieros.index', $permisos))) {
                $total = ReporteFinanciero::count();
                $array_infos[] = [
                    'label' => 'REPORTES FINANCIEROS',
                    'cantidad' => $total,
                    'color' => 'bg-principal',
                    'icon' => "fa-list",
                    "url" => "reporte_financieros.index"
                ];
            }
        }


        return $array_infos;
    }
}
