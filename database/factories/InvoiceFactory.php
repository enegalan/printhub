<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'payment_method' => fake()->randomElement(['Paypal','Credit Card']),
            'name' => fake()->name(),
            'lastname' => fake()->lastName(),
            'email' => fake()->email(),
            'order_id' => fake()->numberBetween(1,20), 
        ];
    }
}
