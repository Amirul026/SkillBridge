<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        // Validate the uploaded file
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        // Upload the file using the Cloudinary disk
        $path = Storage::disk('cloudinary')->putFile('', $request->file('image'));
        
        // Generate the URL for the uploaded file
        $url = Storage::disk('cloudinary')->url($path);

        return response()->json([
            'message'   => 'Upload successful!',
            'image_url' => $url,
        ]);
    }
}
