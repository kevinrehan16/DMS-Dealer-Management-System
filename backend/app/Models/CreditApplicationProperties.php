<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class CreditApplicationProperties extends Model
{
    use HasFactory, GeneratesCustomId;

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

    protected $customIdPrefix = 'PRO-';
    protected $customIdColumn = 'creditAppProps_id';
}
