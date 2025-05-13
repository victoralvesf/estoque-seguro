<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public function getCategories()
    {
        $categories = Category::orderBy('name')->select('id', 'name', 'slug')->get();

        return $categories;
    }
}
