import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR: Dito natin ilalagay ang token bago lumabas ang request
api.interceptors.request.use(
  (config) => {
    // Kinukuha ang token sa loob mismo ng request cycle
    const token = sessionStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR: Dito natin ihahandle ang Global Errors (tulad ng 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Halimbawa: Pag nag-expire ang token (401), i-logout si user
    if (error.response && error.response.status === 401) {
      sessionStorage.clear();
      window.location.href = '/login'; 
    }
    
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);