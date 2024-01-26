<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prod_comb extends Model
{
    use HasFactory;
    protected $table = 'prod_combs';
    protected $fillable = ['product_id', 'color_id', 'material_id'];

    public function stock_carts(){
        return $this->hasMany(Stock_cart::class);
    }

    public function color(){
        return $this->belongsTo(Color::class, 'color_id');
    }
    public function material(){
        return $this->belongsTo(Material::class, 'material_id');
    }
    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }

}
