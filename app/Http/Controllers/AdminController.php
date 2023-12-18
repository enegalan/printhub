<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function __construct() {
        $this->middleware('admin');
        app()->call([UserController::class, 'getRoles']);
    }
    public function dashboard() {
        return (
            Inertia::render('Admin/Dashboard')
        );
    }
}
