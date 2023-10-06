/* eslint-disable no-case-declarations */
import kakao from '@assets/images/kakao.png';
import naver from '@assets/images/naver.png';
import os from '@assets/images/os.png';
import Button from '@components/common/Button';
import Checkbox from '@components/common/Checkbox';
import CustomLink from '@components/common/CustomLink';
import Input from '@components/common/Input';
import BtnSocial from '@components/login/BtnSocial';
import { SNS_STATE } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import {
  appleAuthUrlLogin,
  baseUrl,
  kakaoAuthUrlLogin,
  naverAuthUrlLogin,
  parseURLThirdParty,
  queryParamsAppleLogin,
  queryParamsKakaoLogin,
  queryParamsNaverLogin,
} from '@constants/snsConstant';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { login, loginSNS } from '@redux/reducer/authReducer';
import { RedirectParamKeyName } from '@routes/index';
import authService from '@services/authService';
import { H5 } from '@style/DefaultStyled';
import { Form, message } from 'antd';
import { FormLogin, ResponseModel, ResponseResult } from 'interface';
import { UserType } from 'interface/user';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import logo from '@assets/images/logo.png';
import * as S from './style';

const socialList = [
  // {
  //   icon: os,
  //   content: 'Log in with Apple',
  //   type: 'apple',
  // },
  {
    icon: kakao,
    content: 'buttonKakao',
    type: 'kakao',
  },
  {
    icon: naver,
    content: 'buttonNaver',
    type: 'naver',
  },
];

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme: any = useTheme();
  const [form] = Form.useForm();
  const email = Form.useWatch('email', form);
  const password = Form.useWatch('password', form);
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get(RedirectParamKeyName);
  /**
   * the event click submit button
   * @param values value form
   * @returns {Promise<void>}
   */
  const onFinish = async (values: FormLogin): Promise<void> => {
    try {
      const { remember, ...restValue } = values;
      const response: ResponseModel<{ accessToken: string; user: UserType }> =
        await authService.login(restValue);
      const convertData = {
        accessToken: response.data.accessToken,
        remember,
        user: response?.data?.user,
      };
      dispatch(login(convertData));
      message.success(t(`HTTP_STATUS.${response.message}`));
    } catch (error: any) {
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }
  };

  /**
   * the event login sns
   * @param type type login email/apple/kakao/naver
   * @returns {void}
   */
  const handleLoginSNS = (type: string): void => {
    const windowWidth = window.screen.width / 2;
    const windowHeight = window.screen.height / 2;
    const left = window.screen.width / 2 - windowWidth / 2;
    const top = window.screen.height / 2 - windowHeight / 2;
    const windowProps =
      `menubar=no,location=no,scrollbars=no,` +
      `width=${
        window.screen.width / 2
      },height=${windowHeight},top=${top},left=${left}`;

    switch (type) {
      case 'kakao':
        window.open(
          parseURLThirdParty(kakaoAuthUrlLogin, {
            ...queryParamsKakaoLogin,
            state: `${SNS_STATE.SIGN_IN_KAKAO}${
              redirectUrl
                ? `_${baseUrl}${ROUTES.API_AUTH_CALLBACK}?${RedirectParamKeyName}=${redirectUrl}`
                : ``
            }`,
          }),
          'Kakao Sign-In',
          windowProps
        );
        break;
      case 'naver':
        window.open(
          parseURLThirdParty(naverAuthUrlLogin, {
            ...queryParamsNaverLogin,
            state: `${SNS_STATE.SIGN_IN_NAVER}${
              redirectUrl
                ? `_${baseUrl}${ROUTES.API_AUTH_CALLBACK}?${RedirectParamKeyName}=${redirectUrl}`
                : ``
            }`,
          }),
          'Naver Sign-In',
          windowProps
        );
        break;
      case 'apple':
        window.open(
          parseURLThirdParty(appleAuthUrlLogin, {
            ...queryParamsAppleLogin,
            state: `${SNS_STATE.SIGN_IN_APPLE}`,
          }),
          'Apple Sign-In',
          windowProps
        );

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Catch event from popup return
    const popupSignInResponse = async (event: any) => {
      if (event.data.result) {
        const responseAuth: ResponseResult = event.data;
        message.success(t(`HTTP_STATUS.${responseAuth.message}`));
        dispatch(
          loginSNS({
            accessToken: responseAuth.data.accessToken,
            user: responseAuth.data.user,
          })
        );
      }
      if ('errorCode' in event.data && !event.data.result) {
        message.info(t(`HTTP_STATUS.${event.data.errorCode}`));
        navigate(ROUTES.SIGN_UP, { state: { state: event.data.state } });
      }
    };
    window.addEventListener('message', popupSignInResponse);
    return () => {
      window.removeEventListener('message', popupSignInResponse);
    };
  }, []);
  return (
    <S.Container>
      <Form
        className="login-form"
        form={form}
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        layout="vertical"
      >
        <S.LogoWrapper>
          {/* <img src={logo} alt="resell-ticket-logo" className="logo" /> */}
          <H5>{t('auth.buttonLogin')}</H5>
        </S.LogoWrapper>
        <Form.Item
          label={t('auth.emailLabel')}
          name="email"
          rules={[
            {
              required: true,
              message: t('auth.emailRequired'),
            },
            {
              type: 'email',
              message: t('auth.emailInvalid'),
            },
          ]}
        >
          <Input
            allowClear
            type="input"
            placeholder={t('auth.emailPlaceholder')}
          />
        </Form.Item>

        <Form.Item
          label={t('auth.password')}
          name="password"
          style={{ marginBottom: 12 }}
        >
          <Input
            allowClear
            type="password"
            placeholder={t('auth.passwordPlaceholder')}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ marginBottom: 20 }}
        >
          <Checkbox>{t('auth.rememberMe')}</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: 20 }}>
          <Button
            htmlType="submit"
            size="large"
            color={theme.colors.black}
            bgcolor={theme.colors.primary500}
            hoverbgcolor={theme.colors.primary510}
            disabled={!email || !password}
          >
            {t('auth.buttonLogin')}
          </Button>
        </Form.Item>
        <S.Extend>
          <CustomLink to={ROUTES.SIGN_UP} style={{ textAlign: 'right' }}>
            <span>{t('auth.buttonSignUp')}</span>
          </CustomLink>
          <S.Line />
          <CustomLink to={ROUTES.FORGOT_PASSWORD} style={{ textAlign: 'left' }}>
            <span>{t('auth.buttonForgotPassword')}</span>
          </CustomLink>
        </S.Extend>
        {/* <S.Social>
          {socialList.map((social) => {
            return (
              <BtnSocial
                key={social.icon}
                icon={social.icon}
                text={t(`auth.${social.content}`)}
                onClick={() => handleLoginSNS(social.type)}
              />
            );
          })}
        </S.Social> */}
      </Form>
    </S.Container>
  );
};

export default Login;
