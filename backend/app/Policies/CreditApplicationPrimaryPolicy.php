<?php

namespace App\Policies;

use App\Models\User;
use App\Models\CreditApplicationPrimary;
use Illuminate\Auth\Access\HandlesAuthorization;

class CreditApplicationPrimaryPolicy
{
    /**
     * Create a new policy instance.
     */
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('view evaluation');
    }

    public function view(User $user, CreditApplicationPrimary $application)
    {
        return $user->hasPermissionTo('view evaluation');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('create evaluation');
    }

    public function update(User $user, CreditApplicationPrimary $application)
    {
        return $user->hasPermissionTo('edit evaluation');
    }

    public function delete(User $user, CreditApplicationPrimary $application)
    {
        return $user->hasPermissionTo('delete evaluation');
    }

    public function assign(User $user, CreditApplicationPrimary $application)
    {
        return $user->hasPermissionTo('assign evaluation');
    }

    public function before(User $user, $ability)
    {
        if ($user->hasRole('admin')) {
            return true;
        }
    }
}
