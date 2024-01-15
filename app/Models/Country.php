<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    protected $table = 'countries';
    protected $fillable =[
        'name'
    ];

    public function regions()
{
    return $this->hasMany(Region::class);
}

    public function fact_addresses(){
        return $this->hasMany(Fact_address::class);
    }

    public function ship_addresses(){
        return $this->hasMany(Ship_address::class);
    }
}
