<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\UserController;
use App\Models\Color;
use App\Models\Material;

class ProductController extends Controller
{
    private $productPerPagination = 16;
    public function getAll() {
        app()->call([UserController::class, 'getRoles']);
        $products = Product::paginate($this->productPerPagination);
        return Inertia::render('Market', ['products' => $products]);
    }

    public function search(Request $request) {
        app()->call([UserController::class, 'getRoles']);
        
        $query = $request->input('query');
        $products = Product::where('name', 'like', "%$query%")->paginate($this->productPerPagination);
        return Inertia::render('Market', ['products' => $products]);
    }

    public function filter(Request $request) {
        app()->call([UserController::class, 'getRoles']);
        if (is_array($request->input('filters')) && count($request->input('filters')) > 0) {
            $filters = $request->input('filters')['filters'];
            if (isset($filters['categories'])) {
                $products = Product::whereHas('categories', function ($query) use ($filters) {
                    $query->whereIn('categories.id', $filters['categories']);
                })->paginate($this->productPerPagination);
                return Inertia::render('Market', ['products' => $products]);
            }
            
        } else return $this->getAll();
        
    }
    public function show(string $id){
        $product = Product::findOrFail($id);
        $colors = Color::all();
        $materials = Material::all();
        $product->categories;
        return Inertia::render('Product/Show', ['product' => $product,'colors' => $colors,'materials' => $materials]);
    }
}
