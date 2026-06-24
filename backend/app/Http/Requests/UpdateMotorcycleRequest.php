<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class UpdateMotorcycleRequest extends FormRequest
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
            'brand' => ['required', 'string', 'max:20'],
            'model_name' => ['required', 'string', 'max:50'],
            'color' => ['required', 'string', 'max:50'],
            'cash_price' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'gt:0'],
            'original_price' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'gt:0'],
            'unit_cost' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'gt:0'],
            'srp_value' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'gt:0'],
            'installment_price' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'gt:0'],
            'interest' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'gt:0'],
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            '*.required' => ':attribute is required.',
            '*.numeric'  => ':attribute must be a valid number.',
            '*.regex'    => ':attribute format is invalid (max 2 decimal places).',
            '*.decimal'  => ':attribute must have exactly 2 decimal places.',
            '*.max'      => ':attribute may not exceed :max characters.',
            '*.gt'       => 'The :attribute field must be greater than :value.',
            '*.gte'      => 'The :attribute field must be 0 or greater.',
        ];
    }

    public function attributes(): array
    {
        return [
            'brand' => 'Brand name',
            'model_name' => 'Model name',
            'color' => 'Color',

            'cash_price' => 'Cash price',
            'original_price' => 'Original price',
            'unit_cost' => 'Unit cost',
            'srp_value' => 'SRP Value',
            'installment_price' => 'Installment price',
            'interest' => 'Interest',
        ];
    }
}
