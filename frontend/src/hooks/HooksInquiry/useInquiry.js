import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { inquiryService, createNewInquiry } from '../../services/ServiceInquiry/inquiryService';
import Swal from 'sweetalert2';

const QUERY_KEY = 'inquiries';
// Dagdagan ng 'filters' na parameter
export const useInquiry = (filters = {}) => {
  return useQuery({
    // IMPORTANT: Isama ang filters sa queryKey. 
    // Kapag nagbago ang search, mag-re-fetch ang query na 'to.
    queryKey: [QUERY_KEY, filters],

    // Ipasa ang filters sa service function
    queryFn: () => inquiryService.getAllInquiries(filters), // Mas malinis na!
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  });
};

export const useCreateNewInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inquiryService.createNewInquiry,
    onSuccess: () => {
      // ETO ANG PINAKAMAHALAGA:
      // Sinasabi nito sa React Query na "luma na yung listahan ng Inquirys, i-fetch mo uli"
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      
      Swal.fire({
        icon: "success",
        title: "Creating New Inquiry",
        text: "Inquiry added successfully!",
        footer: 'Record has been saved.'
      });
    },
    onError: (error) => {
      // console.error("API Error Object:", error); 
      // console.error("Server Message:", error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Saving Inquiry Error",
        text: error.response?.data?.message || "Failed to add new inquiry",
        footer: 'Something went wrong'
      });
    }
  });
};

export const useEditInquiry = (id) => {
  return useQuery({
    queryKey: ['inquiry', id],
    queryFn: () => inquiryService.getInquiryById(id),
    enabled: !!id, // Tatakbo lang ito kung may ID (Edit mode)
  });
};