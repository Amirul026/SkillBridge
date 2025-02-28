<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $table = 'lessons';
    protected $primaryKey = 'lesson_id';

    protected $fillable = [
        'course_id',
        'title',
        'content',
        'video_url',
        'picture',
        'order',
        'duration_minutes',
    ];

    public $timestamps = true; // Automatically manage created_at and updated_at

    /**
     * Relationship: Belongs to a Course
     */
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }

    /**
     * Scope: Order Lessons
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
