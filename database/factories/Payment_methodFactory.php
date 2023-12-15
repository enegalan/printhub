<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment_method>
 */
class Payment_methodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(1, 80),
            'number' => fake()->creditCardNumber(),
            'owner_name'=> fake()->firstName() .' '. fake()->lastname().' '. fake()->lastName(),
            'cvv'=>fake()->randomNumber('3',true),
            'expire_date'=> fake()->creditCardExpirationDateString(),
        ];
    }
}
