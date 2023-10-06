import {
  Building,
  Global,
  I24Support,
  LocationMinus,
  MessageQuestion,
  PasswordCheck,
  User,
} from 'iconsax-react';
import { useTranslation } from 'react-i18next';
import { ROUTE_USER } from '../../../../constants/routes';
import { H6 } from '../../../../style/DefaultStyled';
import AvatarMyPage from '../AvatarMyPage';
import MenuMyPage from '../MenuMyPage';
import StatusStatistics from '../StatusStatistics';
import * as S from './style';

export const TAB_MY_PAGE = {
  ALL: 'all',
  INFORMATION: 'information',
  ADDRESS: 'address',
  LINKED: 'linked',
  PASSWORD: 'password',
  LANGUAGE: 'language',
  FAQ: 'faq',
  USER_INQUIRY: 'inquiry',
};

const listMyInformation = [
  {
    icon: <User size="16" />,
    value: 'user.myInfo',
    path: ROUTE_USER.USER_MY_PAGE,
    tabCurrent: TAB_MY_PAGE.INFORMATION,
  },
  {
    icon: <LocationMinus size="16" />,
    value: 'user.address',
    path: ROUTE_USER.USER_MY_PAGE,
    tabCurrent: TAB_MY_PAGE.ADDRESS,
  },
  // {
  //   icon: <Building size="16" />,
  //   value: 'user.linkedAccount',
  //   path: ROUTE_USER.USER_MY_PAGE,
  //   tabCurrent: TAB_MY_PAGE.LINKED,
  // },
];
const listSupportCustomer = [
  {
    icon: <I24Support size="16" />,
    value: 'user.faq',
    path: ROUTE_USER.USER_FAQ,
    tabCurrent: TAB_MY_PAGE.FAQ,
  },
  {
    icon: <MessageQuestion size="16" />,
    value: 'user.inquiry',
    path: ROUTE_USER.USER_INQUIRY,
    tabCurrent: TAB_MY_PAGE.USER_INQUIRY,
  },
];
const listSetUpAccount = [
  {
    icon: <PasswordCheck size="16" />,
    value: 'user.changePassword',
    path: ROUTE_USER.USER_MY_PAGE,
    tabCurrent: TAB_MY_PAGE.PASSWORD,
  },
  {
    icon: <Global size="16" />,
    value: 'user.language',
    path: ROUTE_USER.USER_MY_PAGE,
    tabCurrent: TAB_MY_PAGE.LANGUAGE,
  },
];

const MyPage = () => {
  const { t } = useTranslation();

  return (
    <S.Layout>
      <AvatarMyPage showRoleLevel />

      <S.Content>
        {/* my order */}
        <S.Wrapper>
          <H6>{t('user.myOrder')}</H6>
          {/* Sales order */}
          <StatusStatistics type="order" />
          {/* Purchase order */}
          <StatusStatistics type="purchase" />
        </S.Wrapper>
        {/* my information */}
        <MenuMyPage title={t('user.myInfo')} menus={listMyInformation} />
        {/* Support Customer Center */}
        <MenuMyPage
          title={t('user.supportCustomerCenter')}
          menus={listSupportCustomer}
        />
        {/* Set up Account */}
        <MenuMyPage title={t('user.setupAccount')} menus={listSetUpAccount} />
      </S.Content>
    </S.Layout>
  );
};

export default MyPage;
