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
        Schema::table('inquiries', function (Blueprint $table) {
            $table->string('inquiry_status', 20)->nullable()->default("New");
            $table->string('userid', 30)->nullable();
            $table->date('date_creditinvestigation')->nullable();
            $table->time('time_creditinvestigation')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->dropColumn('inquiry_status');
            $table->dropColumn('userid');
            $table->dropColumn('date_creditinvestigation');
            $table->dropColumn('time_creditinvestigation');
        });
    }
};
