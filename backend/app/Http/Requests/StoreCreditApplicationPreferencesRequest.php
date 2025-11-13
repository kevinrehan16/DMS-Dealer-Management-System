<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCreditApplicationPreferencesRequest extends FormRequest
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
            // 'preferred_brand' => 'nullable|string|max:100',
            // 'preferred_model' => 'nullable|string|max:100',
        ];
    }
}
