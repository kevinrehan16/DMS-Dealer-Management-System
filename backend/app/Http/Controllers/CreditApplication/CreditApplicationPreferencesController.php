<?php

namespace App\Http\Controllers\CreditApplication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests\StoreCreditApplicationPreferencesRequest;
use App\Models\CreditApplicationPreferences;

class CreditApplicationPreferencesController extends Controller
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
    public function store(StoreCreditApplicationPreferencesRequest $request)
    {
        $preferences = CreditApplicationPreferences::create($request->validated());
        return response()->json([
            'message' => 'Preferences saved successfully.',
            'data' => $preferences
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
