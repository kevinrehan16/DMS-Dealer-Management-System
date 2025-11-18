<?php

namespace App\Http\Controllers\Settings\Referentials;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Requirement;
use PHPUnit\Metadata\Api\Requirements;

class RequirementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $requirements = Requirement::all();

        return response()->json([
            'message' => 'Requirements fetched successfully.',
            'data' => $requirements,
        ], 200);
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
        $requirements = Requirement::create([
            "module" => $request['module'],
            "reqName" => $request['reqName'],
            "reqShortName" => $request['reqShortName']
        ]);

        return response()->json([
            'message' => 'Customer Added successfully.',
            'requirements' => $requirements,
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
