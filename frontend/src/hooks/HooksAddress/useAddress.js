import { useQuery } from '@tanstack/react-query'
import { addressService } from '../../services/ServiceAddress/AddressService'

export const useAddress = (selectedCodes) => {
    const { regCode, provCode, citymunCode } = selectedCodes;

    // 1. Fetch Regions (Auto-run on mount)
    const regionsQuery = useQuery({
        queryKey: ['address', 'regions'],
        queryFn: addressService.getRegions,
        staleTime: Infinity, // Address data rarely changes
    });

    // 2. Fetch Provinces (Depends on regCode)
    const provincesQuery = useQuery({
        queryKey: ['address', 'provinces', regCode],
        queryFn: () => addressService.getProvinces(regCode),
        enabled: !!regCode, // Tatakbo lang pag may piniling Region
    });

    // 3. Fetch Cities (Depends on provCode)
    const citiesQuery = useQuery({
        queryKey: ['address', 'cities', provCode],
        queryFn: () => addressService.getCities(provCode),
        enabled: !!provCode, // Tatakbo lang pag may piniling Province
    });

    // 4. Fetch Barangays (Depends on citymunCode)
    const barangaysQuery = useQuery({
        queryKey: ['address', 'barangays', citymunCode],
        queryFn: () => addressService.getBarangays(citymunCode),
        enabled: !!citymunCode, // Tatakbo lang pag may piniling City
    });

    return {
        // Ang data ay formatted na as {value, label} galing sa service mo
        data: {
            regions: regionsQuery.data || [],
            provinces: provincesQuery.data || [],
            cities: citiesQuery.data || [],
            barangays: barangaysQuery.data || [],
        },
        loading: {
            regions: regionsQuery.isLoading,
            provinces: provincesQuery.isFetching,
            cities: citiesQuery.isFetching,
            barangays: barangaysQuery.isFetching,
        },
        errors: {
            regions: regionsQuery.error,
            provinces: provincesQuery.error,
            cities: citiesQuery.error,
            barangays: barangaysQuery.error,
        }
    };
};