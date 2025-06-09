<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\Unit;
use App\Models\Meter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UnitApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_units_with_meters(): void
    {
        $house = House::factory()->create();
        $unit = Unit::factory()->create(['house_id' => $house->id]);
        Meter::factory()->count(2)->create(['unit_id' => $unit->id]);

        $response = $this->getJson('/api/units');

        $response->assertOk()
            ->assertJsonFragment(['id' => $unit->id])
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'house_id',
                    'name',
                    'floor_number',
                    'meters' => [
                        ['id', 'unit_id', 'type', 'location_id', 'obis']
                    ]
                ]
            ]);
    }
}
