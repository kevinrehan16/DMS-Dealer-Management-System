<?php

namespace App\Http\Controllers\CreditInvestigation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

use App\Models\CreditInvestigationPrimary;
use App\Models\CreditInvestigationOtherSourceIncome;
use App\Models\CreditInvestigationCreditReferences;
use App\Models\CreditInvestigationPersonalReference;
use App\Models\CreditInvestigationPersonalProperty;

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
            $inquiryID = $contactInfo->inquiry_id;

            foreach ($request->input('sourceofincome', []) as $soi) {
                CreditInvestigationOtherSourceIncome::create(array_merge(
                    $soi,
                    [
                        'inquiry_id' => $inquiryID
                    ]
                ));
            }

            foreach ($request->input('creditreferences', []) as $cr) {
                CreditInvestigationCreditReferences::create(array_merge(
                    $cr,
                    [
                        'inquiry_id' => $inquiryID
                    ]
                ));
            }

            foreach ($request->input('personalreferences', []) as $pr) {
                CreditInvestigationPersonalReference::create(array_merge(
                    $pr,
                    [
                        'inquiry_id' => $inquiryID
                    ]
                ));
            }

            foreach ($request->input('personalproperties', []) as $pp) {
                CreditInvestigationPersonalProperty::create(array_merge(
                    $pp,
                    [
                        'inquiry_id' => $inquiryID
                    ]
                ));
            }

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
