<?php

namespace App\Rules;

use App\Models\Material;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TareaMaterialRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (empty($value)) {
            $fail("No se encontró ningun material agregado");
        }
        foreach ($value as $key => $item) {
            // $arrayItem = json_decode($item, true);
            $arrayItem = $item;
            $item = Material::select("nombre")->where("id", $arrayItem["material_id"])->get()->first();
            if (!$item) {
                $fail("El material " . ($key + 1) . " no se encuentra en nuestro registros");
            }
        }
    }
}
