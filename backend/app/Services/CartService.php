<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class CartService
{
    /**
     * Add a course to the cart.
     */
    public function addToCart($userId, $courseId)
    {
        // Fetch the course price using a subquery
        $coursePrice = DB::selectOne("
            SELECT price 
            FROM courses 
            WHERE course_id = ?
        ", [$courseId]);

        if (!$coursePrice) {
            throw new \Exception("Course not found");
        }

        // Insert the course into the cart
        DB::insert("
            INSERT INTO carts (user_id, course_id, price) 
            VALUES (?, ?, ?)
        ", [$userId, $courseId, $coursePrice->price]);

        // Fetch the newly added cart item
        $cartItem = DB::selectOne("
            SELECT * 
            FROM carts 
            WHERE user_id = ? AND course_id = ?
        ", [$userId, $courseId]);

        return $cartItem;
    }

    /**
     * Remove a course from the cart.
     */
    public function removeFromCart($userId, $courseId)
    {
        DB::delete("
            DELETE FROM carts 
            WHERE user_id = ? AND course_id = ?
        ", [$userId, $courseId]);
    }

    /**
     * Get the total cost of the courses in the cart.
     */
    public function getTotalCost($userId)
    {
        $totalCost = DB::selectOne("
            SELECT SUM(price) AS total_cost 
            FROM carts 
            WHERE user_id = ?
        ", [$userId]);

        return $totalCost->total_cost ?? 0;
    }

    /**
     * Get all courses in the cart with course details.
     */
    public function getCart($userId)
    {
        $cartItems = DB::select("
            SELECT c.cart_id, c.user_id, c.course_id, c.price, 
                   co.title, co.description, co.picture, co.level, co.type, 
                   co.lesson_number, co.length_in_weeks 
            FROM carts c 
            JOIN courses co ON c.course_id = co.course_id 
            WHERE c.user_id = ?
        ", [$userId]);

        return $cartItems;
    }
}
