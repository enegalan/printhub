<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function __construct() {
        $this->middleware('vip');
    }
    public function dashboard() {
        app()->call([UserController::class, 'getRoles']);
        return (
            //TODO: Change the route to VIP dashboard
            Inertia::render('Index')
        );
    }
}
