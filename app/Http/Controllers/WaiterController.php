<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class WaiterController extends Controller
{
    public function index() {
        
        $menus = Menu::latest()->filter(request(['search']))->paginate(6)->get();

        return response()->json([
            'menus' => $menus,
        ]);
    }
}
