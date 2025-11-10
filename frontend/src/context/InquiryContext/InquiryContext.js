import React, { createContext, useContext, useState } from 'react';

const InquiryContext = createContext();
export const useInquiry = () => useContext(InquiryContext);

export const InquiryProvider = ({ children }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <InquiryContext.Provider value={{ selectedCustomer, handleCustomerSelect }}>
      {children}
    </InquiryContext.Provider>
  );
};