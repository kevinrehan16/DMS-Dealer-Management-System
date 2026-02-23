<?php

namespace App\Services;

use App\Models\Inquiry;

class InquiryService
{
    public function listInquiries($search = null, $filterBy = null)
    {
        return Inquiry::with([
                // Limit which customer columns to include
                'customer:id,customer_id,firstName,lastName,addressnum,addressbldg,addressstreet,addressssubd,addressscity,addresssbrgy,addresssprovince,addresssregion,mobile'
            ])
            // Select only the columns you need from inquiries table
            ->select('id', 'inquiry_id', 'customer_id', 'sourceInquiry', 'motorBrand', 'motorModel', 'motorColor', 'motorCashprice', 'motorMonthlyinstallment')
            ->where(function ($query) use ($search) {
                if ($search) {
                    $query->whereRaw('inquiry_id ILIKE ?', ["%{$search}%"])
                        ->orWhereHas('customer', function ($q) use ($search) {
                            $q->whereRaw('"firstName" ILIKE ?', ["%{$search}%"])
                            ->orWhereRaw('"lastName" ILIKE ?', ["%{$search}%"]);
                        });
                }
            })
            ->when($filterBy, function ($query, $filterBy) {
                $query->whereRaw('"sourceInquiry" ILIKE ?', ["%{$filterBy}%"]);
            })
            ->orderBy('id', 'desc')
            ->get();
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
}
