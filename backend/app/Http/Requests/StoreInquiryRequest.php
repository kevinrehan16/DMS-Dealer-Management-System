<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInquiryRequest extends FormRequest
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
            'customer_id' => ['required','integer'],
            'sourceInquiry' => ['required','string','max:30'],
            'salesPersonid' => ['required','string','max:30'],
            'employmentStatus' => ['required','string','max:30'],
            'motorBrand' => ['required','string','max:30'],
            'motorModel' => ['required','string','max:30'],
            'motorSeries' => ['required','string','max:30'],
            'motorColor' => ['required','string','max:30'],
            'motorChassis' => ['required','string','max:30'],
            'motorLcp' => ['required','numeric','decimal:2'],
            'motorCashprice' => ['required','numeric','decimal:2'],
            'motorRate' => ['required','numeric','decimal:2'],
            'motorDiscount' => ['required','numeric','decimal:2'],
            'motorPromnote' => ['required','numeric','decimal:2'],
            'motorBranchcode' => ['required','string','max:30'],
            'motorInstallmentterm' => ['required','string','max:20'],
            'motorDownpayment' => ['required','numeric','decimal:2'],
            'motorReservation' => ['required','numeric','decimal:2'],
            'motorSubsidy' => ['required','numeric','decimal:2'],
            'motorMonthlyinstallment' => ['required','numeric','decimal:2'],
            'motorInstallmentPrice' => ['required','numeric','decimal:2'],
            'motorAmountfinance' => ['required','numeric','decimal:2'],
            'motorMonthlyuid' => ['required','numeric','decimal:2'],
            'motorCustomertype' => ['required','string','max:20'],
        ];
    }
}
