<?php

namespace App\Services;

use App\Filters\ProductFilter;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductService
{
    public function getProducts(Request $request)
    {
        $productFilter = new ProductFilter($request);
        $products = $productFilter->filter()->paginate()->getResults();

        return $products;
    }

    public function createProduct(array $validated)
    {
        $productWithCategory = $this->handleCategory($validated);

        Product::create($productWithCategory);
    }

    public function updateProduct(array $validated, Product $product)
    {
        $productWithCategory = $this->handleCategory($validated);

        $product->update($productWithCategory);
    }

    public function handleCategory(array $validated)
    {
        $categoryName = $validated['category'];
        $categorySlug = str($categoryName)->slug();

        $category = Category::firstOrCreate(
            ['name' => $categoryName],
            ['slug' => $categorySlug]
        );

        $validated['category_id'] = $category->id;
        unset($validated['category']);

        return $validated;
    }

    public function getAllowedSearchParams(Request $request)
    {
        $productFilter = new ProductFilter($request);
        $allowedSearchParams = $productFilter->getAllowedSearchParams();

        return $allowedSearchParams;
    }

    public function getPriceRange()
    {
        return [
            'min' => Product::min('price'),
            'max' => Product::max('price'),
        ];
    }

    public function getQuantityRange()
    {
        return [
            'min' => Product::min('quantity'),
            'max' => Product::max('quantity'),
        ];
    }
}
