import { api } from "../../utils/api"

const BASE_ROUTE = '/motors';

export const motorService = {

  getMotorByBrand: async () => {
    const res = await api.get(`${BASE_ROUTE}/motorbrands`);
    return res.data.brandMotor;
  },

  getMotorModels: async (brand) => {
    const res = await api.get(`${BASE_ROUTE}/motormodels/${brand}`);
    return res.data.models;
  },

  getMotorColors: async (model) => {
    const res = await api.get(`${BASE_ROUTE}/motorcolors/${model}`);
    return res.data.colors;
  },

  getMotorChassis: async (color) => {
    const res = await api.get(`${BASE_ROUTE}/motorchassis/${color}`);
    return res.data.chassis;
  },

}