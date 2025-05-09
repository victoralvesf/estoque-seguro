<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Products
    Route::get('products', [ProductController::class, 'index'])
        ->name('products');

    Route::get('products/create', [ProductController::class, 'create'])
        ->name('products.create');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
