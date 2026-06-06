<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesCustomId;
use Illuminate\Support\Facades\Storage;

class CreditApplicationAttachments extends Model
{
    use HasFactory, GeneratesCustomId;

    protected $fillable = [
        'credit_application_primary_id',
        'customer_id',
        'creditAppPrimary_id',
        'attModule',
        'attReq',
        'attFileName',
        'attFileType',
        'attFileSize'
    ];

    protected $customIdPrefix = 'ATT-';
    protected $customIdColumn = 'creditAppAttachments_id';

    protected static function boot()
    {
        parent::boot();

        // FIXME: Kaya nya magdelete ng same file basta same extension, kapag different extension di madedelete yung nasa folder.
        static::deleting(function ($attachment) {
            $path = trim($attachment->attFileName);

            // I-LOG NATIN EKSAKTO KUNG ANO ANG PATH BAGO BURAHIN
            \Log::info("DEBUG: Model attempting to delete path: [" . $path . "]");

            if (!empty($path)) {
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                    \Log::info("SUCCESS: Deleted file: " . $path);
                } else {
                    // DITO NATIN MALALAMAN KUNG BAKIT HINDI NABUBURA
                    \Log::error("FAIL: File does not exist in disk! Path: " . $path);
                }
            }
        });
    }
}
