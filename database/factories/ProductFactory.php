<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'quantity' => fake()->randomNumber(3),
            'price' => fake()->randomFloat(2, 10, 29999.99),
            'currency_code' => 'BRL',
            'category_id' => Category::factory(),
            'sku' => fake()->unique()->ean13(),
        ];
    }
}
