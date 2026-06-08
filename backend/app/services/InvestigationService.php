<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

use App\Models\CreditInvestigationPrimary;
use App\Models\CreditInvestigationOtherSourceIncome;
use App\Models\CreditInvestigationCreditReferences;
use App\Models\CreditInvestigationPersonalReference;
use App\Models\CreditInvestigationPersonalProperty;
use App\Models\Inquiry;
use App\Services\InquiryService;

class InvestigationService
{
    private $inquiryService;

    public function __construct(InquiryService $inquiryService)
    {
        $this->inquiryService = $inquiryService;
    }

    public function getCreditInvestigationById($id)
    {
        return CreditInvestigationPrimary::with([
            'otherSourceIncome',
            'creditReferences',
            'personalReferences',
            'personalPropertiesOwned',
        ])->findOrFail($id); // fetch only one record by ID
    }

    public function StoreCreditInvestigationAll(array $data)
    {
        return DB::transaction(function () use ($data) {
            $primaryData = array_diff_key($data, array_flip([
                'otherSourceOfIncome',
                'creditReferences',
                'personalReferences',
                'personalProperties'
            ]));
            // 1. Create Primary
            $contactInfo = CreditInvestigationPrimary::create($primaryData);
            $inquiryID = $contactInfo->inquiry_id;

            // 2. Create Others (Reusable function loop)
            $this->createRelatedRecords($inquiryID, $data['otherSourceOfIncome'] ?? [], CreditInvestigationOtherSourceIncome::class);
            $this->createRelatedRecords($inquiryID, $data['creditReferences'] ?? [], CreditInvestigationCreditReferences::class);
            $this->createRelatedRecords($inquiryID, $data['personalReferences'] ?? [], CreditInvestigationPersonalReference::class);
            $this->createRelatedRecords($inquiryID, $data['personalProperties'] ?? [], CreditInvestigationPersonalProperty::class);

            // 3. Update Status
            $customerId = Inquiry::where('id', $inquiryID)->value('customer_id');
            $this->inquiryService->updateStatus($customerId, "FOR_APPROVAL");

            return $contactInfo;
        });
    }

    private function createRelatedRecords($inquiryID, array $items, string $modelClass)
    {
        foreach ($items as $item) {
            $modelClass::create(array_merge($item, ['inquiry_id' => $inquiryID]));
        }
    }

    private function formatName(?string $value): string
    {
        return $value ? ucwords(strtolower($value)) : '';
    }
}
