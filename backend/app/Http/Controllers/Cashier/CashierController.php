<?php

namespace App\Http\Controllers\Cashier;

use App\Http\Controllers\Controller;
use App\Models\Cashier;
use App\Services\CashierService;
use App\Http\Resources\CashierResource;
use App\Http\Requests\StoreCashierRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CashierController extends Controller
{
    protected $cashierService;

    public function __construct(CashierService $cashierService)
    {
        $this->cashierService = $cashierService;

        // Load policy if needed
        // $this->authorizeResource(Cashier::class, 'cashier');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $payments = Cashier::with(['inquiry', 'cashier', 'inquiry.customer:id,firstName,lastName'])
            ->when($request->search, function ($query, $search) {
                $query->where('or_number', 'like', "%{$search}%")
                    ->orWhereHas('inquiry', function ($q) use ($search) {
                        $q->where('customer_name', 'like', "%{$search}%");
                    });
            })
            ->latest()
            ->paginate($request->per_page ?? 10);

        return CashierResource::collection($payments);
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
    public function store(StoreCashierRequest $request)
    {
        try {
            $payment = $this->cashierService->processPayment($request->validated());

            return response()->json([
                'message' => 'Payment processed successfully',
                'data'    => new CashierResource($payment)
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error'   => 'Failed to process payment',
                'details' => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Cashier $cashier)
    {
        return new CashierResource($cashier->load(['inquiry', 'cashier']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cashier $cashier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cashier $cashier)
    {
        $cashier->update(['status' => 'voided']);
        $cashier->delete(); // Soft delete

        return response()->json(['message' => 'Transaction voided successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cashier $cashier)
    {
        //
    }
}
