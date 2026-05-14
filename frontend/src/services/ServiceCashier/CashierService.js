import { api } from "../../utils/api"

export const cashierService = {

  getPayments: async (search = '') => {
      const response = await api.get(`/cashier?search=${search}`);
      return response.data;
  },

  createPayment: async (paymentData) => {
      const response = await api.post('/cashier', paymentData);
      return response.data;
  }

}