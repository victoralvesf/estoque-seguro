<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'quantity' => fake()->randomNumber(2),
            'price' => fake()->randomFloat(2, 1, 999999.99),
            'currency_code' => 'BRL',
            'category' => fake()->randomElement(['Eletrônicos', 'Roupas', 'Alimentos', 'Móveis', 'Brinquedos', 'Ferramentas']),
            'sku' => fake()->unique()->ean13(),
        ];
    }
}
