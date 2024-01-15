<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->softDeletes();
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('lastname');
            $table->date('birthdate');
            $table->string('avatar')->nullable(true);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('number');
            $table->string('owner_name');
            $table->string('cvv');
            $table->string('expire_date');
            $table->timestamps();
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });


        Schema::create('users_roles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('colors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
        
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description');
            $table->string('image');
            $table->double('price');
            $table->foreignId('user_id')->constrained()->nullable()->onDelete('cascade');
            $table->timestamps();
        });
        
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('active');
            $table->timestamps();
        });
        
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('products_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('wishlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('wishlists_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wishlist_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
        
        Schema::create('prod_combs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('color_id')->constrained()->onDelete('cascade');
            $table->foreignId('material_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
        Schema::create('stock_carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained()->onDelete('cascade');
            $table->foreignId('prod_comb_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->timestamps();
        });
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('regions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('fact_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('address');
            $table->foreignId('country_id')->constrained()->onDelete('cascade');
            $table->foreignId('region_id')->constrained()->onDelete('cascade');
            $table->integer('zip');
            $table->timestamps();
        });
        Schema::create('ship_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('country_id')->constrained()->onDelete('cascade');
            $table->foreignId('region_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('address');
            $table->integer('zip');
            $table->timestamps();
        });
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained();
            $table->foreignId('fact_addresse_id')->constrained()->onDelete('cascade');
            $table->foreignId('ship_addresse_id')->constrained()->onDelete('cascade');
            $table->enum('status',['Not paid', 'Paid', 'Shipping', 'Delivered']);
            $table->timestamps();
        });

        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->enum('payment_method',['Paypal', 'Credit Card']);
            $table->string('name');
            $table->string('lastname');
            $table->string('email');
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('payment_methods');
        Schema::dropIfExists('profiles');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('materials');
        Schema::dropIfExists('colors');
        Schema::dropIfExists('products');
        Schema::dropIfExists('carts');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('invoices');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('wishlists_products');
        Schema::dropIfExists('prod_combs');
        Schema::dropIfExists('stock_carts');
        Schema::dropIfExists('contries');
        Schema::dropIfExists('regions');
        Schema::dropIfExists('fact_addresses');
        Schema::dropIfExists('ship_addresses');
    }
};
