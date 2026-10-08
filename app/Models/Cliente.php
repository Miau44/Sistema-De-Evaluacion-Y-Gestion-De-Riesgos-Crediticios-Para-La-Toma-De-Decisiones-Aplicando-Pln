<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        "nombre",
        "paterno",
        "materno",
        "ci",
        "ci_exp",
        "nacionalidad",
        "sexo",
        "fecha_nac",
        "dir",
        "fono",
        "correo",
        "nom_lugartrabajo",
        "nro_nit",
        "unipersonal",
        "actividad",
        "dir_lab",
        "fono_lab",
        "correo_lab",
        "cargo_lab",
        "tiempo_lab",
        "fecha_ingreso_lab",
        "estado_civil",
        "vivienda",
        "grado_instruccion",
        "situacion_laboral",
        "profesion",
        "nom_conyugue",
        "paterno_conyugye",
        "materno_conyugye",
        "ci_conyugue",
        "ci_exp_conyugue",
        "nacionalidad_conyugye",
        "ocupacion_conyugue",
        "fecha_registro",
    ];

    protected $appends = ['fecha_registro_t', 'fecha_nac_t', 'fecha_ingreso_lab_t', 'full_name', 'full_ci', 'full_name_conyuge', 'full_ci_conyuge'];


    public function getFullNameConyugeAttribute()
    {
        return $this->nom_conyugue . ' ' . $this->paterno_conyugye . ' ' . $this->materno_conyugye;
    }

    public function getFullCiConyugeAttribute()
    {
        return $this->ci_conyugue . ' ' . $this->ci_exp_conyugue;
    }

    public function getFUllCiAttribute()
    {
        return $this->ci . ' ' . $this->ci_exp;
    }

    public function getFullNameAttribute()
    {
        return $this->nombre . ' ' . $this->paterno . ' ' . $this->materno;
    }

    public function getFechaRegistroTAttribute($value)
    {
        return date('d/m/Y', strtotime($value));
    }

    public function getFechaNacTAttribute($value)
    {
        return date('d/m/Y', strtotime($value));
    }

    public function getFechaIngresoLabTAttribute($value)
    {
        return date('d/m/Y', strtotime($value));
    }
}
