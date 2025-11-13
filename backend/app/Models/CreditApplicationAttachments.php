<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditApplicationAttachments extends Model
{
    use HasFactory;

    protected $fillable = [
        'credit_application_primary_id',
        'customer_id',
        'creditAppAttachments_id',
        'creditAppPrimary_id',
        'attModule',
        'attReq',
        'attFileName',
        'attFileType',
        'attFileSize'
    ];
}
