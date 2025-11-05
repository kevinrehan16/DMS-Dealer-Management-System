<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'customerid',
        'firstName',
        'lastName',
        'middleName',
        'email',
        'gender',
        'birthdate',
        'mobile',
        'title',
    ];
}
