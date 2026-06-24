import { api } from "../../utils/api"

export const inventoryService = {

  getUnitCatalog: async () => {
    const response = await api.get('/motorcycle');
    return response.data.motors;
  },

  editUnitCatalog: async ($id) => {
      const response = await api.get('/motorcycle/'+$id);
      return response.data.data;
  },

  updateCatalog: async ($id, $catalogData) => {
      const response = await api.put('/motorcycle/'+$id ,$catalogData);
      return response.data.data;
  },

  createCatalog: async (catalogData) => {
      const response = await api.post('/motorcycle', catalogData);
      return response.data;
  },

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