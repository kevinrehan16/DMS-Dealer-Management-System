<?php

namespace App\Http\Controllers\Inquiry;

use App\Models\Inquiry;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\InquiryResource;
use App\Services\InquiryService;
use App\Http\Requests\StoreInquiryRequest;

class InquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    private $inquiryService;

    public function __construct(InquiryService $inquiryService)
    {
        $this->inquiryService = $inquiryService;
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
        $filterBy = $request->input('filterBy');

        $inquiries = $this->inquiryService->listInquiries($search, $filterBy);

        return response()->json([
            'inquiries' => InquiryResource::collection($inquiries),
        ]);
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
    public function store(StoreInquiryRequest $request)
    {
        $inquiry = $this->inquiryService->saveInquiry($request->validated());

        return response()->json([
            'message' => 'Inquiry created successfully.',
            'data' => new InquiryResource($inquiry),
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
