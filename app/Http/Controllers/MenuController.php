<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuType;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index() {

        $menus = Menu::latest()->get();

        return response()->json([
            'menus' => $menus,
        ]);
    }

    public function create() {

        $types = MenuType::latest()->get();

        return response()->json([
            'types' => $types,
        ]);

    }

    public function store(Request $request) {

        $data = $request->validate([
            'name' => 'required|max: 30|unique:menus,name',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'menu_type_id' => 'required',
            'description' => 'required|min:5|max:150',
        ]);
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $request->name . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $imageName);
            $data['image'] = $imageName;
        } else {
            return response()->json(['errors' => 'Image file not provided'], 400);
        }
    
        $menu = Menu::create($data);
    
        return response()->json([
            'message' => 'Menu created successfully',
            'menu' => $menu,
        ]);  
    }

    public function edit(Menu $menu) {

        return response()->json([
            'menu' => $menu,
        ]);
    }

    public function update(Request $request,Menu $menu) {

        $data = $request->validate([
            'name' => 'required|max: 30',
            'price' => 'required|numeric',
            'description' => 'required|min:5|max:450',
            'status' => 'required'
        ]);

        $menu->update($data);

        $menu->save();

        return response()->json([
            'menu' => $menu,
        ]);
    }

    public function imageUpdate(Request $request, Menu $menu) {
        $data = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $request->name . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $imageName);
            $data['image'] = $imageName;
        } else {
            return response()->json(['error' => 'Image file not provided'], 400);
        }

        $menu->update([
            'image' => $data['image'],
        ]);

        $menu->save();

        return response()->json([
            'image' => $data['image'],
        ]);


    }

    public function destroy(Menu $menu) {
        
        $menu->delete();

        return response()->json(['message' => 'Menu deleted successfully'], 200);
    }
}
