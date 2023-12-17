<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $roles = app()->call([UserController::class, 'getRoles']);
    return Inertia::render('Index', ['roles' => $roles]);
})->name('index');

Route::get('/about', function () {
    $roles = app()->call([UserController::class, 'getRoles']);
    return Inertia::render('About', ['roles' => $roles]);
})->name('about');

Route::get('/scan', function () {
    $roles = app()->call([UserController::class, 'getRoles']);
    return Inertia::render('Scan', ['roles' => $roles]);
})->name('scan');

Route::get('/market', [ProductController::class, 'getAll'])->name('market');
Route::get('/market/search', [ProductController::class, 'search'])->name('products.search');

Route::get('/dashboard', function () {
    $roles = app()->call([UserController::class, 'getRoles']);
    return Inertia::render('Index', ['roles' => $roles]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [UserController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [UserController::class, 'update'])->name('profile.update');
    Route::post('/upload-avatar', [UserController::class, 'avatar'])->name('profile.avatar');
    Route::delete('/avatar-delete', [UserController::class, 'deleteAvatar'])->name('profile.avatar-delete');
    Route::delete('/profile', [UserController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');

require __DIR__.'/auth.php';