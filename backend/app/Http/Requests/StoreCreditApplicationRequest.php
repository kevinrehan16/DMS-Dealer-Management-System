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
    $jsonFields = ['preferenceRows', 'referenceRows', 'incomeRows', 'propertyRows', 'attachments_meta'];
    $data = $this->all();
    foreach ($jsonFields as $field) {
      if ($this->has($field) && is_string($this->input($field))) {
        $data[$field] = json_decode($this->input($field), true);
      }
    }
    $this->merge($data);
  }

  /**
   * Get the validation rules that apply to the request.
   */
  public function rules(): array
  {
    $rules = [
      // Primary fields (Required)
      'customer_id'       => 'required|exists:customers,id',
      'lastName'          => 'required|string|max:60',
      'firstName'         => 'required|string|max:60',
      'middleName'        => 'nullable|string|max:60',
      'birthdate'         => 'required|date',
      'spouseName'        => 'nullable|string|max:150',
      'spouseBirthDate'   => 'nullable|date',
      'presentAddress'    => 'required|string|max:500',

      'age'               => 'nullable|integer|min:0',
      'spouseAge'         => 'nullable|integer|min:0',
      'gender'            => 'nullable|string|max:20',
      'civilStatus'       => 'nullable|string|max:20',
      'education'         => 'nullable|string|max:50',
      'numChildren'       => 'nullable|integer|min:0',
      'numStudying'       => 'nullable|integer|min:0',
      'otherDependetn'    => 'nullable|integer|min:0',
      'mobile'            => 'nullable|string|max:20',

      // Rows (Not Required / Optional)
      'preferenceRows' => 'nullable|array',
      'referenceRows'  => 'nullable|array',
      'incomeRows'     => 'nullable|array',
      'propertyRows'   => 'nullable|array',

      // Attachments (Not Required / Optional)
      'attachments'    => 'nullable|array',
      'attachments.*'  => 'file|mimes:jpeg,png,pdf,doc,docx|max:5120',
    ];

    return $rules;
  }

  /**
   * Custom error messages.
   */
  public function messages(): array
  {
    return [
      'lastName.required'   => 'Last name is required.',
      'firstName.required'  => 'First name is required.',
      'birthdate.required'  => 'Birthdate is required.',
      'presentAddress.required' => 'Present address is required.',
    ];
  }
}
