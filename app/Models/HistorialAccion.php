<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class HistorialAccion extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "accion",
        "descripcion",
        "datos_original",
        "datos_nuevo",
        "modulo",
        "fecha",
        "hora",
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'datos_original' => "array",
            'datos_nuevo' => "array",
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    
}
