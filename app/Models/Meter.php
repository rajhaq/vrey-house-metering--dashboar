<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Meter extends Model
{
    /** @use HasFactory<\Database\Factories\MeterFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'unit_id', 'type', 'location_id', 'obis',
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function readings()
    {
        return $this->hasMany(MeterReading::class);
    }
}
