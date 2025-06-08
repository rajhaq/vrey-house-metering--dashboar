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
        Schema::create('meter_readings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('meter_id')->comment('FK to meters');
            $table->timestamp('timestamp')->comment('Start time of the reading (e.g., 15 min interval)');
            $table->float('consumption')->comment('Energy consumed during the interval');
            $table->string('unit')->default('kWh');
            $table->string('quality_flag')->default('TRUE');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('meter_id')
                  ->references('id')->on('meters')
                  ->onDelete('cascade');

            // Prevent duplicates for the same meter and reading time
            $table->unique(['meter_id', 'timestamp'], 'unique_meter_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meter_readings');
    }
};
