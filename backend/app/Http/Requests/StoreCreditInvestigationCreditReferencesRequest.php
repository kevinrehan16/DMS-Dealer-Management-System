<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCreditInvestigationCreditReferencesRequest extends FormRequest
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
            // 'inquiry_id'     => 'required|integer',
            // 'creditInv_id'   => 'required|string',
            // 'cicontactPerson'=> 'required|string|max:100',
            // 'cigender'       => 'required|string|max:8',
        ];
    }
}
