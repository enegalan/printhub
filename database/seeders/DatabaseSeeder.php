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
        \App\Models\User::factory(100)->create();
        \App\Models\Payment_method::factory(30)->create();
        //User roles
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
        //Material #6
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
        //Colors #4
        \App\Models\Color::create([
            'name' => 'blue'
        ]);
        \App\Models\Color::create([
            'name' => 'orange'
        ]);
        \App\Models\Color::create([
            'name' => 'red'
        ]);
        \App\Models\Color::create([
            'name' => 'green'
        ]);
        //Categories for proucts_cob #2
        \App\Models\Category::create([
            'name' => 'decoration'
        ]);
        \App\Models\Category::create([
            'name' => 'spares'
        ]);
        //Product & Cart
        \App\Models\Product::factory(100)->create();
        \App\Models\Cart::factory(40)->create();
        // Needs user, country, region.
        \App\Models\Country::factory(40)->create();
        \App\Models\Region::factory(20)->create();
        \App\Models\Fact_address::factory(10)->create();
        \App\Models\Ship_address::factory(10)->create();
        \App\Models\Order::factory(20)->create();
        //addresse
        //orders
    }
}
