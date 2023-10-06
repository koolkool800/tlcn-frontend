import { ROUTES, ROUTE_USER } from '@constants/routes';
import useAuth from '@hooks/useAuth';
import SellTemplate from '@templates/SellTemplate';
import queryString from 'query-string';
import { lazy } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';

// route auth
const AuthTemplate = lazy(() => import('@templates/AuthTemplate'));
const ForgotPassword = lazy(() => import('@pages/ForgotPassword'));
const Login = lazy(() => import('@pages/Login'));
const SignUp = lazy(() => import('@pages/SignUp'));
const SignUpWithEmail = lazy(() => import('@pages/SignUp/SignUpWithEmail'));
const AuthPending = lazy(() => import('@pages/SignUp/AuthPending'));
const SignUpWithSNS = lazy(() => import('@pages/SignUp/SignUpWithSNS'));
const PaymentCallback = lazy(() => import('@pages/PaymentCallback'));

// route my page
const WithdrawalManage = lazy(() => import('@pages/User/WithdrawalManage'));
const PinNumberBox = lazy(() => import('@pages/User/PinNumberBox'));
const MyTicketSales = lazy(() => import('@pages/User/MyTicketSales'));
const MyPurchases = lazy(() => import('@pages/User/MyPurchases'));
const MyNotification = lazy(() => import('@pages/User/MyNotification'));
const MyCoupon = lazy(() => import('@pages/User/MyCoupon'));
const MainMyPage = lazy(() => import('@pages/User/MainMyPage'));
const FAQ = lazy(() => import('@pages/User/FAQ'));
const UserTemplate = lazy(() => import('@templates/UserTemplate'));
const DetailInquiry = lazy(() => import('@pages/User/DetailInquiry'));
const Inquiry = lazy(() => import('@pages/User/Inquiry'));
const InquiryCreate = lazy(() => import('@pages/User/InquiryCreate'));
const OrderDetail = lazy(() => import('@pages/OrderDetail'));
const SaleOrderDetail = lazy(() => import('@pages/SaleOrderDetail'));

const RegisterToSell = lazy(() => import('@pages/RegisterToSell'));
const NotificationDetail = lazy(() => import('@pages/User/NotificationDetail'));

interface Props {
  redirectPath?: string;
}

export const RedirectParamKeyName = 'redirectUrl';
export const PrivateRoutes = ({ redirectPath = '/login' }: Props) => {
  const { accessToken } = useAuth();
  const redirectUrl = window.location.href;
  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate
      to={`${redirectPath}?${RedirectParamKeyName}=${redirectUrl}`}
      replace
    />
  );
};

/**
 *
 * @returns return redirectUrl from urlParam using for redirect to url before login
 */
const handleRedirectUrl = () => {
  const urlParsed = queryString.parseUrl(window.location.href);
  let urlRedirect = '';

  if (
    typeof urlParsed.query?.redirectUrl === 'string' &&
    urlParsed.query?.redirectUrl !== 'undefined'
  ) {
    urlRedirect = urlParsed.query?.redirectUrl.replace(
      `${window.location.origin}/`,
      ''
    );
    if (urlParsed.query?.redirectUrl === 'undefined') {
      urlRedirect = '';
    }
  }

  if (!(RedirectParamKeyName in urlParsed.query)) {
    const urlTmp = urlParsed.query?.state?.toString().split('_')[1] || '';
    urlRedirect =
      queryString
        .parseUrl(urlTmp)
        .query?.redirectUrl?.toString()
        .replace(`${window.location.origin}/`, '') || '';
  }
  return urlRedirect;
};

export const AuthRoute = ({ redirectPath = ROUTES.ALL }: Props) => {
  const { accessToken } = useAuth();
  return accessToken ? (
    <Navigate to={handleRedirectUrl() || redirectPath} />
  ) : (
    <Outlet />
  );
};

export const routeAuthentication = () => {
  return (
    <>
      <Route element={<AuthRoute />}>
        <Route element={<AuthTemplate />}>
          <Route path={ROUTES.API_AUTH_CALLBACK} element={<AuthPending />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route
            path={ROUTES.SIGN_UP_WITH_EMAIL}
            element={<SignUpWithEmail />}
          />
          <Route path={ROUTES.SIGN_UP_WITH_SNS} element={<SignUpWithSNS />} />
        </Route>
      </Route>
    </>
  );
};

/**
 * used to return routes for user page
 * @returns routes
 */
export const routeUser = () => {
  return (
    <>
      <Route element={<PrivateRoutes />}>
        <Route element={<UserTemplate />}>
          <Route path={ROUTE_USER.USER_MY_PAGE} element={<MainMyPage />} />
          <Route
            path={ROUTE_USER.USER_WITHDRAWAL_MANAGE}
            element={<WithdrawalManage />}
          />
          <Route
            path={ROUTE_USER.USER_MY_TICKET_SALES}
            element={<MyTicketSales />}
          />
          <Route path={ROUTE_USER.USER_MY_PURCHASES}>
            <Route path=":id" element={<OrderDetail />} />

            <Route index element={<MyPurchases />} />
          </Route>
          <Route
            path={`${ROUTE_USER.USER_MY_TICKET_SALES}/:id`}
            element={<SaleOrderDetail />}
          />
          <Route path={ROUTE_USER.USER_MY_COUPON} element={<MyCoupon />} />
          <Route
            path={ROUTE_USER.USER_PIN_NUMBER_BOX}
            element={<PinNumberBox />}
          />
          <Route
            path={ROUTE_USER.USER_NOTIFICATION}
            element={<MyNotification />}
          />
          <Route
            path={ROUTE_USER.USER_PRODUCT_COMPARISON}
            element={<p>user product comparison</p>}
          />
          <Route path={ROUTE_USER.USER_FAQ} element={<FAQ />} />
          <Route path={ROUTE_USER.USER_INQUIRY} element={<Inquiry />} />
          <Route
            path={ROUTE_USER.USER_DETAIL_INQUIRY}
            element={<DetailInquiry />}
          />
          <Route
            path={ROUTE_USER.USER_CREATE_INQUIRY}
            element={<InquiryCreate />}
          />

          <Route
            path={ROUTE_USER.NOTIFICATION_DETAIL_PATTER}
            element={<NotificationDetail />}
          />

          <Route path={ROUTES.PAYMENT_CALLBACK} element={<PaymentCallback />} />
        </Route>
      </Route>
    </>
  );
};

export const routeRegisterToSell = () => {
  return (
    <>
      <Route element={<PrivateRoutes />}>
        <Route element={<SellTemplate />}>
          <Route path={ROUTES.REGISTER_TO_SELL} element={<RegisterToSell />} />
        </Route>
      </Route>
    </>
  );
};
