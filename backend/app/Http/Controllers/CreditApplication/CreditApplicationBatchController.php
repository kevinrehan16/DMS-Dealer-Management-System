<?php

namespace App\Http\Controllers\CreditApplication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// Add these
use Illuminate\Support\Facades\DB; // Correct DB import

use App\Models\CreditApplicationPrimary;
use App\Models\CreditApplicationPreferences;
use App\Models\CreditApplicationReferences;
use App\Models\CreditApplicationIncome;
use App\Models\CreditApplicationProperties;
use App\Models\CreditApplicationAttachments;
use App\Services\InquiryService; // Import ang service
use App\Http\Requests\StoreCreditApplicationRequest;
use App\Services\ApplicationService;

class CreditApplicationBatchController extends Controller
{
  protected $inquiryService, $applicationService;

  // Dependency Injection via Constructor
  public function __construct(InquiryService $inquiryService, ApplicationService $applicationService)
  {
    $this->inquiryService = $inquiryService;
    $this->applicationService = $applicationService;
  }
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
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
  public function store(StoreCreditApplicationRequest $request)
  {
    try {
      $this->applicationService->store(
        $request->validated(),
        $request->file('attachments'),
        $request->input('attachments_meta') ?? [],
        $this->inquiryService
      );
      return response()->json(['message' => 'Credit application saved successfully.'], 201);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
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
  public function update(StoreCreditApplicationRequest $request, $id)
  {
    try {
      $this->applicationService->updateApplication($request->validated(), $id, $request->file('attachments'), $request->input('attachments_meta') ?? []);
      return response()->json(['message' => 'Credit application updated successfully!'], 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
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
