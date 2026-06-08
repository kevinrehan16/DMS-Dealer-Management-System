<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;

trait Loggable
{
    // Dito natin ilalagay ang "Human-Readable" message
    protected function logInfo(string $action, string $message, array $context = [])
    {
        Log::info($message, array_merge([
            'timestamp' => now()->toDateTimeString(),
            'action'    => $action, // Para sa categorization (e.g., CI_CREATED)
            'user_id'   => auth()->id(),
            'ip'        => request()->ip(),
        ], $context));
    }

    protected function logError(string $action, string $message, \Exception $e, array $context = [])
    {
        Log::error($message, array_merge([
            'timestamp' => now()->toDateTimeString(),
            'action'    => $action,
            'exception' => get_class($e),
            'trace'     => $e->getMessage(), // Ginawa nating message para hindi sobrang haba
            'user_id'   => auth()->id(),
        ], $context));
    }
}
