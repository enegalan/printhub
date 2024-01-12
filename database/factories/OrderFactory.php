<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cart_id' => fake()->numberBetween(1,10),
            'fact_addresse_id' => fake()->numberBetween(1,10),
            'ship_addresse_id' => fake()->numberBetween(1,10),
            'name' => fake()->name(),
            'lastname' => fake()->lastName(),
            'email' => fake()->email(), 
            'status' => fake()->randomElement(['Not paid','Paid','Shipping','Delivered'])
        ];
    }
}
