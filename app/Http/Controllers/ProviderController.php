<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class ProviderController extends Controller
{
    //public function __construct() {
    //    $this->middleware('provider');
    //}
    public function dashboard() {
        app()->call([UserController::class, 'getRoles']);
        return (Inertia::render('Profile/ProviderDashboard',['user' => auth()->user()]));
    }
}
