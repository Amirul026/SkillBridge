<?php

namespace App\Http\Controllers;

use App\Services\UploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UploadController extends Controller
{
    protected $uploadService;

    public function __construct(UploadService $uploadService)
    {
        $this->uploadService = $uploadService;
    }

    public function upload(Request $request)
    {
        // Validate that a file is provided under the "picture_file" key
        $validator = Validator::make($request->all(), [
            'picture_file' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Get the file from the request (using key "picture_file")
            $file = $request->file('picture_file');
            // Upload the file via the UploadService
            $uploadResult = $this->uploadService->uploadFile($file);

            if ($uploadResult['success']) {
                return response()->json([
                    'message' => 'File uploaded successfully',
                    'data'    => $uploadResult['data']
                ], 200);
            } else {
                return response()->json(['error' => $uploadResult['message'] ?? 'File upload failed'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred during upload: ' . $e->getMessage()], 500);
        }
    }
}
