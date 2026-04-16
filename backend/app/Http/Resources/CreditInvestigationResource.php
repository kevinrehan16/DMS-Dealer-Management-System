<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreditInvestigationResource extends JsonResource
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
                return $this->otherSourceIncome->map(fn($income) => $income->only(['id','osisource','osiamount']));
                }),
                'credit_references' => $this->whenLoaded('creditReferences', function () {
                    return $this->creditReferences->map(fn($ref) => $ref->only(['id','crcreditor','craddress','crdategranted','crorigbalance','crpresbalance','crmoinstallment']));
                }),
                'personal_references' => $this->whenLoaded('personalReferences', function () {
                    return $this->personalReferences->map(fn($pref) => [
                        'id' => $pref->id,
                        'prname' => $pref->prname,
                        'praddress' => $pref->praddress,
                        'prcontact' => $pref->prcontact,
                        'prrelation' => $pref->prrelation,
                    ]);
                }),
                'personal_properties_owned' => $this->whenLoaded('personalPropertiesOwned', function () {
                    return $this->personalPropertiesOwned->map(fn($props) => [
                        'id' => $props->id,
                        'ppkind' => $props->ppkind,
                        'pplocation' => $props->pplocation,
                        'ppvalue' => $props->ppvalue,
                        'ppimbursement' => $props->ppimbursement,
                    ]);
                }),
                // you can add other children the same way
            ]
        );
    }
}
