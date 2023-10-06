import { ObjectLiteral } from 'interface/general';
import { SNS_STATE } from './codeConstants';
import { ROUTES } from './routes';

// const baseUrl = import.meta.env.VITE_BASE_URL;
// const baseUrlLocal = import.meta.env.VITE_BASE_URL_LOCAL;
export const baseUrl = window.location.origin;

const queryParamsNaverSignup = new URLSearchParams({
  response_type: 'code',
  client_id: 'vydLi5Uz0MtdZr2tTQkr',
  redirect_uri: `${baseUrl}${ROUTES.API_AUTH_CALLBACK}`,
  state: SNS_STATE.SIGN_UP_NAVER,
});
const queryParamsKakaoSignup = new URLSearchParams({
  response_type: 'code',
  client_id: 'ac156ff8b1370d37690feaae3c5ff0d2',
  redirect_uri: `${baseUrl}${ROUTES.API_AUTH_CALLBACK}`,
  state: SNS_STATE.SIGN_UP_KAKAO,
});

export const queryParamsNaverLogin: ObjectLiteral = {
  response_type: 'code',
  client_id: 'vydLi5Uz0MtdZr2tTQkr',
  redirect_uri: `${baseUrl}${ROUTES.API_AUTH_CALLBACK}`,
  state: SNS_STATE.SIGN_IN_NAVER,
};

export const queryParamsKakaoLogin: ObjectLiteral = {
  response_type: 'code',
  client_id: 'ac156ff8b1370d37690feaae3c5ff0d2',
  redirect_uri: `${baseUrl}${ROUTES.API_AUTH_CALLBACK}`,
  state: SNS_STATE.SIGN_IN_KAKAO,
};

export const queryParamsAppleSignUp: ObjectLiteral = {
  response_type: 'code',
  scope: 'name email',
  response_mode: 'form_post',
  client_id: 'api.resellticket.co.kr.sid',
  redirect_uri:
    'https://api.resellticket.co.kr/api/v1/auth/apple/sign-in-return-url',
};

export const queryParamsAppleLogin: ObjectLiteral = {
  response_type: 'code',
  scope: 'name email',
  response_mode: 'form_post',
  client_id: 'api.resellticket.co.kr.sid',
  redirect_uri:
    'https://api.resellticket.co.kr/api/v1/auth/apple/sign-in-return-url',
};

export const parseURLThirdParty = (
  urlThirdParty: string,
  params: ObjectLiteral
): string => {
  const param = new URLSearchParams(params).toString();
  return `${urlThirdParty}?${param}`;
};

// url sign up
export const kakaoAuthUrlSignup = `https://kauth.kakao.com/oauth/authorize?${queryParamsKakaoSignup.toString()}`;
export const naverAuthUrlSignup = `https://nid.naver.com/oauth2.0/authorize?${queryParamsNaverSignup.toString()}`;
export const appleAuthUrlSignup = `https://appleid.apple.com/auth/authorize`;

// url login

export const kakaoAuthUrlLogin = `https://kauth.kakao.com/oauth/authorize`;
export const naverAuthUrlLogin = `https://nid.naver.com/oauth2.0/authorize`;
export const appleAuthUrlLogin = 'https://appleid.apple.com/auth/authorize';
