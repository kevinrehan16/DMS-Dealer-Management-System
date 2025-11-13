<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class CreditApplicationPreferences extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'credit_application_primary_id',
        'customer_id',
        'creditAppPrimary_id',
        'prefCreditor',
        'prefAddress',
        'prefDateGranted',
        'prefOrigBal',
        'prefPresBal',
        'prefMonInstallment'
    ];

    protected $customIdPrefix = 'PREF-';
    protected $customIdColumn = 'creditAppPref_id';
}
