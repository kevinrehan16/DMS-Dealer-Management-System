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
        Schema::create('credit_investigation_personal_properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inquiry_id')->constrained()->onDelete('cascade');
            $table->string('creditPp_id', 30)->unique();
            $table->string('ppkind', 50)->nullable();
            $table->text('pplocation')->nullable();
            $table->decimal('ppvalue', 15, 2)->nullable();
            $table->decimal('ppimbursement', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_investigation_personal_properties');
    }
};
