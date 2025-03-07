<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'user_id';

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'picture',
        'role',
        'can_host'
    ];

    protected $hidden = ['password'];

    public $timestamps = true;
    public function progress()
    {
        return $this->hasMany(Progress::class);
    }
}
