<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';
    protected $fillable = [
        'name', 
        'user_id', 
    ];
    
    use HasFactory;

    public function users(){
        return $this->belongsToMany('App\Models\User');
    }
}
