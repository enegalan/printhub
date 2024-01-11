<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class ProviderController extends Controller
{
    private $productPerPagination = 15;
    //public function __construct() {
    //    $this->middleware('provider');
    //}
    public function dashboard() {
        app()->call([UserController::class, 'getRoles']);
        return (Inertia::render('Profile/ProviderDashboard',['user' => auth()->user()]));
    }
    
    public function show() {
        app()->call([UserController::class, 'getRoles']);
        $paginatedProducts = Product::where('user_id', auth()->user()->id)
        ->paginate($this->productPerPagination);
        return Inertia::render('Profile/ProviderShow', [
            'user' => auth()->user(),
            'products' => $paginatedProducts,
        ]);
    }
    public function destroy(Product $product){
        Product::destroy($product);
        return redirect()->back()->with('destroy' , 'Product destroy successfully');
    }
}