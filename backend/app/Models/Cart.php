<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['user_id', 'course_id', 'price'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}

class Course extends Model
{
    protected $fillable = ['title', 'price', 'description', 'mentor_id', 'is_paywalled', 'rating', 'picture', 'level', 'type', 'lesson_number', 'length_in_weeks'];
}
