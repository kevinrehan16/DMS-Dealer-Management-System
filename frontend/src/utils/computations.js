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

  // KUNG WALANG TERM O WALANG PRESYO, IBALIK SA ZERO LAHAT PARA HINDI MAG-ERROR SA SCREEN
  if (price === 0 || terms === 0) {
    return { totalFinance, monthlyInstallment, promissoryNote, uid };
  }

  // 1. TAMANG UNANG HAKBANG: I-plus (+) ang LCP sa Installment Price (hindi i-multiply!)
  const netPrice = price + lcp;

  // 2. TAMANG PANGALAWANG HAKBANG: Ibawas ang LAHAT ng binayad na agad (Downpayment + Reservation + Subsidy)
  totalFinance = netPrice - down - reservation - subsidy;
  totalFinance = totalFinance < 0 ? 0 : totalFinance; // Iwasan mag-negative

  // 3. KWENTAHAN NG MONTHLY, PROMNOTE, AT UID (Gamit ang factory rate multiplier mo)
  if (rate > 0) {
    // Ang 'promissoryNote' ang kabuuang utang kapag may interes (Amount Finance * Rate)
    promissoryNote = totalFinance * rate;
    // Ang 'monthlyInstallment' ay ang Promissory Note hinati sa kung ilang buwan
    monthlyInstallment = promissoryNote / terms;
    // Ang 'uid' (Unearned Interest Income) ay ang kabuuang interes na hinati sa buwan
    uid = (promissoryNote - totalFinance) / terms;
  } else {
    // Fallback kapag walang rate o zero rate (walang patong na interes)
    monthlyInstallment = totalFinance / terms;
    promissoryNote = totalFinance;
    uid = 0;
  }

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