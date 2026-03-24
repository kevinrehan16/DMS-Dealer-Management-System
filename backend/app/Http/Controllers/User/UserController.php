<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = strtolower($request->query('search'));
        $userType = strtolower($request->query('userType'));

        //! Kukuhain lahat ng data except sa nakaLOGIN na account '!=', auth()->id()
        $users = User::where('id', '!=', auth()->id())
            // Filter by User Type (administrator/staff)
            ->when($userType, function ($query, $userType) {
                return $query->where('userType', $userType);
            })
            // Search across multiple columns
            ->when($search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('userid', 'ILIKE', "%{$search}%")
                    ->orWhere('firstName', 'ILIKE', "%{$search}%")
                    ->orWhere('lastName', 'ILIKE', "%{$search}%")
                    ->orWhere('userName', 'ILIKE', "%{$search}%")
                    ->orWhere('email', 'ILIKE', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['users' => $users], 200);

    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials: Email or password is incorrect.'], 401);
        }

        $user = Auth::user();
        // 🔑 Generate token (Sanctum)
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
            'permissions' => $user->getAllPermissions()->pluck('name'),
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
        $users = User::findOrFail($id);
        return response()->json(['users' => $users], 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'firstName' => 'required|string|max:60',
            'lastName'  => 'required|string|max:60',
            'email'     => 'required|email|unique:users,email,' . $user->userid . ',userid',
            'gender'    => 'required|string|max:10',
            'userName'  => 'required|string|max:60|unique:users,userName,' . $user->userid . ',userid',
            'userType'  => 'required|string|max:60',
            'password'  => 'nullable|string|min:6'
        ]);

        try {
            // 1. Kunin lahat ng validated data MALIBAN sa password
            $dataToUpdate = collect($validated)->except(['password'])->toArray();

            // 2. I-fill ang model gamit ang data na walang password
            $user->fill($dataToUpdate);

            // 3. KUNG may tinype na password, tsaka lang i-hash at i-set sa model
            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
                // Note: Sa Laravel 10+, kung may 'hashed' cast ka sa Model,
                // pwedeng $user->password = $request->password; na lang.
            }

            // 4. Save ang changes
            $user->save();

            return response()->json(['message' => 'User updated successfully.'], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Update failed.', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        // Logic to delete a specific user
    }
}
