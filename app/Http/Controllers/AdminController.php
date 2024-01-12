<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Color;
use App\Models\Country;
use App\Models\Material;
use App\Models\Order;
use App\Models\Product;
use App\Models\Region;
use App\Models\User;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function __construct() {
        $this->middleware('admin');
    }
    public function dashboard() {
        app()->call([UserController::class, 'getRoles']);
        return (
            Inertia::render('Admin/Dashboard')
        );
    }

    public function countries() {
        app()->call([UserController::class, 'getRoles']);
        $countries = Country::paginate($this->productPerPagination);
        return (
            Inertia::render('Admin/Country/Countries', ['countries' => $countries])
        );
    }

    private $productPerPagination = 15;

    public function regions() {
        app()->call([UserController::class, 'getRoles']);
        $regions = Region::paginate($this->productPerPagination);
        $regions->load('country');
        
        return (
            Inertia::render('Admin/Region/Regions', ['regions' => $regions])
        );
    }

    public function products() {
        app()->call([UserController::class, 'getRoles']);
        $products = Product::paginate($this->productPerPagination);
        $products->load('user');
        $products->load('categories');
        return (
            Inertia::render('Admin/Product/Products', ['products' => $products])
        );
    }

    public function users() {
        app()->call([UserController::class, 'getRoles']);
        $users = User::paginate($this->productPerPagination);
        $users->load('roles');
        return (
            Inertia::render('Admin/User/Users', ['users' => $users])
        );
    }

    public function orders() {
        app()->call([UserController::class, 'getRoles']);
        $orders = Order::paginate($this->productPerPagination);
        $orders->load('invoice');
        return (
            Inertia::render('Admin/Order/Orders', ['orders' => $orders])
        );
    }

    public function materials() {
        app()->call([UserController::class, 'getRoles']);
        $materials = Material::paginate($this->productPerPagination);
        return (
            Inertia::render('Admin/Material/Materials', ['materials' => $materials])
        );
    }

    public function colors() {
        app()->call([UserController::class, 'getRoles']);
        $colors = Color::paginate($this->productPerPagination);
        return (
            Inertia::render('Admin/Color/Colors', ['colors' => $colors])
        );
    }

    public function categories(){
        app()->call([UserController::class, 'getRoles']);
        $categories = Category::paginate($this->productPerPagination);
        return (
            Inertia::render('Admin/Category/Categories', ['categories' => $categories])
        );
    }

}
