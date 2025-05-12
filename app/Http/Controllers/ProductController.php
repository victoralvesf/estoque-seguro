<?php

namespace App\Http\Controllers;

use App\Filters\ProductFilter;
use App\Http\Requests\Product\StoreProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $productFilter = new ProductFilter($request);
        $allowedSearchParams = $productFilter->getAllowedSearchParams();

        $products = $productFilter->filter()->paginate()->getResults();

        return Inertia::render('products/index', [
            'products' => $products,
            'filters' => $request->only($allowedSearchParams),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/create', [
            'categories' => Category::orderBy('name')->select('id', 'name', 'slug')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        $categoryName = $validated['category'];
        $categorySlug = str($categoryName)->slug();

        $category = Category::firstOrCreate(
            ['name' => $categoryName],
            ['slug' => $categorySlug]
        );

        $validated['category_id'] = $category->id;
        unset($validated['category']);

        Product::create($validated);

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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
