<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MotorResource extends JsonResource
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
            'item_number' => $this->item_number,
            'itemName' => $this->itemName,
            'itemDescription' => $this->itemDescription,
            'itemPicture' => $this->itemPicture,
            'units' => $this->units,
            'brandName' => $this->brandName,
            'modelName' => $this->modelName,
            'color' => $this->color,
            'origPrice' => $this->origPrice,
            'cashPrice' => $this->cashPrice,
            'unitCost' => $this->unitCost,
            'srpValue' => $this->srpValue,
            'interest' => $this->interest,
            'created_at' => $this->created_at,
        ];
    }
}
