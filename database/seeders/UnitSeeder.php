<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Unit;
use App\Models\House;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure houses exist
        if (House::count() === 0) {
            $this->call(HouseSeeder::class);
        }

        // Create 3–5 units per house
        House::all()->each(function ($house) {
            Unit::factory()->count(rand(3, 5))->create(['house_id' => $house->id]);
        });
    }
}
