<?php

namespace App\Http\Controllers;

use App\Services\ProgressService;
use Illuminate\Http\Request;
use Exception;

class ProgressController extends Controller
{
    protected $progressService;

    public function __construct(ProgressService $progressService)
    {
        $this->progressService = $progressService;
    }

    /**
     * Get progress for a user and course.
     */
    public function getProgress(Request $request, $courseId)
    {

        $user = $request->attributes->get('user');
        $userId = $user->user_id;

        try {
            $progress = $this->progressService->getProgress($courseId, $userId);
            return response()->json($progress);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update progress for a user and course.
     */
    public function updateProgress(Request $request, $courseId)
    {
        $user = $request->attributes->get('user');
        $userId = $user->user_id;

        try {
            $progress = $this->progressService->updateProgress($courseId, $userId);
            return response()->json($progress);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Decrement progress for a user and course.
     */
    public function decrementProgress(Request $request, $courseId)
    {
        $user = $request->attributes->get('user');
        $userId = $user->user_id;

        try {
            $progress = $this->progressService->decrementProgress($courseId, $userId);
            return response()->json($progress);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}