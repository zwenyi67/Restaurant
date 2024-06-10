<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RestaurantTable;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function confirm(RestaurantTable $table, Request $request) {
        // Get JSON content from request
        $jsonFormData = $request->getContent();
        
        // Decode JSON content to array
        $formData = json_decode($jsonFormData, true);
        
        $menus = $formData['order'];
        
        $order = Order::create([
            'table_id' => $table->id, // Use $table->id instead of $table
            'waiter_id' => $formData['waiter_id'],
        ]);
        
        if (!empty($menus) && is_array($menus)) {
            foreach ($menus as $menu) {
                $order->menus()->attach($menu['id'], ['quantity' => $menu['qty']]);
            }
        }
        
        // Return response
        return response()->json([
            'message' => 'Sent to the kitchen',
            'id' => $order->id,
        ]);
    }    
}
