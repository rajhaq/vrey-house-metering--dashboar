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
        Schema::create('meters', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('unit_id')->comment('FK to units');

            $table->enum('type', ['market_location', 'metering_location'])
                  ->comment('Type of meter');
            $table->string('location_id')->comment('Location ID: 10-digit for market, 33-char for metering');
            $table->string('obis')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('unit_id')->references('id')->on('units')->onDelete('cascade');
            $table->unique(['location_id', 'type'], 'unique_location_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meters');
    }
};
