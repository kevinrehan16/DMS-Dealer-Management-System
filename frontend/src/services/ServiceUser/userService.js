import { api } from "../../utils/api"

export const userService = {
  getAllUsers: async (filters) => {
    const res = await api.get(`/users`, { 
      params: filters // Dito papasok yung { search: 'juan', userType: 'staff' }
    });
    return res.data.users;
  },
  
  createNewUser: async (userData) => {
    const res = await api.post('/users', userData);
    return res.data;
  },

  getUserById: async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data; // Response galing sa show() method mo
  },

  updateUser: async (id, data) => {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  },

};