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

export const dateFormat = (isDate) => {
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  const [year, month, day] = isDate.split("-");
  const dayFormatted = day.padStart(2, "0"); // ensures 01, 02, ... 09
  return `${months[parseInt(month, 10) - 1]} ${dayFormatted}, ${year}`;
}

export const timeFormat = (isTime) => {
  let [hour, minute, second] = isTime.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // 0 → 12
  return `${hour.toString().padStart(2,"0")}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

export const formatMobile = (value) => {
  const digits = value.replace(/\D/g, '');

    // Strip known prefixes
    let normalized = digits;
    if (normalized.startsWith('63')) normalized = normalized.slice(2);
    else if (normalized.startsWith('0')) normalized = normalized.slice(1);

    // Format into chunks
    const part1 = normalized.slice(0, 3); // e.g. 915
    const part2 = normalized.slice(3, 6); // e.g. 316
    const part3 = normalized.slice(6, 10); // e.g. 9518

    let formatted = '+63';
    if (part1) formatted += '-' + part1;
    if (part2) formatted += '-' + part2;
    if (part3) formatted += '-' + part3;

    return formatted;
};