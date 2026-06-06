import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { creditinvService } from '../../services/ServiceCreditinv/CreditinvService'
import Swal from 'sweetalert2';
import { api } from '../../utils/api'

export const useCreditInvestigation = (investigationId) => {

  return useQuery({
    queryKey: ['creditInvestigation', investigationId],
    queryFn: () => creditinvService.getAllCreditInvestigation(investigationId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    enabled: !!investigationId,
  });

};

export const useAssignInvestigator = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (forScheduleInquiries) => creditinvService.assignInvestigator(forScheduleInquiries),
    
    onSuccess: () => {
      // I-refresh ang listahan ng inquiries pagkatapos ng update
      queryClient.invalidateQueries(['inquiries']); 
      alert("Successfully set the schedule of investigator.");
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    }
  })
}