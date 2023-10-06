import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import { getLanguage } from './localStorage';

export const dateFormat = 'YYYY-MM-DD';

export const dateTimeFormat = (date: string | null | undefined) => {
  if (!date) return null;
  return dayjs(date).format(dateFormat);
};

export const dateTimeFormatString = (
  date: string | null | undefined,
  format = 'YYYY.DD.MM (ddd) h:mm a'
) => {
  if (!date) return null;
  return dayjs(date).locale(getLanguage())?.format(format);
};
