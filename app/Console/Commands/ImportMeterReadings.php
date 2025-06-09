<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
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
    protected $signature = 'meters:import-consumption {beginDate?} {endDate?}';
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
        $beginArg = $this->argument('beginDate');
        $endArg = $this->argument('endDate');

        if ($beginArg && !$endArg) {
            $this->error('Error: If you provide beginDate, you must also provide endDate.');
            return Command::FAILURE;
        }

        if (!$beginArg && $endArg) {
            $this->error('Error: If you provide endDate, you must also provide beginDate.');
            return Command::FAILURE;
        }

        $begin = $beginArg
            ? Carbon::parse($beginArg)->startOfDay()
            : now()->subDay()->startOfDay();

        $end = $endArg
            ? Carbon::parse($endArg)->endOfDay()
            : now()->startOfDay();

        $beginDate = $begin->toIso8601String();
        $endDate = $end->toIso8601String();

        $this->info("Importing from {$beginDate} to {$endDate}");

        $baseUrl = config('services.meter_api.url');

        $meters = Meter::all();
        $totalReadings = 0;

        DB::beginTransaction();

        try {
            $bulkInsert = [];

            foreach ($meters as $meter) {
                $url = "{$baseUrl}/values/{$meter->location_id}/load-profile?beginDate={$beginDate}&obisCodes=1-1:1.29.0,1-1:1.8.0&endDate={$endDate}";

                $this->line("Calling API for Meter #{$meter->id} ({$meter->location_id})");

                $response = Http::get($url);

                if (!$response->successful()) {
                    $this->warn("Failed for meter {$meter->id}: " . $response->status());
                    continue;
                }

                $meterData = $response->json();

                foreach ($meterData as $data) {
                    $readings = $data['values'];

                    foreach ($readings as $reading) {
                        $timestamp = Carbon::parse($reading['startDate'])->setTimezone('UTC');

                        $bulkInsert[] = [
                            'meter_id' => $meter->id,
                            'timestamp' => $timestamp,
                            'consumption' => $reading['value'],
                            'unit' => strtolower($reading['unit']),
                            'quality_flag' => $reading['quality'] === 'TRUE' ? 'TRUE' : 'FALSE',
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];

                        $totalReadings++;
                    }

                    $this->info("Prepared " . count($readings) . " readings for meter {$meter->id}");
                }
            }

            if (!empty($bulkInsert)) {
                MeterReading::insert($bulkInsert);
            }

            DB::commit();
            $this->info("Done! Total readings imported: {$totalReadings}");

        } catch (\Exception $e) {
            DB::rollBack();
            $this->error("Import failed: " . $e->getMessage());
            report($e);
        }
    }
}
