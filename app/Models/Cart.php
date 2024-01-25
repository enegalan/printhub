<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table = 'carts';
    protected $fillable =[
        'user_id',
        'active',
    ];

    public function stock_carts(){
        return $this->hasMany(Stock_cart::class);
    }
}
