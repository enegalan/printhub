<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment_method extends Model
{
    use HasFactory;
    protected $table = 'payment_methods';
    protected $fillable = ['number', 'owner_name', 'cvv', 'expire_date', 'user_id', 'default'];
}
