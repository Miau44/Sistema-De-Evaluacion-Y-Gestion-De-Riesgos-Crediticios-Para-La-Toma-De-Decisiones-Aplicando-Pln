<?php

namespace App\Http\Controllers;

use App\Models\Configuracion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ConfiguracionController extends Controller
{
    public $validacion = [
        "nombre_sistema" => "required|min:2",
        "alias" => "required",
    ];

    public $messages = [
        "nombre_sistema.required" => "Este campo es obligatorio",
        "nombre_sistema.min" => "Debes ingresar al menos :min caracteres",
        "alias.required" => "Este campo es obligatorio",
    ];

    public function index(Request $request)
    {
        // if (!UserController::verificaPermiso("configuracions.index")) {
        //     abort(401, "No autorizado");
        // }

        $configuracion = Configuracion::first();

        return Inertia::render("Admin/Configuracions/Index", compact("configuracion"));
    }

    public function getConfiguracion()
    {
        $configuracion = Configuracion::first();
        return response()->JSON([
            "configuracion" => $configuracion
        ], 200);
    }

    public function update(Configuracion $configuracion, Request $request)
    {
        $request->validate($this->validacion, $this->messages);
        DB::beginTransaction();
        try {
            $configuracion->update(array_map("mb_strtoupper", $request->except("logo")));

            if ($request->hasFile('logo')) {
                $antiguo = $configuracion->logo;
                if ($antiguo && $antiguo != 'default.png') {
                    \File::delete(public_path() . '/imgs/' . $antiguo);
                }
                $file = $request->logo;
                $nom_logo = time() . '_' . $configuracion->id . '.' . $file->getClientOriginalExtension();
                $configuracion->logo = $nom_logo;
                $file->move(public_path() . '/imgs/', $nom_logo);
            }
            $configuracion->save();

            DB::commit();
            return redirect()->route("configuracions.index")->with("success", "Registro correcto");
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function show(Configuracion $configuracion) {}
}
