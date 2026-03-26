import { api } from "../../utils/api"

export const creditappService = {
  
  createNewCreditApp: async (creditAppData) => {
    const res = await api.post('/credit-application/save-all', creditAppData, {
      headers: {
        // Pinipilit nating alisin ang default para hindi masira ang binary data
        'Content-Type': 'multipart/form-data', 
      }
    });
    return res.data;
  },

};