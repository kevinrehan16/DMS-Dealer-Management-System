<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class CreditApplicationAttachments extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'credit_application_primary_id',
        'customer_id',
        'creditAppPrimary_id',
        'attModule',
        'attReq',
        'attFileName',
        'attFileType',
        'attFileSize'
    ];

    protected $customIdPrefix = 'ATT-';
    protected $customIdColumn = 'creditAppAttachments_id';
}
