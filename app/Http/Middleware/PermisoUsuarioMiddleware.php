<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class PermisoUsuarioMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (Auth::check()) {
            $permisos = Auth::user()->permisos;
            // Log::debug($request->route()->getName());
            // Log::debug($request->route()->getPrefix());
            $prefijo = $request->route()->getPrefix();
            $nom_ruta = $request->route()->getName();
            $continuar = true;

            $exepciones = [
                "inicio",

                "profile.edit",
                "profile.update",
                "profile.update_foto",
                
                "users.getUser",
            ];

            if ($prefijo == 'admin') {
                if (!in_array($nom_ruta, $permisos)) {
                    $continuar = false;
                }
                if (in_array($nom_ruta, $exepciones)) {
                    $continuar = true;
                }
            }
            if (!$continuar) {
                abort(401, "Acceso denegado");
            }
        }

        return $next($request);
    }
}
