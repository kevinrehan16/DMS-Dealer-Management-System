<?php

namespace App\Services;

use App\Models\Account;
use App\Models\Cashier;
use App\Models\Inquiry;
use Illuminate\Support\Facades\DB;

class CashierService
{

    public function processPayment(array $data)
    {
        return DB::transaction(function () use ($data) {
            $inquiry = Inquiry::findOrFail($data['inquiry_id']);

            // 1. Dito natin idedefine ang variables para hindi sila maging "Undefined"
            $isMonthly = ($data['payment_type'] === 'MONTHLY_INSTALLMENT');
            $targetBalance = $isMonthly ? ($inquiry->motorPromnote ?? 0) : ($inquiry->motorDownpayment ?? 0);
            $status = $isMonthly ? 'ACTIVE' : 'DOWNPAYMENT';

            // 2. Sync Account Configuration
            // Isinama na natin ang $targetBalance sa array para walang Not-Null error
            $account = Account::updateOrCreate(
                ['inquiry_id' => $inquiry->id],
                [
                    'account_status'       => $status,
                    'total_contract_price' => $inquiry->motorPromnote ?? 0,
                    'payment_term_months'  => $inquiry->motorInstallmentterm,
                    'monthly_amortization' => $inquiry->motorMonthlyinstallment ?? 0,
                    'outstanding_balance'  => $targetBalance,
                ]
            );

            // 3. Compute Principal at Interest
            $interestPortion = $isMonthly ? ($inquiry->monthly_uid ?? 0) : 0;
            $principalPortion = $data['amount_collected'] - $interestPortion;

            // 4. Create Cashier Record
            $payment = Cashier::create(array_merge($data, [
                'account_id'     => $account->id,
                'transaction_no' => 'TXN-' . strtoupper(bin2hex(random_bytes(6))),
                'processed_by'   => auth()->id(),
                'principal_paid' => $principalPortion,
                'interest_paid'  => $interestPortion,
                'status'         => 'POSTED'
            ]));

            // 5. Update Balances
            $account->increment('total_amount_paid', $data['amount_collected']);

            // Dito natin binabawasan ang outstanding_balance base sa kinalkula nating balance
            $newBalance = max(0, $account->outstanding_balance - $data['amount_collected']);
            $account->update(['outstanding_balance' => $newBalance]);

            return $payment;
        });
    }
}
