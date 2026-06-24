<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInventoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Motorcycle Catalog Rules (Kung kasama ito sa pag-create)
            'brand'             => ['sometimes', 'required', 'string', 'max:20'],
            'model_name'        => ['sometimes', 'required', 'string', 'max:50'],
            'color'             => ['sometimes', 'required', 'string', 'max:50'],

            // Inventory Unit Rules
            'motorcycle_id'     => ['required', 'exists:motorcycles,id'],
            'chassis_number'    => ['required', 'string', 'max:50', 'unique:inventories,chassis_number'],
            'engine_number'     => ['required', 'string', 'max:50', 'unique:inventories,engine_number'],
            'series_number'     => ['required', 'string', 'max:50'],
            'unit_name'         => ['required', 'string', 'max:100'],
            'branch_code'       => ['required', 'string', 'max:10'],
            'unit_description'  => ['nullable', 'string', 'max:255'],
            'unitPicture'       => ['nullable', 'string'], // Pwede mong gawing 'image' kung file upload
            'mv_file_number'    => ['nullable', 'string', 'max:50'],
            'cr_number'         => ['nullable', 'string', 'max:50'],
            'plate_number'      => ['nullable', 'string', 'max:20'],
            'supplier_cost'     => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/', 'gte:0'],
            'unit_type'         => ['required', 'string'],
            'status'            => ['required', 'string'],
            'received_date'     => ['required', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            '*.required' => ':attribute is required.',
            '*.numeric'  => ':attribute must be a valid number.',
            '*.regex'    => ':attribute format is invalid (max 2 decimal places).',
            '*.unique'   => ':attribute already exists in the inventory.',
            '*.max'      => ':attribute may not exceed :max characters.',
        ];
    }

    public function attributes(): array
    {
        return [
            'motorcycle_id'     => 'Motorcycle Model',
            'chassis_number'    => 'Chassis Number',
            'engine_number'     => 'Engine Number',
            'series_number'     => 'Series Number',
            'unit_name'         => 'Unit Name',
            'branch_code'       => 'Branch Code',
            'supplier_cost'     => 'Supplier Cost',
            'unit_type'         => 'Unit Type',
            'received_date'     => 'Received Date',
        ];
    }
}
