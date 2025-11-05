<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Customer\CustomerController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('users')->controller(UserController::class)->group(function () {
    Route::post('/login', 'login');   // Public
    Route::post('/', 'store');        // Public

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });
});

Route::prefix('customers')->controller(CustomerController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', 'index'); // GET /api/customers
        Route::post('/', 'store'); // POST /api/customers
        Route::get('/{id}', 'show'); // GET /api/customers/{id}
        Route::put('/{id}', 'update'); // PUT /api/customers/{id}
        Route::delete('/{id}', 'destroy'); // DELETE /api/customers/{id}
    });
});
