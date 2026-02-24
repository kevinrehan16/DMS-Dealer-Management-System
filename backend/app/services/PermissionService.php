<?php

namespace App\Services;

use Spatie\Permission\Models\Permission;

class PermissionService
{
    protected array $defaultActions = ['view','create','edit','delete'];

    public function generateModulePermissions(string $moduleName, array $actions = null)
    {
        $actions = $actions ?? $this->defaultActions;

        $created = [];

        foreach ($actions as $action) {
            $permissionName = strtolower($action.' '.$moduleName);

            $permission = Permission::firstOrCreate([
                'name' => $permissionName,
                'guard_name' => 'sanctum'
            ]);

            $created[] = $permission;
        }

        return $created;
    }
}
