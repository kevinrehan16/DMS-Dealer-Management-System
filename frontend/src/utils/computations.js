const cleanNumber = (val) => Number(val?.toString().replace(/,/g, '')) || 0;

export const computeMotorFinance = ({
  motorInstallmentPrice,
  motorLcp,
  motorDownpayment,
  motorSubsidy,
  motorReservation,
  motorRate,
  motorInstallmentterm,
}) => {
  const price = cleanNumber(motorInstallmentPrice);
  const lcp = cleanNumber(motorLcp);
  const down = cleanNumber(motorDownpayment);
  const subsidy = cleanNumber(motorSubsidy);
  const reservation = cleanNumber(motorReservation);
  const rate = cleanNumber(motorRate);
  const terms = cleanNumber(motorInstallmentterm);

  let totalFinance = 0;
  let monthlyInstallment = 0;
  let promissoryNote = 0;
  let uid = 0;

  if (lcp > 0) {
    totalFinance = ((price * lcp) - down) - subsidy;
  } else {
    totalFinance = (price - (down + reservation)) - subsidy;
  }

  totalFinance = totalFinance < 0 ? 0 : totalFinance;
  monthlyInstallment = terms > 0 ? (totalFinance * rate) / terms : 0;
  promissoryNote = terms > 0 ? monthlyInstallment * terms : 0;
  uid = terms > 0 ? (promissoryNote - totalFinance) / terms : 0;

  return {
    totalFinance,
    monthlyInstallment,
    promissoryNote,
    uid,
  };
};

export const computeTotalIncome = (incomeFields) => {
  return cleanNumber(incomeFields.ciIncomeSalaryNet) +
         cleanNumber(incomeFields.ciSpouseIncome) +
         cleanNumber(incomeFields.ciRentalIncome) +
         cleanNumber(incomeFields.ciBusinessNet) +
         cleanNumber(incomeFields.ciOthers);
};

export const computeTotalExpenses = (incomeFields) => {
  return cleanNumber(incomeFields.ciExpenseLiving) +
         cleanNumber(incomeFields.ciExpenseRent) +
         cleanNumber(incomeFields.ciExpenseSchooling) +
         cleanNumber(incomeFields.ciExpenseInsurance) +
         cleanNumber(incomeFields.ciExpenseElectWat) +
         cleanNumber(incomeFields.ciExpenseObligation) +
         cleanNumber(incomeFields.ciExpenseLoan);
};

export const calculateAge = (birthdate) => {
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  } 
  return age;
}