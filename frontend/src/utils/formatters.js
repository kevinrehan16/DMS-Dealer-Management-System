// Utility function to format amount with commas and fixed decimals
export const formatAmount = (amount, decimals = 2) => {
  // 1. Siguraduhin na may value at valid number
  const num = parseFloat(String(amount).replace(/,/g, ''));

  if (isNaN(num)) return '0.00';

  // 2. I-format
  return num
    .toFixed(decimals)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Handler for formatting on blur
export const handleAmountBlur = (e, setValue, fieldName) => {
  // 1. Siguraduhing string muna ang value bago i-replace
  const rawValue = String(e.target.value || "").replace(/,/g, '');
  const val = parseFloat(rawValue);

  // 2. I-compute ang final value
  const finalValue = isNaN(val) ? '0.00' : formatAmount(val);

  // 3. GAMITIN ANG setValue NG RHF (Direct value, no (prev) => ...)
  setValue(fieldName, finalValue);
};

// Handler for stripping commas on focus
export const handleAmountFocus = (e, setValue, fieldName) => {
  const rawValue = String(e.target.value || "").replace(/,/g, '');
  const val = parseFloat(rawValue);

  // Kung NaN o 0, gawing empty string para madaling mag-type ang user
  const finalValue = isNaN(val) || val === 0 ? '' : val.toString();
  
  // 3. GAMITIN ANG setValue NG RHF
  setValue(fieldName, finalValue);
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

export const formatUpperCase = (string) => {
  return (string ?? '').toUpperCase();
}

export const formatCapitalize = (string) => {
  if (!string) return ''; // Safety check para sa null/undefined
  
  return string
    .toLowerCase()
    .split(' ') // Hiwalayin kung may multiple words (e.g., First Name)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};