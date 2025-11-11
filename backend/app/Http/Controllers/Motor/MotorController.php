<?php

namespace App\Http\Controllers\Motor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ItemList;

class MotorController extends Controller
{
    //
    public function index()
    {
        return response()->json([
            'motors' => ItemList::all(),
        ]);
    }

    public function getBrands()
    {
        $items = ItemList::orderBy('brandName', 'asc')
                ->distinct()
                ->pluck('brandName');

        return response()->json([
            'brandMotor' => $items,
        ]);

    }

    public function getModelsByBrand($brand)
    {
        $models = ItemList::where('brandName', $brand)
            ->orderBy('modelName', 'asc')
            ->distinct()
            ->pluck('modelName');

        return response()->json([
            'models' => $models,
        ]);
    }

    public function getColorsByModel($model){
        $colors = ItemList::where('modelName', $model)
            ->orderBy('color', 'asc')
            ->distinct()
            ->pluck('color');

        return response()->json([
            'colors' => $colors,
        ]);
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
