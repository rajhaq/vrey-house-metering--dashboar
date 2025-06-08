<?php

namespace Database\Factories;

use App\Models\Meter;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Meter>
 */
class MeterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Meter::class;
    
    public function definition(): array
    {
        // Randomly choose meter type
        $type = $this->faker->randomElement(['market_location', 'metering_location']);

        // Generate location ID based on type
        $locationId = $type === 'market_location'
            ? $this->faker->numerify('##########')  // 10-digit number
            : strtoupper($this->faker->regexify('[A-Z0-9]{33}'));  // 33-char alphanumeric string

        return [
            'location_id' => $locationId,
            'type' => $type,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
