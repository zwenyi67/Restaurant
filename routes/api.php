<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MenuTypeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\WaiterController;
use App\Models\Menu;
use App\Models\MenuType;
use App\Models\RestaurantTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function() {

    Route::get('/logout', [AuthController::class, 'logout' ]);

    Route::get('/admin', function (Request $request) {
        return $request->user();
    });

    Route::get('/waiter', function (Request $request) {
        return $request->user();
    });

    // For Admin Role

        // Employee Section

        Route::get('/admin/employees', [EmployeeController::class, 'index']);

        Route::post('/admin/employees/add', [EmployeeController::class, 'store']);


        // Supplier Section

        Route::get('/admin/suppliers', [SupplierController::class, 'index']);

        Route::post('/admin/suppliers/create' , [SupplierController::class, 'store']);

        Route::get('/admin/suppliers/{id}/edit', [SupplierController::class, 'edit']);

        Route::put('/admin/suppliers/{id}/edit', [SupplierController::class, 'update']);

        // Menu Section

        Route::get('/admin/menus', [MenuController::class, 'index']);

        Route::get('/admin/menus/create', [MenuController::class, 'create']);

        Route::post('/admin/menus/create' , [MenuController::class, 'store']);

        Route::get('/admin/menus/{menu}/edit', [MenuController::class, 'edit']);

        Route::put('/admin/menus/{menu}/edit', [MenuController::class, 'update']);

        Route::post('/admin/menus/{menu}/imageUpdate' , [MenuController::class, 'imageUpdate']);

        Route::delete('/admin/menus/{menu}/delete', [MenuController::class, 'destroy']);

        // Menu Type Section

        Route::get('/admin/menu_types', [MenuTypeController::class, 'index']);

        // Table Section

        Route::get('/admin/tables', [TableController::class, 'index']);



    // For Role Waiter

    Route::get('/waiter/menus', function(){
        return response()->json([
            'types' => MenuType::latest()->get(),
            'menus' => Menu::latest()->filter(request(['search','type']))->get(),
        ]);
    });

    Route::get('waiter/tables', function(){
        return response()->json([
            'tables' => RestaurantTable::orderBy('number', 'asc')->latest()->get(),
        ]);
    });

    Route::post('/waiter/tables/{table}/order/confirm', [OrderController::class, 'confirm']);

});

Route::post('/login', [AuthController::class, 'login' ]);

Route::post('/register', [AuthController::class, 'register' ]);
