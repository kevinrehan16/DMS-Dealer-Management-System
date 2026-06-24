<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MotorcycleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'brand' => $this->brand,
            'model_name' => $this->model_name,
            'color' => $this->color,
            'cash_price' => $this->cash_price,
            'original_price' => $this->original_price,
            'unit_cost' => $this->unit_cost,
            'srp_value' => $this->srp_value,
            'installment_price' => $this->installment_price,
            'interest' => $this->interest,
        ];
    }
}
