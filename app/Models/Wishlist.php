<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;
    protected $table = 'wishlists';
    protected $fillable = ['user_id'];

    public function products () {
        return $this->belongsToMany(Product::class, 'wishlists_products', 'wishlist_id', 'product_id');
    }
}
