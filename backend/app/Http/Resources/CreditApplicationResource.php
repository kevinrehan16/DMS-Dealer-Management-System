<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreditApplicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_merge(
            $this->attributesToArray(),//! IF YOU STILL WANT TO GET COMPLETE DATA IN ARRAY
            [
                'other_source_incomes' => $this->whenLoaded('otherSourceIncome', function () {
                return $this->otherSourceIncome->map(fn($income) => $income->only(['id','incNature','incAddress']));
                }),
                'credit_references' => $this->whenLoaded('creditReferences', function () {
                    return $this->creditReferences->map(fn($ref) => $ref->only(['id','refFullName','refAddress','refContact','refRelation']));
                }),
                'personal_references' => $this->whenLoaded('personalReferences', function () {
                    return $this->personalReferences->map(fn($pref) => [
                        'id' => $pref->id,
                        'prefCreditor' => $pref->prefCreditor,
                        'prefAddress' => $pref->prefAddress,
                        'prefDateGranted' => $pref->prefDateGranted,
                        'prefOrigBal' => $pref->prefOrigBal,
                        'prefPresBal' => $pref->prefPresBal,
                        'prefMonInstallment' => $pref->prefMonInstallment,
                    ]);
                }),
                'personal_properties_owned' => $this->whenLoaded('personalPropertiesOwned', function () {
                    return $this->personalPropertiesOwned->map(fn($props) => [
                        'id' => $props->id,
                        'propsKind' => $props->propsKind,
                        'propsLocation' => $props->propsLocation,
                        'propsValue' => $props->propsValue,
                        'propsImbursement' => $props->propsImbursement,
                    ]);
                }),
                'attachment_information' => $this->whenLoaded('attachmentInformation', function () {
                    return $this->attachmentInformation->map(fn($attachment) => $attachment->only(['id','attReq','attReq']));
                }),
                // you can add other children the same way
            ]
        );
    }
}
