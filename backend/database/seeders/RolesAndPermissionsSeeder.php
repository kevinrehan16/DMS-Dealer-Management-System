<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles & permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'view inquiry',
            'create inquiry',
            'edit inquiry',
            'delete inquiry'
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'sanctum']);
        }

        // Create roles
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'sanctum']);
        $user  = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'sanctum']);
        $guest = Role::firstOrCreate(['name' => 'guest', 'guard_name' => 'sanctum']);

        // Assign permissions
        $admin->givePermissionTo(Permission::all());
        $user->givePermissionTo(['view inquiry', 'create inquiry']);
        $guest->givePermissionTo(['view inquiry']);

        //!! EVERY TIME MAG EDIT KA DITO, IRUN MO ITO SA TERMINAL: php artisan db:seed --class=RolesAndPermissionsSeeder
        // Assign role to a specific user
        $exampleUser = User::where('email','andiestrella@gmail.com')->first();
        if ($exampleUser) {
            $exampleUser->assignRole($guest); // using Role instance
        }

        // Clear cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
