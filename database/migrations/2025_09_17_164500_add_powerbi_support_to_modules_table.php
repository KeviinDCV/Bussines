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
        Schema::table('modules', function (Blueprint $table) {
            $table->enum('content_type', ['module', 'powerbi'])->default('module')->after('order');
            $table->text('powerbi_url')->nullable()->after('content_type');
            $table->json('powerbi_config')->nullable()->after('powerbi_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->dropColumn(['content_type', 'powerbi_url', 'powerbi_config']);
        });
    }
};
