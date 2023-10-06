import { LANGUAGE_VALUE } from 'i18n';
import { UserType } from 'interface/user';
import { LOCAL_STORE } from '../constants/codeConstants';

export const RESELL = 'resell';
export const USER = 'user';

export const localHandler = {
  getLocal: (key: string) => {
    return localStorage.getItem(key);
  },
  setLocal: (key: string, value: any) => {
    localStorage.setItem(key, value);
  },
  getSession: (key: string) => {
    return sessionStorage.getItem(key);
  },
  setSession: (key: string, value: any) => {
    sessionStorage.setItem(key, value);
  },
  resetStorage: () => {
    localStorage.clear();
    sessionStorage.clear();
  },
  deleteKey: (name: string) => {
    return localStorage.getItem(name)
      ? localStorage.removeItem(name)
      : sessionStorage.removeItem(name);
  },
};

export const getLanguage = (): string => {
  const langList = ['en', 'ko'];
  let lang: string | null = localHandler.getLocal(LOCAL_STORE.LANG);
  if (!langList.includes(String(lang))) {
    lang = LANGUAGE_VALUE.ko;
  }
  return String(lang);
};

/** get value local storage */
export const getLocalStorage = (name: string) => {
  return (
    (localHandler.getLocal(name) && localHandler.getLocal(name)) ||
    (localHandler.getSession(name) && localHandler.getSession(name))
  );
};

type SaveLocalStorageType = {
  data: any;
  name: string;
  type: 'session' | 'storage';
};
export const saveLocalStorage = ({
  data,
  name,
  type = 'storage',
}: SaveLocalStorageType) => {
  if (type === 'storage') {
    localHandler.setLocal(name, data);
  } else {
    localHandler.setSession(name, data);
  }
};

export const getUserLocal = (): UserType | null => {
  let user: UserType | null = null;
  try {
    user = JSON.parse(getLocalStorage(USER) || '');
  } catch (err) {
    /* empty */
  }

  return user;
};
