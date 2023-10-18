import { getLanguage } from './localStorage';

export const currencyFormat = (
  num: number,
  options: { [key: string]: any } = { maximumSignificantDigits: 10 }
) => {
  const current = getLanguage();
  try {
    return new Intl.NumberFormat(current, options).format(num);
  } catch (err) {
    return null;
  }
};
