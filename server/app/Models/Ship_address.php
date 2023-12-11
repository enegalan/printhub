<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ship_address extends Model
{
    use HasFactory;
    protected $table = 'ship_addresses';
    protected $fillable =[
        'user_id',
        'name',
        'address',
        'country_id',
        'region_id',
        'zip'
    ];
}
