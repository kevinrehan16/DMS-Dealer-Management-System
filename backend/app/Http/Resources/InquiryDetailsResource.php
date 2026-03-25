<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InquiryDetailsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        $fullAddress = implode(', ', array_filter([
            $this->customer->addressnum,
            $this->customer->addressbldg,
            $this->customer->addressstreet,
            $this->customer->addressssubd,
            $this->customer->addressscity,
            $this->customer->addresssbrgy,
            $this->customer->addresssprovince,
            $this->customer->addresssregion,
        ]));

        return [
            'id'            => $this->customer->id, // internal DB ID, not exposed to clients
            'customer_id'   => $this->customer->customer_id, // always business-facing ID
            'fullName'      => trim($this->customer->firstName . ' ' . $this->customer->lastName),
            'middleName'    => $this->customer->middleName,
            'title'         => $this->customer->title,
            'gender'        => $this->customer->gender,
            'birthdate'     => $this->customer->birthdate,
            'age'           => $this->customer->age,
            'mobile'        => $this->customer->mobile,
            'telno'         => $this->customer->telno,
            'email'         => $this->customer->email,
            'address'       => $fullAddress ?: 'No Address Provided',
            'sourceInquiry' => $this->sourceInquiry,
            'salesPersonid' => $this->salesPersonid,
            'employmentStatus' => $this->employmentStatus,
            'motorBrand' => $this->motorBrand,
            'motorModel' => $this->motorModel,
            'motorSeries' => $this->motorSeries,
            'motorColor' => $this->motorColor,
            'motorChassis' => $this->motorChassis,
            'motorLcp' => $this->motorLcp,
            'motorCashprice' => $this->motorCashprice,
            'motorRate' => $this->motorRate,
            'motorDiscount' => $this->motorDiscount,
            'motorPromnote' => $this->motorPromnote,
            'motorBranchcode' => $this->motorBranchcode,
            'motorInstallmentterm' => $this->motorInstallmentterm,
            'motorDownpayment' => $this->motorDownpayment,
            'motorReservation' => $this->motorReservation,
            'motorSubsidy' => $this->motorSubsidy,
            'motorMonthlyinstallment' => $this->motorMonthlyinstallment,
            'motorInstallmentPrice' => $this->motorInstallmentPrice,
            'motorAmountfinance' => $this->sourceInquiry,
            'motorMonthlyuid' => $this->motorMonthlyuid,
            'motorCustomertype' => $this->motorCustomertype,
            'inquiry_status' => $this->inquiry_status,
            'userid' => $this->userid,
            'date_creditinvestigation' => $this->date_creditinvestigation,
            'time_creditinvestigation' => $this->time_creditinvestigation,
            'createdAt' => $this->created_at,
        ];
    }
}
