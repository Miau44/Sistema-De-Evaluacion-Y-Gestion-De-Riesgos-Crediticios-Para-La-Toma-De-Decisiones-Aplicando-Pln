<?php

namespace App\Http\Controllers;

use App\Http\Requests\TareaStoreRequest;
use App\Http\Requests\TareaUpdateRequest;
use App\Models\Tarea;
use App\Services\TareaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TareaController extends Controller
{
    public function __construct(private TareaService $tareaService) {}

    /**
     * Página index
     *
     * @return Response
     */
    public function index(): InertiaResponse
    {
        return Inertia::render("Admin/Tareas/Index");
    }

    /**
     * Listado de tareas
     *
     * @return JsonResponse
     */
    public function listado(): JsonResponse
    {
        return response()->JSON([
            "tareas" => $this->tareaService->listado()
        ]);
    }

    /**
     * Listado de tareas para portal
     *
     * @return JsonResponse
     */
    public function listadoPortal(): JsonResponse
    {
        return response()->JSON([
            "tareas" => $this->tareaService->listado()
        ]);
    }

    /**
     * Endpoint para obtener la lista de tareas paginado para datatable
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

        $usuarios = $this->tareaService->listadoDataTable($length, $start, $page, $search);

        return response()->JSON([
            'data' => $usuarios->items(),
            'recordsTotal' => $usuarios->total(),
            'recordsFiltered' => $usuarios->total(),
            'draw' => intval($request->input('draw')),
        ]);
    }

    /**
     * Registrar un nuevo tarea
     *
     * @param TareaStoreRequest $request
     * @return RedirectResponse|Response
     */
    public function store(TareaStoreRequest $request): RedirectResponse|Response
    {
        DB::beginTransaction();
        try {
            // crear el Tarea
            $this->tareaService->crear($request->validated());
            DB::commit();
            return redirect()->route("tareas.index")->with("bien", "Registro realizado");
        } catch (\Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' =>  $e->getMessage(),
            ]);
        }
    }

    /**
     * Mostrar un tarea
     *
     * @param Tarea $tarea
     * @return JsonResponse
     */
    public function show(Tarea $tarea): JsonResponse
    {
        return response()->JSON($tarea->load(["area", "producto", "supervisor", "tarea_materials.material", "tarea_operarios.user"]));
    }

    public function update(Tarea $tarea, TareaUpdateRequest $request)
    {
        DB::beginTransaction();
        try {
            // actualizar tarea
            $this->tareaService->actualizar($request->validated(), $tarea);
            DB::commit();
            return redirect()->route("tareas.index")->with("bien", "Registro actualizado");
        } catch (\Exception $e) {
            DB::rollBack();
            // Log::debug($e->getMessage());
            throw ValidationException::withMessages([
                'error' =>  $e->getMessage(),
            ]);
        }
    }

    /**
     * Eliminar tarea
     *
     * @param Tarea $tarea
     * @return JsonResponse|Response
     */
    public function destroy(Tarea $tarea): JsonResponse|Response
    {
        DB::beginTransaction();
        try {
            $this->tareaService->eliminar($tarea);
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
