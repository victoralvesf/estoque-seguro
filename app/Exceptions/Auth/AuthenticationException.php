<?php

namespace App\Exceptions\Auth;

use Exception;

class AuthenticationException extends Exception
{
    /**
     * Report the exception.
     *
     * @return bool
     */
    public function report()
    {
        return false;
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function render($request)
    {
        $statusCode = 401;

        if ($this->getMessage() === 'User not found' || $this->getMessage() === 'Failed to fetch user profile') {
            $statusCode = 404;
        } elseif (strpos($this->getMessage(), 'Failed to') === 0) {
            $statusCode = 500;
        }

        return response()->json([
            'status' => 'error',
            'message' => $this->getMessage(),
        ], $statusCode);
    }
}
