import { SNS_STATE } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import { baseUrl } from '@constants/snsConstant';
import { useAppDispatch } from '@hooks/useAppDispatch';
import useParam from '@hooks/useParam';
import { infoUserBySNS } from '@redux/reducer/authReducer';
import authService from '@services/authService';
import { message } from 'antd';
import { Auth, AuthQueryParams } from 'interface';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const AuthPending = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the query parameters from the callback URL
  const urlParams = useParam() as any as AuthQueryParams;
  const { code, state } = urlParams;
  const handleStateSns = (): [
    stateSns: string | undefined,
    redirectUrl: string | undefined
  ] => {
    const tmp = state?.split('_');
    let stateSns;
    let redirectUrl;
    if (tmp) {
      [stateSns, redirectUrl] = tmp;
    }
    return [stateSns, redirectUrl];
  };
  const [stateSns] = handleStateSns();
  /**
   * used to get info user by authentication
   * @returns {Promise<void>}
   */
  const getInfoUser = async (): Promise<void> => {
    try {
      const requestParams: AuthQueryParams = {
        code,
        state: stateSns || state,
      };

      const response = await authService.getInfoUserThirdParty(requestParams);
      const { data } = response;
      const convertData: Auth = {
        name: data?.name,
        email: data?.email,
        state,
        accessToken: null,
      };

      dispatch(infoUserBySNS(convertData));
      navigate(
        {
          pathname: ROUTES.SIGN_UP_WITH_SNS,
        },
        { replace: true }
      );
    } catch (error: any) {
      message.info(t(`HTTP_STATUS.${error.errorCode}`));
      navigate(
        {
          pathname: ROUTES.SIGN_UP,
        },
        { replace: true }
      );
    }
  };
  /**
   * used to handle login
   * @returns {Promise<void>}
   */
  const handleLoginSNS = async (): Promise<void> => {
    try {
      const requestParams: AuthQueryParams = {
        code,
        state: stateSns || state,
      };
      const response = await authService.loginSNS(requestParams);
      // SEND RESPONSE LOGIN TO MAIN PAGE & CLOSE POPUP WHEN DONE
      window.opener.postMessage(response, `${baseUrl}/login`);
      window.close();
      // NO NEED TO NAVIGATE WHEN LOGIN SUCCESS CAUSE IN AuthRoute already did
    } catch (error: any) {
      navigate(
        {
          pathname: ROUTES.LOGIN,
        },
        { replace: true }
      );
      window.opener.postMessage({ ...error, state }, `${baseUrl}/login`);
      window.close();
    }
  };

  const handleSignUpApple = () => {
    if (urlParams.errorCode) {
      message.info(t(`HTTP_STATUS.${urlParams.errorCode}`));
      navigate(ROUTES.LOGIN);
    } else {
      dispatch(
        infoUserBySNS({
          email: urlParams.email,
          name: urlParams?.name,
          state: urlParams.state,
          accessToken: null,
        })
      );
      navigate(
        {
          pathname: ROUTES.SIGN_UP_WITH_SNS,
        },
        { replace: true }
      );
    }
  };
  useEffect(() => {
    switch (stateSns) {
      case SNS_STATE.SIGN_UP_KAKAO:
        getInfoUser();
        break;
      case SNS_STATE.SIGN_UP_NAVER:
        getInfoUser();
        break;
      case SNS_STATE.SIGN_UP_APPLE:
        handleSignUpApple();
        break;
      default:
        handleLoginSNS();
        break;
    }

    // NO NEED TO NAVIGATE CAUSE IN AuthRoute already did
  }, [code, state]);

  return (
    <S.Container>
      <S.SpinAnt />
    </S.Container>
  );
};

export default AuthPending;
