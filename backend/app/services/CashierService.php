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
        // TODO: Add function for RESERVATION first scenario.

        return DB::transaction(function () use ($data) {
            $inquiry = Inquiry::findOrFail($data['inquiry_id']);
            $isMonthly = ($data['payment_type'] === 'MONTHLY_INSTALLMENT');

            // 1. KUNIN ang account (kung wala pa, mag-i-instantiate)
            $account = Account::firstOrNew(['inquiry_id' => $inquiry->id]);

            // 2. TRAP / VALIDATION: 
            // Kung Monthly ang babayaran, siguraduhing bayad na ang DP
            if ($isMonthly) {
                // I-check kung may existing account na at kung may balance pa ang DP
                // Note: Ang logic na ito ay gagana kung ang status ng DP ay 'DOWNPAYMENT'
                if ($account->exists && $account->account_status === 'DOWNPAYMENT' && $account->outstanding_balance > 0) {
                    throw new \Exception("Transaction declined. Monthly installment payments cannot be processed until the downpayment balance has been fully settled.");
                }
            }

            // 3. I-fill ang configuration
            $account->account_status = $isMonthly ? 'ACTIVE' : 'DOWNPAYMENT';
            $account->total_contract_price = $inquiry->motorPromnote ?? 0;
            $account->payment_term_months = $inquiry->motorInstallmentterm;
            $account->monthly_amortization = $inquiry->motorMonthlyinstallment ?? 0;

            // 4. Logic para sa Stage Transition (Initialization)
            if (!$account->exists) {
                $account->account_status = 'DOWNPAYMENT';
                $account->outstanding_balance = $inquiry->motorDownpayment ?? 0;
            }

            $account->save();

            // 5. Compute Payment
            $interestPortion = $isMonthly ? ($inquiry->monthly_uid ?? 0) : 0;
            $principalPortion = $data['amount_collected'] - $interestPortion;

            // 6. Create Cashier Record
            $payment = Cashier::create(array_merge($data, [
                'account_id'     => $account->id,
                'transaction_no' => 'TXN-' . strtoupper(bin2hex(random_bytes(6))),
                'processed_by'   => auth()->id(),
                'principal_paid' => $principalPortion,
                'interest_paid'  => $interestPortion,
                'status'         => 'POSTED'
            ]));

            // 7. Update Balance
            $account->increment('total_amount_paid', $data['amount_collected']);

            $currentBalance = $account->fresh()->outstanding_balance;
            $newBalance = max(0, $currentBalance - $data['amount_collected']);

            $account->update(['outstanding_balance' => $newBalance]);

            // 8. Opsyonal: Kung na-zero na ang DP, automatic i-switch ang status sa ACTIVE
            if ($account->account_status === 'DOWNPAYMENT' && $newBalance <= 0) {
                $account->update(['account_status' => 'ACTIVE', 'outstanding_balance' => $inquiry->motorPromnote ?? 0]);
            }

            return $payment;
        });
    }
}
