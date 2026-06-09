<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCreditInvestigationRequest extends FormRequest
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
        $rules = [
            'inquiry_id' => 'nullable|exists:inquiries,id',
            'creditInv_id' => 'nullable|string|max:30',
            'cicontactPerson' => 'required|string|max:150',
            'cigender' => 'required|string|max:6',
            'cibirthday' => 'required|date',
            'cicpage' => 'required|integer|min:0',
            'cispouseName' => 'nullable|required_unless:cicivilStatus,Single|string|max:150',
            'cispouseGender' => 'nullable|required_unless:cicivilStatus,Single|string|max:6',
            'cispouseBirthday' => 'nullable|required_unless:cicivilStatus,Single|date',
            'cisage' => 'required|integer|min:0',
            'cicivilStatus' => 'required|string|max:20',
            'cieducation' => 'required|string|max:60',
            'citinNumber' => 'required|string|max:15',
            'cimobile' => 'required|string|max:20',
            'cidependentChildren' => 'nullable|integer|min:0',
            'cistudyingChildren' => 'nullable|integer|min:0',
            'ciotherDependents' => 'nullable|integer|min:0',

            'ciPresAddress' => 'required|string|max:255',
            'ciPresAddrLenStay' => 'required|integer|min:0',
            'ciPresAddrMonStay' => 'required|string|max:10',
            'ciPresAddrType' => 'required|string|max:15',
            // Only force GT:0 if it is Rented. If it is NOT Rented, use GTE:0 (Greater Than or Equal to 0)
            'ciPresAddrRentFee' => [
                'nullable',
                'numeric',
                'required_if:ciPresAddrType,Rented',
                'gte:0',
                function ($attribute, $value, $fail) {
                    // Only if it IS Rented, check if it is > 0
                    if (request()->input('ciPresAddrType') === 'Rented' && $value <= 0) {
                        $fail('The Rent Fee must be greater than zero when Rented.');
                    }
                },
            ],
            'ciPrevAddress' => 'required|string|max:255',
            'ciPrevAddrLenStay' => 'required|integer|min:0',
            'ciPrevAddrMonStay' => 'required|string|max:10',
            'ciProvAddress' => 'nullable|string|max:255',

            'ciEmployedBy' => 'required|string|max:150',
            'ciEmpAddrEmp' => 'required|string|max:255',
            'ciEmpAddrLenStay' => 'required|integer|min:0',
            'ciEmpAddrMonStay' => 'required|string|max:10',
            'ciEmpStatus' => 'required|string|max:30',
            'ciEmpDesignation' => 'required|string|max:30',
            'ciEmpTelNo' => 'nullable|string|max:15',
            'ciEmpPrevEmp' => 'required|string|max:150',
            'ciEmpPrevAddrEmp' => 'required|string|max:255',
            'ciEmpSpouseEmp' => 'nullable|required_unless:cicivilStatus,Single|string|max:150',
            'ciEmpSpouseEmpAddr' => 'nullable|required_unless:cicivilStatus,Single|string|max:255',
            'ciEmpSpousePosition' => 'nullable|required_unless:cicivilStatus,Single|string|max:100',
            'ciEmpPrevTelNo' => 'nullable|string|max:15',

            'ciIncomeSalaryNet' => 'required|numeric|gt:0',
            'ciSpouseIncome' => 'nullable|required_unless:cicivilStatus,Single|numeric|gt:0',
            'ciRentalIncome' => 'nullable|numeric|min:0',
            'ciBusinessNet' => 'nullable|numeric|min:0',
            'ciOthers' => 'nullable|numeric|min:0',
            'ciTotalIncome' => 'required|numeric|gt:0',

            'ciExpenseLiving' => 'required|numeric|gt:0',
            'ciExpenseRent' => [
                'nullable',
                'numeric',
                'required_if:ciPresAddrType,Rented',
                'gte:0',
                function ($attribute, $value, $fail) {
                    // Only if it IS Rented, check if it is > 0
                    if (request()->input('ciPresAddrType') === 'Rented' && $value <= 0) {
                        $fail('The Rent Fee must be greater than zero when Rented.');
                    }
                },
            ],
            'ciExpenseSchooling' => 'nullable|numeric|min:0',
            'ciExpenseInsurance' => 'nullable|numeric|min:0',
            'ciExpenseElectWat' => 'required|numeric|gt:0',
            'ciExpenseObligation' => 'nullable|numeric|min:0',
            'ciExpenseLoan' => 'nullable|numeric|min:0',
            'ciExpenseTotal' => 'required|numeric|gt:0',

            'ciCheckingAccount' => 'nullable|string|max:150',
            'ciCAAddrr' => 'nullable|string|max:255',
            'ciSavingsAccount' => 'nullable|string|max:150',
            'ciSAAddrr' => 'nullable|string|max:255',

            'otherSourceOfIncome' => 'nullable|array',
            'creditReferences' => 'nullable|array',
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            // Basic Info
            'cicontactPerson.required' => 'Please enter the name of the contact person.',
            'cibirthday.required' => 'Please enter the birthday.',
            'cicpage.required' => 'Please enter the age.',

            // Spouse Info (Conditional)
            'cispouseName.required_unless' => 'Since you are not Single, the spouse name is required.',
            'cispouseGender.required_unless' => 'Please enter your spouse\'s gender.',
            'cispouseBirthday.required_unless' => 'Please enter your spouse\'s birthday.',

            // Address
            'ciPresAddress.required' => 'Please enter the current address.',
            'ciPresAddrRentFee.required_if' => 'Since the address is Rented, the rent fee is required.',
            'ciPresAddrRentFee.gt' => 'The rent fee must be greater than zero.',

            // Employment
            'ciEmployedBy.required' => 'Please enter your employer.',
            'ciEmpAddrEmp.required' => 'Please enter the employment address.',
            'ciEmpStatus.required' => 'Please enter your employment status.',
            'ciEmpDesignation.required' => 'Please enter your job position.',

            // Income/Expenses
            '*.numeric' => 'The :attribute must be a number.',
            '*.min' => 'The :attribute cannot be negative.',
            'ciTotalIncome.required' => 'Total income is required.',
            'ciExpenseTotal.required' => 'Total expenses are required.',

            // Default requirement
            'required' => 'The :attribute field is required.',
        ];
    }

    public function attributes()
    {
        return [
            'ciTotalIncome' => 'Total Income',
            'ciPresAddrRentFee' => 'Rent Fee',
            'cicontactPerson' => 'Contact Person',
            // Add other fields here as needed
        ];
    }
}
