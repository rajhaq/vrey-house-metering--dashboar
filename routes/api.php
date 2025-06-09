<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\MeterReadingController;
use App\Http\Controllers\DashboardController;

Route::apiResource('dashboard', DashboardController::class);
Route::apiResource('houses', HouseController::class);
Route::apiResource('units', UnitController::class);
Route::apiResource('meter_readings', MeterReadingController::class);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
