// useCreditApplication.js
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { creditappService } from '../../services/ServiceCreditapp/CreditappService';
import Swal from 'sweetalert2';
import { api } from '../../utils/api'

export const useCreditApplication = (applicationId) => {
  return useQuery({
    queryKey: ['creditApplication', applicationId],
    queryFn: async () => {
      const res = await api.get(`/evaluation/creditapplication/${applicationId}`);
      return res.data.creditapplications;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    enabled: !!applicationId,
  });
};

export const useCreateNewCreditApp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: creditappService.createNewCreditApp,
    onSuccess: () => {
      // ETO ANG PINAKAMAHALAGA:
      // Sinasabi nito sa React Query na "luma na yung listahan ng users, i-fetch mo uli"
      queryClient.invalidateQueries({ queryKey: ['creditApplication'] });
      queryClient.invalidateQueries({ queryKey: ['inquiries'], exact: false });
      
      Swal.fire({
        icon: "success",
        title: "Creating Credit Application",
        text: "Credit Application saved successfully!",
        footer: 'Record has been saved.'
      });
    },
    onError: (error) => {
      // console.error("API Error Object:", error); 
      // console.error("Server Message:", error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Saving Credit Application Error",
        text: error.response?.data?.message || "Failed to add Credit Application",
        footer: 'Something went wrong'
      });
    }
  });
};

export const useUpdateCreditApp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appId, data }) => creditappService.updateCreditApp(appId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditApplication'] });
      queryClient.invalidateQueries({ queryKey: ['inquiries'], exact: false });
      Swal.fire({
        icon: "success",
        title: "Updating Credit Application",
        text: "Credit Application updated successfully!",
        footer: 'Record has been updated.'
      });
    },
    onError: (error) => {
      // console.error("API Error Object:", error); 
      // console.error("Server Message:", error.response?.data);
      Swal.fire({
        icon: "error",
        title: "Updating Credit Application Error",
        text: error.response?.data?.message || "Failed to update Credit Application",
        footer: 'Something went wrong.'
      });
    }
  });
};
