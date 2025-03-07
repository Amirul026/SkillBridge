<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Meeting; // Add this line

class MeetingController extends Controller
{
    public function store(Request $request)
    {
        $meetingId = Str::uuid();
        $meetingLink = 'https://meet.jit.si/' . $meetingId;

        $meeting = Meeting::create([
            'course_id' => $request->input('course_id'),
            'mentor_id' => auth()->user()->id,
            'meeting_id' => $meetingId,
            'start_time' => $request->input('start_time'),
        ]);

        return response()->json(['meeting_id' => $meetingId, 'meeting_link' => $meetingLink], 201);
    }

    public function show(Meeting $meeting)
    {
        return response()->json($meeting);
    }
}