<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Inquiry\InquiryController;
use App\Http\Controllers\Motor\MotorController;
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
    return auth('sanctum')->user();
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


Route::prefix('inquiries')->controller(InquiryController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', 'index'); // GET /api/inquiries
        Route::post('/', 'store'); // POST /api/inquiries
        Route::get('/{id}', 'show'); // GET /api/inquiries/{id}
        Route::put('/{id}', 'update'); // PUT /api/inquiries/{id}
        Route::delete('/{id}', 'destroy'); // DELETE /api/inquiries/{id}
    });
});

Route::prefix('motors')->controller(MotorController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', 'index'); // GET /api/motors
        Route::get('/motorbrands', 'getBrands'); // GET /api/motors/motorbrands
        Route::get('/motormodels/{brand}', 'getModelsByBrand'); // GET /api/motors/models/{brand}
        Route::get('/motorcolors/{model}', 'getColorsByModel'); // GET /api/motors/colors/{model}
        Route::post('/', 'store'); // POST /api/motors
        Route::get('/{id}', 'show'); // GET /api/motors/{id}
        Route::put('/{id}', 'update'); // PUT /api/motors/{id}
        Route::delete('/{id}', 'destroy'); // DELETE /api/motors/{id}
    });
});
