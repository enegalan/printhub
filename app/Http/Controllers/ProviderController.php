<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Inertia\Response;

use App\Models\Product;
use App\Models\Category;
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

    public function orderview(Order $order){
        
    }
}