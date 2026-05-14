import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { cashierService } from '../../services/ServiceCashier/CashierService'

export const useCashier = (search = '') => {
    // Fetch Payments with optional search
    const paymentsQuery = useQuery({
        queryKey: ['cashier', search],
        queryFn: () => cashierService.getPayments(search),
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });

    return paymentsQuery;
}

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentData) => cashierService.createPayment(paymentData),
    onSuccess: () => {
      // TAMA: Gamitin ang object format para sa v5
      queryClient.invalidateQueries({ queryKey: ['cashier'] });
      
      // Optional: Mag-notif dito o i-close ang modal
      console.log("Payment posted successfully!");
    },
    onError: (error) => {
      // Dito mo mahuhuli yung mga "Validation Error" o "-1 inquiry_id"
      console.error("Payment failed:", error.response?.data || error.message);
    }
  });
}