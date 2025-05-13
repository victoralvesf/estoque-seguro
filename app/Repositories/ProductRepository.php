<?php

namespace App\Repositories;

use App\Filters\ProductFilter;
use App\Models\Product;
use Illuminate\Pagination\Paginator;
use Illuminate\Http\Request;

class ProductRepository
{
    /**
     * @var Product
     */
    protected $model;

    /**
     * UserRepository constructor.
     *
     * @param Product $model
     */
    public function __construct(Product $model)
    {
        $this->model = $model;
    }

    /**
     * Get paginated products with optional filters.
     *
     * @param Request $request
     *
     * @return Paginator
     */
    public function getPaginated(Request $request): Paginator
    {
        $productFilter = new ProductFilter($request);

        return $productFilter->filter()->simplePaginate()->getResults();
    }

    /**
     * Find a product by ID.
     *
     * @param int $id
     * @return Product|null
     */
    public function findById(int $id): ?Product
    {
        return $this->model->find($id);
    }
}
