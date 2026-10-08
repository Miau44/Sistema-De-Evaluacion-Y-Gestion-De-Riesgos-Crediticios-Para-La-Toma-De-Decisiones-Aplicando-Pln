<?php

namespace App\Http\Requests;

use App\Rules\TareaMaterialRule;
use App\Rules\TareaOperarioRule;
use Illuminate\Foundation\Http\FormRequest;

class TareaStoreRequest extends FormRequest
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
            "descripcion" => "required",
            "area_id" => "required",
            "producto_id" => "required",
            "user_id" => "required",
            "estado" => "required",
            "tarea_materials" => ["required", new TareaMaterialRule],
            "tarea_operarios" => ["required", new TareaOperarioRule],
        ];
    }

    public function messages(): array
    {
        return [
            "descripcion.required" => "Este campo es obligatorio",
            "area_id.required" => "Este campo es obligatorio",
            "producto_id.required" => "Este campo es obligatorio",
            "user_id.required" => "Este campo es obligatorio",
            "estado.required" => "Este campo es obligatorio",
            "tarea_materials.required" => "Este campo es obligatorio",
            "tarea_operarios.required" => "Este campo es obligatorio",
        ];
    }
}
