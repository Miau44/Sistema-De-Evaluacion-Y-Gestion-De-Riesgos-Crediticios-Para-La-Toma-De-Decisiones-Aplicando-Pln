<?php

namespace App\Http\Controllers;

use App\Http\Requests\TipoDocumentoStoreRequest;
use App\Http\Requests\TipoDocumentoUpdateRequest;
use App\Models\TipoDocumento;
use App\Services\TipoDocumentoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TipoDocumentoController extends Controller
{
    public function __construct(private TipoDocumentoService $tipoDocumentoService) {}

    /**
     * Página index
     *
     * @return Response
     */
    public function index(): InertiaResponse
    {
        return Inertia::render("Admin/TipoDocumentos/Index");
    }

    /**
     * Listado de tipo_documentos
     *
     * @return JsonResponse
     */
    public function listado(): JsonResponse
    {
        return response()->JSON([
            "tipo_documentos" => $this->tipoDocumentoService->listado()
        ]);
    }

    /**
     * Listado de tipo_documentos para portal
     *
     * @return JsonResponse
     */
    public function listadoPortal(): JsonResponse
    {
        return response()->JSON([
            "tipo_documentos" => $this->tipoDocumentoService->listado()
        ]);
    }

    /**
     * Endpoint para obtener la lista de tipo_documentos paginado para datatable
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

        $usuarios = $this->tipoDocumentoService->listadoDataTable($length, $start, $page, $search);

        return response()->JSON([
            'data' => $usuarios->items(),
            'recordsTotal' => $usuarios->total(),
            'recordsFiltered' => $usuarios->total(),
            'draw' => intval($request->input('draw')),
        ]);
    }

    /**
     * Registrar un nuevo tipo_documento
     *
     * @param TipoDocumentoStoreRequest $request
     * @return RedirectResponse|Response
     */
    public function store(TipoDocumentoStoreRequest $request): RedirectResponse|Response
    {
        DB::beginTransaction();
        try {
            // crear el TipoDocumento
            $this->tipoDocumentoService->crear($request->validated());
            DB::commit();
            return redirect()->route("tipo_documentos.index")->with("bien", "Registro realizado");
        } catch (\Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' =>  $e->getMessage(),
            ]);
        }
    }

    /**
     * Mostrar un tipo_documento
     *
     * @param TipoDocumento $tipo_documento
     * @return JsonResponse
     */
    public function show(TipoDocumento $tipo_documento): JsonResponse
    {
        return response()->JSON($tipo_documento);
    }

    public function update(TipoDocumento $tipo_documento, TipoDocumentoUpdateRequest $request)
    {
        DB::beginTransaction();
        try {
            // actualizar tipo_documento
            $this->tipoDocumentoService->actualizar($request->validated(), $tipo_documento);
            DB::commit();
            return redirect()->route("tipo_documentos.index")->with("bien", "Registro actualizado");
        } catch (\Exception $e) {
            DB::rollBack();
            // Log::debug($e->getMessage());
            throw ValidationException::withMessages([
                'error' =>  $e->getMessage(),
            ]);
        }
    }

    /**
     * Eliminar tipo_documento
     *
     * @param TipoDocumento $tipo_documento
     * @return JsonResponse|Response
     */
    public function destroy(TipoDocumento $tipo_documento): JsonResponse|Response
    {
        DB::beginTransaction();
        try {
            $this->tipoDocumentoService->eliminar($tipo_documento);
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
}
