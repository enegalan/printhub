<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = ['name', 'description', 'image', 'price','user_id'];
    public function categories() {
        return $this->belongsToMany(Category::class, 'products_categories', 'product_id', 'category_id');
    }
    public function productCombs(){
        return $this->hasMany(Prod_comb::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function wishlist(){
        return $this->belongsToMany(Wishlist::class, 'wishlists_products', 'product_id', 'wishlist_id');
    }
}
