<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait GeneratesCustomId
{
    protected static function bootGeneratesCustomId()
    {
        static::creating(function ($model) {
            $prefix = $model->customIdPrefix ?? 'ID-';
            $column = $model->customIdColumn ?? 'custom_id';

            $latest = DB::table($model->getTable())
                        ->select($column)
                        ->orderByDesc('id')
                        ->first();

            $nextNumber = 1;

            if ($latest && preg_match("/{$prefix}(\d+)/", $latest->$column, $matches)) {
                $nextNumber = intval($matches[1]) + 1;
            }

            $model->$column = $prefix . str_pad($nextNumber, 7, '0', STR_PAD_LEFT);
        });
    }
}
