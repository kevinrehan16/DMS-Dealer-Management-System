<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inventory;
use Illuminate\Support\Facades\Validator;


class InventoryController extends Controller
{
    // 1. KUNIN LAHAT NG STOCKS (Para sa Table View sa React)
    public function index()
    {
        // Kasama na rito ang brand, model, color, at prices gamit ang eager loading
        $stocks = Inventory::with('motorcycle')->orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $stocks
        ], 200);
    }

    // 2. MAGDAGDAG NG BAGONG STOCK (Kapag may dumating na motor sa bodega)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'motorcycle_id'    => 'required|exists:motorcycles,id',
            'chassis_number'   => 'required|string|unique:inventories,chassis_number',
            'engine_number'    => 'required|string|unique:inventories,engine_number',
            'series_number'    => 'required|string|unique:inventories,series_number',
            'unit_name'        => 'nullable|string',
            'branch_code'      => 'nullable|string',
            'unit_description' => 'nullable|string',
            'unitPicture'      => 'nullable|string', // Kung path lang ang ise-save
            'mv_file_number'   => 'nullable|string|unique:inventories,mv_file_number',
            'cr_number'        => 'nullable|string|unique:inventories,cr_number',
            'plate_number'     => 'nullable|string|unique:inventories,plate_number',
            'supplier_cost'    => 'required|numeric|min:0',
            'unit_type'        => 'required|in:Brand_New,Used_Repo',
            'status'           => 'required|in:Available,Reserved,Sold,Loaned,Maintenance,Stolen',
            'received_date'    => 'nullable|date',
        ]);

        $inventory = Inventory::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Motorcycle added to inventory successfully!',
            'data'    => $inventory
        ], 201);
    }

    // 3. KUNIN ANG DETALYE NG ISANG UNIT LANG (Kung kailangan silipin)
    public function show($id)
    {
        $stock = Inventory::with('motorcycle')->find($id);

        if (!$stock) {
            return response()->json(['success' => false, 'message' => 'Stock not found'], 404);
        }

        return response()->json(['success' => true, 'data' => $stock], 200);
    }

    // 4. I-UPDATE ANG UNIT (Halimbawa kapag may dumating na plaka o binago ang status)
    public function update(Request $request, $id)
    {
        $stock = Inventory::find($id);

        if (!$stock) {
            return response()->json(['success' => false, 'message' => 'Stock not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'chassis_number' => 'string|unique:inventories,chassis_number,' . $id,
            'engine_number'  => 'string|unique:inventories,engine_number,' . $id,
            'status'         => 'in:Available,Reserved,Sold,Loaned,Maintenance,Stolen',
            'mv_file_number' => 'nullable|string|unique:inventories,mv_file_number,' . $id,
            'cr_number'      => 'nullable|string|unique:inventories,cr_number,' . $id,
            'plate_number'   => 'nullable|string|unique:inventories,plate_number,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $stock->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Stock record successfully updated!',
            'data' => $stock->load('motorcycle')
        ], 200);
    }
}
