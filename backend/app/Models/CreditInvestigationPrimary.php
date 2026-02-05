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
}
