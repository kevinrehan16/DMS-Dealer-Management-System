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
        Schema::table('credit_application_tables', function (Blueprint $table) {
            Schema::table('credit_application_primaries', function (Blueprint $table) {
                $table->foreignId('customer_id')->nullable()->constrained()->onDelete('set null');
            });

            Schema::table('credit_application_preferences', function (Blueprint $table) {
                $table->foreignId('customer_id')->nullable()->constrained()->onDelete('set null');
            });

            Schema::table('credit_application_references', function (Blueprint $table) {
                $table->foreignId('customer_id')->nullable()->constrained()->onDelete('set null');
            });

            Schema::table('credit_application_incomes', function (Blueprint $table) {
                $table->foreignId('customer_id')->nullable()->constrained()->onDelete('set null');
            });

            Schema::table('credit_application_properties', function (Blueprint $table) {
                $table->foreignId('customer_id')->nullable()->constrained()->onDelete('set null');
            });

            Schema::table('credit_application_attachments', function (Blueprint $table) {
                $table->foreignId('customer_id')->nullable()->constrained()->onDelete('set null');
            });

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('credit_application_tables', function (Blueprint $table) {
            Schema::table('credit_application_primaries', function (Blueprint $table) {
                $table->dropConstrainedForeignId('customer_id');
            });

            Schema::table('credit_application_preferences', function (Blueprint $table) {
                $table->dropConstrainedForeignId('customer_id');
            });

            Schema::table('credit_application_references', function (Blueprint $table) {
                $table->dropConstrainedForeignId('customer_id');
            });

            Schema::table('credit_application_incomes', function (Blueprint $table) {
                $table->dropConstrainedForeignId('customer_id');
            });

            Schema::table('credit_application_properties', function (Blueprint $table) {
                $table->dropConstrainedForeignId('customer_id');
            });

            Schema::table('credit_application_attachments', function (Blueprint $table) {
                $table->dropConstrainedForeignId('customer_id');
            });

        });
    }
};
