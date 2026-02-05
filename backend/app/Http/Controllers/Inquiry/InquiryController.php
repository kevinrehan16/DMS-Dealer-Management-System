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
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $filterBy = $request->input('filterBy', ''); // e.g., sourceInquiry filter

        $inquiry = Inquiry::with('customer')
            ->where(function ($query) use ($search) {
                if ($search) {
                    $query->whereRaw('inquiry_id ILIKE ?', ["%{$search}%"])
                        ->orWhereHas('customer', function ($q) use ($search) {
                            $q->whereRaw("\"firstName\" ILIKE ?", ["%{$search}%"])
                                ->orWhereRaw("\"lastName\" ILIKE ?", ["%{$search}%"]);
                        });
                }
            })
            ->when($filterBy, function ($query, $filterBy) {
                $query->whereRaw('"sourceInquiry" ILIKE ?', ["%{$filterBy}%"]);
            })
            ->orderBy('id', 'desc')
            ->get();


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
            'customer_id' => 'required|integer',
            'sourceInquiry' => 'required|string|max:30',
            'salesPersonid' => 'required|string|max:30',
            'employmentStatus' => 'required|string|max:30',
            'motorBrand' => 'required|string|max:30',
            'motorModel' => 'required|string|max:30',
            'motorSeries' => 'required|string|max:30',
            'motorColor' => 'required|string|max:30',
            'motorChassis' => 'required|string|max:30',
            'motorLcp' => 'required|numeric|decimal:2',
            'motorCashprice' => 'required|numeric|decimal:2',
            'motorRate' => 'required|numeric|decimal:2',
            'motorDiscount' => 'required|numeric|decimal:2',
            'motorPromnote' => 'required|numeric|decimal:2',
            'motorBranchcode' => 'required|string|max:30',
            'motorInstallmentterm' => 'required|string',
            'motorDownpayment' => 'required|numeric|decimal:2',
            'motorReservation' => 'required|numeric|decimal:2',
            'motorSubsidy' => 'required|numeric|decimal:2',
            'motorMonthlyinstallment' => 'required|numeric|decimal:2',
            'motorInstallmentPrice' => 'required|numeric|decimal:2',
            'motorAmountfinance' => 'required|numeric|decimal:2',
            'motorMonthlyuid' => 'required|numeric|decimal:2',
            'motorCustomertype' => 'required|string|max:20',
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

    public function assignschedule(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|array',
            'schedule.date_schedule' => 'required|date',
            'schedule.time_schedule' => 'required'
        ]);

        // Update all selected inquiry IDs
        Inquiry::whereIn('id', $validated['id'])
            ->update([
                'date_creditinvestigation' => $validated['schedule']['date_schedule'],
                'time_creditinvestigation' => $validated['schedule']['time_schedule'],
            ]);

        return response()->json([
            'message' => 'Schedule updated successfully.'
        ], 200);
    }

}
