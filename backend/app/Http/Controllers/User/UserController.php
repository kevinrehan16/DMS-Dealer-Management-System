<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json(['users' => $users], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        // 🔑 Generate token (Sanctum)
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:60',
            'lastName' => 'required|string|max:60',
            'email' => 'required|email|unique:users',
            'gender' => 'required|string|max:10',
            'userName' => 'required|string|max:60',
            'password' => 'required|string',
            'userType' => 'required|string|max:60',
        ]);

        try{
            $user = User::create([
                // 'userid' => $validated['userid'], // Auto-generated in Model Trait
                'firstName' => $validated['firstName'],
                'lastName' => $validated['lastName'],
                'email' => $validated['email'],
                'gender' => $validated['gender'],
                'userName' => $validated['userName'],
                'password' => Hash::make($validated['password']),
                'userType' => $validated['userType'],
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create user.', 'message' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'New user created successfully.'], 201);

    }

    public function show($id)
    {
        // Logic to show a specific user
    }

    public function update(Request $request, $id)
    {
        // Logic to update a specific user
    }

    public function destroy($id)
    {
        // Logic to delete a specific user
    }
}
