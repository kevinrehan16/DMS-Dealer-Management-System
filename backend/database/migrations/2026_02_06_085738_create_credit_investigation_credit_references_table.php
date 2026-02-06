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
        Schema::create('credit_investigation_credit_references', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inquiry_id')->constrained()->onDelete('cascade');
            $table->string('creditCr_id', 30)->unique();
            $table->string('crcreditor', 100)->nullable();
            $table->text('craddress')->nullable();
            $table->date('crdategranted')->nullable();
            $table->decimal('crorigbalance', 10, 2)->default(0.00);
            $table->decimal('crpresbalance', 10, 2)->default(0.00);
            $table->decimal('crmoinstallment', 10, 2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_investigation_credit_references');
    }
};
