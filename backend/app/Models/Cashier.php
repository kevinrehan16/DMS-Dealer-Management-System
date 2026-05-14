<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cashier extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'inquiry_id',
        'or_number',
        'transaction_no',
        'payment_type',
        'amount_collected',
        'payment_mode',
        'reference_no',
        'principal_paid',
        'interest_paid',
        'transaction_date',
        'processed_by',
        'branch_code',
        'status',
        'remarks'
    ];

    // Relationship sa Inquiry (Source of Loan)
    public function inquiry()
    {
        return $this->belongsTo(Inquiry::class);
    }

    // Relationship sa User (Ang Cashier)
    public function cashier()
    {
        return $this->belongsTo(User::class, 'processed_by');
    }
}
