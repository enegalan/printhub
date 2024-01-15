<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Category;

use Inertia\Inertia;
use Inertia\Response;

class ProviderController extends Controller
{
    private $productPerPagination = 15;
    public function __construct() {
        $this->middleware('provider');
    }
    
    public function dashboard() {
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
            return Inertia::render('Provider/Edit', ['user' => auth()->user(), 'product' => $product, 'categories' => $categories]);
        }
    }
}