<?php

namespace App\Rules;

use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TareaOperarioRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (empty($value)) {
            $fail("No se encontró ningun operario agregado");
        }
        foreach ($value as $key => $item) {
            // $arrayItem = json_decode($item, true);
            $arrayItem = $item;
            $item = User::select("usuario")->where("id", $arrayItem["user_id"])->get()->first();
            if (!$item) {
                $fail("El operario " . ($key + 1) . " no se encuentra en nuestro registros");
            }
        }
    }
}
