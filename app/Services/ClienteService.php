<?php

namespace App\Services;

use App\Services\HistorialAccionService;
use App\Models\Cliente;
use App\Models\ClienteMaterial;
use App\Models\ClienteOperario;
use App\Models\ReporteFinanciero;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ClienteService
{
    private $modulo = "CLIENTES";

    public function __construct(private HistorialAccionService $historialAccionService) {}

    public function listado(): Collection
    {
        $clientes = Cliente::select("clientes.*");
        $clientes = $clientes->get();
        return $clientes;
    }

    public function listadoDataTable(int $length, int $start, int $page, string $search): LengthAwarePaginator
    {
        $clientes = Cliente::select("clientes.*");
        $clientes = $clientes->paginate($length, ['*'], 'page', $page);
        return $clientes;
    }

    /**
     * Crear cliente
     *
     * @param array $datos
     * @return Cliente
     */
    public function crear(array $datos): Cliente
    {
        $cliente = Cliente::create([
            "nombre" => mb_strtoupper($datos["nombre"]),
            "paterno" => mb_strtoupper($datos["paterno"]),
            "materno" => mb_strtoupper($datos["materno"]),
            "ci" => mb_strtoupper($datos["ci"]),
            "ci_exp" => $datos["ci_exp"],
            "nacionalidad" => mb_strtoupper($datos["nacionalidad"]),
            "sexo" => $datos["sexo"],
            "fecha_nac" => $datos["fecha_nac"],
            "dir" => mb_strtoupper($datos["dir"]),
            "fono" => $datos["fono"],
            "correo" => $datos["correo"],
            "nom_lugartrabajo" => mb_strtoupper($datos["nom_lugartrabajo"]),
            "nro_nit" => mb_strtoupper($datos["nro_nit"]),
            "unipersonal" => $datos["unipersonal"],
            "actividad" => mb_strtoupper($datos["actividad"]),
            "dir_lab" => mb_strtoupper($datos["dir_lab"]),
            "fono_lab" => $datos["fono_lab"],
            "correo_lab" => $datos["correo_lab"],
            "cargo_lab" => mb_strtoupper($datos["cargo_lab"]),
            "tiempo_lab" => $datos["tiempo_lab"],
            "fecha_ingreso_lab" => $datos["fecha_ingreso_lab"],
            "estado_civil" => $datos["estado_civil"],
            "vivienda" => $datos["vivienda"],
            "grado_instruccion" => mb_strtoupper($datos["grado_instruccion"]),
            "situacion_laboral" => mb_strtoupper($datos["situacion_laboral"]),
            "profesion" => mb_strtoupper($datos["profesion"]),
            "nom_conyugue" => mb_strtoupper($datos["nom_conyugue"]),
            "paterno_conyugye" => mb_strtoupper($datos["paterno_conyugye"]),
            "materno_conyugye" => mb_strtoupper($datos["materno_conyugye"]),
            "ci_conyugue" => $datos["ci_conyugue"],
            "ci_exp_conyugue" => $data['ci_exp_conyugue'] = $request->ci_exp_conyugue ?? '',
            "nacionalidad_conyugye" => mb_strtoupper($datos["nacionalidad_conyugye"]),
            "ocupacion_conyugue" => mb_strtoupper($datos["ocupacion_conyugue"]),
            "fecha_registro" => date("Y-m-d"),
        ]);

        // registrar accion
        $this->historialAccionService->registrarAccion($this->modulo, "CREACIÓN", "REGISTRO UN CLIENTE", $cliente, null);

        return $cliente;
    }

    /**
     * Actualizar cliente
     *
     * @param array $datos
     * @param Cliente $cliente
     * @return Cliente
     */
    public function actualizar(array $datos, Cliente $cliente): Cliente
    {
        $old_cliente = clone $cliente;

        $cliente->update([
            "nombre" => mb_strtoupper($datos["nombre"]),
            "paterno" => mb_strtoupper($datos["paterno"]),
            "materno" => mb_strtoupper($datos["materno"]),
            "ci" => mb_strtoupper($datos["ci"]),
            "ci_exp" => $datos["ci_exp"],
            "nacionalidad" => mb_strtoupper($datos["nacionalidad"]),
            "sexo" => $datos["sexo"],
            "fecha_nac" => $datos["fecha_nac"],
            "dir" => mb_strtoupper($datos["dir"]),
            "fono" => $datos["fono"],
            "correo" => $datos["correo"],
            "nom_lugartrabajo" => mb_strtoupper($datos["nom_lugartrabajo"]),
            "nro_nit" => mb_strtoupper($datos["nro_nit"]),
            "unipersonal" => $datos["unipersonal"],
            "actividad" => mb_strtoupper($datos["actividad"]),
            "dir_lab" => mb_strtoupper($datos["dir_lab"]),
            "fono_lab" => $datos["fono_lab"],
            "correo_lab" => $datos["correo_lab"],
            "cargo_lab" => mb_strtoupper($datos["cargo_lab"]),
            "tiempo_lab" => $datos["tiempo_lab"],
            "fecha_ingreso_lab" => $datos["fecha_ingreso_lab"],
            "estado_civil" => $datos["estado_civil"],
            "vivienda" => $datos["vivienda"],
            "grado_instruccion" => mb_strtoupper($datos["grado_instruccion"]),
            "situacion_laboral" => mb_strtoupper($datos["situacion_laboral"]),
            "profesion" => mb_strtoupper($datos["profesion"]),
            "nom_conyugue" => mb_strtoupper($datos["nom_conyugue"]),
            "paterno_conyugye" => mb_strtoupper($datos["paterno_conyugye"]),
            "materno_conyugye" => mb_strtoupper($datos["materno_conyugye"]),
            "ci_conyugue" => $datos["ci_conyugue"],
            "ci_exp_conyugue" => $data['ci_exp_conyugue'] = $request->ci_exp_conyugue ?? '',
            "nacionalidad_conyugye" => mb_strtoupper($datos["nacionalidad_conyugye"]),
            "ocupacion_conyugue" => mb_strtoupper($datos["ocupacion_conyugue"]),
        ]);


        // registrar accion
        $this->historialAccionService->registrarAccion($this->modulo, "MODIFICACIÓN", "ACTUALIZÓ UN CLIENTE", $old_cliente, $cliente);

        return $cliente;
    }

    /**
     * Eliminar cliente
     *
     * @param Cliente $cliente
     * @return boolean
     */
    public function eliminar(Cliente $cliente): bool
    {
        // verificar usos
        $usos = ReporteFinanciero::where("cliente_id", $cliente->id)->get();
        if (count($usos) > 0) {
            throw ValidationException::withMessages([
                'error' =>  "No es posible eliminar este registro porque esta siendo utilizado por otros registros",
            ]);
        }
        $old_cliente = clone $cliente;
        $cliente->delete();

        // registrar accion
        $this->historialAccionService->registrarAccion($this->modulo, "ELIMINACIÓN", "ELIMINÓ UN CLIENTE", $old_cliente);

        return true;
    }
}
