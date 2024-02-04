<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $table = 'colors';
    protected $fillable = ['name', 'hex', 'factor'];
    
    use HasFactory;

    public function prod_combs(){
        return $this->hasMany(Prod_comb::class);
    }
}
