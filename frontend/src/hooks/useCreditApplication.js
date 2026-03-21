// useCreditApplication.js
import { useQuery } from '@tanstack/react-query'
import { api } from '../utils/api'

export const useCreditApplication = (applicationId) => {
  return useQuery({
    queryKey: ['creditApplication', applicationId],
    queryFn: async () => {
      const res = await api.get(`/evaluation/${applicationId}`);
      return res.data.creditapplications;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};