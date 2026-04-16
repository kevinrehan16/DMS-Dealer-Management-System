<?php

namespace App\Http\Controllers\CreditInvestigation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCreditInvestigationPrimaryRequest;
use App\Models\CreditInvestigationPrimary;
use App\Services\InvestigationService;
use App\Http\Resources\CreditInvestigationResource;

class CreditInvestigationPrimaryController extends Controller
{
    protected $investigationservice;
    public function __construct(InvestigationService $investigationservice)
    {
        $this->investigationservice = $investigationservice;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', CreditInvestigationPrimary::class);

        return response()->json(['message' => 'Hello Credit Investigation.']);
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
    public function store(StoreCreditInvestigationPrimaryRequest $request)
    {
        $this->authorize('create', CreditInvestigationPrimary::class);

        // TO USE OR ADD THE VALIDATE(), GO TO:
        // Controllers/Requests/StoreCreditInvestigationPrimaryRequest
        $contactInfo = CreditInvestigationPrimary::create($request->validate());
        return response()->json([
            'message' => 'Primary application saved successfully.',
            'data' => $contactInfo
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $investigation = CreditInvestigationPrimary::findOrFail($id);
        $this->authorize('view', $investigation);

        $allcreditinvestigation = $this->investigationservice->getCreditInvestigationById($id);

        return response()->json([
            //! WHEN USING SHOW FUNCTION use this kind of calling the RESOURCES
            'creditinvestigations' => new CreditInvestigationResource($allcreditinvestigation)
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
