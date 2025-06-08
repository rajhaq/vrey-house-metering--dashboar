<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class MeterReading extends Model
{
    /** @use HasFactory<\Database\Factories\MeterReadingFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'meter_id', 'timestamp', 'consumption',
        'unit', 'quality_flag'
    ];

    protected $casts = [
        'timestamp' => 'datetime',
    ];

    public function meter()
    {
        return $this->belongsTo(Meter::class);
    }
}
