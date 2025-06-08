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
        $type = $this->faker->randomElement(['market_location', 'metering_location']);

        return [
            'unit_id' => null,
            'type' => $type,
            'location_id' => $type === 'market_location'
                ? $this->faker->numerify('##########')
                : strtoupper($this->faker->regexify('[A-Z0-9]{33}')),
        ];
    }

    public function marketLocation(): static
    {
        return $this->state(fn () => [
            'type' => 'market_location',
            'location_id' => $this->faker->numerify('##########'),
        ]);
    }

    public function meteringLocation(): static
    {
        return $this->state(fn () => [
            'type' => 'metering_location',
            'location_id' => strtoupper($this->faker->regexify('[A-Z0-9]{33}')),
        ]);
    }
}
