<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fact_address>
 */
class Fact_addressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(1, 10),
            'name'=> fake()->name(),
            'address' => fake()->streetAddress(),
            'country_id' => fake()->numberBetween(1, 10),
            'region_id' => fake()->numberBetween(1, 10),
            'zip' => fake()->randomNumber(5,false),
        ];
    }
}
