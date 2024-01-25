<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Color;
use App\Models\Material;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UserController;

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
}
