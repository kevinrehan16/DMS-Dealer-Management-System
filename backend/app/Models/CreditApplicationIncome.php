<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class CreditApplicationIncome extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'credit_application_primary_id',
        'customer_id',
        'creditAppPrimary_id',
        'incNature',
        'incAddress'
    ];

    protected $customIdPrefix = 'INC-';
    protected $customIdColumn = 'creditAppInc_id';
}
