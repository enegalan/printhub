<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';

    protected $fillable = ['cart_id', 'status'];

    public function shipAddress()
{
    return $this->belongsTo(Ship_address::class, 'ship_addresse_id');
}

public function factAddress()
{
    return $this->belongsTo(Fact_address::class, 'fact_addresse_id');
}

public function invoice(){
    return $this->hasOne(Invoice::class);
}

public function cart(){
    return $this->belongsTo(Cart::class);
}

}
