<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prod_comb extends Model
{
    use HasFactory;
    protected $table = 'prod_combs';
    protected $fillable = ['product_id', 'color_id', 'material_id'];

}
