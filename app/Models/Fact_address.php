<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fact_address extends Model
{
    use HasFactory;
    protected $table = 'fact_addresses';
    protected $fillable = ['user_id', 'name', 'address', 'country_id', 'region_id', 'zip'];

    public function country(){
        return $this->belongsTo(Country::class);
    }

    public function orders(){
        return $this->hasMany(Order::class, 'fact_addresse_id');
    }
}
