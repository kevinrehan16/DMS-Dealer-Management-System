<?php

namespace App\Http\Controllers\Inquiry;

use App\Models\Inquiry;
use App\Http\Controllers\Controller;
use App\Http\Resources\InquiryDetailsResource;
use Illuminate\Http\Request;
use App\Http\Resources\InquiryResource;
use App\Services\InquiryService;
use App\Http\Requests\StoreInquiryRequest;
use App\Http\Requests\UpdateInvestigatorRequest;

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
        $this->authorize('viewAny', Inquiry::class);

        $search = $request->input('search');
        $filterBy = $request->input('filterBy');
        $status = $request->input('status');

        $inquiries = $this->inquiryService->listInquiries($search, $filterBy, $status);

        return response()->json([
            'inquiries' => InquiryResource::collection($inquiries),
        ], 200);
    }

    public function getInquiriesForDropdown(Request $request)
    {
        $this->authorize('viewAny', Inquiry::class);

        $inquiries = $this->inquiryService->getInquiriesForDropdown($request);

        return response()->json([
            'inquiries' => InquiryResource::collection($inquiries),
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
    public function store(StoreInquiryRequest $request)
    {
        $this->authorize('create', Inquiry::class);

        $inquiry = $this->inquiryService->saveInquiry($request->validated());

        return response()->json([
            'message' => 'Inquiry created successfully.',
            'data' => new InquiryResource($inquiry),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Inquiry $inquiry)
    {
        $this->authorize('view', $inquiry);

        $inquiry = $this->inquiryService->editInquiry($inquiry->id);

        return response()->json([
            'message' => 'Get customer inquiry.',
            'data' => new InquiryDetailsResource($inquiry),
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
    public function update(Request $request, string $id)
    {
        // $this->authorize('update', $inquiry);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function assignschedule(UpdateInvestigatorRequest $request, Inquiry $inquiry)
    {
        // 1. Authorization check (Existing)
        $this->authorize('assign', $inquiry);

        // 2. Kunin ang validated data mula sa iyong New Request File
        $validated = $request->validated();

        /**
         * Dito natin ipapasa ang investigator_id at schedule details.
         * Note: Dahil array ang 'id' sa luma mong logic (bulk assignment),
         * kailangan din nating ipasa yung investigator_id doon.
         */
        $this->inquiryService->assignSchedule(
            $validated['id'], // Array ng Inquiry IDs
            [
                'investigator_id' => $validated['investigator_id'],
                'date_creditinvestigation' => $validated['date_creditinvestigation'],
                'time_creditinvestigation' => $validated['time_creditinvestigation'],
            ]
        );

        return response()->json([
            'message' => 'Schedule and Investigator assigned successfully.'
        ], 200);
    }

    public function getScheduledInquiries()
    {
        $scheduled = Inquiry::whereNotNull('investigator_id')
            ->whereNotNull('date_creditinvestigation')
            ->with('investigator:id,firstName,lastName','customer:id,firstName,lastName') // Para makita kung sino ang naka-assign
            ->get();

        // I-format para sa FullCalendar
        $events = $scheduled->map(function($inquiry) {
            return [
                'id'    => $inquiry->id,
                'title' => "CI: ".$inquiry->customer->firstName.", ".$inquiry->customer->lastName." - (By:" . $inquiry->investigator->firstName.", ".$inquiry->investigator->lastName.")",
                'start' => $inquiry->date_creditinvestigation . 'T' . $inquiry->time_creditinvestigation,
            ];
        });

        return response()->json($events);
    }

    public function bulkStatusUpdate(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'status' => 'required|string'
        ]);

        // Update lahat ng IDs na pinasa sa isang bagsakan
        Inquiry::whereIn('id', $request->ids)->update([
            'inquiry_status' => $request->status
        ]);

        return response()->json(['message' => 'Updated successfully']);
    }

}
