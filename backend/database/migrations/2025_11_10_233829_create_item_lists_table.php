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
        Schema::create('item_lists', function (Blueprint $table) {
            $table->id();
            $table->string("item_number")->unique();
            $table->string("itemName");
            $table->string("itemDescription")->nullable();
            $table->string("itemPicture")->nullable();
            $table->string("units")->nullable();
            $table->string("brandName");
            $table->string("modelName");
            $table->string("color");
            $table->double('origPrice', 10, 2);
            $table->double('cashPrice', 10, 2);
            $table->double("unitCost", 10, 2);
            $table->double("srpValue", 10, 2);
            $table->double("interest", 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_lists');
    }
};
