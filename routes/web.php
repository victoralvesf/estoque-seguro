<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Models\Product;
use App\Models\User;
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
        ->name('products.create')
        ->can('create', Product::class);

    Route::post('products', [ProductController::class, 'store'])
        ->can('create', Product::class);

    // Users
    Route::get('users', [UserController::class, 'index'])
        ->name('users')
        ->can('viewAny', User::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
