<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function store(Request $request, User $user)
    {
        $course = Course::find($request->course_id);
        $user->courses()->attach($course);
        return response()->json(['message' => 'Course enrolled successfully'], 201);
    }
}