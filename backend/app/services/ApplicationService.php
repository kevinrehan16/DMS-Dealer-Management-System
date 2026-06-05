<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\{
    CreditApplicationPrimary,
    CreditApplicationPreferences,
    CreditApplicationReferences,
    CreditApplicationIncome,
    CreditApplicationProperties,
    CreditApplicationAttachments
};

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

    public function store(array $primaryData, ?array $files, array $metaData, $inquiryService)
    {
        return DB::transaction(function () use ($primaryData, $files, $metaData, $inquiryService) {

            // 1. Sanitize: I-convert ang empty strings sa null para sa DATE fields/DB
            $sanitizedData = $this->sanitizeData($primaryData);

            // 2. Save Main Application
            $primary = CreditApplicationPrimary::create($sanitizedData);
            $primaryId = $primary->id;
            $creditAppId = $primary->creditApp_id;
            $customerId = $primary->customer_id;

            // 3. Update Inquiry Status
            $inquiryService->updateStatus($customerId, 'CREDIT_APPLICATION');

            // 4. Save Nested Arrays
            $this->saveNestedRows($primaryId, $creditAppId, $primaryData);

            // 5. Handle Attachments
            if ($files) {
                try {
                    $this->handleAttachments($primaryId, $creditAppId, $customerId, $files, $metaData);
                } catch (\Exception $e) {
                    // Rollback files if attachment process fails
                    Storage::deleteDirectory("credit_app_attachments/{$creditAppId}");
                    throw $e;
                }
            }

            return $primary;
        });
    }

    private function sanitizeData(array $data)
    {
        // I-remove yung nested arrays para hindi ma-insert sa primary table
        $clean = collect($data)->except([
            'preferenceRows',
            'referenceRows',
            'incomeRows',
            'propertyRows',
            'attachments_meta'
        ])->toArray();

        // Convert empty strings to null
        return array_map(fn($value) => ($value === '' ? null : $value), $clean);
    }

    private function saveNestedRows($primaryId, $creditAppId, $data)
    {
        $map = [
            'preferenceRows' => CreditApplicationPreferences::class,
            'referenceRows'  => CreditApplicationReferences::class,
            'incomeRows'     => CreditApplicationIncome::class,
            'propertyRows'   => CreditApplicationProperties::class,
        ];

        foreach ($map as $key => $modelClass) {
            foreach ($data[$key] ?? [] as $row) {
                if (!empty(array_filter($row))) {
                    $modelClass::create(array_merge($row, [
                        'credit_application_primary_id' => $primaryId,
                        'creditAppPrimary_id'           => $creditAppId
                    ]));
                }
            }
        }
    }

    private function handleAttachments($primaryId, $creditAppId, $customerId, $files, $metaData)
    {
        foreach ($files as $index => $file) {
            $meta = $metaData[$index] ?? [];
            $moduleName = preg_replace('/[^A-Za-z0-9_\-]/', '_', $meta['attReq'] ?? 'Requirement');
            $filename = "{$moduleName}_" . time() . "_{$index}." . $file->extension();
            $path = $file->storeAs("credit_app_attachments/{$creditAppId}", $filename, 'public');

            CreditApplicationAttachments::create([
                'credit_application_primary_id' => $primaryId,
                'customer_id'                   => $customerId,
                'creditAppPrimary_id'           => $creditAppId,
                'attModule'                     => $meta['attModule'] ?? null,
                'attReq'                        => $meta['attReq'] ?? 'Requirement',
                'attFileName'                   => $path,
                'attFileType'                   => $file->getMimeType(),
                'attFileSize'                   => $file->getSize(),
            ]);
        }
    }

    public function updateApplication(array $validatedData, $id, $files = null)
    {
        // Ito ang magtatala ng files na na-upload para malinis natin kung mag-fail ang transaction
        $uploadedPaths = [];

        try {
            return DB::transaction(function () use ($validatedData, $id, $files, &$uploadedPaths) {

                $application = CreditApplicationPrimary::findOrFail($id);

                // 1. Update Primary Data
                $primary = $validatedData['primary'];
                $application->update([
                    'lastName'          => $primary['lastName'] ?? $application->lastName,
                    'firstName'         => $primary['firstName'] ?? $application->firstName,
                    'birthdate'         => $primary['birthdate'] ?? $application->birthdate,
                    'presentAddress'    => $primary['presentAddress'] ?? $application->presentAddress,
                    'middleName'        => $primary['middleName'] ?? $application->middleName,
                    'spouseName'        => $primary['spouseName'] ?? $application->spouseName,
                    'spouseBirthDate'   => $primary['spouseBirthDate'] ?? $application->spouseBirthDate,
                    'spouseAge'         => $primary['spouseAge'] ?? $application->spouseAge,
                    'age'               => $primary['age'] ?? $application->age,
                    'gender'            => $primary['gender'] ?? $application->gender,
                    'civilStatus'       => $primary['civilStatus'] ?? $application->civilStatus,
                    'education'         => $primary['education'] ?? $application->education,
                    'numChildren'       => $primary['numChildren'] ?? $application->numChildren,
                    'numStudying'       => $primary['numStudying'] ?? $application->numStudying,
                    'otherDependetn'    => $primary['otherDependetn'] ?? $application->otherDependetn,
                    'mobile'            => $primary['mobile'] ?? $application->mobile,
                ]);

                // 2. Explicit Map: [Frontend Key => Model Relationship Function]
                $relationMap = [
                    'preferenceRows' => 'creditReferences',
                    'referenceRows'  => 'personalReferences',
                    'incomeRows'     => 'otherSourceIncome',
                    'propertyRows'   => 'personalPropertiesOwned',
                ];

                // 3. Loop para i-sync ang child tables
                foreach ($relationMap as $frontendKey => $modelRelation) {
                    if (isset($primary[$frontendKey]) && is_array($primary[$frontendKey])) {

                        // Burahin ang lumang records
                        $application->{$modelRelation}()->delete();

                        // I-insert ang bagong records
                        foreach ($primary[$frontendKey] as $rowData) {
                            $application->{$modelRelation}()->create(array_merge($rowData, [
                                'creditAppPrimary_id' => $application->creditApp_id
                            ]));
                        }
                    }
                }

                // 4. Handle Attachments
                if ($files && is_array($files)) {
                    foreach ($files as $file) {
                        $path = $file->store('attachments', 'public');
                        $uploadedPaths[] = $path; // I-track ang path
                        $application->attachments()->create(['file_path' => $path]);
                    }
                }

                return $application;
            });
        } catch (\Exception $e) {
            // Kung may error, burahin ang files na na-upload bago mag-fail ang process
            foreach ($uploadedPaths as $path) {
                Storage::disk('public')->delete($path);
            }

            // I-re-throw ang error para makuha ng Controller
            throw $e;
        }
    }

    private function formatName(?string $value): string
    {
        return $value ? ucwords(strtolower($value)) : '';
    }
}
