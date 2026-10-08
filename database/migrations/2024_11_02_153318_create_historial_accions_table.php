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
        Schema::create('historial_accions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->string("accion", 155);
            $table->text("descripcion");
            $table->json("datos_original")->nullable();
            $table->json("datos_nuevo")->nullable();
            $table->string("modulo", 155);
            $table->date("fecha");
            $table->time("hora");
            $table->timestamps();

            $table->foreign("user_id")->on("users")->references("id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historial_accions');
    }
};
