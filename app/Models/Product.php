<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = ['name', 'description', 'image', 'price'];

    public function categories() {
        return $this->belongsToMany(Category::class, 'products_categories', 'product_id', 'category_id');
    }
}
