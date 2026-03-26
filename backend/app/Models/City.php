<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $table = 'refcitymun';
    public $timestamps = false;

    protected $fillable = [
        'psgcCode',
        'citymunDesc',
        'regDesc',
        'provCode',
        'citymunCode'
    ];

    public function province()
    {
        return $this->belongsTo(Province::class, 'provCode', 'provCode');
    }

    public function barangays()
    {
        return $this->hasMany(Barangay::class, 'citymunCode', 'citymunCode');
    }
}
