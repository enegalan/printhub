<?php

namespace App\Http\Controllers;

use App\Models\Stock_cart;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Prod_comb;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Intervention\Image\Image as Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $this->getRoles();
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function avatar(Request $request): RedirectResponse
    {
        $request->validate([
            'avatar' => ['required', 'image', 'max:2048'],
        ]);

        $user = $request->user();
        $avatar = $request->file('avatar');

        $avatarName = $avatar->hashName();
        $avatar->storeAs('avatars', $avatarName, 'public');

        // Delete the previous avatar if it exists
        if ($user->avatar) {
            Storage::disk('public')->delete('avatars/' . $user->avatar);
        }

        $user->avatar = $avatarName;
        $user->save();

        return redirect()->route('profile.edit')->with('status', 'Avatar uploaded successfully.');
    }

    public function deleteAvatar(Request $request)
    {
        $user = $request->user();

        if ($user->avatar) {
            Storage::disk('public')->delete('avatars/' . $user->avatar);
            $user->avatar = null;
            $user->save();
        }

        return back()->with('status', 'Avatar deleted successfully.');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public static function getRoles() {
        if (auth()->check()) {
            $roles = auth()->user()->roles->pluck('name')->toArray();
            return $roles;
        }
        return array('You are not logged in.');
    }

    public function restore($id) {
        $user = User::withTrashed()->find($id);

        if ($user) {
            $user->restore();
        } else {
            abort('402', 'User not found');
        }
    }
    public function dashboard(){
        $user = User::findOrFail(auth()->user()->id);
        $user->roles;
        $products = $this->getProducts(0);
        return Inertia::render('Profile/Show', ['user' => $user, 'products' => $products]);
    }

    function getProducts ($active = 0) {
        if (auth()->check()) {
            $userId = auth()->user()->id;

            // Search users carts that are active = 0
            $userCarts = Cart::where('user_id', $userId)
            ->where('active', $active)
            ->get();

            // Search carts that are in orders and status = "Paid"
            $userCartIds = $userCarts->pluck('id');

            // Find cart IDs in orders with status = "Paid"
            $paidOrderCartIds = Order::whereIn('cart_id', $userCartIds)
            ->where('status', 'Paid')
            ->pluck('cart_id');

            // Combine the cart IDs from both steps and get unique cart IDs
            $combinedCartIds = $userCartIds->merge($paidOrderCartIds)->unique();

            // Get prod_comb_id
            $prodCombIds = Stock_cart::whereIn('cart_id', $combinedCartIds)->pluck('prod_comb_id');

            if ($prodCombIds->isNotEmpty()) {
                // Get product_id from prod_combs
                $productIds = Prod_comb::whereIn('id', $prodCombIds)->pluck('product_id');
            
                // Check if there are any product_ids
                if ($productIds->isNotEmpty()) {
                    $products = [];

                    // Get products from the combined carts
                    foreach($productIds as $id) {
                        $product = Product::where('id', $id)->get();
                        array_push($products, $product);
                    }
                    
                    //echo var_dump($products);
                    return $products;
                }
            }
        }
        return [];
    }
}
