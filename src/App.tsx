import Loader from '@components/common/Loader';
import ScrollButton from '@components/common/ScrollButton';
import { LOCAL_STORE } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import ConfirmTicket from '@pages/SellTicket/ConfirmTicket';
import {
  PrivateRoutes,
  routeAuthentication,
  routeRegisterToSell,
  routeUser,
} from '@routes';
import GlobalStyles from '@style/GlobalStyle';
import theme from '@style/themes/default';
import { localHandler } from '@utils/localStorage';
import { BackTop } from 'antd';
import { LANGUAGE_VALUE } from 'i18n';
import { ArrowUp3 } from 'iconsax-react';
import { Suspense, lazy, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// -----------  COMPONENTS IMPORT --------------------------
const MainTemplate = lazy(() => import('@templates/MainTemplate'));
const EventDetail = lazy(() => import('@pages/EventDetail'));
const EventPage = lazy(() => import('@pages/EventPage'));
const FreeMarket = lazy(() => import('@pages/FreeMarket'));
const Home = lazy(() => import('@pages/Home'));
const NotFound = lazy(() => import('@pages/NotFound'));
const OrderTicket = lazy(() => import('@pages/OrderTicket'));

const BuyTicket = lazy(() => import('@pages/BuyTicket'));
const ProductDetail = lazy(() => import('@pages/ProductDetail'));
const SelectTransactionMethod = lazy(
  () => import('@pages/SelectTransactionMethod')
);
const SellTicket = lazy(() => import('@pages/SellTicket/RegisterSellTicket'));
const RegisterSeller = lazy(() => import('@pages/RegisterSeller'));
const TermOfUse = lazy(() => import('@pages/TermOfUse'));

import { useIsFirstRender } from 'usehooks-ts';

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <Router>
          <Routes>
            {routeAuthentication()}
            {/* route user */}
            {routeUser()}
            {/* route register to sell */}
            {routeRegisterToSell()}

            <Route element={<MainTemplate />}>
              <Route path={ROUTES.ALL} element={<Home />} />
              <Route
                path={`${ROUTES.TICKET_SELECT_TRANSACTION}/:id`}
                element={<SelectTransactionMethod />}
              />
              <Route element={<PrivateRoutes />}>
                {/* Buy ticket */}
                <Route
                  path={ROUTES.ORDER_TICKET(':id', ':method')}
                  element={<OrderTicket />}
                />
                <Route
                  path={`${ROUTES.BUY_TICKET}/:eventId`}
                  element={<BuyTicket />}
                />
                <Route
                  path={`${ROUTES.TICKET_SELECT_TRANSACTION}/:id`}
                  element={<SelectTransactionMethod />}
                />
                <Route
                  path={`${ROUTES.PRODUCT_DETAILS}`}
                  element={<ProductDetail />}
                />
                {/* sell ticket */}
                <Route path={ROUTES.SELL_TICKET} element={<SellTicket />} />

                <Route
                  path={ROUTES.REGISTRATION_SELLER}
                  element={<RegisterSeller />}
                />
              </Route>

              {/* event */}
              <Route path={ROUTES.EVENT_PAGES} element={<EventPage />} />
              <Route path={ROUTES.EVENT_DETAIL} element={<EventDetail />} />
              <Route path={ROUTES.CLEARANCE} element={<FreeMarket />} />
              <Route path={ROUTES.CONFIRM_TICKET} element={<ConfirmTicket />} />
              <Route path={ROUTES.TERM_OF_USE} element={<TermOfUse />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>

        {/* back to top */}
        <ScrollButton />
      </ThemeProvider>
    </Suspense>
  );
}
