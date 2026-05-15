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
        Schema::table('cashiers', function (Blueprint $table) {
            // Ginagawa nating string para tanggapin ang partial, monthly, etc.
            // Ang ->change() ay nangangailangan ng 'doctrine/dbal' sa luma,
            // pero sa Laravel 10/11, built-in na ito.
            $table->string('payment_type')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cashiers', function (Blueprint $table) {
            // Ibalik sa enum kung sakaling i-rollback (optional)
            $table->enum('payment_type', ['MONTHLY_INSTALLMENT', 'FULL_CASH', 'RESERVATION', 'DOWNPAYMENT', 'PARTIAL_PAYMENT', 'PENALTY_PAYMENT', 'ADVANCE_PAYMENT'])->change();
        });
    }
};
