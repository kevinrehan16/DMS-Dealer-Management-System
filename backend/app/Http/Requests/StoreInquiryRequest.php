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
            'motorLcp' => ['required','numeric','decimal:2','gt:0'],
            'motorCashprice' => ['required','numeric','decimal:2','gt:0'],
            'motorRate' => ['required','numeric','decimal:2','gt:0'],
            'motorDiscount' => ['required','numeric','decimal:2','gt:0'],
            'motorPromnote' => ['required','numeric','decimal:2','gt:0'],
            'motorBranchcode' => ['required','string','max:30'],
            'motorInstallmentterm' => ['required','string','max:20'],
            'motorDownpayment' => ['required','numeric','decimal:2','gt:0'],
            'motorReservation' => ['required','numeric','decimal:2','gt:0'],
            'motorSubsidy' => ['required','numeric','decimal:2','gt:0'],
            'motorMonthlyinstallment' => ['required','numeric','decimal:2','gt:0'],
            'motorInstallmentPrice' => ['required','numeric','decimal:2','gt:0'],
            'motorAmountfinance' => ['required','numeric','decimal:2','gt:0'],
            'motorMonthlyuid' => ['required','numeric','decimal:2','gt:0'],
            'motorCustomertype' => ['required','string','max:20'],
        ];
    }

    public function messages(): array
    {
        return [
            '*.required' => ':attribute is required.',
            '*.numeric'  => ':attribute must be a valid number.',
            '*.decimal'  => ':attribute must have exactly 2 decimal places.',
            '*.max'      => ':attribute may not exceed :max characters.',
            '*.gt'       => 'The :attribute field must be greater than :value.',
        ];
    }

    public function attributes(): array
    {
        return [
            'customer_id' => 'Customer Fullname',
            'sourceInquiry' => 'Source of Inquiry',
            'salesPersonid' => 'Sales Person',
            'employmentStatus' => 'Employment Status',

            'motorBrand' => 'Motor Brand',
            'motorModel' => 'Motor Model',
            'motorSeries' => 'Motor Series',
            'motorColor' => 'Motor Color',
            'motorChassis' => 'Motor Chassis',
            'motorBranchcode' => 'Motor Branch Code',
            'motorInstallmentterm' => 'Installment Term',
            'motorCustomertype' => 'Customer Type',

            'motorLcp' => 'LCP',
            'motorCashprice' => 'Cash Price',
            'motorRate' => 'Rate',
            'motorDiscount' => 'Discount',
            'motorPromnote' => 'Promissory Note',
            'motorDownpayment' => 'Downpayment',
            'motorReservation' => 'Reservation Fee',
            'motorSubsidy' => 'Subsidy',
            'motorMonthlyinstallment' => 'Monthly Installment',
            'motorInstallmentPrice' => 'Installment Price',
            'motorAmountfinance' => 'Amount Financed',
            'motorMonthlyuid' => 'Monthly UID',
        ];
    }
}
