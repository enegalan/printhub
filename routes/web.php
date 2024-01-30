<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProviderController;
use App\Models\Country;
use App\Models\Region;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
Route::get('/market/filter', [ProductController::class, 'filter'])->name('products.filter');


Route::middleware(['auth', 'verified'])->group(function () {
    //USERS
    Route::get('/profile', [UserController::class, 'edit'])->name('profile.edit');
    Route::get('/account', [UserController::class, 'edit'])->name('profile.edit');
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('profile.dashboard');
    Route::patch('/profile', [UserController::class, 'update'])->name('profile.update');
    Route::get('/profile/orders', [UserController::class, 'orders'])->name('profile.orders');
    Route::get('/profile/orders/{order}', [UserController::class, 'viewOrder'])->name('user.order.view');
    Route::get('/profile/wishlist', [UserController::class, 'wishlist'])->name('profile.wishlist');
    Route::post('/add/wishlist/{product}', [UserController::class, 'addProductToWishlist'])->name('add.product.wishlist');
    Route::delete('/profile/wishlist/delete/{product}', [UserController::class, 'deleteProductFromWishlist'])->name('delete.product.wishlist');
    //PROVIDERS
    Route::get('/profile/provider', [ProviderController::class, 'dashboard'])->name('profile.provider');
    Route::get('/profile/provider/add-product', [ProviderController::class, 'add'])->name('provider.add');
    Route::get('/profile/provider/edit-product/{product}', [ProviderController::class, 'edit'])->name('provider.edit');
    // ---
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

    Route::get('/cart', [CartController::class, 'show'])->name('user.cart');
    Route::post('/addcart/{id}', [CartController::class, 'store'])->name('cart.add');
    Route::post('/wishlist/product/{product}/status', [UserController::class, 'getProductWishlistStatus'])->name('product.wishlist.status');

    // PAYMENTS
    Route::get('/profile/payments', [UserController::class, 'payments'])->name('profile.payments');
    Route::get('/profile/payment/create', [UserController::class, 'createPayment'])->name('profile.create.payment');
    Route::get('/profile/payment/edit/{payment}', [UserController::class, 'editPayment'])->name('profile.edit.payment');
});

Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
Route::get('/admin/products', [AdminController::class, 'products'])->name('admin.products');
Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');
Route::get('/admin/materials', [AdminController::class, 'materials'])->name('admin.materials');
Route::get('/admin/colors', [AdminController::class, 'colors'])->name('admin.colors');
Route::get('/admin/countries', [AdminController::class, 'countries'])->name('admin.countries');
Route::get('/admin/regions', [AdminController::class, 'regions'])->name('admin.regions');
Route::get('/admin/categories', [AdminController::class, 'categories'])->name('admin.categories');

Route::get('/admin/add-user', [AdminController::class, 'createUser'])->name('admin.user.add');
Route::post('/admin/add-user', [AdminController::class, 'storeUser'])->name('admin.user.store');
Route::get('/admin/product/add-product', [AdminController::class, 'addproduct'])->name('admin.product.edit');
Route::get('/admin/material/create-material', [AdminController::class, 'addmaterial'])->name('admin.material.add');
Route::get('/admin/color/create-color', [AdminController::class, 'adduser'])->name('admin.color.add');
Route::get('/admin/country/create-country', [AdminController::class, 'adduser'])->name('admin.country.add');
Route::get('/admin/region/create-region', [AdminController::class, 'adduser'])->name('admin.region.add');
Route::get('/admin/category/create-category', [AdminController::class, 'addcategory'])->name('admin.category.add');

Route::get('/admin/user/{user}/edit', [AdminController::class, 'editUser'])->name('admin.user.edit');
Route::post('/admin/user/{user}/edited', [AdminController::class, 'updateUser'])->name('admin.user.update');
Route::get('/admin/product/{product}/edit', [AdminController::class, 'editproduct'])->name('admin.product.edit');
Route::get('/admin/order/{order}/view', [AdminController::class, 'vieworder'])->name('admin.order.view');
Route::get('/admin/material/{material}/edit', [AdminController::class, 'editmaterial'])->name('admin.material.edit');
Route::get('/admin/color/{color}/edit', [AdminController::class, 'edituser'])->name('admin.color.edit');
Route::get('/admin/country/{country}/edit', [AdminController::class, 'edituser'])->name('admin.country.edit');
Route::get('/admin/region/{region}/edit', [AdminController::class, 'edituser'])->name('admin.region.edit');
Route::get('/admin/category/{category}/edit', [AdminController::class, 'editcategory'])->name('admin.category.edit');
Route::get('/admin/country/{country}/regions', [AdminController::class, 'viewregionscountry'])->name('admin.country.viewregions');

Route::post('/admin/user/{user}/toggle', [AdminController::class, 'toggleStatus'])->name('admin.user.toggle');
Route::delete('/admin/product/{product}/delete', [AdminController::class, 'deleteproduct'])->name('admin.product.delete');
Route::delete('/admin/material/{material}/delete', [AdminController::class, 'deletematerial'])->name('admin.material.delete');
Route::delete('/admin/color/{color}/delete', [AdminController::class, 'deletecolor'])->name('admin.color.delete');
Route::delete('/admin/country/{country}/delete', [AdminController::class, 'deletecountry'])->name('admin.country.delete');
Route::delete('/admin/region/{region}/delete', [AdminController::class, 'deleteregion'])->name('admin.region.delete');
Route::delete('/admin/category/{category}/delete', [AdminController::class, 'deletecategory'])->name('admin.category.delete');


//PRODUCTS
Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('product.destroy');
Route::post('/products/{product}', [ProductController::class, 'update'])->name('product.update');
Route::post('/products', [ProductController::class, 'store'])->name('product.store');

//PRICING
Route::get('/pricing',[PricingController::class,'index'])->name('prcing');

require __DIR__.'/auth.php';