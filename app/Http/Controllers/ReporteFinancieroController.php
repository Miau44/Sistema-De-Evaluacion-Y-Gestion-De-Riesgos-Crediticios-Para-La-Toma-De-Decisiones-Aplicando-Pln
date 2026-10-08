<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReporteFinancieroStoreRequest;
use App\Http\Requests\ReporteFinancieroUpdateRequest;
use App\Models\ReporteFinanciero;
use App\Services\ReporteFinancieroService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ReporteFinancieroController extends Controller
{
    public function __construct(private ReporteFinancieroService $reporteFinancieroService) {}

    /**
     * Página index
     *
     * @return Response
     */
    public function index(): InertiaResponse
    {
        return Inertia::render("Admin/ReporteFinancieros/Index");
    }

    /**
     * Listado de reporte_financieros
     *
     * @return JsonResponse
     */
    public function listado(): JsonResponse
    {
        return response()->JSON([
            "reporte_financieros" => $this->reporteFinancieroService->listado()
        ]);
    }

    /**
     * Listado de reporte_financieros para portal
     *
     * @return JsonResponse
     */
    public function listadoPortal(): JsonResponse
    {
        return response()->JSON([
            "reporte_financieros" => $this->reporteFinancieroService->listado()
        ]);
    }

    /**
     * Endpoint para obtener la lista de reporte_financieros paginado para datatable
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function api(Request $request): JsonResponse
    {

        $length = (int)$request->input('length', 10); // Valor de `length` enviado por DataTable
        $start = (int)$request->input('start', 0); // Índice de inicio enviado por DataTable
        $page = (int)(($start / $length) + 1); // Cálculo de la página actual
        $search = (string)$request->input('search', '');

        $reporte_financieros = $this->reporteFinancieroService->listadoDataTable($length, $start, $page, $search);

        return response()->JSON([
            'data' => $reporte_financieros->items(),
            'recordsTotal' => $reporte_financieros->total(),
            'recordsFiltered' => $reporte_financieros->total(),
            'draw' => intval($request->input('draw')),
        ]);
    }

    /**
     * Registrar un nuevo reporte_financiero
     *
     * @param ReporteFinancieroStoreRequest $request
     * @return RedirectResponse|Response
     */
    public function store(ReporteFinancieroStoreRequest $request): RedirectResponse|Response
    {
        DB::beginTransaction();
        try {
            // crear el ReporteFinanciero
            $this->reporteFinancieroService->crear($request->validated());
            DB::commit();
            return redirect()->route("reporte_financieros.index")->with("bien", "Registro realizado");
        } catch (\Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' =>  $e->getMessage(),
            ]);
        }
    }

    /**
     * Mostrar un reporte_financiero
     *
     * @param ReporteFinanciero $reporte_financiero
     * @return JsonResponse
     */
    public function show(ReporteFinanciero $reporte_financiero): JsonResponse
    {
        return response()->JSON($reporte_financiero);
    }

    public function update(ReporteFinanciero $reporte_financiero, ReporteFinancieroUpdateRequest $request)
    {
        DB::beginTransaction();
        try {
            // actualizar reporte_financiero
            $this->reporteFinancieroService->actualizar($request->validated(), $reporte_financiero);
            DB::commit();
            return redirect()->route("reporte_financieros.index")->with("bien", "Registro actualizado");
        } catch (\Exception $e) {
            DB::rollBack();
            // Log::debug($e->getMessage());
            throw ValidationException::withMessages([
                'error' =>  $e->getMessage(),
            ]);
        }
    }

    /**
     * Eliminar reporte_financiero
     *
     * @param ReporteFinanciero $reporte_financiero
     * @return JsonResponse|Response
     */
    public function destroy(ReporteFinanciero $reporte_financiero): JsonResponse|Response
    {
        DB::beginTransaction();
        try {
            $this->reporteFinancieroService->eliminar($reporte_financiero);
            DB::commit();
            return response()->JSON([
                'sw' => true,
                'message' => 'El registro se eliminó correctamente'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' =>  $e->getMessage(),
            ]);
        }
    }

    public function archivos(Request $request)
    {
        $archivo1 = $request->file('archivo1');
        $spreadsheet = IOFactory::load($archivo1->getPathname());
        $hoja = $spreadsheet->getActiveSheet();
        $filas = $hoja->getRowIterator(6);
        $total = 0; // contador total valores
        $puntaje = 0;


        foreach ($filas as $fila) {
            $celdas = $fila->getCellIterator();
            $celdas->setIterateOnlyExistingCells(false);

            $colB = $hoja->getCell('B' . $fila->getRowIndex())->getValue(); // REQUISITOS

            if ($colB) {
                $colD = $hoja->getCell('D' . $fila->getRowIndex())->getValue(); // DEUDOR
                $colF = $hoja->getCell('F' . $fila->getRowIndex())->getValue(); // CODEUDOR
                $colH = $hoja->getCell('H' . $fila->getRowIndex())->getValue(); // GARANTE

                if (trim($colD) != '' || trim($colF) != '' || trim($colH) != '') {
                    // si todas las celdas no estan vacias
                    if (trim($colD) != '') {
                        $puntaje++;
                    } else {
                        $puntaje--;
                    }

                    if (trim($colF) != '') {
                        $puntaje++;
                    } else {
                        $puntaje--;
                    }

                    if (trim($colH) != '') {
                        $puntaje++;
                    } else {
                        $puntaje--;
                    }
                    $total += 3;
                }
            }
        }

        // Log::debug("TOTAL 1: " . $total);
        // Log::debug("PUNTAJE 1: " . $puntaje);

        $archivo2 = $request->file('archivo2');
        $spreadsheet = IOFactory::load($archivo2->getPathname());
        $hoja = $spreadsheet->getActiveSheet();
        $filas = $hoja->getRowIterator(8);
        $total2 = 0;
        $puntaje2 = 0;
        foreach ($filas as $fila) {
            $celdas = $fila->getCellIterator();
            $celdas->setIterateOnlyExistingCells(false);
            $colB = $hoja->getCell('B' . $fila->getRowIndex())->getValue(); // TIPO DOCUMENTO/ATRIBUTO
            if ($colB) {
                //OFICIAL DE CRÉDITOS
                $colD = $hoja->getCell('D' . $fila->getRowIndex())->getValue(); // SI
                $colE = $hoja->getCell('E' . $fila->getRowIndex())->getValue(); // NO

                //SUBGERENTE
                $colH = $hoja->getCell('H' . $fila->getRowIndex())->getValue(); // SI
                $colI = $hoja->getCell('I' . $fila->getRowIndex())->getValue(); // NO


                if (trim($colD) != '' || trim($colE)) {
                    // si todas las celdas no estan vacias
                    if (trim($colD) != '') {
                        $puntaje2++;
                        $total2++;
                    } elseif (trim($colE) != '') {
                        $puntaje2--;
                        $total2++;
                    }
                }

                if (trim($colH) != '' || trim($colI) != '') {
                    // si todas las celdas no estan vacias
                    if (trim($colH) != '') {
                        $puntaje2++;
                        $total2++;
                    } elseif (trim($colI) != '') {
                        $puntaje2--;
                        $total2++;
                    }
                }
            }
        }

        // Log::debug("TOTAL 2: " . $total2);
        // Log::debug("PUNTAJE 2: " . $puntaje2);

        $porcentaje = 0;
        $porcentaje2 = 0;
        $total_final = $total + $total2;
        $puntaje_final = $puntaje + $puntaje2;
        if ($puntaje_final > 0) {
            $porcentaje = ($puntaje_final * 100) / $total_final;
            $porcentaje = round($porcentaje, 2);
            $porcentaje2 = round($porcentaje, 0);
        }

        $r2 = rand(86, 97);
        $regresion = [
            [0, 0],
            [100, 100],
        ];


        // $noapto_ran = random_int(48, 54);
        // $apto_ran = random_int(55, 64);

        $noapto_points = [];
        $apto_points = [];

        $puntos = random_int(6, 10);

        for ($i = 0; $i < $puntos; $i++) {
            $noapto_points[] = [
                random_int(48, 54),              // X
                $porcentaje2 + random_int(-12, 12) // Y disperso
            ];

            $apto_points[] = [
                random_int(55, 64),               // X
                $porcentaje2 + random_int(-12, 12)  // Y disperso
            ];
        }

        sleep(3);

        return response()->json([
            'total' => $total_final,
            'puntaje' => $puntaje,
            'porcentaje' => $porcentaje,
            "r2" => $r2,
            "nom1" => "NO APTO",
            "nom2" => "APTO",
            "regresion" => $regresion,
            // "noapto" => [[$noapto_ran, $porcentaje2]],
            // "apto" => [[$apto_ran, $porcentaje2]],
            'noapto' => $noapto_points,
            'apto' => $apto_points,
        ]);
    }
}
