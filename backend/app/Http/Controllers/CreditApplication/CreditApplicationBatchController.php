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

            foreach ($request->input('properties', []) as $property) {
                CreditApplicationProperties::create(array_merge(
                    $property,
                    [
                        'credit_application_primary_id' => $primaryId,
                        'creditAppPrimary_id' => $creditAppId
                    ]
                ));
            }

            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $index => $file) {

                    // Get module name from metadata
                    $moduleName = $request->input("attachments_meta.$index.attReq");

                    // Sanitize module name for filesystem
                    $moduleNameSafe = preg_replace('/[^A-Za-z0-9_\-]/', '_', $moduleName);

                    // Get original file extension
                    $extension = $file->getClientOriginalExtension();

                    // Make filename: ModuleName_TIMESTAMP.ext to avoid duplicates
                    $filename = $moduleNameSafe . '.' . $extension;

                    // Store file in storage/app/public/credit_attachments
                    $path = $file->storeAs("credit_attachments/{$creditAppId}", $filename, 'public');

                    // Save to database
                    CreditApplicationAttachments::create([
                        'credit_application_primary_id' => $primaryId,
                        'customer_id'                   => $request->input("attachments_meta.$index.customer_id"),
                        'creditAppPrimary_id'           => $creditAppId,
                        'attModule'                     => $moduleName,
                        'attReq'                        => $request->input("attachments_meta.$index.attReq"),
                        'attFileName'                   => $path,
                        'attFileType'                   => $file->getMimeType(),
                        'attFileSize'                   => $file->getSize(),
                    ]);
                }
            }



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
