<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Admin/Profile/Edit', [
            'user' => $request->user(),
        ]);
    }
    public function profile_cliente(Request $request)
    {
        if (Auth::check()) {
            return Inertia::render('Portal/Perfil', [
                'user' => $request->user(),
            ]);
        }
        return redirect()->route("portal.index");
    }

    public function updateInfoCliente(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $cliente = $user->cliente;
        $validacion = [
            "nombre" => "required|regex:/^[\pL\s\.\,áéíóúÁÉÍÓÚñÑ]+$/u",
            "paterno" => "required|regex:/^[\pL\s\.\,áéíóúÁÉÍÓÚñÑ]+$/u",
            "ci" => [
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
                    })
                    ->ignore($cliente->id),
            ],
            "ci_exp" => "required",
            "fono" => "required|numeric|digits_between:7,10",
            "dpto_residencia" => "required",
            "email" => "required|email|unique:clientes,email," . $cliente->id,
        ];

        if ($request->hasFile("foto_ci_anverso")) {
            $validacion["foto_ci_anverso"] = "required|file|mimes:pdf,jpg,jpeg,png,webp|max:5120";
        }

        if ($request->hasFile("foto_ci_reverso")) {
            $validacion["foto_ci_reverso"] = "required|file|mimes:pdf,jpg,jpeg,png,webp|max:5120";
        }
        $validacion["banco"] = "required|regex:/^[\pL\s\.\'\"\,0-9áéíóúÁÉÍÓÚñÑ]+$/u";
        $validacion["nro_cuenta"] = "required|regex:/^[\pL\s\-\.\'\"\,0-9áéíóúÁÉÍÓÚñÑ]+$/u";
        $validacion["moneda"] = "required|regex:/^[\pL\s\.\,0-9áéíóúÁÉÍÓÚñÑ]+$/u";


        $mensajes = [
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
            "terminos.accepted" => "Debes aceptar los terminos y condiciones",
        ];

        $request->validate($validacion, $mensajes);
        $user->update([
            // "nombres" => mb_strtoupper($request->nombre),
            // 'apellidos' => mb_strtoupper($request->paterno . (trim($request->materno) != '' ? ' ' . $request->materno : '')),
            'email' => $request->email,
        ]);

        $datos_update = [
            // "nombre" => mb_strtoupper($request->nombre),
            // "paterno" => mb_strtoupper($request->paterno),
            // "materno" => mb_strtoupper($request->materno),
            // "ci" => trim($request->ci),
            // "complemento" => trim($request->complemento),
            // "ci_exp" => trim($request->ci_exp),
            "fono" => trim($request->fono),
            "dpto_residencia" => trim($request->dpto_residencia),
            "email" => $request->email,
            "banco" => mb_strtoupper($request->banco),
            "nro_cuenta" => mb_strtoupper($request->nro_cuenta),
            "moneda" => mb_strtoupper($request->moneda),
        ];

        $path = public_path("imgs/users/");
        if ($request->hasFile("foto_ci_anverso")) {
            \File::delete($path . $cliente->foto_ci_anverso);
            $foto_ci_anverso = $request->file("foto_ci_anverso");
            $extension = "." . $foto_ci_anverso->getClientOriginalExtension();
            $nom_file_ci_anverso = '1' . $user->id . time() . $extension;
            $datos_update["foto_ci_anverso"] = $nom_file_ci_anverso;
            $foto_ci_anverso->move($path, $nom_file_ci_anverso);
        }
        if ($request->hasFile("foto_ci_reverso")) {
            \File::delete($path . $cliente->foto_ci_anverso);
            $foto_ci_reverso = $request->file("foto_ci_reverso");
            $extension = "." . $foto_ci_reverso->getClientOriginalExtension();
            $nom_file_ci_reverso = '1' . $user->id . time() . $extension;
            $datos_update["foto_ci_reverso"] = $nom_file_ci_reverso;
            $foto_ci_reverso->move($path, $nom_file_ci_reverso);
        }

        $cliente->update($datos_update);

        return redirect(route('profile.profile_cliente', absolute: false));
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $usuario = Auth::user();
        $request->validate([
            'password_actual' => ['required', function ($attribute, $value, $fail) use ($usuario, $request) {
                if (!\Hash::check($request->password_actual, $usuario->password)) {
                    return $fail(__('La contraseña no coincide con la actual.'));
                }
            }],
            'password' => 'required|confirmed|min:8|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/',
            'password_confirmation' => 'required|min:8'
        ], [
            "password_actual.required" => "Debes ingresar la contraña actual"
        ]);

        DB::beginTransaction();
        try {
            $usuario->password = Hash::make($request->password);
            $usuario->save();
            DB::commit();

            return Redirect::route('profile.edit')->with("bien", "Perfil actualizado");
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back(500)->with("error", $e->getMessage());
        }
    }

    public function update_foto(Request $request)
    {
        $usuario = Auth::user();
        DB::beginTransaction();
        try {
            if ($request->hasFile('foto')) {
                $antiguo = $usuario->foto;
                if ($antiguo != 'default.png') {
                    \File::delete(public_path() . '/imgs/users/' . $antiguo);
                }
                $file = $request->foto;
                $nom_foto = time() . '_' . $usuario->id . '.' . $file->getClientOriginalExtension();
                $usuario->foto = $nom_foto;
                $file->move(public_path() . '/imgs/users/', $nom_foto);
            }
            $usuario->save();
            DB::commit();

            return Redirect::route('profile.edit')->with("success", "Perfil actualizado");
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back(500)->with("error", $e->getMessage());
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
