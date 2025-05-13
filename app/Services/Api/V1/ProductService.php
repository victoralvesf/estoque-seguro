<?php

namespace App\Services\Api\V1;

use App\Exceptions\Product\ProductNotFoundException;
use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class ProductService
{
    /**
     * @var ProductRepository
     */
    protected $productRepository;

    /**
     * Create a new service instance.
     *
     * @param ProductRepository $productRepository
     * @return void
     */
    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getPaginatedProducts(Request $request): Paginator
    {
        return $this->productRepository->getPaginated($request);
    }

    public function getProductById(int $id): Product
    {
        $product = $this->productRepository->findById($id);

        if (!$product) {
            throw new ProductNotFoundException("Product not found");
        }

        return $product;
    }
}
