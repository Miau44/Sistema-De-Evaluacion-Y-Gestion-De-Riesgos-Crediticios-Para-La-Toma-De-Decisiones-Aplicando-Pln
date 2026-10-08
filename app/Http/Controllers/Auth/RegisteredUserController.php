<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

class RegisteredUserController extends Controller
{

    public $validacion = [
        "nombre" => "required|regex:/^[\pL\s\.\,áéíóúÁÉÍÓÚñÑ]+$/u",
        "paterno" => "required|regex:/^[\pL\s\.\,áéíóúÁÉÍÓÚñÑ]+$/u",
        "ci" => "required|numeric|digits_between:7,10|unique:clientes,ci",
        "ci_exp" => "required",
        "fono" => "required|numeric|digits_between:7,10",
        "dpto_residencia" => "required",
        "email" => "required|email|unique:clientes,email",
    ];

    public $mensajes = [
        "nombre.required" => "Este campo es obligatorio",
        "nombre.regex" => "Debes ingresar solo texto",
        "paterno.required" => "Este campo es obligatorio",
        "paterno.regex" => "Debes ingresar solo texto",
        "materno.regex" => "Debes ingresar solo texto",
        "ci.required" => "Este campo es obligatorio",
        "ci.numeric" => "Debes ingresar solo números",
        "ci.digits_between" => "Debes ingresar un valor entre 7-10 digitos",
        "ci.unique" => "Este documento de identidad ya fue registrado",
        "ci_exp.required" => "Este campo es obligatorio",
        "fono.required" => "Este campo es obligatorio",
        "fono.numeric" => "Debes ingresar solo números",
        "fono.digits_between" => "Debes ingresar un valor entre 7-10 digitos",
        "dpto_residencia.required" => "Este campo es obligatorio",
        "email.required" => "Este campo es obligatorio",
        "email.email" => "Debes ingresar un correo valido",
        "email.unique" => "Este correo ya fue registrado",
        "foto_ci_anverso.required" => "Este campo es obligatorio",
        "foto_ci_reverso.required" => "Este campo es obligatorio",
        "banco.required" => "Este campo es obligatorio",
        "nro_cuenta.required" => "Este campo es obligatorio",
        "moneda.required" => "Este campo es obligatorio",
        "terminos.required" => "Este campo es obligatorio",
        "terminos.accepted" => "Debes aceptar los términos y condiciones",
        "password.required" => "Debes ingresar tu contraseña",
        "password.confirmed" => "La contraseña no coincide",
        "password.min" => "Debes ingresar una contraseña de al menos :min caracteres",
        "password.regex" => "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un símbolo (@$!%*?&).",
    ];

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $this->validacion["foto_ci_anverso"] = "required|file|mimes:pdf,jpg,jpeg,png,webp|max:5120";
        $this->validacion["foto_ci_reverso"] = "required|file|mimes:pdf,jpg,jpeg,png,webp|max:5120";
        $this->validacion["banco"] = "required|regex:/^[\pL\s\.\'\"\,0-9áéíóúÁÉÍÓÚñÑ]+$/u";
        $this->validacion["nro_cuenta"] = "required|regex:/^[\pL\s\-\.\'\"\,0-9áéíóúÁÉÍÓÚñÑ]+$/u";
        $this->validacion["moneda"] = "required|regex:/^[\pL\s\.\,0-9áéíóúÁÉÍÓÚñÑ]+$/u";
        $this->validacion["password"] = 'required|confirmed|min:8|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/';
        $this->validacion["terminos"] = "required|accepted";
        $this->validacion["ci"] = [
            "required",
            "numeric",
            "digits_between:7,10",
            Rule::unique('clientes', 'ci')
                ->where(function ($query) {
                    $complemento = request()->input('complemento');
                    if (is_null($complemento)) {
                        $query->whereIn('complemento', [NULL, ""]);
                    } else {
                        $query->where('complemento', $complemento);
                    }
                }),
        ];

        $request->validate($this->validacion, $this->mensajes);
        DB::beginTransaction();
        try {
            $user = User::create([
                'usuario' => $request->email,
                "nombres" => mb_strtoupper($request->nombre),
                'apellidos' => mb_strtoupper($request->paterno . (trim($request->materno) != '' ? ' ' . $request->materno : '')),
                'email' => $request->email,
                'password' => Hash::make($request->password),
                "acceso" => 1,
                "fecha_registro" => date("Y-m-d")
            ]);

            $foto_ci_anverso = $request->file("foto_ci_anverso");
            $extension = "." . $foto_ci_anverso->getClientOriginalExtension();
            $nom_file_ci_anverso = '1' . $user->id . time() . $extension;
            $foto_ci_reverso = $request->file("foto_ci_reverso");
            $extension = "." . $foto_ci_reverso->getClientOriginalExtension();
            $nom_file_ci_reverso = '2' . $user->id . time() . $extension;


            $cliente = Cliente::create([
                "user_id" => $user->id,
                "nombre" => mb_strtoupper($request->nombre),
                "paterno" => mb_strtoupper($request->paterno),
                "materno" => mb_strtoupper($request->materno),
                "ci" => trim($request->ci),
                "complemento" => trim($request->complemento),
                "ci_exp" => trim($request->ci_exp),
                "fono" => trim($request->fono),
                "dpto_residencia" => trim($request->dpto_residencia),
                "email" => $request->email,
                "foto_ci_anverso" => $nom_file_ci_anverso,
                "foto_ci_reverso" => $nom_file_ci_reverso,
                "banco" => mb_strtoupper($request->banco),
                "nro_cuenta" => mb_strtoupper($request->nro_cuenta),
                "moneda" => mb_strtoupper($request->moneda),
                "fecha_registro" => date("Y-m-d"),
            ]);


            $path = public_path("imgs/users/");

            $foto_ci_anverso->move($path, $nom_file_ci_anverso);
            $foto_ci_reverso->move($path, $nom_file_ci_reverso);
            event(new Registered($user));
            Auth::login($user);

            DB::commit();
            Log::debug("DSDSDSD");
            if ($request->ajax()) {
                return response()->JSON([
                    "sw" => true
                ]);
            }

            return redirect(route('portal.index', absolute: false));
        } catch (\Exception $e) {
            Log::debug("ERROR: " . $e->getMessage());
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' =>  $e->getMessage(),
            ]);
        }
    }

    public function validaForm1(Request $request)
    {
        if ($request->complemento && trim($request->complemento) != '') {
            $this->validacion["complemento"] = "required|regex:/^[\pL\s\.\,0-9áéíóúÁÉÍÓÚñÑ]+$/u";
        }

        if ($request->materno && trim($request->materno) != '') {
            $this->validacion["materno"] = "required|regex:/^[\pL\s\.\,áéíóúÁÉÍÓÚñÑ]+$/u";
        }
        $this->validacion["ci"] = [
            "required",
            "numeric",
            "digits_between:7,10",
            Rule::unique('clientes', 'ci')
                ->where(function ($query) {
                    $complemento = request()->input('complemento');
                    if (is_null($complemento)) {
                        $query->whereIn('complemento', [NULL, ""]);
                    } else {
                        $query->where('complemento', $complemento);
                    }
                }),
        ];


        $request->validate($this->validacion, $this->mensajes);

        return response()->json([
            'success' => true,
            'message' => 'Formulario validado con éxito',
        ]);
    }
}
