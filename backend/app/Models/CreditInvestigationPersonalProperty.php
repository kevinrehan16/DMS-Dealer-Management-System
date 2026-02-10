<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class CreditInvestigationPersonalProperty extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'inquiry_id',
        'creditPp_id',
        'ppkind',
        'pplocation',
        'ppvalue',
        'ppimbursement',
    ];

    protected $customIdPrefix = 'CIPP-';
    protected $customIdColumn = 'creditPp_id';

}
