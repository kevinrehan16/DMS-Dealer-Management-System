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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inquiry_id')->constrained(); // Link sa Inquiry
            $table->string('account_status')->default('Pending'); // Pending, Approved, Active, FullyPaid, Cancelled, Restructure, Pre-termination.
            $table->decimal('total_contract_price', 15, 2);
            $table->decimal('total_amount_paid', 15, 2)->default(0);
            $table->decimal('outstanding_balance', 15, 2);
            $table->integer('payment_term_months')->nullable();
            $table->decimal('monthly_amortization', 15, 2)->nullable();
            $table->date('release_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
