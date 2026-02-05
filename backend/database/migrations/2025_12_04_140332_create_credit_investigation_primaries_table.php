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
        Schema::create('credit_investigation_primaries', function (Blueprint $table) {
            $table->id();
            // Customer Information
            $table->foreignId('inquiry_id')->constrained()->onDelete('cascade');
            $table->string('creditInv_id', 30)->unique();
            $table->string('cicontactPerson', 100)->nullable();
            $table->enum('cigender', ['Male','Female'])->nullable();
            $table->date('cibirthday')->nullable();
            $table->unsignedTinyInteger('cicpage')->nullable();

            // Spouse Information
            $table->string('cispouseName', 100)->nullable();
            $table->enum('cispouseGender', ['Male','Female'])->nullable();
            $table->date('cispouseBirthday')->nullable();
            $table->unsignedTinyInteger('cisage')->nullable();

            // Personal Details
            $table->string('cicivilStatus', 20)->nullable();
            $table->string('cieducation', 100)->nullable();
            $table->string('citinNumber', 20)->nullable();
            $table->string('cimobile', 20)->nullable();

            // Dependents
            $table->unsignedTinyInteger('cidependentChildren')->default(0);
            $table->unsignedTinyInteger('cistudyingChildren')->default(0);
            $table->unsignedTinyInteger('ciotherDependents')->default(0);

            $table->text('ciPresAddress')->nullable();
            $table->unsignedTinyInteger('ciPresAddrLenStay')->default(0);
            $table->string('ciPresAddrMonStay', 12)->nullable();
            $table->string('ciPresAddrType', 12)->nullable();
            $table->decimal('ciPresAddrRentFee', 10, 2)->default(0.00);

            $table->text('ciPrevAddress')->nullable();
            $table->unsignedTinyInteger('ciPrevAddrLenStay')->default(0);
            $table->string('ciPrevAddrMonStay', 12)->nullable();
            $table->text('ciProvAddress')->nullable();

            $table->string('ciEmployedBy', 30)->nullable();
            $table->text('ciEmpAddrEmp')->nullable();
            $table->unsignedTinyInteger('ciEmpAddrLenStay')->default(0);
            $table->string('ciEmpAddrMonStay', 12)->nullable();
            $table->string('ciEmpStatus', 20)->nullable();
            $table->string('ciEmpDesignation', 30)->nullable();
            $table->string('ciEmpTelNo', 15)->nullable();

            $table->string('ciEmpPrevEmp', 30)->nullable();
            $table->text('ciEmpPrevAddrEmp')->nullable();
            $table->string('ciEmpSpouseEmp', 12)->nullable();
            $table->text('ciEmpSpouseEmpAddr')->nullable();
            $table->string('ciEmpSpousePosition', 30)->nullable();
            $table->string('ciEmpPrevTelNo', 15)->nullable();

            $table->decimal('ciIncomeSalaryNet', 10, 2)->default(0.00);
            $table->decimal('ciSpouseIncome', 10, 2)->default(0.00);
            $table->decimal('ciRentalIncome', 10, 2)->default(0.00);
            $table->decimal('ciBusinessNet', 10, 2)->default(0.00);
            $table->decimal('ciOthers', 10, 2)->default(0.00);
            $table->decimal('ciTotalIncome', 10, 2)->default(0.00);

            $table->decimal('ciExpenseLiving', 10, 2)->default(0.00);
            $table->decimal('ciExpenseRent', 10, 2)->default(0.00);
            $table->decimal('ciExpenseSchooling', 10, 2)->default(0.00);
            $table->decimal('ciExpenseInsurance', 10, 2)->default(0.00);
            $table->decimal('ciExpenseElectWat', 10, 2)->default(0.00);
            $table->decimal('ciExpenseObligation', 10, 2)->default(0.00);
            $table->decimal('ciExpenseLoan', 10, 2)->default(0.00);
            $table->decimal('ciExpenseTotal', 10, 2)->default(0.00);

            $table->string('ciCheckingAccount', 30)->nullable();
            $table->text('ciCAAddrr')->nullable();
            $table->string('ciSavingsAccount', 30)->nullable();
            $table->text('ciSAAddrr')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_investigation_primaries');
    }
};
