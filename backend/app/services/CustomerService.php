<?php

namespace App\Services;

use App\Models\Customer;

class CustomerService
{
    public function listCustomers()
    {
        return Customer::orderBy('id', 'desc')->get();
    }

    public function saveCustomer(array $data): Customer
    {
        return Customer::create([
            'firstName'        => $this->formatName($data['firstName'] ?? ''),
            'lastName'         => $this->formatName($data['lastName'] ?? ''),
            'middleName'       => $this->formatName($data['middleName'] ?? ''),
            'email'            => strtolower($data['email']),
            'gender'           => $data['gender'] ?? null,
            'birthdate'        => $data['birthdate'] ?? null,
            'mobile'           => $data['mobile'] ?? null,
            'title'            => $data['title'] ?? null,
            'addressnum'       => $data['addressnum'] ?? null,
            'addressbldg'      => $data['addressbldg'] ?? null,
            'addressstreet'    => $data['addressstreet'] ?? null,
            'addressssubd'     => $data['addressssubd'] ?? null,
            'addresssregion'   => $data['addresssregion'] ?? null,
            'addresssprovince' => $data['addresssprovince'] ?? null,
            'addressscity'     => $data['addressscity'] ?? null,
            'addresssbrgy'     => $data['addresssbrgy'] ?? null,
        ]);
    }

    private function formatName(?string $value): string
    {
        return $value ? ucwords(strtolower($value)) : '';
    }
}
