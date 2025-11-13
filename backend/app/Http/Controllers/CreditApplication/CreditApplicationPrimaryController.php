<?php

namespace App\Http\Controllers\CreditApplication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// Add these
use App\Http\Requests\StoreCreditApplicationPrimaryRequest;
use App\Models\CreditApplicationPrimary;

class CreditApplicationPrimaryController extends Controller
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
    public function store(StoreCreditApplicationPrimaryRequest $request)
    {
        $primary = CreditApplicationPrimary::create($request->validated());
        return response()->json([
            'message' => 'Primary application saved successfully.',
            'data' => $primary
        ]);

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
