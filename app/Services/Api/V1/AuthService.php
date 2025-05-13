<?php

namespace App\Services\Api\V1;

use App\Exceptions\Auth\AuthenticationException;
use App\Repositories\UserRepository;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthService
{
    // Hack to make Intelephense recognize the auth('api') guard.
    /** @var \Tymon\JWTAuth\JWTGuard */
    protected $guard;

    protected $userRepository;

    /**
     * Create a new class instance.
     */
    public function __construct(UserRepository $userRepository)
    {
        /** @var \Tymon\JWTAuth\JWTGuard $guard */
        $this->guard = auth('api');

        $this->userRepository = $userRepository;
    }

    public function attemptLogin(array $credentials): string
    {
        try {
            if (!$token = $this->guard->attempt($credentials)) {
                throw new AuthenticationException('Invalid credentials');
            }

            return $token;
        } catch (JWTException $e) {
            throw new AuthenticationException('Failed to create token', 0, $e);
        }
    }

    public function getAuthenticatedUser()
    {
        try {
            $user = $this->guard->user();

            if (!$user) {
                throw new AuthenticationException('User not found');
            }

            return $user;
        } catch (JWTException $e) {
            throw new AuthenticationException('Failed to fetch user profile', 0, $e);
        }
    }

    public function refreshToken(): string
    {
        try {
            $token = $this->guard->refresh();

            if (!$token) {
                throw new AuthenticationException('Unable to refresh token');
            }

            return $token;
        } catch (JWTException $e) {
            throw new AuthenticationException('Failed to refresh token', 0, $e);
        }
    }

    public function logout(): void
    {
        try {
            $this->guard->logout();
        } catch (JWTException $e) {
            throw new AuthenticationException('Failed to logout', 0, $e);
        }
    }

    public function getTokenTTL(): int
    {
        return $this->guard->factory()->getTTL() * 60;
    }
}
