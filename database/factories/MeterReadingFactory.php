<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Meter;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MeterReading>
 */
class MeterReadingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'meter_id' => Meter::inRandomOrder()->first()->id ?? 1,
            'timestamp' => now(),
            'consumption' => $this->faker->randomFloat(4, 0.5, 2.0),
            'unit' => 'kWh',
            'quality_flag' => 'TRUE',
        ];
    }
}
