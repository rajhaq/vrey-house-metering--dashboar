<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;


class Unit extends Model
{
    /** @use HasFactory<\Database\Factories\UnitFactory> */
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'house_id', 'name', 'floor_number',
    ];
    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function meters()
    {
        return $this->hasMany(Meter::class);
    }
}
