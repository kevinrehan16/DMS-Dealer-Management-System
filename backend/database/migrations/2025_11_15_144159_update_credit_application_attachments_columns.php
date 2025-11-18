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
        Schema::table('credit_application_attachments', function (Blueprint $table) {
            $table->string('attFileName', 255)->change();
            $table->string('attFileType', 100)->change();
            $table->string('attModule', 50)->change();
            $table->string('attReq', 50)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('credit_application_attachments', function (Blueprint $table) {
            $table->string('attFileName', 10)->change();
            $table->string('attFileType', 50)->change();
            $table->string('attModule', 10)->change();
            $table->string('attReq', 10)->change();
        });
    }
};
