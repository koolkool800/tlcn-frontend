import { useAppSelector } from '@hooks/useAppSelector';
import useDimensions from '@hooks/useDimensions';
import { RootState } from '@redux/store';
import { ObjectLiteral } from 'interface/general';
import { useTranslation } from 'react-i18next';
import { ROUTE_USER } from '../../../constants/routes';
import SidebarDesktop from './SidebarDesktop';
import SidebarMobile from './SidebarMobile';

export const TABS_USER = {
  USER_MY_PAGE: 'my-page',
  USER_WITHDRAWAL_MANAGE: 'withdrawal-manage',
  USER_MY_TICKET_SALES: 'my-ticket-sales',
  USER_MY_PURCHASES: 'my-purchases',
  USER_MY_COUPON: 'my-coupon',
  USER_PIN_NUMBER_BOX: 'pin-number-box',
  USER_NOTIFICATION: 'notification',
  USER_PRODUCT_COMPARISON: 'product-comparison',
  USER_FAQ: 'faq',
  USER_INQUIRY: 'inquiry',
};

export type SidebarProps = {
  value: string;
  path: string;
  countNotification?: number;
  state?: ObjectLiteral;
};

type Props = {
  currentTab: string;
};

const SideBar = ({ currentTab = ROUTE_USER.USER_MY_PAGE }: Props) => {
  const { t } = useTranslation();
  const { isMobile } = useDimensions();
  const notificationStore = useAppSelector(
    (state: RootState) => state.notificationsReducer
  );
  const listMyPage1: SidebarProps[] = [
    { value: t('user.myPage'), path: ROUTE_USER.USER_MY_PAGE },
    {
      value: t('user.withdrawalManage'),
      path: ROUTE_USER.USER_WITHDRAWAL_MANAGE,
    },
    { value: t('user.myTicketSales'), path: ROUTE_USER.USER_MY_TICKET_SALES },
    { value: t('user.myPurchase'), path: ROUTE_USER.USER_MY_PURCHASES },
    { value: t('user.myCoupon'), path: ROUTE_USER.USER_MY_COUPON },
    {
      value: t('user.pinNumberBox'),
      path: ROUTE_USER.USER_PIN_NUMBER_BOX,
      state: { tabMyPage: 'pinReceived' },
    },
    {
      value: t('user.notification'),
      path: ROUTE_USER.USER_NOTIFICATION,
      countNotification: notificationStore.numberNotifications,
    },
    // { value: 'Product comparison', path: ROUTE_USER.USER_PRODUCT_COMPARISON },
  ];

  const listMyPage2: SidebarProps[] = [
    {
      value: t('user.faq'),
      path: ROUTE_USER.USER_FAQ,
      state: { tabMyPage: 'faq' },
    },
    {
      value: t('user.inquiry'),
      path: ROUTE_USER.USER_INQUIRY,
      state: { tabMyPage: 'inquiry' },
    },
  ];

  return !isMobile ? (
    <SidebarDesktop
      currentTab={currentTab}
      listMyPage1={listMyPage1}
      listMyPage2={listMyPage2}
    />
  ) : (
    <SidebarMobile
      currentTab={currentTab}
      listMyPage={listMyPage1.concat(listMyPage2)}
    />
  );
};

export default SideBar;
