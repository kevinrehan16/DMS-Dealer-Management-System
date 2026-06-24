<?php

namespace App\Http\Controllers\Motorcycle;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Motorcycle;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreMotorcycleRequest;
use App\Http\Requests\UpdateMotorcycleRequest;
use App\Services\MotorcycleService;
use App\Http\Resources\MotorcycleResource;

class MotorcycleController extends Controller
{
    private $motorcycleService;

    public function __construct(MotorcycleService $motorcycleService)
    {
        $this->motorcycleService = $motorcycleService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $motorcycle = $this->motorcycleService->listMotorcycles();
        return response()->json([
            'motors' => MotorcycleResource::collection($motorcycle)
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
    public function store(StoreMotorcycleRequest $request)
    {
        $validated = $request->validated();

        // I-attach ang user_id ng kasalukuyang naka-login na admin/user
        $validated['user_id'] = Auth::id();

        $motorcycle = Motorcycle::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Motorcycle model added successfully!',
            'data'    => $motorcycle
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Motorcycle $motorcycle)
    {
        $motorcycle = $this->motorcycleService->editMotorcycle($motorcycle->id);

        return response()->json([
            'message' => 'Get customer inquiry.',
            'data' => new MotorcycleResource($motorcycle),
        ], 200);
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
    public function update(UpdateMotorcycleRequest $request, string $id)
    {
        try {
            $validatedData = $request->validated();

            $inquiry = $this->motorcycleService->updateUnitCatalog($id, $validatedData);

            // 3. I-return ang response
            return response()->json([
                'message' => 'Unit Catalog updated successfully.',
                'data'    => new MotorcycleResource($inquiry),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while updating the Unit Catalog.',
                'error'   => $th->getMessage() // I-remove ito sa production para sa security
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
