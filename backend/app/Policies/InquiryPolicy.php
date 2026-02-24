<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Inquiry;
use Illuminate\Auth\Access\HandlesAuthorization;

class InquiryPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('view inquiry');
    }

    public function view(User $user, Inquiry $inquiry)
    {
        return $user->hasPermissionTo('view inquiry');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('create inquiry');
    }

    public function update(User $user, Inquiry $inquiry)
    {
        return $user->hasPermissionTo('edit inquiry');
    }

    public function delete(User $user, Inquiry $inquiry)
    {
        return $user->hasPermissionTo('delete inquiry');
    }

    public function assign(User $user, Inquiry $inquiry)
    {
        return $user->hasPermissionTo('assign inquiry');
    }

    public function before(User $user, $ability)
    {
        if ($user->hasRole('admin')) {
            return true;
        }
    }
}
