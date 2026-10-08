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
        Schema::create('configuracions', function (Blueprint $table) {
            $table->id();
            $table->string("nombre_sistema", 255);
            $table->string("alias", 255)->nullable();
            $table->string("razon_social", 255);
            $table->string("nit")->nullable();
            $table->string("dir", 255);
            $table->string("fono", 255);
            $table->string("web")->nullable();
            $table->string("actividad", 255);
            $table->string("correo")->nullable();
            $table->string("logo")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configuracions');
    }
};
