<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserPasswordRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\HistorialAccion;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class UsuarioController extends Controller
{
    public function __construct(private UserService $userService) {}

    public function index(): InertiaResponse
    {
        return Inertia::render("Admin/Usuarios/Index");
    }

    public function clientes(): InertiaResponse
    {
        return Inertia::render("Admin/Usuarios/Clientes");
    }

    public function listado(Request $request): JsonResponse
    {
        $usuarios = User::where("id", "!=", 1);

        if (isset($request->tipo) && $request->tipo) {
            $usuarios->where("tipo", $request->tipo);
        }

        $usuarios = $usuarios->where("status", 1)->get();
        return response()->JSON([
            "usuarios" => $usuarios
        ]);
    }

    public function byTipo(Request $request)
    {
        $usuarios = User::where("id", "!=", 1);
        if (isset($request->tipo) && trim($request->tipo) != "") {
            $usuarios = $usuarios->where("tipo", $request->tipo);
        }

        if ($request->order && $request->order == "desc") {
            $usuarios->orderBy("users.id", "desc");
        }

        $usuarios = $usuarios->where("status", 1)->get();

        return response()->JSON([
            "usuarios" => $usuarios
        ]);
    }

    public function api(Request $request)
    {
        $length = $request->input('length', 10); // Valor de `length` enviado por DataTable
        $start = $request->input('start', 0); // Índice de inicio enviado por DataTable
        $page = ($start / $length) + 1; // Cálculo de la página actual
        $search = $request->input('search');

        $usuarios = User::selectRaw("users.*, CONCAT(users.nombre,' ',users.paterno,' ',users.materno) as full_name, CONCAT(users.ci,' ',users.ci_exp) as full_ci")
            ->where("users.id", "!=", 1);
        if ($search && trim($search) != '') {
            $usuarios->orWhereRaw("users.usuario LIKE ?", ["%$search%"]);
            $usuarios->orWhereRaw("CONCAT(users.nombres,' ',users.paterno,' ',users.materno) LIKE ?", ["%$search%"]);
        }

        // order
        if (isset($request->order)) {
            $order = $request->order;
            $nro_col = $order[0]["column"];
            $asc_desc = $order[0]["dir"];
            $columns = $request->columns;
            if ($columns[$nro_col]["data"]) {
                $col_data = $columns[$nro_col]["data"];
                $usuarios->orderBy($col_data, $asc_desc);
            }
        }

        $usuarios = $usuarios->where("status", 1)->paginate($length, ['*'], 'page', $page);

        // Numeración
        $usuarios->getCollection()->transform(function ($usuario, $index) use ($usuarios) {
            $usuario->enumeracion = ($usuarios->currentPage() - 1) * $usuarios->perPage() + $index + 1;
            return $usuario;
        });

        return response()->JSON([
            'data' => $usuarios->items(),
            'recordsTotal' => $usuarios->total(),
            'recordsFiltered' => $usuarios->total(),
            'draw' => intval($request->input('draw')),
        ]);
    }

    public function paginado(Request $request)
    {
        $search = $request->search;
        $usuarios = User::where("id", "!=", 1);

        if (trim($search) != "") {
            $usuarios->where("nombre", "LIKE", "%$search%");
            $usuarios->orWhere("paterno", "LIKE", "%$search%");
            $usuarios->orWhere("materno", "LIKE", "%$search%");
            $usuarios->orWhere("ci", "LIKE", "%$search%");
        }

        $usuarios = $usuarios->where("status", 1)->paginate($request->itemsPerPage);
        return response()->JSON([
            'data' => $usuarios->items(),
            'recordsTotal' => $usuarios->total(),
            'recordsFiltered' => $usuarios->total(),
            'draw' => intval($request->input('draw')),
        ]);
    }

    /**
     * Store user
     *
     * @param UserStoreRequest $request
     * @return RedirectResponse|Response
     */
    public function store(UserStoreRequest $request): RedirectResponse|Response
    {
        DB::beginTransaction();
        try {
            $this->userService->crear($request->validated());
            DB::commit();
            return redirect()->route("usuarios.index")->with("bien", "Registro realizado");
        } catch (\Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' =>  $e->getMessage(),
            ]);
        }
    }

    public function show(User $user)
    {
        return response()->JSON($user);
    }

    public function actualizaAcceso(User $user, Request $request)
    {
        $user->acceso = $request->acceso;
        $user->save();
        return response()->JSON([
            "user" => $user,
            "message" => "Acceso actualizado"
        ]);
    }

    /**
     * Update user
     *
     * @param User $user
     * @param UserUpdateRequest $request
     * @return RedirectResponse|Response
     */
    public function update(User $user, UserUpdateRequest $request): RedirectResponse|Response
    {
        DB::beginTransaction();
        try {
            $this->userService->actualizar($request->validated(), $user);
            DB::commit();
            return redirect()->route("usuarios.index")->with("bien", "Registro actualizado");
        } catch (\Exception $e) {
            DB::rollBack();
            // Log::debug($e->getMessage());
            throw ValidationException::withMessages([
                'error' =>  $e->getMessage(),
            ]);
        }
    }

    public function actualizaPassword(User $user, UserPasswordRequest $request)
    {
        DB::beginTransaction();
        try {
            $this->userService->actualizarPassword($request->validated(), $user);
            DB::commit();
            return redirect()->route("usuarios.index")->with("bien", "Registro actualizado");
        } catch (\Exception $e) {
            DB::rollBack();
            // Log::debug($e->getMessage());
            throw ValidationException::withMessages([
                'error' =>  $e->getMessage(),
            ]);
        }
    }

    /**
     * Delete user
     *
     * @param User $user
     * @return JsonResponse|Response
     */
    public function destroy(User $user): JsonResponse|Response
    {
        DB::beginTransaction();
        try {
            $this->userService->eliminar($user);
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
