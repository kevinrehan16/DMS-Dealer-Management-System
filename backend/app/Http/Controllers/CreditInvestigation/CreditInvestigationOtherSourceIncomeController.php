<?php

namespace App\Http\Controllers\CreditInvestigation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\http\Requests\StoreCreditInvestigationOtherSourceIncomeRequest;
use App\Models\CreditInvestigationOtherSourceIncome;

class CreditInvestigationOtherSourceIncomeController extends Controller
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
    public function store(StoreCreditInvestigationOtherSourceIncomeRequest $request)
    {
        $otherSourceIncome = CreditInvestigationOtherSourceIncome::create($request->validate());
        return response()->json([
            'message'=> "Other Source of Income saved successfully",
            'data'=> $otherSourceIncome
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
