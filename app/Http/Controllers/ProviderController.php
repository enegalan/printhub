<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Color;
use App\Models\Order;

use Inertia\Response;
use App\Models\Product;
use App\Models\Category;
use App\Models\Prod_comb;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
    private $productPerPagination = 15;
    public function __construct() {
        $this->middleware('provider');
    }
    
    public function dashboard() {
        app()->call([UserController::class, 'getRoles']);
        return Inertia::render('Provider/Dashboard');
    }

    public function productdashboard(){
        app()->call([UserController::class, 'getRoles']);
        $paginatedProducts = Product::where('user_id', auth()->user()->id)
        ->paginate($this->productPerPagination);
        $paginatedProducts->load('categories');
        return Inertia::render('Provider/Show', [
            'user' => auth()->user(),
            'products' => $paginatedProducts,
        ]);

    }
    public function destroy(Product $product){
        Product::destroy($product);
        return redirect()->back()->with('destroy' , 'Product destroy successfully');
    }

    public function add() {
        app()->call([UserController::class, 'getRoles']);
        $categories = Category::all();
        return (Inertia::render('Provider/Add',['user' => auth()->user(), 'categories' => $categories]));
    }

    public function edit(Product $product) {
        // Verify that product provider is the session user Provider
        if ($product->user_id === auth()->user()->id) {
            $categories = Category::all();
            $product->load('categories');
            return Inertia::render('Provider/Edit', ['user' => auth()->user(), 'product' => $product, 'categories' => $categories]);
        }
    }

    public function orderdashboard(){
        app()->call([UserController::class, 'getRoles']);
        
        $userId = auth()->id();

    $orders = Order::whereHas('cart.stock_carts.prod_comb.product', function ($query) use ($userId) {
        $query->where('user_id', $userId);
    })->paginate($this->productPerPagination);
        $orders->load('invoice');
        return (
            Inertia::render('Provider/Orders', ['orders' => $orders])
        );
    }

    public function orderview(Order $order)
    {
        $order->load(['cart.stock_carts.prod_comb.product.user', 'invoice']);
        //$user = auth()->user();
        //$user->roles();
        //$userId = $user->id;

        // Extracting products from the order
        $products = [];
        // Obtener el primer cart que tenga active == 1
        $cart = $order->cart;

        if ($cart) {
            // Obtener el prod_comb_id desde stock_carts
            $stockCart = $cart->stock_carts->first();
        
            if ($stockCart) {
                $prodCombId = $stockCart->prod_comb_id;

                // Obtener el product_id, color_id y material_id desde prod_combs
                $prodComb = Prod_comb::findOrFail($prodCombId);

                $color = Color::find($prodComb->color_id);
                $colorName = $color->name;
                $colorHex = $color->hex;


                if ($prodComb) {
                    $productId = $prodComb->product_id;

                    // Obtener el name, image, file y price desde products
                    $product = Product::findOrFail($productId);

                    if ($product) {
                        // Agregar la información del producto al array de productos
                        $products[] = [
                            'id' => $product->id,
                            'name' => $product->name,
                            'image' => $product->image,
                            'file' => $product->file,
                            'price' => $product->price,
                            'colorName' => $colorName,
                            'colorHex' => $colorHex,
                        ];
                    }
                }
            }
        }

        return Inertia::render('Provider/ViewOrder', [
            'order' => $order,
            'products' => $products,
        ]);
    }
}