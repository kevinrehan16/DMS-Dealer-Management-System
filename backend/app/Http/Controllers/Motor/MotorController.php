<?php

namespace App\Http\Controllers\Motor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ItemList;
use App\Services\MotorService;
use App\Http\Resources\MotorResource;

class MotorController extends Controller
{
    private $motorService;

    public function __construct(MotorService $motorService)
    {
        $this->motorService = $motorService;
    }

    public function index()
    {
        $motors = $this->motorService->getMotors();
        return response()->json([
            'motors' => MotorResource::collection($motors)
        ], 200);
    }

    public function getBrands()
    {
        $brands = $this->motorService->getBrands();
        return response()->json([
            'brandMotor' => $brands
        ], 200);
    }

    public function getModelsByBrand($brand)
    {
        $models = $this->motorService->getModelsByBrand($brand);
        return response()->json([
            'models' => $models
        ], 200);
    }

    public function getColorsByModel($model)
    {
        $colors = $this->motorService->getColorsByModel($model);
        return response()->json([
            'colors' => $colors
        ], 200);
    }

    public function getChassisByColor($color)
    {
        $chassis = $this->motorService->getChassisByColor($color);
        return response()->json([
            'chassis' => $chassis
        ], 200);
    }

    public function show($id)
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_number' => 'required|string',
            'itemName' => 'required|string|max:100',
            'itemDescription' => 'required|string|max:200',
            'itemPicture' => 'required|string',
            'units' => 'required|integer',
            'brandName' => 'required|string|max:60',
            'modelName' => 'required|string|max:60',
            'color' => 'required|string|max:30',
            'origPrice' => 'required|numeric',
            'cashPrice' => 'required|numeric',
            'unitCost' => 'required|numeric',
            'srpValue' => 'required|numeric',
            'interest' => 'required|numeric',
        ]);

        try{
            $motor = ItemList::create([
                'item_number' => $validated['item_number'],
                'itemName' => $validated['itemName'],
                'itemDescription' => $validated['itemDescription'],
                'itemPicture' => $validated['itemPicture'],
                'units' => $validated['units'],
                'brandName' => $validated['brandName'],
                'modelName' => $validated['modelName'],
                'color' => $validated['color'],
                'origPrice' => $validated['origPrice'],
                'cashPrice' => $validated['cashPrice'],
                'unitCost' => $validated['unitCost'],
                'srpValue' => $validated['srpValue'],
                'interest' => $validated['interest'],
            ]);

            return response()->json([
                'message' => 'Motor created successfully',
                'motor' => $motor,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating motor',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
