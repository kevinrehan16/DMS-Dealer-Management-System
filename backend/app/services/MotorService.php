<?php

namespace App\Services;

use App\Models\ItemList;

class MotorService
{
    public function getMotors()
    {
        return ItemList::latest()->get();
    }

    public function getBrands()
    {
        return ItemList::select('brandName')
                       ->distinct()
                       ->orderBy('brandName', 'asc')
                       ->pluck('brandName');
    }

    public function getModelsByBrand(string $brand)
    {
        return ItemList::where('brandName', $brand)
                       ->select('modelName')
                       ->distinct()
                       ->orderBy('modelName', 'asc')
                       ->pluck('modelName');
    }

    public function getColorsByModel(string $model)
    {
        return ItemList::where('modelName', $model)
                       ->select('color')
                       ->distinct()
                       ->orderBy('color', 'asc')
                       ->pluck('color');
    }

    public function getChassisByColor(string $color)
    {
        return ItemList::where('color', $color)
                       ->select('chassis', 'series', 'interest', 'cashPrice', 'srpValue')
                       ->groupBy('chassis', 'series', 'interest', 'cashPrice', 'srpValue')
                       ->orderBy('chassis', 'asc')
                       ->get();
    }
}
