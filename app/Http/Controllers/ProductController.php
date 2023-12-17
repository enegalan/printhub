<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\UserController;

class ProductController extends Controller
{
    private $productPerPagination = 16;
    public function getAll() {
        $roles = app()->call([UserController::class, 'getRoles']);
        $products = Product::paginate($this->productPerPagination);
        return Inertia::render('Market', ['products' => $products, 'roles' => $roles]);
    }

    public function search(Request $request) {
        //dump($request);

        $roles = app()->call([UserController::class, 'getRoles']);

        $query = $request->input('query');
        $results = Product::where('name', 'like', "%$query%")->paginate($this->productPerPagination);

        //return response()->json($results);
        return Inertia::render('Market', ['products' => $results, 'roles' => $roles, 'query' => $query]);
        // return redirect()->route('index');
    }
}
