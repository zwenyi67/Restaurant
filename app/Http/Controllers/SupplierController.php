<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index() {

        $suppliers = Supplier::where('status' ,'active')->latest()->get();

        return response()->json([
            'suppliers' => $suppliers,
        ]);
    }

    public function store(Request $request) {

        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'location' => 'required',
            'phone' => 'required',
            'type' => 'required',
            'description' => 'required',
        ]);

        $data['status'] = 'active';

        $supplier = Supplier::create($data);

        return response()->json([
            'supplier' => $supplier,
        ]);
    }

    public function edit($id) {

        $supplier = Supplier::findOrFail($id);

        return response()->json([
            'supplier' => $supplier,
        ]);

    }
}
