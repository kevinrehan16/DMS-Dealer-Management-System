<?php

namespace App\Http\Controllers\CreditInvestigation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

use App\Models\CreditInvestigationPrimary;

class CreditInvestigationBatchController extends Controller
{
    /**
     * Show the form for creating the resource.
     */
    public function create()
    {

    }

    /**
     * Store the newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        try{
            $contactInfo = CreditInvestigationPrimary::create($request->input('contactinfo'));

            DB::commit();
            return response()->json(['ContactInformations' => $contactInfo]);
        }
        catch(\Exception $e){
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy()
    {

    }
}
