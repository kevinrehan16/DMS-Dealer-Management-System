<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Address\AddressController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Inquiry\InquiryController;
use App\Http\Controllers\Motor\MotorController;
use App\Http\Controllers\CreditApplication\CreditApplicationAttachmentsController;
use App\Http\Controllers\CreditApplication\CreditApplicationIncomeController;
use App\Http\Controllers\CreditApplication\CreditApplicationPreferencesController;
use App\Http\Controllers\CreditApplication\CreditApplicationPrimaryController;
use App\Http\Controllers\CreditApplication\CreditApplicationPropertiesController;
use App\Http\Controllers\CreditApplication\CreditApplicationReferencesController;
use App\Http\Controllers\CreditApplication\CreditApplicationBatchController;
use App\Http\Controllers\CreditInvestigation\CreditInvestigationBatchController;
use App\Http\Controllers\CreditInvestigation\CreditInvestigationPrimaryController;
use App\Http\Controllers\Settings\Referentials\RequirementController;
use App\Http\Controllers\Settings\Roles\RolesController;
use App\Http\Controllers\Settings\setup\ModulePermissionController;
use App\Http\Controllers\Cashier\CashierController;
use App\Http\Controllers\Inventory\InventoryController;
use App\Http\Controllers\Motorcycle\MotorcycleController;

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
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });
});

Route::middleware('auth:sanctum')->prefix('customers')->group(function () {
    Route::get('/', [CustomerController::class, 'index']);
    Route::post('/', [CustomerController::class, 'store']);
    Route::get('{customer}', [CustomerController::class, 'show']);
    Route::put('{customer}', [CustomerController::class, 'update']);
    Route::delete('{customer}', [CustomerController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->prefix('inquiries')->group(function () {
    Route::get('/information', [InquiryController::class, 'getInquiriesForDropdown']);
    Route::get('/schedule-ci', [InquiryController::class, 'getScheduledInquiries']);

    Route::get('/', [InquiryController::class, 'index']);
    Route::post('/', [InquiryController::class, 'store']);
    Route::get('{inquiry}', [InquiryController::class, 'show']);
    Route::put('/{inquiry}', [InquiryController::class, 'update']);
    Route::delete('{inquiry}', [InquiryController::class, 'destroy']);

    Route::patch('/assignschedule', [InquiryController::class, 'assignschedule']);
    Route::post('/bulk-status-update', [InquiryController::class, 'bulkStatusUpdate']);
});

Route::middleware('auth:sanctum')->prefix('motors')->group(function () {
    Route::get('/', [MotorController::class, 'index']);
    Route::get('/motorbrands', [MotorController::class, 'getBrands']);
    Route::get('/motormodels/{brand}', [MotorController::class, 'getModelsByBrand']);
    Route::get('/motorcolors/{model}', [MotorController::class, 'getColorsByModel']);
    Route::get('/motorchassis/{color}', [MotorController::class, 'getChassisByColor']);
    Route::post('/', [MotorController::class, 'store']);
    Route::get('/{motor}', [MotorController::class, 'show']);
    Route::put('/{motor}', [MotorController::class, 'update']);
    Route::delete('/{motor}', [MotorController::class, 'destroy']);
});

// Route::prefix('motors')->controller(MotorController::class)->group(function () {
//     Route::middleware('auth:sanctum')->group(function () {
//         Route::get('/', 'index'); // GET /api/motors
//         Route::get('/motorbrands', 'getBrands'); // GET /api/motors/motorbrands
//         Route::get('/motormodels/{brand}', 'getModelsByBrand'); // GET /api/motors/models/{brand}
//         Route::get('/motorcolors/{model}', 'getColorsByModel'); // GET /api/motors/colors/{model}
//         Route::get('/motorchassis/{color}', 'getChassisByColor'); // GET /api/motors/chassis/{color}
//         Route::post('/', 'store'); // POST /api/motors
//         Route::get('/{id}', 'show'); // GET /api/motors/{id}
//         Route::put('/{id}', 'update'); // PUT /api/motors/{id}
//         Route::delete('/{id}', 'destroy'); // DELETE /api/motors/{id}
//     });
// });

Route::prefix('credit-application')->middleware('auth:sanctum')->group(function () {

    // Credit Application Primary
    Route::get('/primary', [CreditApplicationPrimaryController::class, 'index']);
    Route::post('/primary', [CreditApplicationPrimaryController::class, 'store']);
    // END Credit Application Primary

    Route::post('/preferences', [CreditApplicationPreferencesController::class, 'store']);
    Route::post('/references', [CreditApplicationReferencesController::class, 'store']);
    Route::post('/income', [CreditApplicationIncomeController::class, 'store']);
    Route::post('/properties', [CreditApplicationPropertiesController::class, 'store']);
    Route::post('/attachments', [CreditApplicationAttachmentsController::class, 'store']);

    // Batch save
    Route::post('/save-all', [CreditApplicationBatchController::class, 'store']);
    Route::put('/update-all/{id}', [CreditApplicationBatchController::class, 'update']);
});

Route::prefix('credit-investigation')->middleware('auth:sanctum')->group(function () {
    // Credit Investigation Primary
    Route::get('/contactinfo', [CreditInvestigationPrimaryController::class, 'index']);
    Route::post('/contactinfo', [CreditInvestigationPrimaryController::class, 'store']);

    // Batch save
    Route::post('/save-all', [CreditInvestigationBatchController::class, 'store']);
});

Route::prefix('requirements')->controller(RequirementController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', 'index'); // GET /api/requirements
        Route::post('/', 'store');  // POST /api/requirements
    });
});

Route::middleware('auth:sanctum')->prefix('evaluation')->group(function () {
    Route::get('/creditapplication/{id}', [CreditApplicationPrimaryController::class, 'show']);
    Route::get('/creditinvestigation/{id}', [CreditInvestigationPrimaryController::class, 'show']);
});

Route::prefix('cashier')->controller(CashierController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        // ROLE'S END POINTS
        Route::get('/', 'index');
        Route::get('/{cashier}', 'show');
        Route::post('/', 'store');
    });
});

