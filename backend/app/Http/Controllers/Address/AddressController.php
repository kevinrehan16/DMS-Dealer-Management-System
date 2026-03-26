<?php

namespace App\Http\Controllers\Address;

use App\Http\Controllers\Controller;
use App\Models\Barangay;
use App\Models\City;
use App\Models\Province;
use App\Models\Region;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function getRegions(Request $request)
    {
        $search = $request->query('search');
        $regions = Region::when($search, function ($query, $search) {
            return $query->where('regDesc', 'ILIKE', "%{$search}%");
        })
        ->orderBy('regDesc', 'asc')
        ->limit(20) // Limit para mabilis ang loading
        ->get();

        return response()->json($regions);
    }

    // Search Provinces under a Region
    public function getProvinces(Request $request, $regCode)
    {
        $search = $request->query('search');
        $provinces = Province::where('regCode', $regCode)
            ->when($search, function ($query, $search) {
                return $query->where('provDesc', 'ILIKE', "%{$search}%");
            })
            ->orderBy('provDesc', 'asc')
            ->get();

        return response()->json($provinces);
    }

    // Search Cities under a Province
    public function getCities(Request $request, $provCode)
    {
        $search = $request->query('search');
        $cities = City::where('provCode', $provCode)
            ->when($search, function ($query, $search) {
                return $query->where('citymunDesc', 'ILIKE', "%{$search}%");
            })
            ->orderBy('citymunDesc', 'asc')
            ->get();

        return response()->json($cities);
    }

    // Search Barangays under a City
    public function getBarangays(Request $request, $citymunCode)
    {
        $search = $request->query('search');
        $barangays = Barangay::where('citymunCode', $citymunCode)
            ->when($search, function ($query, $search) {
                return $query->where('brgyDesc', 'ILIKE', "%{$search}%");
            })
            ->orderBy('brgyDesc', 'asc')
            ->get();

        return response()->json($barangays);
    }
}
