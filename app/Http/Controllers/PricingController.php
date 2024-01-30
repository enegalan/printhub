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
}
