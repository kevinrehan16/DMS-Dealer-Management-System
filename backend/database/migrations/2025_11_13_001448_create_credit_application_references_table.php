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
        Schema::create('credit_application_references', function (Blueprint $table) {
            $table->id();
            $table->foreignId('credit_application_primary_id')->constrained()->onDelete('cascade');
            $table->string('creditAppRef_id')->unique();
            $table->string('creditAppPrimary_id', 30)->nullable();
            $table->string('refFullName', 150)->nullable();
            $table->text('refAddress')->nullable();
            $table->string('refContact', 20)->nullable();
            $table->string('refRelation', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_application_references');
    }
};
