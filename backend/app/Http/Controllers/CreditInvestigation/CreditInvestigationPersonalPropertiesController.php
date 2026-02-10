<?php

namespace App\Http\Controllers\CreditInvestigation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CreditInvestigationPersonalProperty;
use App\Http\Requests\StoreCreditInvestigationPersonalPropertyRequest;

class CreditInvestigationPersonalPropertiesController extends Controller
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
    public function store(StoreCreditInvestigationPersonalPropertyRequest $request)
    {
        $personalProperty = CreditInvestigationPersonalProperty::create($request->validated());
        return response()->json([
            'message'=> "Personal Property saved successfully",
            'data'=> $personalProperty
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
