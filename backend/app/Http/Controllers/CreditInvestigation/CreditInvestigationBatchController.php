<?php

namespace App\Http\Controllers\CreditInvestigation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Traits\Loggable;

use App\Models\Inquiry;
use App\Models\CreditInvestigationPrimary;
use App\Models\CreditInvestigationOtherSourceIncome;
use App\Models\CreditInvestigationCreditReferences;
use App\Models\CreditInvestigationPersonalReference;
use App\Models\CreditInvestigationPersonalProperty;
use App\Services\InquiryService;
use App\Services\InvestigationService;
use App\Http\Requests\StoreCreditInvestigationRequest;

class CreditInvestigationBatchController extends Controller
{
    use Loggable;

    private $inquiryService;
    private $investigationService;

    public function __construct(InquiryService $inquiryService, InvestigationService $investigationService)
    {
        $this->inquiryService = $inquiryService;
        $this->investigationService = $investigationService;
    }
    /**
     * Show the form for creating the resource.
     */
    public function create() {}

    /**
     * Store the newly created resource in storage.
     */
    public function store(StoreCreditInvestigationRequest $request, InvestigationService $investigationService)
    {
        try {
            // Kunin ang validated data mula sa FormRequest
            $data = $request->validated();

            // Tawagin ang service
            $contactInfo = $investigationService->StoreCreditInvestigationAll($data);
            $inquiryId = $data['inquiry_id'];

            $this->logInfo(
                'CreditInvestigationBatchController_SUCCESS',
                'Credit investigation record successfully created for Inquiry ID: ' . $inquiryId,
                ['inquiry_id' => $inquiryId]
            );

            return response()->json(['ContactInformations' => $contactInfo], 201);
        } catch (\Exception $e) {
            $inquiryId = $data['inquiry_id'] ?? 'UNKNOWN';

            $this->logError(
                'CreditInvestigationBatchController_FAILED',
                'Failed to save credit investigation for Inquiry ID: ' . $inquiryId,
                $e,
                ['inquiry_id' => $inquiryId]
            );

            return response()->json(['error' => 'Failed to save Credit Investigation'], 500);
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
    public function update(StoreCreditInvestigationRequest $request, $inquiryId)
    {
        try {
            // Validations here
            $data = $request->validated();

            $result = $this->investigationService->updateCreditInvestigation($inquiryId, $data);

            return response()->json([
                'message' => 'Credit Investigation updated successfully.',
                'data' => $result
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy() {}
}
