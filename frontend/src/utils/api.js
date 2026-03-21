// api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token'); // or get from context if you have auth context

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
});

// Optional: interceptors for refreshing token, logging, or error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);