Route::prefix('settings')->controller(RolesController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        // ROLE'S END POINTS
        Route::get('/roles', 'index');
        Route::post('/roles', 'store');
        Route::post('/permissions', [RolesController::class, 'storePermission']);
        Route::post('/assign-role', [RolesController::class, 'assignRoleToUser']);

        // PERMISSION'S END POINTS
        Route::post('/setup/permissions', [ModulePermissionController::class, 'createModulePermissions']);
        Route::post('/setup/assign-to-role', [ModulePermissionController::class, 'assignModulesToRole']);
    });
});

Route::prefix('inventory')->controller(InventoryController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        // ROLE'S END POINTS
        Route::get('/', 'index');
        Route::post('/', 'store');
    });
});

Route::prefix('motorcycle')->controller(MotorcycleController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        // ROLE'S END POINTS
        Route::post('/', 'store');
    });
});

Route::prefix('address')->controller(AddressController::class)->group(function () {
    Route::get('/regions', 'getRegions');
    Route::get('/provinces/{regCode}', 'getProvinces');
    Route::get('/cities/{provCode}', 'getCities');
    // citymunCode naman ang gagamitin natin di,to
    Route::get('/barangays/{citymunCode}', 'getBarangays');
});

Route::middleware('auth:sanctum')->get('/download-file/{encodedPath}', function ($encodedPath) {
    $fullPath = base64_decode($encodedPath);

    // Ito ang eksaktong full system path kung saan titingin ang Laravel
    $absolutePath = storage_path('app/public/' . $fullPath);

    if (file_exists($absolutePath)) {
        return Storage::disk('public')->download($fullPath);
    }

    // Dito tayo mag-error para malaman natin ang totoo
    return response()->json([
        'message' => 'File not found',
        'tried_path' => $absolutePath,
        'exists' => file_exists($absolutePath)
    ], 404);
});

// TODO: remove this commented code below, this is public downloading file function. NOT SECURED
// Route::get('/download-file/{path}', function ($path) {
//     $fullPath = urldecode($path);

//     if (Storage::disk('public')->exists($fullPath)) {
//         return Storage::disk('public')->download($fullPath);
//     }

//     return response()->json(['message' => 'File not found'], 404);
// })->where('path', '.*');
