<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Unit;
use App\Models\House;
use App\Models\Meter;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Unit::class;
    
    public function definition(): array
    {
        $houseId = House::query()->first()?->id;

        return [
            'house_id' => $houseId, // Use the first House
            'name' => 'Unit ' . $this->faker->unique()->numberBetween(1, 100),
            'floor_number' => $this->faker->numberBetween(0, 5),
        ];;
    }
    
    public function configure(): static
    {
        return $this->afterCreating(function (Unit $unit) {
            // Automatically create 2 meters for each unit after it's saved
            $unit->meters()->createMany([
                Meter::factory()->marketLocation()->make()->toArray(),
                Meter::factory()->meteringLocation()->make()->toArray(),
            ]);
        });
    }
}
