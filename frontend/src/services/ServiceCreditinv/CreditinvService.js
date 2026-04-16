import { api } from "../../utils/api"

const BASE_ROUTE = '/evaluation';

export const creditinvService = {

  getAllCreditInvestigation: async (investigationId) => {
    const res = await api.get(`${BASE_ROUTE}/creditinvestigation/${investigationId}`);
    return res.data.creditinvestigations;
  },
  
  createNewCreditInv: async (creditInvData) => {
    const res = await api.post('/credit-investigation/save-all', creditInvData, {
      headers: {
        // Pinipilit nating alisin ang default para hindi masira ang binary data
        'Content-Type': 'multipart/form-data', 
      }
    });
    return res.data;
  },

};