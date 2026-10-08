<?php

namespace App\Services;

use App\Models\ReporteFinanciero;
use App\Services\HistorialAccionService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class ReporteFinancieroService
{
    private $modulo = "REPORTE FINANCIERO";

    public function __construct(private HistorialAccionService $historialAccionService, private CargarArchivoService $cargarArchivoService) {}

    public function listado(): Collection
    {
        $reporte_financieros = ReporteFinanciero::with(["tipo_documento", "cliente"])->select("reporte_financieros.*");
        $reporte_financieros = $reporte_financieros->get();
        return $reporte_financieros;
    }

    public function listadoDataTable(int $length, int $start, int $page, string $search): LengthAwarePaginator
    {
        $reporte_financieros = ReporteFinanciero::with(["tipo_documento", "cliente"])
            ->select("reporte_financieros.*");
        if (!empty($search)) {
            // Detectar si el texto parece una fecha (ej: 12/10/2025 o 12-10-2025)
            $fecha = null;
            if (preg_match('/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/', trim($search), $matches)) {
                try {
                    $fecha = Carbon::createFromFormat('d/m/Y', str_replace('-', '/', $search))->format('Y-m-d');
                } catch (\Exception $e) {
                    // Si falla el formato anterior, intentar con d-m-Y
                    try {
                        $fecha = Carbon::createFromFormat('d-m-Y', $search)->format('Y-m-d');
                    } catch (\Exception $e2) {
                        $fecha = null;
                    }
                }
            }

            $reporte_financieros->where(function ($query) use ($search, $fecha) {
                // Buscar por nombre completo del cliente
                $query->orWhereHas('cliente', function ($q) use ($search) {
                    $q->where(DB::raw("CONCAT_WS(' ', nombre, paterno, materno)"), 'LIKE', "%{$search}%");
                });

                // Buscar por tipo de documento
                $query->orWhereHas('tipo_documento', function ($q) use ($search) {
                    $q->where('nombre', 'LIKE', "%{$search}%");
                });

                // Buscar por fecha si es válida
                if ($fecha) {
                    $query->orWhereDate('reporte_financieros.fecha_registro', $fecha);
                }
            });
        }
        $reporte_financieros = $reporte_financieros->paginate($length, ['*'], 'page', $page);
        return $reporte_financieros;
    }

    /**
     * Crear reporte_financiero
     *
     * @param array $datos
     * @return ReporteFinanciero
     */
    public function crear(array $datos): ReporteFinanciero
    {
        $reporte_financiero = ReporteFinanciero::create([
            "tipo_documento_id" => $datos["tipo_documento_id"],
            "cliente_id" => $datos["cliente_id"],
            "res" => $datos["res"],
            "tipo" => $datos["tipo"],
            "fecha_registro" => date("Y-m-d")
        ]);

        // registrar archivos
        $this->cargarArchivo($reporte_financiero, $datos["doc1"], "doc1", '1');
        $this->cargarArchivo($reporte_financiero, $datos["doc2"], "doc2", '2');

        // registrar accion
        $this->historialAccionService->registrarAccion($this->modulo, "CREACIÓN", "REGISTRO UN REPORTE FINANCIERO", $reporte_financiero, null);

        return $reporte_financiero;
    }

    /**
     * Actualizar reporte_financiero
     *
     * @param array $datos
     * @param ReporteFinanciero $reporte_financiero
     * @return ReporteFinanciero
     */
    public function actualizar(array $datos, ReporteFinanciero $reporte_financiero): ReporteFinanciero
    {
        $old_reporte_financiero = clone $reporte_financiero;
        $reporte_financiero->update([
            "tipo_documento_id" => $datos["tipo_documento_id"],
            "cliente_id" => $datos["cliente_id"],
            "res" => $datos["res"],
            "tipo" => $datos["tipo"],
        ]);

        // registrar archivos
        if ($datos["doc1"] && !is_string($datos["doc1"])) {
            $this->cargarArchivo($reporte_financiero, $datos["doc1"], "doc1", '1');
        }

        if ($datos["doc2"] && !is_string($datos["doc2"])) {
            $this->cargarArchivo($reporte_financiero, $datos["doc2"], "doc2", '2');
        }

        // registrar accion
        $this->historialAccionService->registrarAccion($this->modulo, "MODIFICACIÓN", "ACTUALIZÓ UN REPORTE FINANCIERO", $old_reporte_financiero, $reporte_financiero);

        return $reporte_financiero;
    }

    /**
     * Eliminar reporte_financiero
     *
     * @param ReporteFinanciero $reporte_financiero
     * @return boolean
     */
    public function eliminar(ReporteFinanciero $reporte_financiero): bool
    {
        $old_reporte_financiero = clone $reporte_financiero;

        if ($reporte_financiero["doc1"]) {
            \File::delete(public_path("files/reporte_financieros/" . $reporte_financiero["doc1"]));
        }

        if ($reporte_financiero["doc2"]) {
            \File::delete(public_path("files/reporte_financieros/" . $reporte_financiero["doc2"]));
        }

        $reporte_financiero->delete();

        // registrar accion
        $this->historialAccionService->registrarAccion($this->modulo, "ELIMINACIÓN", "ELIMINÓ UN REPORTE FINANCIERO", $old_reporte_financiero);

        return true;
    }

    /**
     * Cargar archivo
     *
     * @param ReporteFinanciero $reporte_financiero
     * @param UploadedFile $archivo
     * @return void
     */
    public function cargarArchivo(ReporteFinanciero $reporte_financiero, UploadedFile $archivo, string $col = "archivo", string $index = ''): void
    {
        if ($reporte_financiero[$col]) {
            \File::delete(public_path("files/reporte_financieros/" . $reporte_financiero[$col]));
        }
        $nombre = $reporte_financiero->id . time() . $index ?? '';
        $reporte_financiero[$col] = $this->cargarArchivoService->cargarArchivo($archivo, public_path("files/reporte_financieros"), $nombre);
        $reporte_financiero->save();
    }
}
