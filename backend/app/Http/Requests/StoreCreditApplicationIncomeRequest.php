<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCreditApplicationIncomeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'credit_application_primary_id' => 'required|exists:credit_application_primaries,id',
            // 'customer_id' => 'nullable|exists:customers,id',
            // 'source' => 'required|string|max:255',
            // 'amount' => 'required|numeric|min:0',
            // 'frequency' => 'nullable|string|in:monthly,weekly,daily,annually',
        ];
    }
}
