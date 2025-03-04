<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CartService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * Add a course to the cart.
     */
    public function addToCart(Request $request)
    {
        if (!$request->header('Authorization') || !str_starts_with($request->header('Authorization'), 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        $userId = $this->getUserIdFromToken($request->header('Authorization'));
        if (!$userId) {
            return response()->json(['error' => 'Unauthorized: Invalid token'], 403);
        }

        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer|exists:courses,course_id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $cartItem = $this->cartService->addToCart($userId, $request->course_id);
            return response()->json(['message' => 'Course added to cart successfully', 'cart_item' => $cartItem], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error adding course to cart: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove a course from the cart.
     */
    public function removeFromCart(Request $request, $courseId)
    {
        if (!$request->header('Authorization') || !str_starts_with($request->header('Authorization'), 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        $userId = $this->getUserIdFromToken($request->header('Authorization'));
        if (!$userId) {
            return response()->json(['error' => 'Unauthorized: Invalid token'], 403);
        }

        try {
            $this->cartService->removeFromCart($userId, $courseId);
            return response()->json(['message' => 'Course removed from cart successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error removing course from cart: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get the total cost of the courses in the cart.
     */
    public function getTotalCost(Request $request)
    {
        if (!$request->header('Authorization') || !str_starts_with($request->header('Authorization'), 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        $userId = $this->getUserIdFromToken($request->header('Authorization'));
        if (!$userId) {
            return response()->json(['error' => 'Unauthorized: Invalid token'], 403);
        }

        try {
            $totalCost = $this->cartService->getTotalCost($userId);
            return response()->json(['total_cost' => $totalCost], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error calculating total cost: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get all courses in the cart.
     */
    public function getCart(Request $request)
    {
        if (!$request->header('Authorization') || !str_starts_with($request->header('Authorization'), 'Bearer ')) {
            return response()->json(['error' => 'Token required'], 401);
        }

        $userId = $this->getUserIdFromToken($request->header('Authorization'));
        if (!$userId) {
            return response()->json(['error' => 'Unauthorized: Invalid token'], 403);
        }

        try {
            $cartItems = $this->cartService->getCart($userId);
            return response()->json(['cart_items' => $cartItems], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error retrieving cart: ' . $e->getMessage()], 500);
        }
    }

    private function getUserIdFromToken($tokenString)
    {
        try {
            $parser = new \Lcobucci\JWT\Token\Parser(new \Lcobucci\JWT\Encoding\JoseEncoder());
            $token = $parser->parse(str_replace('Bearer ', '', $tokenString));
            return $token->claims()->get('uid');
        } catch (\Exception $e) {
            return null;
        }
    }
}