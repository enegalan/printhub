<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Color;
use App\Models\Country;
use App\Models\Material;
use App\Models\Order;
use App\Models\Product;
use App\Models\Region;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }
    public function dashboard()
    {
        app()->call([UserController::class, 'getRoles']);
        return (
            Inertia::render('Admin/Dashboard')
        );
    }

    public function countries()
    {
        app()->call([UserController::class, 'getRoles']);
        $countries = Country::paginate($this->productPerPagination);
        return (
            Inertia::render('Admin/Country/Countries', ['countries' => $countries])
        );
    }

    public function deletecountry(Country $country)
    {
        try {
            $country->delete();

        } catch (\Exception $e) {
            throw $e;
        }
    }

    private $productPerPagination = 15;

    public function regions()
    {
        app()->call([UserController::class, 'getRoles']);
        $regions = Region::paginate($this->productPerPagination);
        $regions->load('country');

        return (
            Inertia::render('Admin/Region/Regions', ['regions' => $regions])
        );
    }

    public function deleteregion(Region $region)
    {
        try {

            $region->delete();

        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function products()
    {
        app()->call([UserController::class, 'getRoles']);
        $products = Product::paginate($this->productPerPagination);
        $products->load('user');
        $products->load('categories');
        return (
            Inertia::render('Admin/Product/Products', ['products' => $products])
        );
    }

    public function deleteproduct(Product $product)
    {
        try {

            $product->delete();

        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function users()
    {
        app()->call([UserController::class, 'getRoles']);

        $users = User::withTrashed()->paginate($this->productPerPagination);
        $users->load('roles');
        return (
            Inertia::render('Admin/User/Users', ['users' => $users])
        );
    }

    public function createUser()
    {
        $user = auth()->user();
        $roles = Role::all();
        return Inertia::render('Admin/User/Add', ['user' => $user, 'roles' => $roles]);
    }

    public function storeUser(Request $request) {
        $validatedData = request()->validate([
            'name' => 'string|required',
            'lastname' => 'string|required',
            'birthdate' => 'required',
            'email' => 'string|required',
            'password' => 'string|required',
            'roles' => 'array|required',
        ]);

        $validatedData['email_verified_at'] = now();
        $validatedData['user_id'] = auth()->user()['id'];

        $user = User::create($validatedData);

        $user->roles()->sync($validatedData['roles']);

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');

            $avatarName = $avatar->hashName();
            $avatar->storeAs('avatars', $avatarName, 'public');

            // Delete the previous avatar if it exists
            if ($user->avatar) {
                Storage::disk('public')->delete('avatars/' . $user->avatar);
            }

            $user->avatar = $avatarName;
            $user->save();
        }

        return redirect()->route('admin.users');
    }

    public function editUser(User $user)
    {
        $roles = Role::all();
        $user->load('roles');
        return Inertia::render('Admin/User/Edit', ['user' => $user, 'roles' => $roles]);
    }

    public function updateUser(Request $request, User $user) {
        $validatedData = $request->validate([
            'name' => 'string|required',
            'lastname' => 'string|required',
            'birthdate' => 'required',
            'email' => 'string|required',
            'roles' => 'array|required',
        ]);
    
        // Find the user by ID
        $user = User::findOrFail($user->id);
    
        // Prepare the update array with fields that should always be updated
        $updateData = [
            'name' => $validatedData['name'],
            'lastname' => $validatedData['lastname'],
            'birthdate' => $validatedData['birthdate'],
            'email' => $validatedData['email'],
        ];
    
        // Check if password is provided in the request, and include it in the update array
        if ($request->has('password')) {
            $updateData['password'] = $request->has('password');
        }
    
        // Update user attributes
        $user->update($updateData);
    

        // Sync user roles
        $roles = $request->input('roles');
        $user->roles()->detach();
        if (!empty($roles)) {
            $user->roles()->attach($roles);
        }
    
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
    
            $avatarName = $avatar->hashName();
            $avatar->storeAs('avatars', $avatarName, 'public');
    
            // Delete the previous avatar if it exists
            if ($user->avatar) {
                Storage::disk('public')->delete('avatars/' . $user->avatar);
            }
    
            // Update user avatar
            $user->update(['avatar' => $avatarName]);
        }
    
        return redirect()->route('admin.users');
    }

    public function toggleStatus(string $id)
    {
        $user = User::withTrashed()->findOrFail($id);
        try {

            if ($user->trashed()) {

                $user->restore();
            } else {

                $user->delete();
            }

        } catch (\Exception $e) {

        }
    }

    public function orders()
    {
        app()->call([UserController::class, 'getRoles']);
        $orders = Order::paginate($this->productPerPagination);
        $orders->load('invoice');
        return (
            Inertia::render('Admin/Order/Orders', ['orders' => $orders])
        );
    }

    public function materials()
    {
        app()->call([UserController::class, 'getRoles']);
        $materials = Material::paginate($this->productPerPagination);
        return (
            Inertia::render('Admin/Material/Materials', ['materials' => $materials])
        );
    }

    public function deletematerial(Material $material)
    {
        try {

            $material->delete();

        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function colors()
    {
        app()->call([UserController::class, 'getRoles']);
        $colors = Color::paginate($this->productPerPagination);
        return (
            Inertia::render('Admin/Color/Colors', ['colors' => $colors])
        );
    }

    public function deletecolor(Color $color)
    {
        try {

            $color->delete();

        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function categories()
    {
        app()->call([UserController::class, 'getRoles']);
        $categories = Category::paginate($this->productPerPagination);
        return (
            Inertia::render('Admin/Category/Categories', ['categories' => $categories])
        );
    }

    public function deletecategory(Category $category)
    {
        try {

            $category->delete();

        } catch (\Exception $e) {
            throw $e;
        }
    }

}
