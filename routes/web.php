<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Products
    Route::get('products', [ProductController::class, 'index'])
        ->name('products');

    Route::get('products/create', [ProductController::class, 'create'])
        ->name('products.create')
        ->can('create', Product::class);

    Route::post('products', [ProductController::class, 'store'])
        ->name('products.store')
        ->can('create', Product::class);

    Route::get('products/{product}/edit', [ProductController::class, 'edit'])
        ->name('products.edit')
        ->can('update', 'product');

    Route::put('products/{product}', [ProductController::class, 'update'])
        ->name('products.update')
        ->can('update', 'product');

    // Users
    Route::get('users', [UserController::class, 'index'])
        ->name('users')
        ->can('viewAny', User::class);

    Route::get('users/create', [UserController::class, 'create'])
        ->name('users.create')
        ->can('create', User::class);

    Route::post('users', [UserController::class, 'store'])
        ->name('users.store')
        ->can('create', User::class);

    Route::get('users/{user}/edit', [UserController::class, 'edit'])
        ->name('users.edit')
        ->can('update', 'user');

    Route::put('users/{user}', [UserController::class, 'update'])
        ->name('users.update')
        ->can('update', 'user');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
