<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profiles';
    protected $fillable = [
        'user_id',
        'name',
        'lastname', 
        'birthdate', 
        'picture'
    ];
    
    use HasFactory;

}
