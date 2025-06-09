<?php

namespace Tests\Unit;

use App\Models\MeterReading;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;

class MeterReadingTest extends TestCase
{
    public function test_it_has_fillable_fields(): void
    {
        $reading = new MeterReading();

        $this->assertEquals([
            'meter_id', 'timestamp', 'consumption', 'unit', 'quality_flag',
        ], $reading->getFillable());
    }

    public function test_it_belongs_to_meter(): void
    {
        $reading = new MeterReading();

        $this->assertInstanceOf(BelongsTo::class, $reading->meter());
    }

    public function test_timestamp_is_casted_to_datetime(): void
    {
        $reading = new MeterReading();

        $this->assertEquals('datetime', $reading->getCasts()['timestamp']);
    }
}
