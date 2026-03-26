import { useState } from 'react';

export const useAddressManager = () => {
  const [addressConfig, setAddressConfig] = useState({
    show: false,
    onSelect: null, // Dito natin ipapasa ang callback function
  });

  const openAddress = (config) => {
    // Ang config ay dapat may 'onSelect' function
    setAddressConfig({ show: true, ...config });
  };

  const closeAddress = () => {
    setAddressConfig(prev => ({ ...prev, show: false }));
  };

  const handleSelect = (formattedAddress) => {
    // Kung may pinasang onSelect function sa openAddress, tawagin ito
    if (addressConfig.onSelect) {
      addressConfig.onSelect(formattedAddress);
    }
    closeAddress();
  };

  return { addressConfig, openAddress, closeAddress, handleSelect };
};