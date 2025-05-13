<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function getUsers()
    {
        $users = User::orderBy('name')
            ->select('id', 'name', 'email', 'role')
            ->paginate(20)
            ->withQueryString();

        return $users;
    }

    public function createUser(array $validated)
    {
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
        ]);
    }

    public function updateUser(array $validated, User $user)
    {
        if (empty($validated['password'])) {
            unset($validated['password']);

            $user->update($validated);

            return;
        }

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
        ]);
    }
}
