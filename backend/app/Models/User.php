<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;

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



    /**
     * Relationship: Courses (Courses this user is enrolled in)
     */
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_user', 'user_id', 'course_id');

    }
}
