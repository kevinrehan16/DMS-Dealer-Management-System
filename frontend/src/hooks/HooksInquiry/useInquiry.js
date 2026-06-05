import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { inquiryService } from '../../services/ServiceInquiry/inquiryService';
import Swal from 'sweetalert2';

// const QUERY_KEY = 'inquiries';
// Dagdagan ng 'filters' na parameter
export const useInquiry = (filters = {}) => {
  return useQuery({
    // IMPORTANT: Isama ang filters sa queryKey. 
    // Kapag nagbago ang search, mag-re-fetch ang query na 'to.
    queryKey: ['inquiries', filters],

    // Ipasa ang filters sa service function
    queryFn: () => inquiryService.getAllInquiries(filters), // Mas malinis na!
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  });
};

export const useInquiryLookup = (search = '') => {
  return useQuery({
    queryKey: ['inquiryLookup', search],
    queryFn: () => inquiryService.getInquiryLookup(search),
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
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
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      
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

export const useUpdateInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ( { id, inquiryData } ) => inquiryService.updateInquiry(id, inquiryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'], exact: false }); // Mas malawak na invalidation para ma-refresh lahat ng related queries
      queryClient.invalidateQueries({ queryKey: ['inquiry'], exact: false });
      Swal.fire({
        icon: "success",
        title: "Updating Inquiry",
        text: "Inquiry updated successfully!",
        footer: 'Record has been saved.'
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Updating Inquiry Error",
        text: error.response?.data?.message || "Failed to update inquiry",
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

export const useUpdateBulkStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Ang mutationFn ay tumatanggap ng bulkData kapag tinawag na ang mutate()
    mutationFn: (bulkData) => inquiryService.updateBulkStatus(bulkData),
    
    onSuccess: () => {
      // I-refresh ang listahan ng inquiries pagkatapos ng update
      queryClient.invalidateQueries(['inquiries']); 
      alert("Successfully updated!");
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    }
  });
};

export const useGetAllScheduleCi = () => {
  return useQuery({
    queryKey: ['scheduleci'],
    queryFn: () => inquiryService.getAllScheduleCi(),
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
    retry: 3,
    retryDelay: 1000,
  });
}