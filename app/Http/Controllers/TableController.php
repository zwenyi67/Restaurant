<?php

namespace App\Http\Controllers;

use App\Models\RestaurantTable;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function index() {
        $tables = RestaurantTable::orderBy('number', 'asc')->latest()->get();

        return response()->json([
            'tables' => $tables,
        ]);
    }
}
