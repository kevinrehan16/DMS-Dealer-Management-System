<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class CreditInvestigationOtherSourceIncome extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'inquiry_id',
        'creditOsi_id',
        'osisource',
        'osiamount',
    ];

    protected $customIdPrefix = 'CISI-';
    protected $customIdColumn = 'creditOsi_id';
}
