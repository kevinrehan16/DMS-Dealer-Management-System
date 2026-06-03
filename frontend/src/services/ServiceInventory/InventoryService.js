import { api } from "../../utils/api"

export const inventoryService = {

  getInventory: async () => {
      const response = await api.get('/inventory');
      return response.data.data;
  },

  // TODO: Implement saving new inventory item in the frontend to the database
  createInventory: async (inventoryData) => {
      const response = await api.post('/inventory', inventoryData);
      return response.data;
  }
}