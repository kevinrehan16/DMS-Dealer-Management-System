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

    public function otherSourceIncome() {
        return $this->hasMany(CreditApplicationIncome::class, 'credit_application_primary_id', 'id')
                    ->select('id', 'incNature', 'incAddress', 'credit_application_primary_id');
    }

    public function creditReferences() {
        return $this->hasMany(CreditApplicationReferences::class, 'credit_application_primary_id', 'id')
                    ->select('id', 'refFullName', 'refAddress', 'refContact', 'refRelation', 'credit_application_primary_id');
    }

    public function personalReferences() {
        return $this->hasMany(CreditApplicationPreferences::class, 'credit_application_primary_id', 'id')
                    ->select('id', 'prefCreditor', 'prefAddress', 'prefDateGranted', 'prefOrigBal', 'prefPresBal', 'prefMonInstallment', 'credit_application_primary_id');
    }

    public function personalPropertiesOwned() {
        return $this->hasMany(CreditApplicationProperties::class, 'credit_application_primary_id', 'id')
                    ->select('id', 'propsKind', 'propsLocation', 'propsValue', 'propsImbursement', 'credit_application_primary_id');
    }

    public function attachmentInformation() {
        return $this->hasMany(CreditApplicationAttachments::class, 'credit_application_primary_id', 'id')
                    ->select('id', 'attReq', 'credit_application_primary_id');
    }
}
