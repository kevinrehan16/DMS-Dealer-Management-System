<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;

    protected $table = 'refregion';
    public $timestamps = false; // Dahil walang created_at/updated_at sa SQL dump

    // Siguraduhin na ang casing ay tugma sa double quotes sa SQL
    protected $fillable = ['psgcCode', 'regDesc', 'regCode'];

    public function provinces()
    {
        // format: (RelatedModel, foreign_key, local_key)
        return $this->hasMany(Province::class, 'regCode', 'regCode');
    }
}
