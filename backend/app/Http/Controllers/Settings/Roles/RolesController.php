<?php

namespace App\Http\Controllers\Settings\Roles;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'roles' => Role::with('permissions')->get(),
            'permissions' => Permission::all()
        ]);
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
    public function storeRole(Request $request)
    {
        $request->validate(['name'=>'required|string|unique:roles,name']);
        $role = Role::create(['name'=>$request->name, 'guard_name'=>'sanctum']);

        // Assign permissions dynamically if passed
        if($request->permissions){
            $role->syncPermissions($request->permissions);
        }

        return response()->json($role, 201);
    }

    public function storePermission(Request $request)
    {
        $request->validate(['name'=>'required|string|unique:permissions,name']);
        $perm = Permission::create(['name'=>$request->name, 'guard_name'=>'sanctum']);
        return response()->json($perm, 201);
    }

    public function assignRoleToUser(Request $request)
    {
        $request->validate([
            'user_id'=>'required|exists:users,id',
            'role'=>'required|exists:roles,name'
        ]);
        $user = \App\Models\User::find($request->user_id);
        $user->syncRoles($request->role); // Replaces old roles
        return response()->json(['message'=>'Role assigned']);
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
