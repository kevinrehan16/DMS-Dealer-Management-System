<?php

namespace App\Services;

use App\Models\CreditInvestigationPrimary;

class InvestigationService
{
    public function getCreditInvestigationById($id)
    {
        return CreditInvestigationPrimary::with([
            'otherSourceIncome',
            'creditReferences',
            'personalReferences',
            'personalPropertiesOwned',
        ])->findOrFail($id); // fetch only one record by ID
    }

    private function formatName(?string $value): string
    {
        return $value ? ucwords(strtolower($value)) : '';
    }
}
