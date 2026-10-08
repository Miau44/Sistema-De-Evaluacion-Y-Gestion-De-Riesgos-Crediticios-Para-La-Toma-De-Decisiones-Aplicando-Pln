<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReporteFinancieroUpdateRequest extends FormRequest
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
            'tipo_documento_id' => "required",
            'cliente_id' => "required",
            'doc1' => "required|file|mimes:xls,xlsx",
            'doc2' => "required|file|mimes:xls,xlsx",
            'res' => "required",
            'tipo' => "required",
        ];
    }

    public function messages(): array
    {
        return [
            'tipo_documento_id.required' => "Debes seleccionar una opción",
            'cliente_id.required' => "Debes seleccionar una opción",
            'doc1.required' => "Debes cargar un archivo",
            'doc1.mimes' => "Solo puedes cambiar archivos :mimes",
            'doc2.required' => "Debes cargar un archivo",
            'doc2.mimes' => "Solo puedes cambiar archivos :mimes",
            'res.required' => "No se generó el resultado, intente nuevamente",
            'tipo.required' => "No se generó el resultado, intente nuevamente",
        ];
    }
}
