<?php

namespace App\Services;

use App\Models\CreditApplicationPrimary;

class ApplicationService
{
    public function getCreditApplicationById($id)
    {
        return CreditApplicationPrimary::with([
            'otherSourceIncome',
            'creditReferences',
            'personalReferences',
            'personalPropertiesOwned',
            'attachmentInformation'
        ])->findOrFail($id); // fetch only one record by ID
    }

    private function formatName(?string $value): string
    {
        return $value ? ucwords(strtolower($value)) : '';
    }
}
