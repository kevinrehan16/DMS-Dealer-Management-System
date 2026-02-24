<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Check if the unique constraint exists first
            $uniqueExists = DB::select("
                SELECT 1
                FROM pg_constraint
                WHERE conname = 'users_userid_unique'
            ");

            if (!$uniqueExists) {
                $table->unique('userid');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['userid']);
        });
    }
};
