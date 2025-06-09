<?php

namespace Tests\Unit;

use App\Models\Unit;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

class UnitTest extends TestCase
{
    public function test_it_has_fillable_fields(): void
    {
        $unit = new Unit();

        $this->assertEquals([
            'house_id', 'name', 'floor_number',
        ], $unit->getFillable());
    }

    public function test_it_belongs_to_house(): void
    {
        $unit = new Unit();

        $this->assertInstanceOf(BelongsTo::class, $unit->house());
    }

    public function test_it_has_many_meters(): void
    {
        $unit = new Unit();

        $this->assertInstanceOf(HasMany::class, $unit->meters());
    }
}
