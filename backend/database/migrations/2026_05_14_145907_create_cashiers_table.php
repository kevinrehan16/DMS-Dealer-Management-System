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
        Schema::create('cashiers', function (Blueprint $table) {
            $table->id();

            // Link sa Inquiry/Loan Record
            $table->foreignId('inquiry_id')->constrained()->onDelete('cascade');

            // Transaction Identification
            $table->string('or_number')->unique(); // Official Receipt Number
            $table->string('transaction_no')->unique(); // System Generated Trans ID

            // Payment Classification
            // Pwedeng DP muna, or Reservation, or Monthly, or Full Cash
            $table->enum('payment_type', ['MONTHLY_INSTALLMENT', 'FULL_CASH']);

            // Money Fields (Decimal 15,2 para sa malalaking halaga tulad ng ₱633k PN)
            $table->decimal('amount_collected', 15, 2);
            $table->decimal('tax_amount', 15, 2)->default(0.00); // Optional VAT

            // Payment Method
            $table->string('payment_mode'); // Cash, Check, GCash, Bank Transfer
            $table->string('reference_no')->nullable(); // Check # o Reference # ng Gcash

            // Breakdown (Para sa Accounting)
            $table->decimal('principal_paid', 15, 2)->default(0.00);
            $table->decimal('interest_paid', 15, 2)->default(0.00); // Dito papasok yung portion ng Monthly UID

            // Audit Trail
            $table->date('transaction_date');
            $table->foreignId('processed_by')->constrained('users'); // Sinong cashier ang tumanggap
            $table->string('branch_code'); // e.g., BTKS mula sa screenshot

            $table->text('remarks')->nullable();
            $table->string('status')->default('posted'); // posted, cancelled, voided
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cashiers');
    }
};
