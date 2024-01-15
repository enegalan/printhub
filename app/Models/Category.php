<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Category extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $fillable =[
        'name'
    ];

    public function products() {
        return $this->belongsToMany(Product::class, 'products_categories', 'product_id', 'category_id');
    }
}
