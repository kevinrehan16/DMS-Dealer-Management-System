<?php

namespace App\Services;

use App\Models\Cashier;
use App\Models\Inquiry;

class CashierService
{

    public function processPayment(array $data)
    {
        $inquiry = Inquiry::findOrFail($data['inquiry_id']);

        // Simple logic: Kung monthly installment, gamitin ang monthly_uid sa record
       $interestPortion = ($data['payment_type'] == 'monthly_installment')
                        ? ($inquiry->monthly_uid ?? 0)
                        : 0;

        $principalPortion = $data['amount_collected'] - $interestPortion;

        return Cashier::create(array_merge($data, [
            'transaction_no' => 'TXN-' . strtoupper(uniqid()),
            'processed_by'   => auth()->id(),
            'principal_paid' => $principalPortion,
            'interest_paid'  => $interestPortion,
            'status'         => 'posted'
        ]));
    }


}
