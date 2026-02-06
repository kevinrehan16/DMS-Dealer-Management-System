<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class CreditInvestigationCreditReferences extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'inquiry_id',
        'creditCr_id',
        'crcreditor',
        'craddress',
        'crdategranted',
        'crorigbalance',
        'crpresbalance',
        'crmoinstallment',
    ];

    protected $customIdPrefix = 'CICR-';
    protected $customIdColumn = 'creditCr_id';
}
