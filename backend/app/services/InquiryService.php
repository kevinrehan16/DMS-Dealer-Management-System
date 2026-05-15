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
                'creditInvestigation:id,inquiry_id'
            ])
            ->select(
                'id',
                'inquiry_id',
                'customer_id',
                'sourceInquiry',
                'motorBrand',
                'motorModel',
                'motorColor',
                'motorCashprice',
                'motorMonthlyinstallment',
                'date_creditinvestigation',
                'time_creditinvestigation',
                'inquiry_status',
                'motorInstallmentterm'
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
        ]);
    }

    public function editInquiry($inqID)
    {
       return Inquiry::with('customer')->findOrFail($inqID);
    }

    public function assignSchedule(array $inquiryIds, array $schedule)
    {
        return Inquiry::whereIn('id', $inquiryIds)
            ->update([
                'date_creditinvestigation' => $schedule['date_schedule'],
                'time_creditinvestigation' => $schedule['time_schedule'],
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
