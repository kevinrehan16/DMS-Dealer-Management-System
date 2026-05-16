import { api } from "../../utils/api"

const BASE_ROUTE = '/inquiries';

export const inquiryService = {

  getAllInquiries: async (filters) => {
    const res = await api.get(`${BASE_ROUTE}`, { 
      params: filters
    });
    return res.data.inquiries;
  },

  getInquiryLookup: async (search = '') => {
    const response = await api.get(`${BASE_ROUTE}/information`, {
      params: { search }
    });
    return response.data.inquiries;
  },

  createNewInquiry: async (inquiryData) => {
    const res = await api.post(`${BASE_ROUTE}`, inquiryData);
    return res.data;
  },

  getInquiryById: async (id) => {
    const res = await api.get(`${BASE_ROUTE}/${id}`);
    return res.data;
  },

  updateBulkStatus: async (bulkData) => {
    const res = await api.post(`${BASE_ROUTE}/bulk-status-update`, bulkData);
    return res.data;
  },

  getAllScheduleCi: async () => {
    const res = await api.get(`${BASE_ROUTE}/schedule-ci`);
    return res.data;
  },

}