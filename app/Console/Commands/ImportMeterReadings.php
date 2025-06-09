<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Meter;
use App\Models\MeterReading;
use Carbon\Carbon;

class ImportMeterReadings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'meters:import-consumption {startDate} {endDate}';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import consumption data for all meters for a given date range';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $start = $this->argument('startDate')
            ? Carbon::parse($this->argument('startDate'))->startOfDay()
            : now()->subDay()->startOfDay();

        $end = $this->argument('endDate')
            ? Carbon::parse($this->argument('endDate'))->endOfDay()
            : now()->startOfDay();

        $startDate = $start->toIso8601String();
        $endDate = $end->toIso8601String();

        $this->info("Importing from {$startDate} to {$endDate}");

        $meters = Meter::all();
        $totalReadings = 0;

        foreach ($meters as $meter) {
            $url = "https://localhost/measurements?locationId={$meter->location_id}&startDate={$startDate}&endDate={$endDate}";

            $this->line("Calling API for Meter #{$meter->id} ({$meter->location_id})");

            $response = Http::get($url);

            if (!$response->successful()) {
                $this->warn("Failed for meter {$meter->id}: " . $response->status());
                continue;
            }

            $readings = $response->json();

            foreach ($readings as $data) {
                MeterReading::updateOrCreate(
                    [
                        'meter_id' => $meter->id,
                        'timestamp' => Carbon::parse($data['startDate'])->setTimezone('UTC'),
                    ],
                    [
                        'consumption' => $data['value'],
                        'unit' => strtolower($data['unit']),
                        'quality_flag' => $data['quality'] === 'TRUE' ? 'TRUE' : 'FALSE',
                    ]
                );

                $totalReadings++;
            }

            $this->info("Imported " . count($readings) . " readings for meter {$meter->id}");
        }

        $this->info("Done! Total readings imported: {$totalReadings}");
    }
}
