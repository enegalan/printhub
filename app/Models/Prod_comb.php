<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prod_comb extends Model
{
    use HasFactory;
    protected $table = 'prod_combs';
    protected $fillable = ['product_id', 'color_id', 'material_id'];

    //public function color(){
    //    return $this->hasOne(Color::class);
    //}
    //public function material(){
    //    return $this->hasOne(Material::class);
    //}
    //public function product(){
    //    return $this->hasOne(Product::class);
    //}

}
