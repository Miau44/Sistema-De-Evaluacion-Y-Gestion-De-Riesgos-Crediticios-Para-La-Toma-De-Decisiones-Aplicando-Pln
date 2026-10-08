<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClienteStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nombre" => "required",
            "paterno" => "required",
            "materno" => "nullable",
            "ci" => "required",
            "ci_exp" => "nullable",
            "nacionalidad" => "required",
            "sexo" => "nullable",
            "fecha_nac" => "required|date",
            "dir" => "required",
            "fono" => "required",
            "correo" => "required",
            "nom_lugartrabajo" => "required",
            "nro_nit" => "required",
            "unipersonal" => "required",
            "actividad" => "required",
            "dir_lab" => "required",
            "fono_lab" => "required",
            "correo_lab" => "required",
            "cargo_lab" => "required",
            "tiempo_lab" => "required",
            "fecha_ingreso_lab" => "required|date",
            "estado_civil" => "required",
            "vivienda" => "required",
            "grado_instruccion" => "required",
            "situacion_laboral" => "required",
            "profesion" => "required",
            "nom_conyugue" => "required_unless:estado_civil,SOLTERO",
            "paterno_conyugye" => "required_unless:estado_civil,SOLTERO",
            "materno_conyugye" => "nullable",
            "ci_conyugue" => "required_unless:estado_civil,SOLTERO",
            "ci_exp_conyugue" => "nullable",
            "nacionalidad_conyugye" => "required_unless:estado_civil,SOLTERO",
            "ocupacion_conyugue" => "required_unless:estado_civil,SOLTERO",
        ];
    }

    /**
     * Mensajes validacion
     *
     * @return void
     */
    public function messages(): array
    {
        return [
            "nombre.required" => "Debes completar este campo",
            "paterno.required" => "Debes completar este campo",
            "ci.required" => "Debes completar este campo",
            "nacionalidad.required" => "Debes completar este campo",
            "fecha_nac.required" => "Debes completar este campo",
            "fecha_nac.date" => "Debes ingresar una fecha valida",
            "dir.required" => "Debes completar este campo",
            "fono.required" => "Debes completar este campo",
            "correo.required" => "Debes completar este campo",
            "nom_lugartrabajo.required" => "Debes completar este campo",
            "nro_nit.required" => "Debes completar este campo",
            "unipersonal.required" => "Debes completar este campo",
            "actividad.required" => "Debes completar este campo",
            "dir_lab.required" => "Debes completar este campo",
            "fono_lab.required" => "Debes completar este campo",
            "correo_lab.required" => "Debes completar este campo",
            "cargo_lab.required" => "Debes completar este campo",
            "tiempo_lab.required" => "Debes completar este campo",
            "fecha_ingreso_lab.required" => "Debes completar este campo",
            "fecha_ingreso_lab.date" => "Debes ingresar una fecha valida",
            "estado_civil.required" => "Debes completar este campo",
            "vivienda.required" => "Debes completar este campo",
            "grado_instruccion.required" => "Debes completar este campo",
            "situacion_laboral.required" => "Debes completar este campo",
            "profesion.required" => "Debes completar este campo",
            "nom_conyugue.required_unless" => "Debes completar este campo",
            "paterno_conyugye.required_unless" => "Debes completar este campo",
            "ci_conyugue.required_unless" => "Debes completar este campo",
            "nacionalidad_conyugye.required_unless" => "Debes completar este campo",
            "ocupacion_conyugue.required_unless" => "Debes completar este campo",
        ];
    }
}
