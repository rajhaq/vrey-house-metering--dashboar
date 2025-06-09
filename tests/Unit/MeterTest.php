<?php

namespace Tests\Unit;

use App\Models\Meter;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

class MeterTest extends TestCase
{
    public function test_it_has_fillable_fields(): void
    {
        $meter = new Meter();

        $this->assertEquals([
            'unit_id', 'type', 'location_id', 'obis',
        ], $meter->getFillable());
    }

    public function test_it_belongs_to_unit(): void
    {
        $meter = new Meter();

        $this->assertInstanceOf(BelongsTo::class, $meter->unit());
    }

    public function test_it_has_many_readings(): void
    {
        $meter = new Meter();

        $this->assertInstanceOf(HasMany::class, $meter->readings());
    }
}
