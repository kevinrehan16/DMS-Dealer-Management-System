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
        'addressnum',
        'addressbldg',
        'addressstreet',
        'addressssubd',
        'addresssregion',
        'addresssprovince',
        'addressscity',
        'addresssbrgy',
    ];

    protected $customIdPrefix = 'C-';
    protected $customIdColumn = 'customer_id';

    public function creditApplication()
    {
        return $this->hasOne(CreditApplicationPrimary::class, 'customer_id', 'id')
                    ->select('id','customer_id');
    }
}
