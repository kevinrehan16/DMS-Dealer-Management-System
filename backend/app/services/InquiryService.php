<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Inquiry;

class InquiryService
{
    public function listInquiries($search = null, $filterBy = null, $status = null)
    {
        return Inquiry::with([
            'customer.creditApplication',
            'creditInvestigation:id,inquiry_id',
            'investigator:id,lastName,firstName'
        ])
            ->select(
                'id',
                'inquiry_id',
                'customer_id',
                'investigator_id',
                'sourceInquiry',
                'motorBrand',
                'motorModel',
                'motorColor',
                'motorCashprice',
                'motorMonthlyinstallment',
                'date_creditinvestigation',
                'time_creditinvestigation',
                'inquiry_status',
                'motorInstallmentterm',
                'unit_type',
                'payment_type'
            )
            // SEARCH LOGIC
            ->where(function ($query) use ($search) {
                if ($search) {
                    $query->whereRaw('inquiry_id ILIKE ?', ["%{$search}%"])
                        ->orWhereHas('customer', function ($q) use ($search) {
                            $q->whereRaw('"firstName" ILIKE ?', ["%{$search}%"])
                                ->orWhereRaw('"lastName" ILIKE ?', ["%{$search}%"]);
                        });
                }
            })
            // FILTER BY SOURCE
            ->when($filterBy, function ($query, $filterBy) {
                $query->whereRaw('"sourceInquiry" ILIKE ?', ["%{$filterBy}%"]);
            })
            // FILTER BY STATUS (Para sa Evaluation/Investigation modules)
            ->when($status, function ($query, $status) {
                if (is_array($status)) {
                    return $query->whereIn('inquiry_status', $status);
                }
                return $query->where('inquiry_status', $status);
            })
            ->orderBy('id', 'desc')
            ->get();
    }

    public function getInquiriesForDropdown(Request $request)
    {
        $search = $request->query('search');

        $inquiries = Inquiry::with(['customer:id,firstName,lastName'])
            ->select('id', 'customer_id', 'inquiry_id')
            ->whereHas('customer', function ($query) use ($search) {
                if ($search && $search !== '') {
                    $query->where('firstName', 'ILIKE', "%{$search}%")
                        ->orWhere('lastName', 'ILIKE', "%{$search}%");
                }
            })
            ->orderBy('id', 'desc')
            ->limit(20)
            ->get();

        return $inquiries->map(fn($iq) => [
            'id' => $iq->id,
            'inquiry_id' => $iq->inquiry_id,
            'full_name' => $iq->customer->firstName . ' ' . $iq->customer->lastName
        ]);
    }

    public function saveInquiry(array $data): Inquiry
    {
        return Inquiry::create([
            // 'inquiry_id' => $data['inquiry_id'], //!! Auto-generated in the model
            'customer_id' => $data['customer_id'],
            'sourceInquiry' => $this->formatName($data['sourceInquiry']),
            'salesPersonid' => $data['salesPersonid'],
            'employmentStatus' => $this->formatName($data['employmentStatus']),
            'motorBrand' => $this->formatNameUpper($data['motorBrand']),
            'motorModel' => $this->formatNameUpper($data['motorModel']),
            'motorSeries' => $this->formatNameUpper($data['motorSeries']),
            'motorColor' => $this->formatNameUpper($data['motorColor']),
            'motorChassis' => $this->formatNameUpper($data['motorChassis']),
            'motorLcp' => $data['motorLcp'],
            'motorCashprice' => $data['motorCashprice'],
            'motorRate' => $data['motorRate'],
            'motorDiscount' => $data['motorDiscount'],
            'motorPromnote' => $data['motorPromnote'],
            'motorBranchcode' => $this->formatNameUpper($data['motorBranchcode']),
            'motorInstallmentterm' => $data['motorInstallmentterm'],
            'motorDownpayment' => $data['motorDownpayment'],
            'motorReservation' => $data['motorReservation'],
            'motorSubsidy' => $data['motorSubsidy'],
            'motorMonthlyinstallment' => $data['motorMonthlyinstallment'],
            'motorInstallmentPrice' => $data['motorInstallmentPrice'],
            'motorAmountfinance' => $data['motorAmountfinance'],
            'motorMonthlyuid' => $data['motorMonthlyuid'],
            'motorCustomertype' => $this->formatName($data['motorCustomertype']),
            'unit_type' => $data['unit_type'],
            'payment_type' => $data['payment_type'],
            'inquiry_status' => $this->formatNameUpper($data['inquiry_status']),
        ]);
    }

