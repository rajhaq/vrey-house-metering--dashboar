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
        Schema::create('units', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('house_id')->comment('FK to houses');
            $table->string('name');
            $table->integer('floor_number')->nullable()->comment('Floor level of the unit');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('house_id')
                  ->references('id')->on('houses')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};
