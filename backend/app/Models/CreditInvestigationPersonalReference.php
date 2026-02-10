<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class CreditInvestigationPersonalReference extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'inquiry_id',
        'creditPr_id',
        'prname',
        'praddress',
        'prcontact',
        'prrelation',
    ];

    protected $customIdPrefix = 'CIPR-';
    protected $customIdColumn = 'creditPr_id';
}
