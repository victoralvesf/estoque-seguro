<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\ProductIndexRequest;
use App\Services\Api\V1\ProductService;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(ProductIndexRequest $request)
    {
        $products = $this->productService->getPaginatedProducts($request);

        return response()->json($products);
    }

    public function show(int $id)
    {
        $product = $this->productService->getProductById($id);

        return response()->json($product);
    }
}
