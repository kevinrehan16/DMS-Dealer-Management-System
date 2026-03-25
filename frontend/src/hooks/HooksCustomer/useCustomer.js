import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { customerService } from '../../services/ServiceCustomer/CustomerService';
import Swal from 'sweetalert2';

const QUERY_KEY = 'customers';
// Dagdagan ng 'filters' na parameter
export const useCustomer = (options = {}) => {
  return useQuery({
    // IMPORTANT: Isama ang filters sa queryKey. 
    // Kapag nagbago ang search, mag-re-fetch ang query na 'to.
    queryKey: [QUERY_KEY],

    // Ipasa ang filters sa service function
    queryFn: () => customerService.getAllCustomers(), // Mas malinis na!
    staleTime: 5 * 60 * 1000, // Expiration TIME ng data, para magauto generate ng bago.
    retry: 3,
    retryDelay: 1000,
    ...options
  });
};

export const useCreateNewCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerService.createNewCustomer,
    onSuccess: () => {
      // ETO ANG PINAKAMAHALAGA:
      // Sinasabi nito sa React Query na "luma na yung listahan ng Inquirys, i-fetch mo uli"
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      
      Swal.fire({
        icon: "success",
        title: "Creating New Customer",
        text: "Customer added successfully!",
        footer: 'Record has been saved.'
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Saving Customer Error",
        text: error.response?.data?.message || "Failed to add new Customer",
        footer: 'Something went wrong'
      });
    }
  });
};