<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Motorcycle extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'model_name',
        'color',
        'cash_price',
        'original_price',
        'unit_cost',
        'srp_value',
        'installment_price',
        'interest',
        'user_id' // Para malaman kung sino ang nag-add ng motor
    ];

    public function inventories()
    {
        return $this->hasMany(Inventory::class, 'motorcycle_id');
    }
}
