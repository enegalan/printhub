<?php

namespace App\Http\Controllers;

use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Color;
use App\Models\Material;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{
    private $productPerPagination = 16;
    public function getAll()
    {
        app()->call([UserController::class, 'getRoles']);
        $products = Product::paginate($this->productPerPagination);
        return Inertia::render('Market', ['products' => $products]);
    }

    public function search(Request $request)
    {
        app()->call([UserController::class, 'getRoles']);
        
        $query = $request->input('query');
        $products = Product::where('name', 'like', "%$query%")->paginate($this->productPerPagination);
        return Inertia::render('Market', ['products' => $products]);
    }

    public function filter(Request $request)
    {
        app()->call([UserController::class, 'getRoles']);
        if (is_array($request->input('filters')) && count($request->input('filters')) > 0) {
            $filters = $request->input('filters', []);
            $categories = $filters['categories'] ?? [];
            $price = $filters['price'] ?? [];
            $arrival = $filters['arrival'] ?? "%";
            $order = $filters['order'] ?? "%";
            $search = $filters['search'] ?? "%";

            $productsQuery = Product::query();
            if (!empty($categories)) {
                $productsQuery->whereHas('categories', function ($query) use ($categories) {
                    $query->whereIn('categories.id', $categories);
                });
            }

            $priceRanges = [0, 20, 50];
            if (!empty($price)) {
                $productsQuery->where(function ($query) use ($price, $priceRanges) {
                    foreach ($price as $actualPrice) {
                        // If the current price is 0, apply the range 0-20
                        if ($actualPrice == $priceRanges[0]) {
                            $query->orWhere(function ($subQuery) use ($actualPrice, $priceRanges) {
                                $subQuery->where('price', '>=', $actualPrice)
                                    ->where('price', '<', $priceRanges[1]);
                            });
                        }
                        // If the current price is 20, apply the range 20-50
                        else if ($actualPrice == $priceRanges[1]) {
                            $query->orWhere(function ($subQuery) use ($actualPrice, $priceRanges) {
                                $subQuery->where('price', '>=', $actualPrice)
                                    ->where('price', '<', $priceRanges[2]);
                            });
                        }
                        // If the current price is 50, apply the range 50-infinity
                        else if ($actualPrice == $priceRanges[2]) {
                            $query->orWhere('price', '>=', $actualPrice);
                        }
                        // In other cases, apply the price without a range
                        else {
                            $query->orWhere('price', '=', $actualPrice);
                        }
                    }
                });
            }
            if ($arrival !== "%") {
                $today = now();
                $arrivalDays = intval($arrival);
                $endDate = $today->copy()->subDays($arrivalDays);
                $productsQuery->where('created_at', '>=', $endDate);
            }
            if ($order !== "%" && $order != -1) {
                $direction = ($order === 'lowhigh') ? 'asc' : 'desc';
                $productsQuery->orderBy('price', $direction);
            }
            if ($search !== "%") {
                $productsQuery->where('name', 'like', '%' . $search . '%');
            }
            $products = $productsQuery->paginate($this->productPerPagination);

            return Inertia::render('Market', ['products' => $products]);

        } else {
            return $this->getAll();
        }
    }
    public function show(string $id){
        $product = Product::findOrFail($id);
        $colors = Color::all();
        $materials = Material::all();
        $product->categories;
        return Inertia::render('Product/Show', ['product' => $product,'colors' => $colors,'materials' => $materials]);
    }
    public function destroy(Product $product){
        try {
            $product->categories()->detach();
            $product->delete();
    
            return redirect()->back()->with('destroy', 'Product destroyed successfully');
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Product not found');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error deleting product');
        }
    }
    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'image' => 'required|image|max:2048',
            'price' => 'required|numeric',
            'user_id'=>'exists:App\Models\User,id',
            'categories' => 'array',
        ]);
        
        $productImage = $request->file('image');
        $productImageName = $productImage->hashName();
        $productImage->storeAs('products', $productImageName, 'public');

        $productData = $request->except('image');
        $productData['image'] = $productImageName;

        $product = Product::create($productData);

        $categories = $request->input('categories');
        if (!empty($categories)) {
            $product->categories()->attach($categories);
        }

        return redirect()->route('profile.provider')->with('success', 'Product created successfully.');
    }
}
