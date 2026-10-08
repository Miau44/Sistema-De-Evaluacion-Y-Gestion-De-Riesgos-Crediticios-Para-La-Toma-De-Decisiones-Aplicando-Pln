<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->string("nombre");
            $table->string("paterno");
            $table->string("materno")->nullable();
            $table->string("ci");
            $table->string("ci_exp");
            $table->string("nacionalidad");
            $table->string("sexo");
            $table->date("fecha_nac");
            $table->string("dir", 800);
            $table->string("fono");
            $table->string("correo");
            $table->string("nom_lugartrabajo");
            $table->string("nro_nit");
            $table->string("unipersonal");
            $table->string("actividad");
            $table->string("dir_lab");
            $table->string("fono_lab");
            $table->string("correo_lab");
            $table->string("cargo_lab");
            $table->string("tiempo_lab");
            $table->date("fecha_ingreso_lab");
            $table->string("estado_civil");
            $table->string("vivienda");
            $table->string("grado_instruccion");
            $table->string("situacion_laboral");
            $table->string("profesion");
            $table->string("nom_conyugue")->nullable();;
            $table->string("paterno_conyugye")->nullable();;
            $table->string("materno_conyugye")->nullable();
            $table->string("ci_conyugue")->nullable();;
            $table->string("ci_exp_conyugue")->nullable();
            $table->string("nacionalidad_conyugye")->nullable();;
            $table->string("ocupacion_conyugue")->nullable();;
            $table->date("fecha_registro");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
