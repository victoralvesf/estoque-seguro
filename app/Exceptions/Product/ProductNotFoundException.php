<?php

namespace App\Exceptions\Product;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductNotFoundException extends Exception
{
    public function report()
    {
        return false;
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function render(Request $request): JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $this->getMessage(),
        ], 404);
    }
}
