<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id, // internal DB ID, not exposed to clients
            'customer_id'   => $this->customer_id, // always business-facing ID
            'firstName'     => $this->firstName,
            'lastName'      => $this->lastName,
            'middleName'    => $this->middleName,
            'title'         => $this->title,
            'gender'        => $this->gender,
            'birthdate'     => $this->birthdate,
            'age'           => $this->age,
            'mobile'        => $this->mobile,
            'telno'         => $this->telno,
            'email'         => $this->email,
            'address'       => [
                    'num'       => $this->addressnum,
                    'bldg'      => $this->addressbldg,
                    'street'    => $this->addressstreet,
                    'subd'      => $this->addressssubd,
                    'city'      => $this->addressscity,
                    'brgy'      => $this->addresssbrgy,
                    'province'  => $this->addresssprovince,
                    'region'    => $this->addresssregion,
            ],
            'createdAt' => $this->created_at,
        ];
    }
}
