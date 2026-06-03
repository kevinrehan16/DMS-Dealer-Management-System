<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'motorcycle_id',
        'chassis_number',
        'engine_number',
        'series_number',
        'unit_name',
        'branch_code',
        'unit_description',
        'mv_file_number',
        'cr_number',
        'plate_number',
        'supplier_cost',
        'unit_type',
        'status',
        'received_date'
    ];

    public function motorcycle()
    {
        return $this->belongsTo(Motorcycle::class, 'motorcycle_id');
    }
}
