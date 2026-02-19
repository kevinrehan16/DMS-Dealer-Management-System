<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
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
            'title' => ['required','string','max:5'],
            'firstName' => ['required','string','max:60'],
            'lastName' => ['required','string','max:60'],
            'middleName' => ['nullable','string','max:60'],
            'email' => ['required','email','unique:customers,email'],
            'gender' => ['required','string','max:10'],
            'birthdate' => ['required','date'],
            'mobile' => ['required','string','max:20','regex:/^\+?[0-9\-\s]+$/'],
        ];
    }
}
