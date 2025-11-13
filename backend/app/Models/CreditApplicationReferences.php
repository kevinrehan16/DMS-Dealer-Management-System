<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class CreditApplicationReferences extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'credit_application_primary_id',
        'customer_id',
        'creditAppPrimary_id',
        'refFullName',
        'refAddress',
        'refContact',
        'refRelation'
    ];

    protected $customIdPrefix = 'REF-';
    protected $customIdColumn = 'creditAppRef_id';
}
