<?php

namespace App\Http\Controllers\Inquiry;

use App\Models\Inquiry;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //!! TO JOIN TWO TABLES, USE BELONGTO IN THE INQUIRY MODEL TO FETCH CUSTOMER DATA
        $inquiry = Inquiry::with('customer')->orderBy('id', 'desc')->get();

        return response()->json([
            'inquiries' => $inquiry,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = request()->validate([
            // Validation rules here
            'customer_id' => 'required|integer|max:30',
            'sourceInquiry' => 'required|string|max:30',
            'salesPersonid' => 'required|string|max:30',
            'employmentStatus' => 'required|string|max:30',
            'motorBrand' => 'required|string|max:30',
            'motorModel' => 'required|string|max:30',
            'motorSeries' => 'required|string|max:30',
            'motorColor' => 'required|string|max:30',
            'motorChassis' => 'required|string|max:30',
            'motorLcp' => 'required|string|max:30',
            'motorCashprice' => 'required|string|max:30',
            'motorRate' => 'required|string|max:30',
            'motorDiscount' => 'required|string|max:30',
            'motorPromnote' => 'required|string|max:30',
            'motorBranchcode' => 'required|string|max:30',
            'motorInstallmentterm' => 'required|string|max:30',
            'motorDownpayment' => 'required|string|max:30',
            'motorReservation' => 'required|string|max:30',
            'motorSubsidy' => 'required|string|max:30',
            'motorMonthlyinstallment' => 'required|string|max:30',
            'motorInstallmentPrice' => 'required|string|max:30',
            'motorAmountfinance' => 'required|string|max:30',
            'motorMonthlyuid' => 'required|string|max:30',
            'motorCustomertype' => 'required|string|max:30',
        ]);

        $inquiry = Inquiry::create([
            'customer_id' => $validated['customer_id'],
            // 'inquiry_id' => $validated['inquiry_id'], //!! Auto-generated in the model
            'sourceInquiry' => ucwords(strtolower($validated['sourceInquiry'])),
            'salesPersonid' => $validated['salesPersonid'],
            'employmentStatus' => ucwords(strtolower($validated['employmentStatus'])),
            'motorBrand' => strtoupper($validated['motorBrand']),
            'motorModel' => strtoupper($validated['motorModel']),
            'motorSeries' => strtoupper($validated['motorSeries']),
            'motorColor' => strtoupper($validated['motorColor']),
            'motorChassis' => strtoupper($validated['motorChassis']),
            'motorLcp' => $validated['motorLcp'],
            'motorCashprice' => $validated['motorCashprice'],
            'motorRate' => $validated['motorRate'],
            'motorDiscount' => $validated['motorDiscount'],
            'motorPromnote' => $validated['motorPromnote'],
            'motorBranchcode' => strtoupper($validated['motorBranchcode']),
            'motorInstallmentterm' => $validated['motorInstallmentterm'],
            'motorDownpayment' => $validated['motorDownpayment'],
            'motorReservation' => $validated['motorReservation'],
            'motorSubsidy' => $validated['motorSubsidy'],
            'motorMonthlyinstallment' => $validated['motorMonthlyinstallment'],
            'motorInstallmentPrice' => $validated['motorInstallmentPrice'],
            'motorAmountfinance' => $validated['motorAmountfinance'],
            'motorMonthlyuid' => $validated['motorMonthlyuid'],
            'motorCustomertype' => ucwords(strtolower($validated['motorCustomertype'])),
        ]);

        return response()->json([
            'message' => 'Inquiry created successfully.',
            'inquiry' => $inquiry,
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
