<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;
use Illuminate\Database\Eloquent\Casts\Attribute;

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
        'motorCustomertype',
        'unit_type',
        'payment_type',
        'inquiry_status',

        'investigator_id',
        'date_creditinvestigation',
        'time_creditinvestigation'
    ];

    protected $customIdPrefix = 'INQ-';
    protected $customIdColumn = 'inquiry_id';


    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id')
                    ->select('id','customer_id','firstName','lastName','addressnum','addressbldg','addressstreet','addressssubd','addressscity','addresssbrgy','addresssprovince','addresssregion','mobile', 'telno', 'middleName', 'title', 'gender', 'email', 'birthdate', 'age');
    }

    public function creditInvestigation()
    {
        // Inquiry has one Credit Investigation record
        return $this->hasOne(CreditInvestigationPrimary::class, 'inquiry_id', 'id');
    }

    public function investigator()
    {
        return $this->belongsTo(User::class, 'investigator_id', 'id');
    }

    protected function inquiryStatus(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => strtoupper($value), // Gagawing 'NEW' bago i-save
            get: fn (string $value) => strtoupper($value), // Laging babasahin bilang NEW
        );
    }
}
