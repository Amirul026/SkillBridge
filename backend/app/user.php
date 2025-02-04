<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $table = 'users'; // Match the table name in phpMyAdmin
    protected $primaryKey = 'user_id'; // Your table uses 'user_id' as the primary key
    public $timestamps = true; // Enable timestamps (created_at, updated_at)

    protected $fillable = ['name', 'email', 'password', 'role', 'can_host'];

    protected $hidden = ['password']; // Hide password field when returning JSON
}