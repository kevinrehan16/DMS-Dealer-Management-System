<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $table = 'refprovince';
    public $timestamps = false;

    protected $fillable = [
        'psgcCode',
        'provDesc',
        'regCode',
        'provCode'
    ];


    /**
     * Relationship: Province belongs to a Region
     * Format: belongsTo(RelatedModel, foreign_key_sa_table_na_ito, local_key_sa_parent_table)
     */
    public function region()
    {
        return $this->belongsTo(Region::class, 'regCode', 'regCode');
    }

    /**
     * Relationship: Province has many Cities
     * Format: hasMany(RelatedModel, foreign_key_sa_child_table, local_key_sa_table_na_ito)
     */
    public function cities()
    {
        return $this->hasMany(City::class, 'provCode', 'provCode');
    }
}
