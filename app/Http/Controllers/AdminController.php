<?php

namespace App\Http\Controllers;

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
}
