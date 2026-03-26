<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    use HasFactory;

    protected $table = 'refbrgy';
    public $timestamps = false;

    protected $fillable = [
        'brgyCode',
        'brgyDesc',
        'regCode',
        'provCode',
        'citymunCode'
    ];

    public function city()
    {
        return $this->belongsTo(City::class, 'citymunCode', 'citymunCode');
    }
}
