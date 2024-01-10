<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $table = 'invoices';
    protected $fillable = [
        'payment_method', 
        'order_id',
        'name',
        'surname',
        'email'
    ];
    
    use HasFactory;

    public function order()
{
    return $this->belongsTo(Order::class);
}
}
