<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\House;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $houseId = $request->query('house_id');
        if (!$houseId) {
            return response()->json(['error' => 'House ID is required'], 400);
        }
        $sortOrder = strtolower($request->query('sortBy', 'asc')) === 'desc' ? 'desc' : 'asc';
        $date = $request->query('date');
    
        $query = DB::table('meter_readings')
            ->select(
                'units.name as unit_name',
                'meters.type as meter_type',
                'meters.location_id as location_id',
                DB::raw('DATE(meter_readings.timestamp) as reading_date'),
                DB::raw('SUM(meter_readings.consumption) as total_kwh')
            )
            ->join('meters', 'meters.id', '=', 'meter_readings.meter_id')
            ->join('units', 'units.id', '=', 'meters.unit_id')
            ->join('houses', 'houses.id', '=', 'units.house_id')
            ->where('houses.id', $houseId)
            ->groupBy('reading_date', 'units.id', 'units.name', 'meters.type', 'meters.location_id');
    
        if ($date) {
            $parsedDate = Carbon::parse($date)->toDateString();
            $query->whereDate('meter_readings.timestamp', $parsedDate);
        }
    
        $rawData = $query->orderBy('reading_date', $sortOrder)->get();
    
        $grouped = [];
    
        foreach ($rawData as $row) {
            $readingDate = $row->reading_date;
            $unit = $row->unit_name;
    
            if (!isset($grouped[$readingDate])) {
                $grouped[$readingDate] = [];
            }
    
            if (!isset($grouped[$readingDate][$unit])) {
                $grouped[$readingDate][$unit] = [
                    'unit' => $unit,
                    'market_meter' => ['location_id' => null, 'total_kwh' => 0],
                    'metering_meter' => ['location_id' => null, 'total_kwh' => 0],
                    'solar_consumption_kwh' => 0,
                ];
            }
    
            if ($row->meter_type === 'market_location') {
                $grouped[$readingDate][$unit]['market_meter'] = [
                    'location_id' => $row->location_id,
                    'total_kwh' => round($row->total_kwh, 2),
                ];
            } elseif ($row->meter_type === 'metering_location') {
                $grouped[$readingDate][$unit]['metering_meter'] = [
                    'location_id' => $row->location_id,
                    'total_kwh' => round($row->total_kwh, 2),
                ];
            }
    
            $grouped[$readingDate][$unit]['solar_consumption_kwh'] =
                round(
                    $grouped[$readingDate][$unit]['market_meter']['total_kwh'] -
                    $grouped[$readingDate][$unit]['metering_meter']['total_kwh'],
                    2
                );
        }
    
        $result = [];
    
        foreach ($grouped as $dateKey => $units) {
            $result[] = [
                'date' => $dateKey,
                'units' => array_values($units),
            ];
        }
    
        return response()->json([
            'house_id' => $houseId,
            'results' => $result,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
