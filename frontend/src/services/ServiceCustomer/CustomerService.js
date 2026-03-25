import { api } from "../../utils/api"

const BASE_ROUTE = '/customers';

export const customerService = {

  getAllCustomers: async (filters) => {
    const res = await api.get(`${BASE_ROUTE}`, { 
      params: filters
    });
    return res.data.customers;
  },

  createNewCustomer: async (customerData) => {
    const res = await api.post(`${BASE_ROUTE}`, customerData);
    return res.data;
  },

}