    public function updateInquiry($id, array $data): Inquiry
    {
        $inquiry = Inquiry::findOrFail($id);

        $inquiry->update([
            'sourceInquiry' => $this->formatName($data['sourceInquiry'] ?? $inquiry->sourceInquiry),
            'salesPersonid' => $data['salesPersonid'] ?? $inquiry->salesPersonid,
            'employmentStatus' => $this->formatName($data['employmentStatus'] ?? $inquiry->employmentStatus),
            'motorBrand' => $this->formatNameUpper($data['motorBrand'] ?? $inquiry->motorBrand),
            'motorModel' => $this->formatNameUpper($data['motorModel'] ?? $inquiry->motorModel),
            'motorSeries' => $this->formatNameUpper($data['motorSeries'] ?? $inquiry->motorSeries),
            'motorColor' => $this->formatNameUpper($data['motorColor'] ?? $inquiry->motorColor),
            'motorChassis' => $this->formatNameUpper($data['motorChassis'] ?? $inquiry->motorChassis),
            'motorLcp' => $data['motorLcp'] ?? $inquiry->motorLcp,
            'motorCashprice' => $data['motorCashprice'] ?? $inquiry->motorCashprice,
            'motorRate' => $data['motorRate'] ?? $inquiry->motorRate,
            'motorDiscount' => $data['motorDiscount'] ?? $inquiry->motorDiscount,
            'motorPromnote' => $data['motorPromnote'] ?? $inquiry->motorPromnote,
            'motorBranchcode' => $this->formatNameUpper($data['motorBranchcode'] ?? $inquiry->motorBranchcode),
            'motorInstallmentterm' => $data['motorInstallmentterm'] ?? $inquiry->motorInstallmentterm,
            'motorDownpayment' => $data['motorDownpayment'] ?? $inquiry->motorDownpayment,
            'motorReservation' => $data['motorReservation'] ?? $inquiry->motorReservation,
            'motorSubsidy' => $data['motorSubsidy'] ?? $inquiry->motorSubsidy,
            'motorMonthlyinstallment' => $data['motorMonthlyinstallment'] ?? $inquiry->motorMonthlyinstallment,
            'motorInstallmentPrice' => $data['motorInstallmentPrice'] ?? $inquiry->motorInstallmentPrice,
            'motorAmountfinance' => $data['motorAmountfinance'] ?? $inquiry->motorAmountfinance,
            'motorMonthlyuid' => $data['motorMonthlyuid'] ?? $inquiry->motorMonthlyuid,
            'motorCustomertype' => $this->formatName($data['motorCustomertype'] ?? $inquiry->motorCustomertype),
            'unit_type' => $data['unit_type'] ?? $inquiry->unit_type,
            'payment_type' => $data['payment_type'] ?? $inquiry->payment_type,
            'inquiry_status' => $this->formatNameUpper($data['inquiry_status'] ?? $inquiry->inquiry_status),
        ]);

        return $inquiry;
    }

    public function editInquiry($inqID)
    {
        return Inquiry::with('customer')->findOrFail($inqID);
    }

    public function assignSchedule(array $inquiryIds, array $schedule)
    {
        return Inquiry::whereIn('id', $inquiryIds)
            ->update([
                // Idagdag itong bagong field
                'investigator_id'          => $schedule['investigator_id'],

                // Siguraduhin na ang keys dito ay tugma sa pinasa mo mula sa Controller
                'date_creditinvestigation' => $schedule['date_creditinvestigation'],
                'time_creditinvestigation' => $schedule['time_creditinvestigation'],

                // Optional: Kung gusto mo ring baguhin ang status pagka-assign
                'inquiry_status'           => 'FOR_INVESTIGATION',
            ]);
    }

    private function formatName(?string $value): string
    {
        return $value ? ucwords(strtolower($value)) : '';
    }

    private function formatNameUpper(?string $value): string
    {
        return $value ? ucwords(strtoupper($value)) : '';
    }

    public function updateStatus($customerId, $status)
    {
        // Hanapin ang inquiry base sa customerId at i-update
        return Inquiry::where('customer_id', $customerId)->update([
            'inquiry_status' => $status,
            'updated_at' => now()
        ]);
    }
}
