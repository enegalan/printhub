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
            'name' => fake()->name(),
            'description' => fake()->text(),
            'file' => "/images/products/" . fake()->randomElement(['dragon.stl', 'eyeball.stl']),
            'price' => fake()->randomFloat(2, 10, 100),
            'user_id'=> fake()->numberBetween(1, 10),
        ];
    }
}
