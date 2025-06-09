<?php

namespace Tests\Feature;

use App\Models\House;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DashboardApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_error_if_house_id_is_missing(): void
    {
        $response = $this->getJson('/api/dashboard');

        $response->assertStatus(400)
                 ->assertJsonFragment(['error' => 'House ID is required']);
    }

    public function test_it_returns_dashboard_data_for_valid_house(): void
    {
        $house = House::factory()->create();

        $response = $this->getJson('/api/dashboard?house_id=' . $house->id);

        $response->assertOk()
                 ->assertJsonStructure([
                     'house_id',
                     'results',
                 ]);
    }
}
