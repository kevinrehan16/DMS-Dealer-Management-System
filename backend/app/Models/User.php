<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\GeneratesCustomId;
use Spatie\Permission\Traits\HasRoles; // Install composer spatie/laravel-permission, to use role and permission

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, GeneratesCustomId, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'userid',
        'firstName',
        'lastName',
        'midleName',
        'gender',
        'userName',
        'userType'
    ];

    protected $customIdPrefix = 'USER-';
    protected $customIdColumn = 'userid';

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    protected $guard_name = 'sanctum';
}
