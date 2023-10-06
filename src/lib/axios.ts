import { CONFIG } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import {
  RESELL,
  getLanguage,
  getLocalStorage,
  localHandler,
} from '@utils/localStorage';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { ObjectLiteral } from 'interface/general';

const axiosInstance = () => {
  const headers: ObjectLiteral = {
    'Content-Type': 'application/json',
    'accept-language': getLanguage(),
  };
  // check token
  const token = getLocalStorage(RESELL);

  const Axios: AxiosInstance = axios.create({
    baseURL: `${CONFIG.API_URL}/api/v1`,
    headers,
  });

  Axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  Axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response?.data;
    },
    (error: AxiosError<any>) => {
      if (error.response && error.response.data) {
        if (error.response.status === 401 || error.response.status === 403) {
          localHandler.deleteKey(RESELL);
          window.location.replace(
            `${ROUTES.LOGIN}?flashMessage=${error.response?.data?.errorCode}`
          );
        }
        return Promise.reject(error.response?.data);
      }

      return Promise.reject(error.response?.data);
    }
  );

  return Axios;
};

export { axiosInstance };
