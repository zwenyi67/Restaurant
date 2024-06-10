<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index() {

        $employees = User::where('role' , '<>', 'admin')->latest()->get();

        return response()->json([
            'employees' => $employees,
        ]);
    }

    public function store(Request $request) {

        $data = $request->validate([
            'name' => 'required|min:3|max:20',
            'email' => 'required|email|max:40',
            'role' => 'required',
        ]);

        $employee  = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $data['role'],
            'password' => bcrypt('password'),
        ]);

        return response()->json([
            'message' => 'Employee added successfully',
            'employee' => $employee,
        ]);

    }
}
