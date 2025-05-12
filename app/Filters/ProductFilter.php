<?php

namespace App\Filters;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ProductFilter
{
    protected $request;
    protected $query;
    protected $perPage;
    protected $results;

    protected $filters = [
        'name',
        'category_id',
        'price',
        'quantity',
    ];

    protected $allowedSortFields = [
        'name',
        'price',
        'quantity',
        'created_at',
        'updated_at'
    ];

    protected $allowedQueryParams = [
        'name',
        'category_id',
        'min_price',
        'max_price',
        'min_quantity',
        'max_quantity',
        'order_by',
        'sort',
        'per_page'
    ];

    /**
     * Create a new class instance.
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->query = Product::query();
        $this->perPage = (int) $request->input('per_page', 20);
        $this->perPage = min(max($this->perPage, 10), 100);
    }

    public function getAllowedSearchParams()
    {
        return $this->allowedQueryParams;
    }

    /**
     * Apply all filters from the request
     */
    public function filter(): self
    {
        foreach ($this->filters as $filter) {
            if (method_exists($this, $filter)) {
                $this->{$filter}();
            }
        }

        $this->applySorting();

        return $this;
    }

    /**
     * Filter by name
     */
    protected function name(): void
    {
        if ($this->request->filled('name')) {
            $name = trim($this->request->query('name'));
            $this->query->where('name', 'like', '%' . $name . '%');
        }
    }

    /**
     * Filter by category
     */
    protected function category_id(): void
    {
        if ($this->request->filled('category_id')) {
            $this->query->where('category_id', $this->request->query('category_id'));
        }
    }

    /**
     * Filter by price range
     */
    protected function price(): void
    {
        if ($this->request->filled('min_price')) {
            $this->query->where('price', '>=', $this->request->query('min_price'));
        }

        if ($this->request->filled('max_price')) {
            $this->query->where('price', '<=', $this->request->query('max_price'));
        }
    }

    /**
     * Filter by quantity range
     */
    protected function quantity(): void
    {
        if ($this->request->filled('min_quantity')) {
            $this->query->where('quantity', '>=', $this->request->query('min_quantity'));
        }

        if ($this->request->filled('max_quantity')) {
            $this->query->where('quantity', '<=', $this->request->query('max_quantity'));
        }
    }

    /**
     * Apply sorting to the query
     */
    protected function applySorting(): void
    {
        $sortField = $this->request->input('order_by', 'name');
        $sortDirection = $this->request->input('sort', 'asc');

        $sortField = in_array($sortField, $this->allowedSortFields) ? $sortField : 'name';
        $sortDirection = in_array(strtolower($sortDirection), ['asc', 'desc']) ? $sortDirection : 'asc';

        $this->query->orderBy($sortField, $sortDirection);
    }

    /**
     * Apply pagination to the results
     */
    public function paginate()
    {
        $this->results = $this->query->paginate($this->perPage)->withQueryString();

        return $this;
    }

    /**
     * Return the query builder instance for further chaining
     */
    public function getQuery(): Builder
    {
        return $this->query;
    }

    /**
     * Get the filtered and paginated results
     */
    public function getResults()
    {
        return $this->results ?? $this->query->get();
    }
}
