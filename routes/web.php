<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\UserController;
use App\Models\Country;
use App\Models\Product;
use App\Models\Region;
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
    $latestProducts = Product::inRandomOrder()->limit(4)->get();
    return Inertia::render('Index',compact('latestProducts'));
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
Route::get('/market/product/{id}', [ProductController::class, 'show'])->name('product.show');
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
    Route::get('/profile/provider/create', [ProviderController::class, 'add'])->name('provider.add');
    Route::get('/profile/provider/edit/{product}', [ProviderController::class, 'edit'])->name('provider.edit');
    Route::get('/profile/provider', [ProviderController::class, 'dashboard'])->name('profile.provider.dashboard');

    Route::get('/profile/provider/products', [ProviderController::class, 'productdashboard'])->name('profile.provider.products');
    Route::get('/profile/provider/products/create', [ProviderController::class, 'add'])->name('provider.add');
    Route::get('/profile/provider/products/edit/{product}', [ProviderController::class, 'edit'])->name('provider.edit');

    Route::get('/profile/provider/orders', [ProviderController::class, 'orderdashboard'])->name('profile.provider.orders');
    Route::get('/profile/provider/orders/view/{order}', [ProviderController::class, 'orderview'])->name('profile.orders.view');

    // ---
    Route::post('/upload-avatar', [UserController::class, 'avatar'])->name('profile.avatar');
    Route::delete('/avatar-delete', [UserController::class, 'deleteAvatar'])->name('profile.avatar-delete');
    Route::delete('/profile', [UserController::class, 'destroy'])->name('profile.destroy');
    Route::get('/payment', function () {
        app()->call([UserController::class, 'getRoles']);
        $countries = Country::all();
        $regions = Region::all();

        $cart = DB::table('carts')->where('user_id', auth()->user()->id)->where('active', 1)->first();

        // Obtener los stock_carts relacionados con el carrito
        $stockCarts = DB::table('stock_carts')
            ->join('prod_combs', 'stock_carts.prod_comb_id', '=', 'prod_combs.id')
            ->join('products', 'prod_combs.product_id', '=', 'products.id')
            ->select('stock_carts.quantity', 'products.price')
            ->where('stock_carts.cart_id', $cart->id)
            ->get();

        // Calcular el total
        $total = 0;

        foreach ($stockCarts as $stockCart) {
            $total += $stockCart->price * $stockCart->quantity;
        }

        $total += $total * 0.21;

        $user = auth()->user();

        $isVip = $user->roles->contains('name', 'vip');

        if (!$isVip) {
            $total += 9.99;
        }

        if ($total == 0 || $total == 9.99) {
            return redirect()->route('user.cart');
        }

        return Inertia::render('Payment', ['countries' => $countries,
            'regions' => $regions, 'total' => $total]);
    })->name('payment');

    Route::get('/payment/complete', function () {
        app()->call([UserController::class, 'getRoles']);
        $env = ['host' => env('OCTOPRINT_HOST'),'apiKey' => env('OCTOPRINT_API_KEY')];
        return Inertia::render('PaymentComplete', compact('env'));
    })->name('paymentcomplete');

    Route::get('/cart', [CartController::class, 'show'])->name('user.cart');
    Route::post('/addcart/{id}', [CartController::class, 'store'])->name('cart.add');
    Route::post('/wishlist/product/{product}/status', [UserController::class, 'getProductWishlistStatus'])->name('product.wishlist.status');

    // PAYMENTS
    Route::get('/profile/payments', [UserController::class, 'payments'])->name('profile.payments');
    Route::get('/profile/payment/create', [UserController::class, 'createPayment'])->name('profile.create.payment');
    Route::post('/profile/payment/store', [UserController::class, 'storePayment'])->name('profile.store.payment');
    Route::get('/profile/payment/edit/{payment}', [UserController::class, 'editPayment'])->name('profile.edit.payment');
    Route::post('/profile/payment/edit/{payment}', [UserController::class, 'updatePayment'])->name('profile.update.payment');
    Route::delete('/profile/payment/delete/{payment}', [UserController::class, 'deletePayment'])->name('profile.delete.payment');
    
    //PRICING
    Route::get('/pricing/payment', [PricingController::class, 'payment'])->name('pricing.payment');

    // MODEL PREVIEW
    Route::get('/preview', function () {
        return redirect()->route('scan');
    });
    Route::post('/preview', [UserController::class, 'preview'])->name('preview');
    Route::post('/model/add', [UserController::class, 'addModelToCart'])->name('model.add.cart');
});

