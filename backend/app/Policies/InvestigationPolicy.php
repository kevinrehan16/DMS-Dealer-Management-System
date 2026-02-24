<?php

namespace App\Policies;

use App\Models\User;
use App\Models\CreditInvestigationPrimary;
use Illuminate\Auth\Access\HandlesAuthorization;

class InvestigationPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('view investigation');
    }

    public function view(User $user, CreditInvestigationPrimary $investigation)
    {
        return $user->hasPermissionTo('view investigation');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('create investigation');
    }

    public function update(User $user, CreditInvestigationPrimary $investigation)
    {
        return $user->hasPermissionTo('edit investigation');
    }

    public function delete(User $user, CreditInvestigationPrimary $investigation)
    {
        return $user->hasPermissionTo('delete investigation');
    }

    public function assign(User $user, CreditInvestigationPrimary $investigation)
    {
        return $user->hasPermissionTo('assign investigation');
    }

    public function before(User $user, $ability)
    {
        if ($user->hasRole('admin')) {
            return true;
        }
    }
}
