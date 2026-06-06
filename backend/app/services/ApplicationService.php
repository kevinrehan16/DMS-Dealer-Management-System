<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
    ])->findOrFail($id);
  }

  public function store(array $data, ?array $files, array $metaData, $inquiryService)
  {
    return DB::transaction(function () use ($data, $files, $metaData, $inquiryService) {
      $sanitizedData = $this->sanitizeData($data);
      $primary = CreditApplicationPrimary::create($sanitizedData);

      $inquiryService->updateStatus($primary->customer_id, 'CREDIT_APPLICATION');
      $this->saveNestedRows($primary->id, $primary->creditApp_id, $data);

      if ($files) {
        $this->handleAttachments($primary->id, $primary->creditApp_id, $primary->customer_id, $files, $metaData);
      }
      return $primary;
    });
  }

  public function updateApplication(array $data, $id, $files, array $metaData)
  {
    // \Log::info("DEBUG DATA:", $data['referenceRows']);
    return DB::transaction(function () use ($data, $id, $files, $metaData) {
      $application = CreditApplicationPrimary::findOrFail($id);

      // Update Primary Data
      $nestedKeys = ['preferenceRows', 'incomeRows', 'propertyRows', 'attachments_meta'];
      $primaryData = collect($data)->except($nestedKeys)->toArray();
      $application->update($primaryData);

      // Sync Nested Rows
      $relationMap = [
        'preferenceRows' => ['rel' => 'personalReferences', 'fields' => ['prefCreditor', 'prefAddress', 'prefDateGranted', 'prefOrigBal', 'prefPresBal', 'prefMonInstallment']],
        'referenceRows'  => ['rel' => 'creditReferences', 'fields' => ['refFullName', 'refAddress', 'refContact', 'refRelation']],
        'incomeRows'     => ['rel' => 'otherSourceIncome', 'fields' => ['incNature', 'incAddress']],
        'propertyRows'   => ['rel' => 'personalPropertiesOwned', 'fields' => ['propsKind', 'propsLocation', 'propsValue', 'propsImbursement']],
      ];

      foreach ($relationMap as $key => $config) {
        // Ngayon ay defined na ang $key dito!
        if (isset($data[$key]) && is_array($data[$key])) {

          $application->{$config['rel']}()->delete();

          foreach ($data[$key] as $row) {
            $row = (array)$row;

            // I-remove ang 'id' kung meron man para hindi mag-conflict sa DB
            if (isset($row['id'])) unset($row['id']);

            if (empty(array_filter($row))) continue;

            $saveData = [
              'credit_application_primary_id' => $application->id,
              'customer_id'                   => $application->customer_id,
              'creditAppPrimary_id'           => $application->creditApp_id,
            ];

            // \Log::info("DEBUG 2ND DATA:", $row);
            foreach ($config['fields'] as $f) {
              $val = $row[$f] ?? null;

              // Numeric handling
              if (in_array($f, ['prefOrigBal', 'prefPresBal', 'prefMonInstallment', 'propsValue', 'propsImbursement'])) {
                $saveData[$f] = is_numeric($val) ? $val : 0;
              } else {
                $saveData[$f] = $val;
              }
            }

            // \Log::info("DEBUG SAVEDATA:", $saveData);
            $application->{$config['rel']}()->create($saveData);
          }
        }
      }

      // FIXME: Kaya nya magdelete ng same file basta same extension, kapag different extension di madedelete yung nasa folder.
      $idsToDelete = collect($metaData)->where('isDeleted', true)->pluck('myAttId')->filter()->toArray();

      // 2. I-delete ang mga tinanggal sa frontend
      if (!empty($idsToDelete)) {
        $toDelete = $application->attachmentInformation()->whereIn('id', $idsToDelete)->get();
        foreach ($toDelete as $item) {
          if ($item->attFileName && Storage::disk('public')->exists($item->attFileName)) {
            Storage::disk('public')->delete($item->attFileName);
          }
          $item->delete();
        }
      }

      if ($files) {
        $this->handleAttachments($application->id, $application->creditApp_id, $application->customer_id, $files, $metaData);
      }
      return $application;
    });
  }

  private function sanitizeData(array $data)
  {
    $clean = collect($data)->except(['preferenceRows', 'referenceRows', 'incomeRows', 'propertyRows', 'attachments_meta'])->toArray();
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
          $modelClass::create(array_merge($row, ['credit_application_primary_id' => $primaryId, 'creditAppPrimary_id' => $creditAppId]));
        }
      }
    }
  }

  private function handleAttachments($primaryId, $creditAppId, $customerId, $files, $metaData)
  {
    foreach ($files as $index => $file) {
      $meta = $metaData[$index] ?? [];
      $reqName = $meta['attReq'] ?? 'Requirement';

      // Tignan kung may existing na record para sa reqName na ito
      $existing = CreditApplicationAttachments::where('creditAppPrimary_id', $creditAppId)
        ->where('attReq', $reqName)
        ->first();

      $path = $file->storeAs("credit_app_attachments/{$creditAppId}", $file->getClientOriginalName(), 'public');

      if ($existing) {
        // REPLACE: Burahin ang luma, i-update ang existing record
        if ($existing->attFileName && Storage::disk('public')->exists($existing->attFileName)) {
          Storage::disk('public')->delete($existing->attFileName);
        }

        $existing->update([
          'attFileName' => $path,
          'attFileType' => $file->getMimeType(),
          'attFileSize' => $file->getSize(),
        ]);
      } else {
        // CREATE: Wala pang file para sa req na ito
        CreditApplicationAttachments::create([
          'credit_application_primary_id' => $primaryId,
          'customer_id' => $customerId,
          'creditAppPrimary_id' => $creditAppId,
          'attFileName' => $path,
          'attModule' => $meta['attModule'],
          'attReq' => $reqName,
          'attFileType' => $file->getMimeType(),
          'attFileSize' => $file->getSize(),
        ]);
      }
    }
  }
}
