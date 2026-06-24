<?php

namespace App\Services;

use App\Models\Motorcycle;

class MotorcycleService
{
    public function listMotorcycles()
    {
        return Motorcycle::orderBy('id', 'desc')->get();
    }

    // public function saveMotorcycle(array $data): Customer {}


    public function editMotorcycle($motorcycleId)
    {
        return Motorcycle::findOrFail($motorcycleId);
    }

    public function updateUnitCatalog($id, array $data): Motorcycle
    {
        $motorcycle = Motorcycle::findOrFail($id);

        $motorcycle->update([
            'brand' => $data['brand'] ?? $motorcycle->brand,
            'model_name' => $data['model_name'] ?? $motorcycle->model_name,
            'color' => $data['color'] ?? $motorcycle->color,
            'cash_price' => $data['cash_price'] ?? $motorcycle->cash_price,
            'original_price' => $data['original_price'] ?? $motorcycle->original_price,
            'unit_cost' => $data['unit_cost'] ?? $motorcycle->unit_cost,
            'srp_value' => $data['srp_value'] ?? $motorcycle->srp_value,
            'installment_price' => $data['installment_price'] ?? $motorcycle->installment_price,
            'interest' => $data['interest'] ?? $motorcycle->interest
        ]);

        return $motorcycle;
    }

    private function formatName(?string $value): string
    {
        return $value ? ucwords(strtolower($value)) : '';
    }
}
