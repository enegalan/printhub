<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        \App\Models\User::factory(100)->create();
        \App\Models\Payment_method::factory(30)->create();
        \App\Models\Role::factory()->create([
            'name' => 'admin',
        ]);
        \App\Models\Role::factory()->create([
            'name' => 'guest',
        ]);
        \App\Models\Role::factory()->create([
            'name' => 'vip',
        ]);
        \App\Models\Role::factory()->create([
            'name' => 'provider',
        ]);
        \App\Models\Material::create([
            'name' => 'pla'
        ]);
        \App\Models\Material::create([
            'name' => 'abs'
        ]);
        \App\Models\Material::create([
            'name' => 'petg'
        ]);
        \App\Models\Material::create([
            'name' => 'red'
        ]);
        \App\Models\Material::create([
            'name' => 'orange'
        ]);
        \App\Models\Material::create([
            'name' => 'blue'
        ]);
        \App\Models\Product::factory(100)->create();
        \App\Models\Cart::factory(40)->create();
    }
}
