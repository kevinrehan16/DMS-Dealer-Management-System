// Utility function to format amount with commas and fixed decimals
export const formatAmount = (amount, decimals = 2) => {
  if (isNaN(amount)) return '0.00';
  return parseFloat(amount)
    .toFixed(decimals)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Handler for formatting on blur
export const handleAmountBlur = (e, setFormData, fieldName) => {
  const val = parseFloat(e.target.value.replace(/,/g, ''));
  setFormData((prev) => ({
    ...prev,
    [fieldName]: isNaN(val) ? '0.00' : formatAmount(val),
  }));
};

// Handler for stripping commas on focus
export const handleAmountFocus = (e, setFormData, fieldName) => {
  const val = parseFloat(e.target.value.replace(/,/g, ''));
  setFormData((prev) => ({
    ...prev,
    [fieldName]: val === 0 ? '' : val.toString(),
  }));
};

export const cleanToDouble = (val) => {
  const num = parseFloat(val?.toString().replace(/,/g, ''));
  return isNaN(num) ? '0.00' : num.toFixed(2); // returns string like "25500.00"
};
