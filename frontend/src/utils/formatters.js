export const formatAmount = (amount, decimals = 2) => {
  if (isNaN(amount)) return '0.00';
  return parseFloat(amount)
    .toFixed(decimals)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
