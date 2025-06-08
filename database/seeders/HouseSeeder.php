<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\House;
use App\Models\User;

class HouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure users exist
        if (User::count() === 0) {
            $this->call(UserSeeder::class);
        }

        // Create 2 houses per user
        User::all()->each(function ($user) {
            House::factory()->count(2)->create(['user_id' => $user->id]);
        });
    }
}
