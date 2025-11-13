<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class CreditApplicationPrimary extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'customer_id',
        'creditApp_id',
        'lastName',
        'firstName',
        'middleName',
        'birthdate',
        'age',
        'gender',
        'civilStatus',
        'education',
        'spouseName',
        'spouseBirthDate',
        'spouseAge',
        'numChildren',
        'numStudying',
        'otherDependetn',
        'presentAddress',
        'mobile'
    ];

    protected $customIdPrefix = 'APP-';
    protected $customIdColumn = 'creditApp_id';
}
