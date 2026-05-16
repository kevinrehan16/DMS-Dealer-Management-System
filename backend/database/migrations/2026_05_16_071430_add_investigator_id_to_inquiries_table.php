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
            // bigInteger dapat para match sa default ID ng Users table sa Laravel
            $table->unsignedBigInteger('investigator_id')->nullable()->after('customer_id');

            // Foreign Key Constraint
            $table->foreign('investigator_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null'); // Pag nabura yung user, magiging null lang yung field
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->dropForeign(['investigator_id']);
            $table->dropColumn('investigator_id');
        });
    }
};
