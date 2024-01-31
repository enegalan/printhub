<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function index(){
        $user = auth()->user();
        return Inertia::render('Pricing/Dashboard', compact('user'));
    }
    public function payment(){
        $user = auth()->user();
        $price = 9.99;
        return Inertia::render('Pricing/CheckOut', compact('user','price'));
    }
}
