export function formatNumberWithCommas(number: number | undefined | string) {
  let numStr = String(number);
  numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numStr;
}

export const formatPhoneNumber = (inputValue: string) => {
  const phoneNumber = inputValue.replace(/\D/g, '');
  const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }

  return inputValue.substring(0, 10);
};
