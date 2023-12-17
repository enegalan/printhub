<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    private $roles;
    public function __construct() {
        $this->middleware('admin');
        $roles = app()->call([UserController::class, 'getRoles']);
        $this->roles = $roles;
    }
    public function dashboard() {
        return (
            Inertia::render('Admin/Dashboard', ['roles' => $this->roles])
        );
    }
}
