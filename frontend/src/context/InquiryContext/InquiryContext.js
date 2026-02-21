import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import { fetchWithRetry } from '../../utils/network';

const InquiryContext = createContext();
export const useInquiry = () => useContext(InquiryContext);

export const InquiryProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [inquiriesContext, setInquiriesContext] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const getInquiriesContext = async () => {
    try {
      setLoading(true); // start loading
      const inquiries = await fetchWithRetry(`${API_URL}/inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        params:{
          searh: '',
          filterBy: ''
        }
      }, 3, 1000, 'getInquiriesContext');
      setInquiriesContext(inquiries.data.inquiries);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop loading
    }
  }

  useEffect(() => {
    getInquiriesContext();
  }, [])

  return (
    <InquiryContext.Provider value={{ selectedCustomer, handleCustomerSelect, inquiriesContext, loading, getInquiriesContext }}>
      {children}
    </InquiryContext.Provider>
  );
};