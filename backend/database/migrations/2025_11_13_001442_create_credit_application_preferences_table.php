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
        Schema::create('credit_application_preferences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('credit_application_primary_id')->constrained()->onDelete('cascade');
            $table->string('creditAppPref_id')->unique();
            $table->string('creditAppPrimary_id')->nullable();
            $table->string('prefCreditor')->nullable();
            $table->text('prefAddress')->nullable();
            $table->date('prefDateGranted')->nullable();
            $table->decimal('prefOrigBal', 10, 2)->default(0.00);
            $table->decimal('prefPresBal', 10, 2)->default(0.00);
            $table->decimal('prefMonInstallment', 10, 2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_application_preferences');
    }
};
