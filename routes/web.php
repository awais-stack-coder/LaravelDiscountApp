<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiscountController;


Route::middleware(['verify.shopify'])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    })->name('home');
    Route::post('/create/discount', [DiscountController::class, 'createDiscount']);
});
