<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;
use App\Services\CategoryService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $categoryService;
    protected $productService;

    public function __construct(CategoryService $categoryService, ProductService $productService)
    {
        $this->categoryService = $categoryService;
        $this->productService = $productService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = $this->productService->getProducts($request);
        $categories = $this->categoryService->getCategories();
        $allowedSearchParams = $this->productService->getAllowedSearchParams($request);

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only($allowedSearchParams),
            'priceRange' => $this->productService->getPriceRange(),
            'quantityRange' => $this->productService->getQuantityRange(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = $this->categoryService->getCategories();

        return Inertia::render('products/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $this->productService->createProduct($request->validated());

        return Redirect::route('products')->with('success', 'Produto criado com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = $this->categoryService->getCategories();

        return Inertia::render('products/edit', [
            'categories' => $categories,
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->productService->updateProduct($request->validated(), $product);

        return Redirect::route('products')->with('success', 'Produto atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
