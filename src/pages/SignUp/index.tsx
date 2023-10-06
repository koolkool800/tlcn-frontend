import email from '@assets/images/email.png';
import kakao from '@assets/images/kakao.png';
import naver from '@assets/images/naver.png';
import BtnSocial from '@components/login/BtnSocial';
import { SNS_STATE } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import {
  appleAuthUrlSignup,
  baseUrl,
  kakaoAuthUrlLogin,
  naverAuthUrlLogin,
  parseURLThirdParty,
  queryParamsAppleSignUp,
  queryParamsKakaoLogin,
  queryParamsNaverLogin,
} from '@constants/snsConstant';
import { RedirectParamKeyName } from '@routes/index';
import { Form } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const socialList = [
  {
    icon: email,
    content: 'Sign up with Email',
    type: 'email',
  },
  // {
  //   icon: os,
  //   content: 'Sign up with Apple',
  //   type: 'apple',
  // },
  // {
  //   icon: kakao,
  //   content: 'Sign up with Kakao',
  //   type: 'kakao',
  // },
  // {
  //   icon: naver,
  //   content: 'Sign up with Naver',
  //   type: 'naver',
  // },
];

const SignUp = () => {
  const navigate = useNavigate();
  const { search, state } = useLocation();
  const redirectUrl = new URLSearchParams(search).get(RedirectParamKeyName);

  /**
   * the event sign up sns
   * @param type type sign up email/apple/kakao/naver
   * @returns {void}
   */
  const handleSignUPSNS = (type: string): void => {
    switch (type) {
      case 'email':
        navigate(ROUTES.SIGN_UP_WITH_EMAIL);
        break;
      case 'kakao':
        window.location.href = parseURLThirdParty(kakaoAuthUrlLogin, {
          ...queryParamsKakaoLogin,
          state: `${SNS_STATE.SIGN_UP_KAKAO}${
            redirectUrl
              ? `_${baseUrl}${ROUTES.API_AUTH_CALLBACK}?${RedirectParamKeyName}=${redirectUrl}`
              : ``
          }`,
        });

        break;
      case 'naver':
        window.location.href = parseURLThirdParty(naverAuthUrlLogin, {
          ...queryParamsNaverLogin,
          state: `${SNS_STATE.SIGN_UP_NAVER}${
            redirectUrl
              ? `_${baseUrl}${ROUTES.API_AUTH_CALLBACK}?${RedirectParamKeyName}=${redirectUrl}`
              : ``
          }`,
        });
        break;
      case 'apple':
        window.location.href = parseURLThirdParty(appleAuthUrlSignup, {
          ...queryParamsAppleSignUp,
          state: `${SNS_STATE.SIGN_UP_APPLE}${
            redirectUrl ? `_${redirectUrl}` : ``
          }`,
        });

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (state?.state) {
      switch (state.state) {
        case SNS_STATE.SIGN_IN_KAKAO:
          handleSignUPSNS('kakao');
          break;
        case SNS_STATE.SIGN_IN_NAVER:
          handleSignUPSNS('naver');
          break;
        default:
          break;
      }
    }
  }, []);

  return (
    <S.Container>
      <Form
        className="login-form"
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
      >
        <S.LogoWrapper>
          <h3>Sign Up</h3>
        </S.LogoWrapper>
        <S.Social>
          {socialList.map((social) => {
            return (
              <BtnSocial
                key={social.type}
                icon={social.icon}
                text={social.content}
                onClick={() => handleSignUPSNS(social.type)}
              />
            );
          })}
        </S.Social>
      </Form>
    </S.Container>
  );
};

export default SignUp;
