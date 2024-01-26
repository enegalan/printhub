<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Color;
use App\Models\Material;
use App\Models\Prod_comb;
use App\Models\Stock_cart;
use App\Models\User;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;


class CartController extends Controller
{
    public function show(){
        app()->call([UserController::class, 'getRoles']);
        
        $cart = Cart::where('user_id', auth()->user()->id)
        ->where('active', 1)
        ->with(['stock_carts' => function ($query) {
            $query->join('prod_combs', 'stock_carts.prod_comb_id', '=', 'prod_combs.id')
                ->join('materials', 'prod_combs.material_id', '=', 'materials.id')
                ->join('colors', 'prod_combs.color_id', '=', 'colors.id')
                ->join('products', 'prod_combs.product_id', '=', 'products.id')
                ->select('stock_carts.*', 'stock_carts.id as stock_cart_id', 'materials.name as material_name', 'materials.id as material_id', 'colors.name as color_name', 'colors.id as color_id', 'products.*');
        }])
        ->first();

        $materials = Material::all();
        $colors = Color::all();
        
        return Inertia::render('Cart/Show', ['cart' => $cart, 'materials' => $materials, 'colors' => $colors]);
        
    }

    /*
        Add product to cart from market
    */
    public function defaultStore(Request $request, string $id) {
        // Get user id
        $userId = auth()->user()->id;
        // Get default color
        $defaultColor = Color::first();
        // Get default material
        $defaultMaterial = Material::first();
        // Create a default prod_comb with default color and material
        $prodComb = Prod_comb::create([
            'product_id' => $id,
            'color_id' => $defaultColor->id,
            'material_id' => $defaultMaterial->id
        ]);
        // Get the created prod_comb id
        $prodCombId = $prodComb->id;
        // Get user cart id if it is active, if is not active, create a new cart
        $cart = Cart::where('user_id', $userId)->where('active', '=', 1)->first();
        // Create a stock_cart with the cart_id and prod_comb_id and quantity 1 for default
        Stock_cart::create([
            'cart_id' => $cart->id,
            'prod_comb_id' => $prodComb->id,
            'quantity' => 1
        ]);
    }

}
