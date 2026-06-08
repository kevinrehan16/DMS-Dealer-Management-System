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
            'contactinfo.inquiry_id' => 'required|exists:inquiries,id',
            'contactinfo.creditInv_id' => 'nullable|string|max:30',
            'contactinfo.cicontactPerson' => 'required|string|max:150',
            'contactinfo.cigender' => 'required|string|max:6',
            'contactinfo.cibirthday' => 'required|date',
            'contactinfo.cicpage' => 'required|integer|min:0',
            'contactinfo.cispouseName' => 'nullable|required_unless:contactinfo.cicivilStatus,Single|string|max:150',
            'contactinfo.cispouseGender' => 'nullable|required_unless:contactinfo.cicivilStatus,Single|string|max:6',
            'contactinfo.cispouseBirthday' => 'nullable|required_unless:contactinfo.cicivilStatus,Single|date',
            'contactinfo.cisage' => 'required|integer|min:0',
            'contactinfo.cicivilStatus' => 'required|string|max:20',
            'contactinfo.cieducation' => 'required|string|max:60',
            'contactinfo.citinNumber' => 'required|string|max:15',
            'contactinfo.cimobile' => 'required|string|max:20',
            'contactinfo.cidependentChildren' => 'nullable|integer|min:0',
            'contactinfo.cistudyingChildren' => 'nullable|integer|min:0',
            'contactinfo.ciotherDependents' => 'nullable|integer|min:0',

            'contactinfo.ciPresAddress' => 'required|string|max:255',
            'contactinfo.ciPresAddrLenStay' => 'required|integer|min:0',
            'contactinfo.ciPresAddrMonStay' => 'required|string|max:10',
            'contactinfo.ciPresAddrType' => 'required|string|max:15',
            // Only force GT:0 if it is Rented. If it is NOT Rented, use GTE:0 (Greater Than or Equal to 0)
            'contactinfo.ciPresAddrRentFee' => [
                'nullable',
                'numeric',
                'required_if:contactinfo.ciPresAddrType,Rented',
                'gte:0',
                function ($attribute, $value, $fail) {
                    // Only if it IS Rented, check if it is > 0
                    if (request()->input('contactinfo.ciPresAddrType') === 'Rented' && $value <= 0) {
                        $fail('The Rent Fee must be greater than zero when Rented.');
                    }
                },
            ],
            'contactinfo.ciPrevAddress' => 'required|string|max:255',
            'contactinfo.ciPrevAddrLenStay' => 'required|integer|min:0',
            'contactinfo.ciPrevAddrMonStay' => 'required|string|max:10',
            'contactinfo.ciProvAddress' => 'nullable|string|max:255',

            'contactinfo.ciEmployedBy' => 'required|string|max:150',
            'contactinfo.ciEmpAddrEmp' => 'required|string|max:255',
            'contactinfo.ciEmpAddrLenStay' => 'required|integer|min:0',
            'contactinfo.ciEmpAddrMonStay' => 'required|string|max:10',
            'contactinfo.ciEmpStatus' => 'required|string|max:30',
            'contactinfo.ciEmpDesignation' => 'required|string|max:30',
            'contactinfo.ciEmpTelNo' => 'nullable|string|max:15',
            'contactinfo.ciEmpPrevEmp' => 'required|string|max:150',
            'contactinfo.ciEmpPrevAddrEmp' => 'required|string|max:255',
            'contactinfo.ciEmpSpouseEmp' => 'nullable|string|max:150',
            'contactinfo.ciEmpSpouseEmpAddr' => 'nullable|string|max:255',
            'contactinfo.ciEmpSpousePosition' => 'nullable|string|max:100',
            'contactinfo.ciEmpPrevTelNo' => 'required|string|max:15',
            'contactinfo.ciIncomeSalaryNet' => 'required|numeric|min:0',
            'contactinfo.ciSpouseIncome' => 'nullable|numeric|min:0',
            'contactinfo.ciRentalIncome' => 'nullable|numeric|min:0',
            'contactinfo.ciBusinessNet' => 'nullable|numeric|min:0',
            'contactinfo.ciOthers' => 'nullable|numeric|min:0',
            'contactinfo.ciTotalIncome' => 'required|numeric|min:0',
            'contactinfo.ciExpenseLiving' => 'required|numeric|min:0',
            'contactinfo.ciExpenseRent' => 'nullable|numeric|min:0',
            'contactinfo.ciExpenseSchooling' => 'nullable|numeric|min:0',
            'contactinfo.ciExpenseInsurance' => 'nullable|numeric|min:0',
            'contactinfo.ciExpenseElectWat' => 'required|numeric|min:0',
            'contactinfo.ciExpenseObligation' => 'nullable|numeric|min:0',
            'contactinfo.ciExpenseLoan' => 'nullable|numeric|min:0',
            'contactinfo.ciExpenseTotal' => 'required|numeric|min:0',
            'contactinfo.ciCheckingAccount' => 'required|string|max:150',
            'contactinfo.ciCAAddrr' => 'required|string|max:255',
            'contactinfo.ciSavingsAccount' => 'required|string|max:150',
            'contactinfo.ciSAAddrr' => 'required|string|max:255',
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            // Basic Info
            'contactinfo.cicontactPerson.required' => 'Please enter the name of the contact person.',
            'contactinfo.cibirthday.required' => 'Please enter the birthday.',
            'contactinfo.cicpage.required' => 'Please enter the age.',

            // Spouse Info (Conditional)
            'contactinfo.cispouseName.required_unless' => 'Since you are not Single, the spouse name is required.',
            'contactinfo.cispouseGender.required_unless' => 'Please enter your spouse\'s gender.',
            'contactinfo.cispouseBirthday.required_unless' => 'Please enter your spouse\'s birthday.',

            // Address
            'contactinfo.ciPresAddress.required' => 'Please enter the current address.',
            'contactinfo.ciPresAddrRentFee.required_if' => 'Since the address is Rented, the rent fee is required.',
            'contactinfo.ciPresAddrRentFee.gt' => 'The rent fee must be greater than zero.',

            // Employment
            'contactinfo.ciEmployedBy.required' => 'Please enter your employer.',
            'contactinfo.ciEmpAddrEmp.required' => 'Please enter the employment address.',
            'contactinfo.ciEmpStatus.required' => 'Please enter your employment status.',
            'contactinfo.ciEmpDesignation.required' => 'Please enter your job position.',

            // Income/Expenses
            '*.numeric' => 'The :attribute must be a number.',
            '*.min' => 'The :attribute cannot be negative.',
            'contactinfo.ciTotalIncome.required' => 'Total income is required.',
            'contactinfo.ciExpenseTotal.required' => 'Total expenses are required.',

            // Default requirement
            'required' => 'The :attribute field is required.',
        ];
    }

    public function attributes()
    {
        return [
            'contactinfo.ciTotalIncome' => 'Total Income',
            'contactinfo.ciPresAddrRentFee' => 'Rent Fee',
            'contactinfo.cicontactPerson' => 'Contact Person',
            // Add other fields here as needed
        ];
    }
}
