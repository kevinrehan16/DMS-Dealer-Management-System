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
use App\Services\InquiryService; // Import ang service

class CreditApplicationBatchController extends Controller
{
    protected $inquiryService;

    // Dependency Injection via Constructor
    public function __construct(InquiryService $inquiryService)
    {
        $this->inquiryService = $inquiryService;
    }
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
            // IMPORTANT: I-decode ang 'primary' dahil String ito galing sa FormData
            $primaryData = is_string($request->input('primary'))
                ? json_decode($request->input('primary'), true)
                : $request->input('primary');

            $mainTableData = collect($primaryData)->except([
                'preferenceRows', 'referenceRows', 'incomeRows', 'propertyRows', 'attachments_meta'
            ])->toArray();
            // I-save ang main application
            $primary = CreditApplicationPrimary::create($mainTableData);
            $primary->refresh();

            $primaryId = $primary->id;
            $creditAppId = $primary->creditApp_id;
            $customerId = $primary->customer_id;

            $this->inquiryService->updateStatus($customerId, 'investigation');

            // Listahan ng arrays na kailangang i-loop mula sa loob ng $primaryData
            $nestedArrays = [
                'preferenceRows' => CreditApplicationPreferences::class,
                'referenceRows'  => CreditApplicationReferences::class,
                'incomeRows'      => CreditApplicationIncome::class,
                'propertyRows'  => CreditApplicationProperties::class,
            ];

            foreach ($nestedArrays as $key => $modelClass) {
                // Kunin ang array mula sa loob ng decoded primary data
                $rows = $primaryData[$key] ?? [];
                foreach ($rows as $row) {
                    // Siguraduhin na hindi empty ang row bago i-save
                    if (!empty(array_filter($row))) {
                        $modelClass::create(array_merge($row, [
                            'credit_application_primary_id' => $primaryId,
                            'creditAppPrimary_id' => $creditAppId
                        ]));
                    }
                }
            }

            // --- ATTACHMENTS LOGIC ---
            if ($request->hasFile('attachments')) {
                $files = $request->file('attachments');

                // Kunin ang meta mula sa primary data (ito yung filtered meta galing React)
                $metaData = $primaryData['attachments_meta'] ?? [];

                foreach ($files as $index => $file) {
                    // Dahil filtered na sa React, ang $index 0 ng $files
                    // ay siguradong $index 0 din ng $metaData.
                    $meta = $metaData[$index] ?? [];

                    $moduleName = $meta['attReq'] ?? 'Requirement';
                    $moduleNameSafe = preg_replace('/[^A-Za-z0-9_\-]/', '_', $moduleName);
                    $extension = $file->getClientOriginalExtension();

                    // Dagdagan ng microtime para kahit mabilis ang upload, unique ang filename
                    $filename = "{$moduleNameSafe}_" . time() . "_{$index}.{$extension}";

                    // I-store sa: storage/app/public/credit_app_attachments/APP-2024-001/filename.jpg
                    $path = $file->storeAs("credit_app_attachments/{$creditAppId}", $filename, 'public');

                    // I-save sa database record
                    CreditApplicationAttachments::create([
                        'credit_application_primary_id' => $primaryId,
                        'customer_id'           => $customerId,
                        'creditAppPrimary_id'   => $creditAppId,
                        'attModule'             => $meta['attModule'] ?? '',
                        'attReq'                => $moduleName,
                        'attFileName'           => $path,
                        'attFileType'           => $file->getMimeType(),
                        'attFileSize'           => $file->getSize(),
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
