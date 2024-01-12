<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
        $categories = Category::all();
        return (Inertia::render('Profile/ProviderDashboard',['user' => auth()->user(), 'categories' => $categories]));
    }
    
    public function show() {
        app()->call([UserController::class, 'getRoles']);
        $paginatedProducts = Product::where('user_id', auth()->user()->id)
        ->paginate($this->productPerPagination);
        $paginatedProducts->load('categories');
        return Inertia::render('Profile/ProviderShow', [
            'user' => auth()->user(),
            'products' => $paginatedProducts,
        ]);
    }
}