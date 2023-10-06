import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import {
  AuthQueryParams,
  AuthSignUp,
  AxiosResponseResult,
  ChangePasswordType,
  DataVerifyNice,
  ForgotPasswordType,
  LoginType,
  ResetPasswordType,
  ResponseModel,
  ResponseResult,
} from 'interface';
import { UserType } from 'interface/user';

const authService = {
  login: async (model: LoginType) => {
    return axiosInstance().post<
      never,
      ResponseModel<{ accessToken: string; user: UserType }>
    >(ROUTE_API.LOGIN, model);
  },
  forgotPassword: async (model: ForgotPasswordType) => {
    return axiosInstance().post<never, ResponseModel<any>>(
      ROUTE_API.FORGOT_PASSWORD,
      model
    );
  },
  resetPassword: async (model: ResetPasswordType) => {
    return axiosInstance().post<never, ResponseModel<any>>(
      ROUTE_API.RESET_PASSWORD,
      model
    );
  },
  signUp: async (params: AuthSignUp): Promise<ResponseResult> => {
    return axiosInstance().post(ROUTE_API.SIGN_UP, params);
  },
  getInfoUserThirdParty: async (
    params: AuthQueryParams
  ): Promise<ResponseResult> => {
    return axiosInstance().get(ROUTE_API.GET_INFO_KAKAO, {
      params,
    });
  },
  changePassword: async (model: ChangePasswordType) => {
    return axiosInstance().post(ROUTE_API.CHANGE_PASSWORD, model);
  },
  loginSNS: async (params: AuthQueryParams): Promise<ResponseResult> => {
    return axiosInstance().post(ROUTE_API.LOGIN_SNS, params);
  },
  sentOtp: async (params: { email: string }): Promise<ResponseResult> => {
    return axiosInstance().post(ROUTE_API.SENT_OTP, { email: params.email });
  },
  verifyOtp: async (params: {
    email: string;
    otp: string;
  }): Promise<ResponseResult> => {
    return axiosInstance().get(ROUTE_API.GET_OTP, { params });
  },
  getVerifyDataNice: async () => {
    return axiosInstance().get<never, AxiosResponseResult<DataVerifyNice>>(
      ROUTE_API.GET_DATA_VERIFY_NICE
    );
  },
};

export default authService;
