<?php

use App\Models\Cart;
use App\Models\Fact_address;
use App\Models\Order;
use App\Models\User;
use App\Models\Ship_address;
use App\Models\Invoice;
use App\Models\Stock_cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/complete-payment', function (Request $request) {

    $allFormData = $request->json()->all();

    $shipAddress = new Ship_address();

    $shipAddress->name = $allFormData['shippingAddress']['shipName'];
    $shipAddress->address = $allFormData['shippingAddress']['shipAddress'];
    $shipAddress->country_id = $allFormData['shippingAddress']['shipCountry'];;
    $shipAddress->region_id = $allFormData['shippingAddress']['shipRegion'];;
    $shipAddress->zip = $allFormData['shippingAddress']['shipZip'];
    $shipAddress->user_id = $allFormData['personalInfo']['user'];

    $factAddress = new Fact_address();

    $factAddress->name = $allFormData['facturationAddress']['factName'];
    $factAddress->address = $allFormData['facturationAddress']['factAddress'];
    $factAddress->country_id = $allFormData['facturationAddress']['factCountry'];
    $factAddress->region_id = $allFormData['facturationAddress']['factRegion'];
    $factAddress->zip = $allFormData['facturationAddress']['factZip'];
    $factAddress->user_id = $allFormData['personalInfo']['user'];

    $shipAddress->save();
    $factAddress->save();

    $cart = DB::table('carts')->where('user_id', $allFormData['personalInfo']['user'])->where('active', 1)->first();

    DB::table('carts')
        ->where('user_id', $allFormData['personalInfo']['user'])
        ->where('active', 1)
        ->update(['active' => 0]);

    $order = new Order();
    $order->cart_id = $cart->id;
    $order->ship_addresse_id = $shipAddress->id;
    $order->fact_addresse_id = $factAddress->id;
    $order->status = 'Paid';
    $order->save();

    $invoice = new Invoice();
    $invoice->payment_method = 'Paypal'; 
    $invoice->order_id = $order->id;
    $invoice->name = $allFormData['personalInfo']['name'];
    $invoice->lastname = $allFormData['personalInfo']['surname'];
    $invoice->email = $allFormData['personalInfo']['email'];
    $invoice->save();

    $newCart = new Cart();
    $newCart->user_id = $allFormData['personalInfo']['user'];;
    $newCart->active = 1;
    $newCart->save();

    return response()->json(['redirect' => route('paymentcomplete')]);
});
Route::post('/complete-payment/plan',function(Request $request){
    $user = User::findOrFail($request->input('user_id'));
    $user->roles()->attach(3);
    $user->save();
    
    return response()->json(['redirect' => route('paymentcomplete')]);
});
Route::delete('/delete-cart-product/{stock}', function (Stock_cart $stock){
    $stock->delete();
    return response()->json(['redirect' => route('user.cart')]);
});