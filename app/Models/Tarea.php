<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    use HasFactory;

    protected $fillable = [
        "codigo",
        "nro_cod",
        "descripcion",
        "area_id",
        "producto_id",
        "user_id",
        "estado",
        "fecha_registro",
    ];

    protected $appends = ["fecha_registro_t"];

    public function getFechaRegistroTAttribute()
    {
        return date("d/m/Y", strtotime($this->fecha_registro));
    }

    //RELACIONES
    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id');
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tarea_materials()
    {
        return $this->hasMany(TareaMaterial::class, 'tarea_id');
    }

    public function tarea_operarios()
    {
        return $this->hasMany(TareaOperario::class, 'tarea_id');
    }
}
