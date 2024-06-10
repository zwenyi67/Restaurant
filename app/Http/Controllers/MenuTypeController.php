<?php

namespace App\Http\Controllers;

use App\Models\MenuType;
use Illuminate\Http\Request;

class MenuTypeController extends Controller
{
    public function index() {
        $types = MenuType::latest()->get();

        return response()->json([
            'types' => $types,
        ]);
    }
}
