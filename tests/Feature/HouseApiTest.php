<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\Unit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HouseApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_list_of_houses_with_unit_count(): void
    {
        $house = House::factory()->create();
        Unit::factory()->count(2)->create(['house_id' => $house->id]);

        $response = $this->getJson('/api/houses');

        $response->assertOk()
                 ->assertJsonFragment([
                     'id' => $house->id,
                     'units_count' => 2,
                 ]);
    }

    public function test_it_returns_a_house_with_its_units(): void
    {
        $house = House::factory()->create();
        $unit = Unit::factory()->create(['house_id' => $house->id]);

        $response = $this->getJson("/api/houses/{$house->id}");

        $response->assertOk()
                 ->assertJsonFragment([
                     'id' => $unit->id,
                     'house_id' => $house->id,
                 ]);
    }
}
