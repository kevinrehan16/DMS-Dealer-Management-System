import { api } from "../../utils/api"

const BASE_ROUTE = '/address';

export const addressService = {

  getRegions: async () => {
      const response = await api.get(`${BASE_ROUTE}/regions`);
      return response.data.map(item => ({ value: item.regCode, label: item.regDesc }));
  },

  getProvinces: async (regCode) => {
      const response = await api.get(`${BASE_ROUTE}/provinces/${regCode}`);
      return response.data.map(item => ({ value: item.provCode, label: item.provDesc }));
  },

  getCities: async (provCode) => {
      const response = await api.get(`${BASE_ROUTE}/cities/${provCode}`);
      return response.data.map(item => ({ value: item.citymunCode, label: item.citymunDesc }));
  },

  getBarangays: async (citymunCode) => {
      const response = await api.get(`${BASE_ROUTE}/barangays/${citymunCode}`);
      return response.data.map(item => ({ value: item.brgyCode, label: item.brgyDesc }));
  }

}