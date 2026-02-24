<?php

namespace App\Http\Controllers\Settings\setup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PermissionService;

class ModulePermissionController extends Controller
{
    protected PermissionService $permissionService;

    public function __construct(PermissionService $permissionService)
    {
        $this->permissionService = $permissionService;
    }

    public function createModulePermissions(Request $request)
    {
        $request->validate([
            'module' => 'required|string'
        ]);

        $permissions = $this->permissionService
            ->generateModulePermissions($request->module);

        return response()->json([
            'message' => 'Permissions created successfully',
            'module' => $request->module,
            'permissions' => $permissions
        ]);
    }

    public function assignModulesToRole(Request $request)
    {
        $request->validate([
            'role' => 'required|string|exists:roles,name',
            'modules' => 'required|array',
            'modules.*' => 'string'
        ]);

        $actions = ['view','create','edit','delete'];

        $permissions = collect($request->modules)
            ->flatMap(function ($module) use ($actions) {
                return collect($actions)
                    ->map(function ($action) use ($module) {

                        $permissionName = strtolower($action.' '.$module);

                        \Spatie\Permission\Models\Permission::firstOrCreate([
                            'name' => $permissionName,
                            'guard_name' => 'sanctum'
                        ]);

                        return $permissionName;
                    });
            })
            ->toArray();

        $role = \Spatie\Permission\Models\Role::where('name',$request->role)->first();

        $role->syncPermissions($permissions);

        return response()->json([
            'message' => 'Modules assigned successfully',
            'permissions' => $permissions
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
