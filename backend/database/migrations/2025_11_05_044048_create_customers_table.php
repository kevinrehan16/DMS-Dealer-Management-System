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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('customer_id')->unique();
            $table->string('firstName')->nullable();
            $table->string('lastName')->nullable();
            $table->string('middleName')->nullable();
            $table->string('title');
            $table->string('gender');
            $table->date('birthdate');
            $table->integer('age')->nullable();
            $table->string('mobile')->nullable();
            $table->string('telno')->nullable();
            $table->string('email')->nullable();
            $table->string('addressnum')->nullable();
            $table->string('addressbldg')->nullable();
            $table->string('addressstreet')->nullable();
            $table->string('addressssubd')->nullable();
            $table->string('addressscity')->nullable();
            $table->string('addresssbrgy')->nullable();
            $table->string('addresssprovince')->nullable();
            $table->string('addresssregion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
