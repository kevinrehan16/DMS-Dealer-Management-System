<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCreditApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * I-convert ang 'primary' JSON string mula sa FormData 
     * para maging array bago i-validate.
     */
    protected function prepareForValidation()
    {
        if ($this->has('primary')) {
            $this->merge([
                'primary' => json_decode($this->input('primary'), true)
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // Primary fields (Required)
            'primary.lastName'          => 'required|string|max:60',
            'primary.firstName'         => 'required|string|max:60',
            'primary.middleName'        => 'nullable|string|max:60',
            'primary.birthdate'         => 'required|date',
            'primary.spouseName'        => 'nullable|string|max:150',
            'primary.spouseBirthDate'   => 'nullable|date',
            'primary.presentAddress'    => 'required|string|max:500',

            'primary.age'               => 'nullable|integer|min:0',
            'primary.spouseAge'         => 'nullable|integer|min:0',
            'primary.gender'            => 'nullable|string|max:20',
            'primary.civilStatus'       => 'nullable|string|max:20',
            'primary.education'         => 'nullable|string|max:50',
            'primary.numChildren'       => 'nullable|integer|min:0',
            'primary.numStudying'       => 'nullable|integer|min:0',
            'primary.otherDependetn'    => 'nullable|integer|min:0',
            'primary.mobile'            => 'nullable|string|max:20',

            // Rows (Not Required / Optional)
            'primary.preferenceRows' => 'nullable|array',
            'primary.referenceRows'  => 'nullable|array',
            'primary.incomeRows'     => 'nullable|array',
            'primary.propertyRows'   => 'nullable|array',

            // Attachments (Not Required / Optional)
            'attachments'    => 'nullable|array',
            'attachments.*'  => 'file|mimes:jpeg,png,pdf|max:5120',
        ];
    }

    /**
     * Custom error messages.
     */
    public function messages(): array
    {
        return [
            'primary.lastName.required'   => 'Last name is required.',
            'primary.firstName.required'  => 'First name is required.',
            'primary.birthdate.required'  => 'Birthdate is required.',
            'primary.presentAddress.required' => 'Present address is required.',
        ];
    }
}
