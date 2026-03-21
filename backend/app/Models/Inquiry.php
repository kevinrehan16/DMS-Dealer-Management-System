<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class Inquiry extends Model
{
    use HasFactory, GeneratesCustomId;

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

    protected $customIdPrefix = 'INQ-';
    protected $customIdColumn = 'inquiry_id';


    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id')
                    ->select('id','customer_id','firstName','lastName','addressnum','addressbldg','addressstreet','addressssubd','addressscity','addresssbrgy','addresssprovince','addresssregion','mobile');
    }

    public function creditInvestigation()
    {
        // Inquiry has one Credit Investigation record
        return $this->hasOne(CreditInvestigationPrimary::class, 'inquiry_id', 'id');
    }
}
