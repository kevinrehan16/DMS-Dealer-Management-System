<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditApplicationProperties extends Model
{
    use HasFactory;

    protected $fillable = [
        'credit_application_primary_id',
        'customer_id',
        'creditAppProps_id',
        'creditAppPrimary_id',
        'propsKind',
        'propsLocation',
        'propsValue',
        'propsImbursement'
    ];
}
