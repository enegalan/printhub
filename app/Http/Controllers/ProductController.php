<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function getAll() {
        $pagination = 16;
        $products = Product::paginate($pagination);

        return Inertia::render('Market', ['products' => $products]);
    }
}
