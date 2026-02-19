<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait GeneratesCustomId
{
    protected static function bootGeneratesCustomId()
    {
        static::creating(function ($model) {
            DB::transaction(function () use ($model) {
                $prefix = $model->customIdPrefix ?? 'ID-';
                $column = $model->customIdColumn ?? 'custom_id';

                $latest = DB::table($model->getTable())
                    ->lockForUpdate()
                    ->orderByDesc('id')
                    ->value($column);

                $next = $latest
                    ? intval(str_replace($prefix, '', $latest)) + 1
                    : 1;

                $model->$column = $prefix . str_pad($next, 7, '0', STR_PAD_LEFT);
            });
        });
    }
}
