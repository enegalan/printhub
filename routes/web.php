<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Models\Country;
use App\Models\Region;
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
    app()->call([UserController::class, 'getRoles']);
    return Inertia::render('Index');
})->name('index');

Route::get('/about', function () {
    app()->call([UserController::class, 'getRoles']);
    return Inertia::render('About');
})->name('about');

Route::get('/scan', function () {
    app()->call([UserController::class, 'getRoles']);
    return Inertia::render('Scan');
})->name('scan');

Route::get('/privacy', function () {
    app()->call([UserController::class, 'getRoles']);
    return Inertia::render('Privacy');
})->name('privacy');

Route::get('/market', [ProductController::class, 'getAll'])->name('market');
Route::get('/market/search', [ProductController::class, 'search'])->name('products.search');
Route::get('/market/product/{id}',[ProductController::class, 'show'])->name('product.show');
Route::post('/market/filter', [ProductController::class, 'filter'])->name('products.filter');
// Avoid page reload in filters
Route::get('/market/filter', function () {
    return redirect()->route('market');
});

Route::get('/dashboard', function () {
    app()->call([UserController::class, 'getRoles']);
    return Inertia::render('Index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [UserController::class, 'edit'])->name('profile.edit');
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('profile.dashboard');
    Route::patch('/profile', [UserController::class, 'update'])->name('profile.update');
    Route::post('/upload-avatar', [UserController::class, 'avatar'])->name('profile.avatar');
    Route::delete('/avatar-delete', [UserController::class, 'deleteAvatar'])->name('profile.avatar-delete');
    Route::delete('/profile', [UserController::class, 'destroy'])->name('profile.destroy');
    Route::get('/payment', function () {
        app()->call([UserController::class, 'getRoles']);
        $countries = Country::all();
        $regions = Region::all();
        return Inertia::render('Payment', ['countries' => $countries, 'regions' => $regions]);
    })->name('payment');

    Route::get('/payment/complete', function () {
        app()->call([UserController::class, 'getRoles']);
        return Inertia::render('PaymentComplete');
    })->name('paymentcomplete');
});

Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');

require __DIR__.'/auth.php';