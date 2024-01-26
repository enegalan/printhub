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
                ->select('stock_carts.*', 'materials.name as material_name', 'colors.name as color_name', 'products.*');
        }])
        ->first();

        $materials = Material::all();
        $colors = Color::all();
        
        return Inertia::render('Cart/Show', ['cart' => $cart, 'materials' => $materials, 'colors' => $colors]);
        
    }

    /*
        Add product to cart from market
    */
    public function store(Request $request, string $id) {
        // Get user id
        $userId = auth()->user()->id;
        // Get default color
        $color = Color::findOrFail($request->input('color'));
        // Get default material
        $material = Color::findOrFail($request->input('material'));
        // Create a default prod_comb with default color and material
        $prodComb = Prod_comb::firstOrCreate([
            'product_id' => $id,
            'color_id' => $color->id,
            'material_id' => $material->id
        ]);
        // Get the created prod_comb id
        $prodCombId = $prodComb->id;
        // Get user cart id if it is active, if is not active, create a new cart
        $cart = Cart::where('user_id', $userId)->where('active', '=', 1)->firstOrFail();
        
        // Check if the Stock_cart already exists for the current combination
        $existingStockCart = Stock_cart::where('cart_id', $cart->id)
        ->where('prod_comb_id', $prodCombId)
        ->first();

        if ($existingStockCart) {
            // If it exists, update the quantity
            $existingStockCart->increment('quantity');
        } else {
            // If it doesn't exist, create a new Stock_cart with quantity 1
            Stock_cart::create([
                'cart_id' => $cart->id,
                'prod_comb_id' => $prodCombId,
                'quantity' => 1
            ]);
        }
        return redirect()->back();
    }

}