//ADMIN
Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');

//USERS
Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
Route::get('/admin/user/add', [AdminController::class, 'createUser'])->name('admin.user.add');
Route::post('/admin/user/add', [AdminController::class, 'storeUser'])->name('admin.user.store');
Route::get('/admin/user/edit/{user}', [AdminController::class, 'editUser'])->name('admin.user.edit');
Route::post('/admin/user/edit/{user}', [AdminController::class, 'updateUser'])->name('admin.user.update');
Route::post('/admin/user/toggle/{user}', [AdminController::class, 'toggleStatus'])->name('admin.user.toggle');

//PRODUCTS
Route::get('/admin/products', [AdminController::class, 'products'])->name('admin.products');
Route::get('/admin/product/create', [AdminController::class, 'addProduct'])->name('admin.product.add');
Route::get('/admin/product/edit/{product}', [AdminController::class, 'editProduct'])->name('admin.product.edit');
Route::delete('/admin/product/delete/{product}', [AdminController::class, 'deleteProduct'])->name('admin.product.delete');

//MATERIALS
Route::get('/admin/materials', [AdminController::class, 'materials'])->name('admin.materials');
Route::get('/admin/material/create', [AdminController::class, 'addMaterial'])->name('admin.add.material');
Route::post('/admin/material/store', [AdminController::class, 'storeMaterial'])->name('admin.store.material');
Route::get('/admin/material/edit/{material}', [AdminController::class, 'editMaterial'])->name('admin.material.edit');
Route::post('/admin/material/update/{material}', [AdminController::class, 'updateMaterial'])->name('admin.update.material');
Route::delete('/admin/material/delete/{material}', [AdminController::class, 'deletematerial'])->name('admin.material.delete');

//ORDERS
Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');
Route::get('/admin/order/view/{order}', [AdminController::class, 'vieworder'])->name('admin.order.view');


//COLORS
Route::get('/admin/colors', [AdminController::class, 'colors'])->name('admin.colors');
Route::get('/admin/color/create', [AdminController::class, 'addColor'])->name('admin.color.add');
Route::get('/admin/color/edit/{color}', [AdminController::class, 'editColor'])->name('admin.color.edit');
Route::post('/admin/color/store', [AdminController::class, 'storeColor'])->name('admin.store.color');
Route::delete('/admin/color/{color}/delete', [AdminController::class, 'deletecolor'])->name('admin.color.delete');
Route::post('/admin/color/update/{color}', [AdminController::class, 'updateColor'])->name('admin.update.color');

//COUNTRIES
Route::get('/admin/countries', [AdminController::class, 'countries'])->name('admin.countries');
Route::get('/admin/country/create', [AdminController::class, 'addCountry'])->name('admin.country.add');
Route::get('/admin/country/edit/{country}', [AdminController::class, 'edituser'])->name('admin.country.edit');
Route::get('/admin/country/{country}/regions', [AdminController::class, 'viewCountryRegions'])->name('admin.country.viewregions');
Route::delete('/admin/country/delete/{country}', [AdminController::class, 'deletecountry'])->name('admin.country.delete');

//REGIONS
Route::get('/admin/regions', [AdminController::class, 'regions'])->name('admin.regions');
Route::get('/admin/region/create', [AdminController::class, 'adduser'])->name('admin.region.add');
Route::get('/admin/region/edit/{region}', [AdminController::class, 'edituser'])->name('admin.region.edit');
Route::delete('/admin/region/delete/{region}', [AdminController::class, 'deleteregion'])->name('admin.region.delete');


//CATEGORIES
Route::get('/admin/categories', [AdminController::class, 'categories'])->name('admin.categories');
Route::get('/admin/category/create', [AdminController::class, 'addcategory'])->name('admin.category.add');
Route::post('/admin/category/store', [AdminController::class, 'storeCategory'])->name('admin.store.category');
Route::get('/admin/category/edit/{category}', [AdminController::class, 'editcategory'])->name('admin.category.edit');
Route::delete('/admin/category/delete/{category}', [AdminController::class, 'deletecategory'])->name('admin.category.delete');
Route::post('/admin/category/update/{category}', [AdminController::class, 'updateCategory'])->name('admin.update.category');


Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('product.destroy');
Route::post('/products/{product}', [ProductController::class, 'update'])->name('product.update');
Route::post('/products', [ProductController::class, 'store'])->name('product.store');

//PRICING
Route::get('/pricing', [PricingController::class, 'index'])->name('pricing');

require __DIR__ . '/auth.php';
