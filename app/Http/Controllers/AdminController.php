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

    public function deletecountry(Country $country){
        try {
            $country->delete();
            
        } catch (\Exception $e) {
            throw $e;
        }
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

    public function deleteregion(Region $region){
        try {

            $region->delete();            
            
        } catch (\Exception $e) {
            throw $e;
        }
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

    public function deleteproduct(Product $product){
        try {

            $product->delete();
            
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function users() {
        app()->call([UserController::class, 'getRoles']);

        $users = User::withTrashed()->paginate($this->productPerPagination);
        $users->load('roles');
        return (
            Inertia::render('Admin/User/Users', ['users' => $users])
        );
    }

    public function toggleStatus(string $id)
    {
        $user = User::withTrashed()->findOrFail($id);
        try {
            
            if ($user->trashed()) {
                
                $user->restore();
            } else {
                
                $user->delete();
            }
        
        } catch (\Exception $e) {
            
        }
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

    public function deletematerial(Material $material){
        try {

            $material->delete();
            
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function colors() {
        app()->call([UserController::class, 'getRoles']);
        $colors = Color::paginate($this->productPerPagination);
        return (
            Inertia::render('Admin/Color/Colors', ['colors' => $colors])
        );
    }

    public function deletecolor(Color $color){
        try {

            $color->delete();
            
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function categories(){
        app()->call([UserController::class, 'getRoles']);
        $categories = Category::paginate($this->productPerPagination);
        return (
            Inertia::render('Admin/Category/Categories', ['categories' => $categories])
        );
    }

    public function deletecategory(Category $category){
        try {

            $category->delete();
            
        } catch (\Exception $e) {
            throw $e;
        }
    }

}
