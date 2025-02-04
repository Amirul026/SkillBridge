<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'users'; // Specify the table name explicitly
    protected $primaryKey = 'user_id'; // Set primary key

    public $timestamps = true; // Enable timestamps

    protected $fillable = [
        'name', 'email', 'password', 'role', 'can_host'
    ];

    protected $hidden = ['password'];
}
