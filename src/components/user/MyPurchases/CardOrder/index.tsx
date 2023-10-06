import { H5, H6, Typography } from '@style/DefaultStyled';

import iconCompleted from '@assets/images/icon/icon-completed.svg';
import iconExpired from '@assets/images/icon/icon-expired.svg';
import iconPaymentCompleted from '@assets/images/icon/icon-paymentcompleted.svg';
import iconPending from '@assets/images/icon/icon-pending.svg';
import iconShipping from '@assets/images/icon/icon-shipping.svg';
import notImage from '@assets/images/notImage.png';
import { OrderStatus } from '@constants/codeConstants';

import Button from '@components/common/Button';
import { ROUTE_USER } from '@constants/routes';
import theme from '@style/themes/default';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { Grid } from 'antd';
import { ArrowRight2, Calendar } from 'iconsax-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { OrderReport } from '../PopupReport';
import * as S from './styles';

export type CardOrderTypeProps = {
  insideTicket: any;
  id: string;
  orderNumber: string;
  orderDate: string;
  author: string | undefined;
  title: string;
  stadium: string | undefined;
  useDate: string | undefined;
  seatPosition: string | undefined;
  quantity: string | undefined;
  totalPay: string | undefined | number;
  img: string | undefined;
  orderTotal: string | undefined | number;
  transactionType: string | undefined;
  status: keyof typeof OrderStatus;
  actionReport: (order: OrderReport) => void;
  actionPayment: (orderId: string) => void;
  makePayment: (orderId: string) => void;
};

const CardOrder = ({
  orderDate,
  orderNumber,
  author,
  img,
  quantity,
  seatPosition,
  stadium,
  title,
  totalPay = 0,
  useDate,
  orderTotal = 0,
  transactionType,
  status,
  id,
  insideTicket,
  actionReport,
  actionPayment,
  makePayment,
}: CardOrderTypeProps) => {
  const { xs } = Grid.useBreakpoint();
  const { t } = useTranslation();
  const renderStatus = () => {
    switch (status) {
      case OrderStatus.TRANSACTION_COMPLETED:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconCompleted} alt="icon" />
            <p>{t('myPurchase.status.completed')}</p>
          </S.StatusOrder>
        );
      case OrderStatus.SENT_DELIVERY_UNIT:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconShipping} alt="icon" />
            <p>{t('myPurchase.status.onShipping')}</p>
          </S.StatusOrder>
        );
      case OrderStatus.SENT_PIN:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconShipping} alt="icon" />
            <p>{t('myPurchase.status.onShipping')}</p>
          </S.StatusOrder>
        );
      case OrderStatus.DELIVERY_UNIT_RECEIVED:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconShipping} alt="icon" />
            <p>{t('myPurchase.status.onShipping')}</p>
          </S.StatusOrder>
        );
      case OrderStatus.DELIVERY_UNIT_COMPLETED_CHECKING:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconShipping} alt="icon" />
            <p>{t('myPurchase.status.onShipping')}</p>
          </S.StatusOrder>
        );
      case OrderStatus.DELIVERY_COMPLETED:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconShipping} alt="icon" />
            <p>{t('myPurchase.status.onShipping')}</p>
          </S.StatusOrder>
        );
      case OrderStatus.PAYMENT_PENDING:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconPending} alt="icon" />
            <p>{t('myPurchase.status.paymentPending')}</p>
          </S.StatusOrder>
        );
      case OrderStatus.PAYMENT_COMPLETED:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconPaymentCompleted} alt="icon" />
            <p>{t('myPurchase.status.paymentCompleted')}</p>
          </S.StatusOrder>
        );
      case OrderStatus.CANCEL:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconExpired} alt="icon" />
            <p>{t('myPurchase.status.cancelled')}</p>
          </S.StatusOrder>
        );
      default:
        return <></>;
    }
  };
  return (
    <S.CardContainer>
      <div className="order-status">
        <div className="order-date">
          <p>
            {t('myPurchase.orderNum')} {orderNumber}
          </p>
          <p>
            {t('myPurchase.orderDate')} {orderDate}
          </p>
        </div>
        <div className="order-status">{renderStatus()}</div>
      </div>
      <div className="information-detail">
        <div className="image-wrap">
          {img ? (
            <img src={img} alt={title} />
          ) : (
            <img src={notImage} alt={title} />
          )}
        </div>

        <div className="details">
          <div className="author-detail">
            <Typography className="author">{author}</Typography>
            <NavLink
              className="see-more-link"
              to={`${ROUTE_USER.USER_MY_PURCHASES}/${id}`}
            >
              <span>{t('user.seeMore')}</span>
              <ArrowRight2 size="16" color={theme.colors.surfaceHight} />
            </NavLink>
          </div>
          <H5 className="title">{title}</H5>
          <Typography className="stadium">{stadium}</Typography>
          <div className="showTime">
            <p>
              {!xs && <Calendar size="20" color={theme.colors.primary500} />}
              <span>
                {t('onsiteTicket.performerDate')}
                {useDate}
              </span>
            </p>
          </div>
          <Typography className="seat-position">
            {t('myPurchase.seatPosition')}
            {seatPosition}
          </Typography>
          <div className="quantity">
            <Typography>
              {t('myPurchase.quantity')}
              <span>{quantity}</span>
            </Typography>
            <Typography>
              <span>
                KRW:{' '}
                {formatNumberWithCommas(Number(totalPay) / Number(quantity))}
              </span>
            </Typography>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="ticket-type">
          <H6>{t(`myPurchase.${transactionType}`)}</H6>
        </div>
        <div className="order-total">
          <div className="row">
            <Typography>{t('myPurchase.orderTotal')}</Typography>
            <span>KRW: {formatNumberWithCommas(orderTotal)}</span>
          </div>
        </div>
      </div>

      {(status === OrderStatus.SENT_PIN ||
        status === OrderStatus.DELIVERY_COMPLETED) && (
        <div className="btn-wrap">
          <Button
            className="btn-pay"
            bgcolor={theme.colors.surfaceDark}
            color={theme.colors.surfaceHight}
            hoverbgcolor={theme.colors.surfaceSmall}
            onClick={() =>
              actionReport({
                id,
                orderDate,
                orderNumber,
                orderTitle: title,
              })
            }
          >
            {t('myPurchase.button.btnReport')}
          </Button>
          <Button
            className="btn-pay"
            bgcolor={theme.colors.primary500}
            color="#000"
            hoverbgcolor={theme.colors.primary510}
            onClick={() => actionPayment(id)}
          >
            {t('myPurchase.button.btnPay')}
          </Button>
        </div>
      )}

      {status === OrderStatus.PAYMENT_PENDING && (
        <div className="btn-wrap">
          <Button
            className="btn-pay"
            bgcolor={theme.colors.primary500}
            color="#000"
            hoverbgcolor={theme.colors.primary510}
            onClick={() => makePayment(id)}
          >
            {t('myPurchase.button.makePayment')}
          </Button>
        </div>
      )}
    </S.CardContainer>
  );
};

export default CardOrder;
