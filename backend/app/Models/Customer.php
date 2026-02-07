<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;

class Customer extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'customer_id',
        'firstName',
        'lastName',
        'middleName',
        'email',
        'gender',
        'birthdate',
        'mobile',
        'title',
    ];

    protected $customIdPrefix = 'C-';
    protected $customIdColumn = 'customer_id';
}
