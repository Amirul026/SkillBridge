<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $table = 'courses';
    protected $primaryKey = 'course_id';

    protected $fillable = [
        'mentor_id',
        'is_paywalled',
        'title',
        'price',
        'description',
        'rating',
        'picture',
        'level',
        'type',
        'lesson_number',
        'length_in_weeks',
    ];

    public $timestamps = true; // Ensure created_at and updated_at are managed automatically

    /**
     * Relationship: Mentor (User with role = 'Mentor')
     */
    public function mentor()
    {
        return $this->belongsTo(User::class, 'mentor_id', 'user_id')
            ->where('role', 'Mentor');
    }

    /**
     * Relationship: Reviews (Associated with this course)
     */
    // public function reviews()
    // {
    //     return $this->hasMany(Review::class, 'course_id', 'course_id');
    // }

    /**
     * Relationship: Lessons (Associated with this course)
     */
    public function lessons()
    {
        return $this->hasMany(Lesson::class, 'course_id', 'course_id');
    }

    /**
     * Accessor: Get Average Rating
     */
    public function getAverageRatingAttribute()
    {
        return $this->reviews()->avg('rating') ?? 0;
    }

    /**
     * Scope: Active Courses (Optional if you want to filter active/published courses)
     */
    public function scopeActive($query)
    {
        return $query->where('is_paywalled', true);
    }



    public function users()
    {
        return $this->belongsToMany(User::class, 'course_user', 'course_id', 'user_id'); 
    }
}
