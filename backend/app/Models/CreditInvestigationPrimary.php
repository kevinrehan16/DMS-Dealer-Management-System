<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class CreditInvestigationPrimary extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'inquiry_id',
        'creditInv_id',
        'cicontactPerson',
        'cigender',
        'cibirthday',
        'cicpage',
        'cispouseName',
        'cispouseGender',
        'cispouseBirthday',
        'cisage',
        'cicivilStatus',
        'cieducation',
        'citinNumber',
        'cimobile',
        'cidependentChildren',
        'cistudyingChildren',
        'ciotherDependents',

        'ciPresAddress',
        'ciPresAddrLenStay',
        'ciPresAddrMonStay',
        'ciPresAddrType',
        'ciPresAddrRentFee',
        'ciPrevAddress',
        'ciPrevAddrLenStay',
        'ciPrevAddrMonStay',
        'ciProvAddress',

        'ciEmployedBy',
        'ciEmpAddrEmp',
        'ciEmpAddrLenStay',
        'ciEmpAddrMonStay',
        'ciEmpStatus',
        'ciEmpDesignation',
        'ciEmpTelNo',
        'ciEmpPrevEmp',
        'ciEmpPrevAddrEmp',
        'ciEmpSpouseEmp',
        'ciEmpSpouseEmpAddr',
        'ciEmpSpousePosition',
        'ciEmpPrevTelNo',
        'ciIncomeSalaryNet',
        'ciSpouseIncome',
        'ciRentalIncome',
        'ciBusinessNet',
        'ciOthers',
        'ciTotalIncome',
        'ciExpenseLiving',
        'ciExpenseRent',
        'ciExpenseSchooling',
        'ciExpenseInsurance',
        'ciExpenseElectWat',
        'ciExpenseObligation',
        'ciExpenseLoan',
        'ciExpenseTotal',
        'ciCheckingAccount',
        'ciCAAddrr',
        'ciSavingsAccount',
        'ciSAAddrr',
    ];

    protected $customIdPrefix = 'INV-';
    protected $customIdColumn = 'creditInv_id';

    public function otherSourceIncome() {
        return $this->hasMany(CreditInvestigationOtherSourceIncome::class, 'inquiry_id', 'inquiry_id')
                    ->select('id', 'osisource', 'osiamount', 'inquiry_id');
    }

    public function creditReferences() {
        return $this->hasMany(CreditInvestigationCreditReferences::class, 'inquiry_id', 'inquiry_id')
                    ->select('id', 'crcreditor', 'craddress', 'crdategranted', 'crorigbalance', 'crpresbalance', 'crmoinstallment', 'inquiry_id');
    }

    public function personalReferences() {
        return $this->hasMany(CreditInvestigationPersonalReference::class, 'inquiry_id', 'inquiry_id')
                    ->select('id', 'prname', 'praddress', 'prcontact', 'prrelation', 'inquiry_id');
    }

    public function personalPropertiesOwned() {
        return $this->hasMany(CreditInvestigationPersonalProperty::class, 'inquiry_id', 'inquiry_id')
                    ->select('id', 'ppkind', 'pplocation', 'ppvalue', 'ppimbursement', 'inquiry_id');
    }
}
