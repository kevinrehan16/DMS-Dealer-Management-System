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
            'firstName' => $this->formatName($data['firstName'] ?? ''),
            'lastName'  => $this->formatName($data['lastName'] ?? ''),
            'middleName'=> $this->formatName($data['middleName'] ?? ''),
            'email'     => strtolower($data['email']),
            'gender'    => $data['gender'],
            'birthdate' => $data['birthdate'],
            'mobile'    => $data['mobile'],
            'title'     => $data['title'],
        ]);
    }

    private function formatName(?string $value): string
    {
        return $value ? ucwords(strtolower($value)) : '';
    }
}
