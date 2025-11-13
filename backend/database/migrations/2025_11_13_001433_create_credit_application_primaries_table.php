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
        Schema::create('credit_application_primaries', function (Blueprint $table) {
            $table->id();
            $table->string('creditApp_id', 30)->unique();
            $table->string('lastName', 60)->nullable();
            $table->string('firstName', 60)->nullable();
            $table->string('middleName', 60)->nullable();
            $table->date('birthdate')->nullable();
            $table->integer('age')->nullable();
            $table->string('gender', 8)->nullable();
            $table->string('civilStatus', 15)->nullable();
            $table->string('education', 50)->nullable();
            $table->string('spouseName', 150)->nullable();
            $table->date('spouseBirthDate')->nullable();
            $table->integer('spouseAge')->nullable();
            $table->unsignedInteger('numChildren')->default(0); //Para di mag negative use unsignedInteger
            $table->unsignedInteger('numStudying')->default(0); //Para di mag negative use unsignedInteger
            $table->unsignedInteger('otherDependetn')->default(0); //Para di mag negative use unsignedInteger
            $table->text('presentAddress')->nullable();
            $table->string('mobile', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_application_primaries');
    }
};
