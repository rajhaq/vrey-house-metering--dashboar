<?php

namespace Tests\Unit;

use App\Models\House;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class HouseTest extends TestCase
{
    public function test_it_has_fillable_fields(): void
    {
        $house = new House();

        $this->assertEquals(
            ['user_id', 'name', 'address', 'postal_code'],
            $house->getFillable()
        );
    }

    public function test_it_has_user_and_units_relationships(): void
    {
        $house = new House();

        $this->assertInstanceOf(BelongsTo::class, $house->user());
        $this->assertInstanceOf(HasMany::class, $house->units());
    }
}
