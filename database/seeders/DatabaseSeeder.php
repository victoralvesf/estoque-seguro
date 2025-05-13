<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'role' => 'admin',
            'password' => Hash::make(config('app.test_user_password')),
        ]);

        User::factory()->create([
            'name' => 'Operator',
            'email' => 'operator@company.com',
            'role' => 'operator',
            'password' => Hash::make(config('app.test_user_password')),
        ]);

        User::factory()->create([
            'name' => 'User',
            'email' => 'user@customer.com',
            'role' => 'user',
            'password' => Hash::make(config('app.test_user_password')),
        ]);
    }
}
