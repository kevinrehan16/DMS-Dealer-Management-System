<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'inquiry_id',
        'sourceInquiry',
        'salesPersonid',
        'employmentStatus',
        'motorBrand',
        'motorModel',
        'motorSeries',
        'motorColor',
        'motorChassis',
        'motorLcp',
        'motorCashprice',
        'motorRate',
        'motorDiscount',
        'motorPromnote',
        'motorBranchcode',
        'motorInstallmentterm',
        'motorDownpayment',
        'motorReservation',
        'motorSubsidy',
        'motorMonthlyinstallment',
        'motorInstallmentPrice',
        'motorAmountfinance',
        'motorMonthlyuid',
        'motorCustomertype'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
}
