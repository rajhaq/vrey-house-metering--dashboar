<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Meter;
use App\Models\MeterReading;
use Illuminate\Support\Carbon;

class MeterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $intervalMinutes = 15;
        $start = Carbon::parse('2025-01-01 00:00:00');
        $end = Carbon::parse('2025-01-01 23:45:00'); // full day

        $meters = Meter::all();

        foreach ($meters as $meter) {
            $time = $start->copy();

            while ($time <= $end) {
                MeterReading::create([
                    'meter_id' => $meter->id,
                    'timestamp' => $time->copy(),
                    'consumption' => fake()->randomFloat(4, 0.5, 2.0),
                    'unit' => 'kWh',
                    'quality_flag' => 'TRUE',
                ]);

                $time->addMinutes($intervalMinutes);
            }
        }
    }
}
