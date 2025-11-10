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
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->string('inquiry_id')->unique();
            $table->string('sourceInquiry')->nullable();
            $table->string('salesPersonid')->nullable();
            $table->string('employmentStatus')->nullable();
            $table->string('motorBrand')->nullable();
            $table->string('motorModel')->nullable();
            $table->string('motorSeries')->nullable();
            $table->string('motorColor')->nullable();
            $table->string('motorChassis')->nullable();
            $table->string('motorLcp')->nullable();
            $table->string('motorCashprice')->nullable();
            $table->string('motorRate')->nullable();
            $table->string('motorDiscount')->nullable();
            $table->string('motorPromnote')->nullable();
            $table->string('motorBranchcode')->nullable();
            $table->string('motorInstallmentterm')->nullable();
            $table->string('motorDownpayment')->nullable();
            $table->string('motorReservation')->nullable();
            $table->string('motorSubsidy')->nullable();
            $table->string('motorMonthlyinstallment')->nullable();
            $table->string('motorInstallmentPrice')->nullable();
            $table->string('motorAmountfinance')->nullable();
            $table->string('motorMonthlyuid')->nullable();
            $table->string('motorCustomertype')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
