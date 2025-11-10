<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::orderBy('id', 'desc')->get();
        return response()->json([
            'customers' => $customers,
        ], 200);
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
        $validated = $request->validate([
            'customer_id' => 'required|string|max:30',
            'firstName' => 'required|string|max:60',
            'lastName' => 'required|string|max:60',
            'middleName' => 'required|string|max:60',
            'email' => 'required|email|unique:customers',
            'gender' => 'required|string|max:10',
            'birthdate' => 'required|date|max:20',
            'mobile' => ['required','string','max:20','regex:/^\+?[0-9\-\s]+$/'],
            'title' => 'required|string|max:5',
        ]);

        $customer = Customer::create([
            'customer_id' => strtoupper($validated['customer_id']),
            'firstName' => ucwords(strtolower($validated['firstName'])),
            'lastName' => ucwords(strtolower($validated['lastName'])),
            'middleName' => ucwords(strtolower($validated['middleName'])),
            'email' => strtolower($validated['email']),
            'gender' => $validated['gender'],
            'birthdate' => $validated['birthdate'],
            'mobile' => $validated['mobile'],
            'title' => $validated['title'],
        ]);

        return response()->json([
            'message' => 'Customer created successfully.',
            'customer' => $customer,
        ], 201);

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
