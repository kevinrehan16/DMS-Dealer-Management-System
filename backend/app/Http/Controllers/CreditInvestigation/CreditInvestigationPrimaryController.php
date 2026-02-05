<?php

namespace App\Http\Controllers\CreditInvestigation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCreditInvestigationPrimaryRequest;
use App\Models\CreditInvestigationPrimary;

class CreditInvestigationPrimaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(['message' => 'Hello Credit Investigation.']);
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
    public function store(StoreCreditInvestigationPrimaryRequest $request)
    {
        // TO USE OR ADD THE VALIDATE(), GO TO:
        // Controllers/Requests/StoreCreditInvestigationPrimaryRequest
        $contactInfo = CreditInvestigationPrimary::create($request->validate());
        return response()->json([
            'message' => 'Primary application saved successfully.',
            'data' => $contactInfo
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
