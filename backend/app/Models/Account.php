<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'inquiry_id',
        'account_status',
        'total_contract_price',
        'total_amount_paid',
        'outstanding_balance',
        'payment_term_months',
        'monthly_amortization',
        'release_date',
        'outstanding_balance'
    ];

    public function inquiry()
    {
        return $this->belongsTo(Inquiry::class);
    }

    public function payments()
    {
        return $this->hasMany(Cashier::class);
    }
}
