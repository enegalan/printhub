<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function index(){
        app()->call([UserController::class, 'getRoles']);
        $user = auth()->user();
        return Inertia::render('Pricing/Dashboard', compact('user'));
    }
    public function payment(){
        $user = auth()->user()->load('roles');
        if ($user->roles->contains('name', 'vip')) {
            return redirect()->route('pricing')->withErrors('Already VIP user');
        }
        $price = floatval(env('VIP_PRICE'));
        return Inertia::render('Pricing/CheckOut', compact('user','price'));
    }
}
