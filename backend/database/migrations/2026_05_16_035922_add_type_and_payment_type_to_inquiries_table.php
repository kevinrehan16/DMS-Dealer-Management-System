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
        Schema::table('inquiries', function (Blueprint $col) {
            // Nilagyan natin ng default values para mag-match sa UI design mo
            $col->string('unit_type')->default('Brand_New')->after('motorBrand');
            $col->string('payment_type')->default('Installment')->after('unit_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $col) {
            $col->dropColumn(['unit_type', 'payment_type']);
        });
    }
};
