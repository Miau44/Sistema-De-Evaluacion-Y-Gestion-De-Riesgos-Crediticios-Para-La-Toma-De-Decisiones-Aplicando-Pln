<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Configuracion extends Model
{
    use HasFactory;

    protected $fillable = [
        "nombre_sistema",
        "alias",
        "razon_social",
        "nit",
        "dir",
        "fono",
        "web",
        "actividad",
        "correo",
        "logo",
    ];

    protected $appends = ["url_logo", "logo_b64"];

    public function getUrlLogoAttribute()
    {
        return asset("imgs/" . $this->logo);
    }

    public function getLogoB64Attribute()
    {
        $path = public_path("imgs/" . $this->logo);
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        return $base64;
    }
}
