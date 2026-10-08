<?php

namespace Database\Seeders;

use App\Models\Configuracion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfiguracionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Configuracion::create([
            "nombre_sistema" => "SISPRENDASOL",
            "alias" => "SP",
            "razon_social" => "SISPRENDASOL S.A.",
            "nit" => "1111111111",
            "dir" => "LOS OLIVOS #111",
            "fono" => "2222222",
            "web" => NULL,
            "actividad" => "ACTIVIDAD",
            "correo" => NULL,
            "logo" => "logo.png"
        ]);
    }
}
