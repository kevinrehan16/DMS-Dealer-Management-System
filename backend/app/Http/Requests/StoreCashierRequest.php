<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCashierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'inquiry_id' => ['required', 'exists:inquiries,id'],
            'or_number' => ['required', 'unique:cashiers,or_number'],
            'payment_type' => ['required', 'in:MONTHLY_INSTALLMENT,FULL_CASH,RESERVATION,DOWNPAYMENT,PARTIAL_PAYMENT,PENALTY_PAYMENT,ADVANCE_PAYMENT'],
            'amount_collected' => ['required', 'numeric', 'min:1'],
            'payment_mode' => ['required', 'string'],
            'transaction_date' => ['required', 'date'],
            'branch_code' => ['required', 'string'],
        ];
    }
}
