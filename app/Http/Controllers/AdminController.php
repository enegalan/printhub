<?php

namespace App\Http\Controllers;

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
        $countries = Country::all();
        return (
            Inertia::render('Admin/Countries', ['countries' => $countries])
        );
    }

    private $productPerPagination = 15;

    public function regions() {
        app()->call([UserController::class, 'getRoles']);
        $regions = Region::paginate($this->productPerPagination);
        $regions->load('country');
        
        return (
            Inertia::render('Admin/Regions', ['regions' => $regions])
        );
    }

    public function products() {
        app()->call([UserController::class, 'getRoles']);
        $products = Product::all();
        return (
            Inertia::render('Admin/Products', ['products' => $products])
        );
    }

    public function users() {
        app()->call([UserController::class, 'getRoles']);
        $users = User::all();
        return (
            Inertia::render('Admin/Users', ['users' => $users])
        );
    }

    public function orders() {
        app()->call([UserController::class, 'getRoles']);
        $orders = Order::all();
        return (
            Inertia::render('Admin/Orders', ['orders' => $orders])
        );
    }

    public function materials() {
        app()->call([UserController::class, 'getRoles']);
        $materials = Material::all();
        return (
            Inertia::render('Admin/Materials', ['materials' => $materials])
        );
    }

    public function colors() {
        app()->call([UserController::class, 'getRoles']);
        $colors = Color::all();
        return (
            Inertia::render('Admin/Colors', ['colors' => $colors])
        );
    }

}
