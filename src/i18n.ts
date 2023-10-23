import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLanguage } from './utils/localStorage';
import en from './locales/en/index';
import ko from './locales/ko/index';

export const LANGUAGE_VALUE = {
  ko: 'ko',
  en: 'en',
};

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
};

i18n.use(initReactI18next).init({
  resources,
  debug: false,
  fallbackLng: localStorage.getItem('language') || LANGUAGE_VALUE.ko,
  lng: localStorage.getItem('language') || LANGUAGE_VALUE.en,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
