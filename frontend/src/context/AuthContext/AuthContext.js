// src/context/AuthContext/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { fetchWithRetry } from '../../utils/network';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchWithRetry(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }, 3, 1000, 'AuthContext')
    .then(res => {
      // console.log('User response:', res.data);
      setUser(res.data.user || res.data); // handle either structure
    })
    .catch(err => {
      // console.error('Auth error:', err.response?.status, err.response?.data);
      setUser(null);
    })
    .finally(() => setLoading(false));
  }, [API_URL]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
