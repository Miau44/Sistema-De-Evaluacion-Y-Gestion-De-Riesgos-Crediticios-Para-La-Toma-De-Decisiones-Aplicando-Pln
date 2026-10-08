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
        Schema::create('reporte_financieros', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("tipo_documento_id");
            $table->unsignedBigInteger("cliente_id");
            $table->string("doc1", 255)->nullable();
            $table->string("doc2", 255)->nullable();
            $table->double("res", 6, 2);
            $table->string("tipo", 255);
            $table->date("fecha_registro");
            $table->timestamps();

            $table->foreign("tipo_documento_id")->on("tipo_documentos")->references("id");
            $table->foreign("cliente_id")->on("clientes")->references("id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reporte_financieros');
    }
};
