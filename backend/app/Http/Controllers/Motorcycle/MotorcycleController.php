<?php

namespace App\Http\Controllers\Motorcycle;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Motorcycle;
use Illuminate\Support\Facades\Auth;

class MotorcycleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand'             => 'required|string|max:255',
            'model_name'        => 'required|string|max:255',
            'color'             => 'required|string|max:100',
            'cash_price'        => 'required|numeric|min:0',
            'original_price'    => 'required|numeric|min:0',
            'unit_cost'         => 'required|numeric|min:0',
            'srp_value'         => 'required|numeric|min:0',
            'installment_price' => 'required|numeric|min:0',
            'interest'          => 'required|numeric|min:0',
        ]);

        // I-attach ang user_id ng kasalukuyang naka-login na admin/user
        $validated['user_id'] = Auth::id();

        $motorcycle = Motorcycle::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Motorcycle model added successfully!',
            'data'    => $motorcycle
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
