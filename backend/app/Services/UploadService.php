<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class UploadService
{
    public function uploadFile($file)
    {
        try {
            // Store the file on the Cloudinary disk; the first parameter is the folder (optional)
            $path = $file->store('', 'cloudinary');
            // Generate a public URL for the file
            $url = Storage::disk('cloudinary')->url($path);

            return [
                'success' => true,
                'data'    => [
                    'path' => $path,
                    'url'  => $url,
                ],
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'File storage failed: ' . $e->getMessage(),
            ];
        }
    }
}
