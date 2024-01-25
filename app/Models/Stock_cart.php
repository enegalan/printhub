<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock_cart extends Model
{
    use HasFactory;
    protected $table = 'stock_carts';
    protected $fillable =[
        'cart_id',
        'prod_combination_id',
        'quantity'
    ];

    public function cart(){
        return $this->belongsTo(Cart::class);
    }

    public function prod_comb(){
        return $this->belongsTo(Prod_comb::class);
    }
}
