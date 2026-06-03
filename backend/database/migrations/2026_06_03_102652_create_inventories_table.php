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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            
            // Foreign Key na nakakonekta sa Referentials table natin sa itaas
            $table->foreignId('motorcycle_id')
                  ->constrained('motorcycles')
                  ->onDelete('restrict'); // Bawal burahin ang model kapag may stock pa nito

            // Core Identifiers (Kritikal sa LTO)
            $table->string('chassis_number')->unique(); // e.g., GMQ274
            $table->string('engine_number')->unique();  // e.g., 9446UYMK
            $table->string('series_number')->unique();  // e.g., "4589BNER"
            
            
            // Location Tracking
            $table->string('unit_name')->nullable(); // e.g., "PCX 160 CBS"
            $table->string('branch_code')->nullable(); // e.g., BTK
            $table->string('unit_description')->nullable(); // e.g., "160 CC -4 STROKE"
            
            // LTO Documents Tracking (DMS Ready)
            $table->string('unitPicture')->nullable();
            $table->string('mv_file_number')->nullable()->unique();
            $table->string('cr_number')->nullable()->unique();
            $table->string('plate_number')->nullable()->unique();

            // Accounting Data
            $table->decimal('supplier_cost', 12, 2)->default(0.00);

            // Lifecycle at Status
            $table->enum('unit_type', ['Brand_New', 'Used_Repo'])->default('Brand_New');
            $table->enum('status', ['Available', 'Reserved', 'Sold', 'Loaned', 'Maintenance', 'Stolen'])->default('Available');
            
            $table->date('received_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
