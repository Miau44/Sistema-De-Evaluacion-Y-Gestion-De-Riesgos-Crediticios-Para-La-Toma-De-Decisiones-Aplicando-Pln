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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string("usuario", 255);
            $table->string("nombre", 255);
            $table->string("paterno", 255);
            $table->string("materno", 255)->nullable();
            $table->string("ci", 255);
            $table->string("ci_exp", 255);
            $table->string("dir", 600);
            $table->string("correo", 255)->nullable();
            $table->string("fono", 255);
            $table->string('password');
            $table->integer("acceso");
            $table->string("tipo", 255);
            $table->string("foto", 255)->nullable();
            $table->date("fecha_registro");
            $table->integer("status")->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
