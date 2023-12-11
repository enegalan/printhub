<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fact_address extends Model
{
    use HasFactory;
    protected $table = 'fact_addresses';
    protected $fillable = ['user_id', 'name', 'address', 'country_id', 'region_id', 'zip'];
}
