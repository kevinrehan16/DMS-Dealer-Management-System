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
        Schema::create('motorcycles', function (Blueprint $table) {
            $table->id();
            $table->string('brand'); // e.g., HONDA, YAMAHA
            $table->string('model_name'); // e.g., CLICK 125 LIMITED EDITION
            $table->string('color'); // e.g., PEARL ARTIC WHITE
            $table->decimal('cash_price', 12, 2);
            $table->decimal('original_price', 12, 2);
            $table->decimal('unit_cost', 12, 2);
            $table->decimal('srp_value', 12, 2);
            $table->decimal('installment_price', 12, 2);
            $table->decimal('interest', 10, 2)->default(0.00); // 2.79
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motorcycles');
    }
};
