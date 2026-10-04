<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('frozen_until')->nullable()->after('remember_token');
            $table->string('frozen_reason')->nullable()->after('frozen_until');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['frozen_until', 'frozen_reason']);
        });
    }
};
