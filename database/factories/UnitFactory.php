<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Unit;
use App\Models\House;
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
        return [
            'house_id' => House::factory(),
            'name' => 'Unit ' . $this->faker->unique()->numberBetween(1, 100),
            'floor_number' => $this->faker->numberBetween(0, 5),
        ];
    }
}
