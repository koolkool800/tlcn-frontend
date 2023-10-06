import { useLocation } from 'react-router-dom';
import ChangeLanguage from '@components/user/MainMyPage/ChangeLanguage';
import ChangePassword from '@components/user/MainMyPage/ChangePassword';
import MyAddress from '@components/user/MainMyPage/MyAddress';
import MyInformation from '@components/user/MainMyPage/MyInformation';
import MyLinkedAccount from '@components/user/MainMyPage/MyLinkedAccount';
import MyPage, { TAB_MY_PAGE } from '@components/user/MainMyPage/MyPage';
import useParam from '@hooks/useParam';
import { message } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MainMyPage = () => {
  const { t } = useTranslation();
  const queryUrl = useParam();
  const location = useLocation();
  const tabMyPage = location.state?.tabMyPage ?? TAB_MY_PAGE.ALL;

  // used to display notifications from NICE API
  useEffect(() => {
    if (queryUrl?.resultCode) {
      message.success(t(`HTTP_STATUS.${queryUrl?.resultCode}`));
    }
  }, [queryUrl]);

  return (
    <>
      {tabMyPage === TAB_MY_PAGE.ALL && <MyPage />}
      {tabMyPage === TAB_MY_PAGE.INFORMATION && <MyInformation />}
      {tabMyPage === TAB_MY_PAGE.ADDRESS && <MyAddress />}
      {tabMyPage === TAB_MY_PAGE.LINKED && <MyLinkedAccount />}
      {tabMyPage === TAB_MY_PAGE.PASSWORD && <ChangePassword />}
      {tabMyPage === TAB_MY_PAGE.LANGUAGE && <ChangeLanguage />}
    </>
  );
};

export default MainMyPage;
