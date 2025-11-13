<?php

namespace App\Http\Controllers\CreditApplication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// Add these
use Illuminate\Support\Facades\DB; // Correct DB import

use App\Models\CreditApplicationPrimary;
use App\Models\CreditApplicationPreferences;
use App\Models\CreditApplicationReferences;
use App\Models\CreditApplicationIncome;
use App\Models\CreditApplicationProperties;
use App\Models\CreditApplicationAttachments;

class CreditApplicationBatchController extends Controller
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
        DB::beginTransaction();

        try {
            $primary = CreditApplicationPrimary::create($request->input('primary'));

            $primaryId = $primary->id;
            $creditAppId = $primary->creditApp_id;

            foreach ($request->input('preferences', []) as $pref) {
                CreditApplicationPreferences::create(array_merge(
                    $pref,
                    [
                        'credit_application_primary_id' => $primaryId,
                        'creditAppPrimary_id' => $creditAppId
                    ]
                ));
            }

            foreach ($request->input('references', []) as $ref) {
                CreditApplicationReferences::create(array_merge(
                    $ref,
                    [
                        'credit_application_primary_id' => $primaryId,
                        'creditAppPrimary_id' => $creditAppId
                    ]
                ));
            }

            foreach ($request->input('income', []) as $income) {
                CreditApplicationIncome::create(array_merge(
                    $income,
                    [
                        'credit_application_primary_id' => $primaryId,
                        'creditAppPrimary_id' => $creditAppId
                    ]
                ));
            }

            // foreach ($request->input('properties', []) as $property) {
            //     CreditApplicationProperties::create(array_merge(
            //         $property,
            //         ['credit_application_primary_id' => $primaryId]
            //     ));
            // }

            // foreach ($request->input('attachments', []) as $attachment) {
            //     CreditApplicationAttachments::create(array_merge(
            //         $attachment,
            //         ['credit_application_primary_id' => $primaryId]
            //     ));
            // }


            DB::commit();

            return response()->json(['message' => 'Credit application saved successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }

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
