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
  promissoryNote = promissoryNote < 0 ? 0 : monthlyInstallment * terms;
  uid = uid < 0 ? 0 : (promissoryNote - totalFinance) / terms;

  return {
    totalFinance,
    monthlyInstallment,
    promissoryNote,
    uid,
  };
};