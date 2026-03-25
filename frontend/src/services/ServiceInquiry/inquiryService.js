import { api } from "../../utils/api"

const BASE_ROUTE = '/inquiries';

export const inquiryService = {

  getAllInquiries: async (filters) => {
    const res = await api.get(`${BASE_ROUTE}`, { 
      params: filters
    });
    return res.data.inquiries;
  },

  createNewInquiry: async (inquiryData) => {
    const res = await api.post(`${BASE_ROUTE}`, inquiryData);
    return res.data;
  },

  getInquiryById: async (id) => {
    const res = await api.get(`${BASE_ROUTE}/${id}`);
    return res.data;
  },

}