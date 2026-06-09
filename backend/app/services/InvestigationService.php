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

    public function updateCreditInvestigation($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            // 1. I-filter ang primary data
            $primaryData = array_diff_key($data, array_flip([
                'otherSourceOfIncome',
                'creditReferences',
                'personalReferences',
                'personalProperties'
            ]));

            // 2. Update Primary Record
            $contactInfo = CreditInvestigationPrimary::where('id', $id)->firstOrFail();
            $contactInfo->update($primaryData);

            // 3. I-replace ang related records (Delete luma, insert bago)
            // Ito ang pinaka-safe na paraan para sa collection fields
            CreditInvestigationOtherSourceIncome::where('inquiry_id', $contactInfo->inquiry_id)->delete();
            CreditInvestigationCreditReferences::where('inquiry_id', $contactInfo->inquiry_id)->delete();
            CreditInvestigationPersonalReference::where('inquiry_id', $contactInfo->inquiry_id)->delete();
            CreditInvestigationPersonalProperty::where('inquiry_id', $contactInfo->inquiry_id)->delete();
            // Dagdagan kung may iba pa

            // 4. Re-insert ang mga bagong data (Gamit ang ating logic dati)
            if (!empty($data['otherSourceOfIncome'])) {
                $this->createRelatedRecords($contactInfo->inquiry_id, $data['otherSourceOfIncome'], CreditInvestigationOtherSourceIncome::class);
            }

            if (!empty($data['creditReferences'])) {
                $this->createRelatedRecords($contactInfo->inquiry_id, $data['creditReferences'], CreditInvestigationCreditReferences::class);
            }

            if (!empty($data['personalReferences'])) {
                $this->createRelatedRecords($contactInfo->inquiry_id, $data['personalReferences'], CreditInvestigationPersonalReference::class);
            }

            if (!empty($data['personalProperties'])) {
                $this->createRelatedRecords($contactInfo->inquiry_id, $data['personalProperties'], CreditInvestigationPersonalProperty::class);
            }

            return $contactInfo;
        });
    }

    private function formatName(?string $value): string
    {
        return $value ? ucwords(strtolower($value)) : '';
    }
}
