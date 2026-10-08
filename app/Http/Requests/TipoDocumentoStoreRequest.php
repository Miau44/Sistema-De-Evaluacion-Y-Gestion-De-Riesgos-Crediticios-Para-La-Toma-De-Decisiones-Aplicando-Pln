<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TipoDocumentoStoreRequest extends FormRequest
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
            'nombre' => "required|string|min:2",
            'descripcion' => "nullable|string"
        ];
    }

    public function messages(): array
    {
        return [
            "nombre.required" => "Debes completar este campo",
            "nombre.min" => "Debes ingresar al menos :min caracteres",
            "nombre.string" => "Solo puedes ingresar caracteres de texto",
            "descripcion.string" => "Solo puedes ingresar caracteres de texto"
        ];
    }
}
