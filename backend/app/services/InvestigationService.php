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

            // 2. Create Others (Conditional: I-save lang kung may laman ang array)
            if (!empty($data['otherSourceOfIncome'])) {
                $this->createRelatedRecords($inquiryID, $data['otherSourceOfIncome'], CreditInvestigationOtherSourceIncome::class);
            }

            if (!empty($data['creditReferences'])) {
                $this->createRelatedRecords($inquiryID, $data['creditReferences'], CreditInvestigationCreditReferences::class);
            }

            if (!empty($data['personalReferences'])) {
                $this->createRelatedRecords($inquiryID, $data['personalReferences'], CreditInvestigationPersonalReference::class);
            }

            if (!empty($data['personalProperties'])) {
                $this->createRelatedRecords($inquiryID, $data['personalProperties'], CreditInvestigationPersonalProperty::class);
            }

            // 3. Update Status
            $customerId = Inquiry::where('id', $inquiryID)->value('customer_id');
            $this->inquiryService->updateStatus($customerId, "FOR_APPROVAL");

            return $contactInfo;
        });
    }

    private function createRelatedRecords($inquiryID, array $items, string $modelClass)
    {
        foreach ($items as $item) {
            // 1. I-filter ang $item para alisin ang mga null o empty values.
            // Ang 'array_filter' ay tatanggalin ang mga values na empty, null, o false.
            $filteredItem = array_filter($item, function ($value) {
                return $value !== null && $value !== '';
            });

            // 2. I-check kung ang array ay may laman pa pagkatapos i-filter.
            // Kung ang $filteredItem ay may laman, ituloy ang pag-save.
            // Dito, ginagawa nating requirement na dapat may laman ang array para ma-create ang record.
            if (!empty($filteredItem)) {
                $modelClass::create(array_merge($item, ['inquiry_id' => $inquiryID]));
            }
        }
    }

    private function formatName(?string $value): string
    {
        return $value ? ucwords(strtolower($value)) : '';
    }
}
