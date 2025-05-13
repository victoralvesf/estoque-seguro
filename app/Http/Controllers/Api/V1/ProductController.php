<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $products = Product::simplePaginate($perPage);

        return response()->json($products);
    }

    public function show(Request $request, Product $product)
    {
        return response()->json($product);
    }
}
