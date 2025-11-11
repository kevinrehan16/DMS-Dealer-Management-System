<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemList extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_number',
        'itemName',
        'itemDescription',
        'itemPicture',
        'units',
        'brandName',
        'modelName',
        'color',
        'origPrice',
        'cashPrice',
        'unitCost',
        'srpValue',
        'interest',
    ];
}
