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
            $table->unsignedBigInteger('parent_id')->nullable()->after('role');
            $table->foreign('parent_id')->references('id')->on('modules')->onDelete('cascade');
            $table->string('description')->nullable()->after('display_name');
            $table->string('icon')->nullable()->after('description');
            $table->string('route')->nullable()->after('icon');
            $table->integer('order')->default(0)->after('route');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
            $table->dropColumn(['parent_id', 'description', 'icon', 'route', 'order']);
        });
    }
};
