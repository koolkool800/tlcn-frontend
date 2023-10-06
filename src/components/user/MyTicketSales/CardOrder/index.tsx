import notImage from '@assets/images/notImage.png';
import { DELIVERY_METHOD, TicketSaleStatus } from '@constants/codeConstants';
import { H5, H6, Typography } from '@style/DefaultStyled';
import { currencyFormat } from '@utils/currency';
import { OrderSaleType } from 'interface/user';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import iconCompleted from '@assets/images/icon/icon-completed.svg';
import iconExpired from '@assets/images/icon/icon-expired.svg';
import iconPaymentCompleted from '@assets/images/icon/icon-paymentcompleted.svg';
import iconPending from '@assets/images/icon/icon-pending.svg';
import iconShipping from '@assets/images/icon/icon-shipping.svg';
import { ROUTE_USER } from '@constants/routes';
import theme from '@style/themes/default';
import { dateTimeFormatString } from '@utils/format';
import { Grid } from 'antd';
import { Calendar } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

type Props = {
  item: OrderSaleType;
  onShowCancelListing: (item: OrderSaleType) => void;
  onShowSendPin: (item: OrderSaleType) => void;
  onShowSendTicket: (item: OrderSaleType) => void;
};

const CardOrder = ({
  item,
  onShowCancelListing,
  onShowSendPin,
  onShowSendTicket,
}: Props) => {
  const { xs } = Grid.useBreakpoint();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [openSendPin, setOpenSendPin] = useState(false);
  const hasViewDetail = [
    TicketSaleStatus.PAYMENT_COMPLETED,
    TicketSaleStatus.ON_SHIPPING,
    TicketSaleStatus.TRANSACTION_COMPLETED,
    // TicketSaleStatus.EXPIRED,
    // TicketSaleStatus.CANCEL,
  ].includes(item.status as any);

  const renderStatus = () => {
    const status = item.status as TicketSaleStatus;
    switch (status) {
      case TicketSaleStatus.PENDING:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconPending} alt="icon" />
            <p>{t('user.sellTicketTab.pending')}</p>
          </S.StatusOrder>
        );
      case TicketSaleStatus.IS_LISTING:
        return (
          <S.StatusOrder status={status}>
            <p>{t('user.sellTicketTab.listing')}</p>
          </S.StatusOrder>
        );
      case TicketSaleStatus.PAYMENT_COMPLETED:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconPaymentCompleted} alt="icon" />
            <p>{t('user.sellTicketTab.paymentCompleted')}</p>
          </S.StatusOrder>
        );
      case TicketSaleStatus.TRANSACTION_COMPLETED:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconCompleted} alt="icon" />
            <p>{t('user.sellTicketTab.completed')}</p>
          </S.StatusOrder>
        );
      case TicketSaleStatus.ON_SHIPPING:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconShipping} alt="icon" />
            <p>{t('user.sellTicketTab.onShipping')}</p>
          </S.StatusOrder>
        );
      case TicketSaleStatus.EXPIRED:
        return (
          <S.StatusOrder status={status}>
            <img className="icon" src={iconExpired} alt="icon" />
            <p>{t('user.sellTicketTab.expired')}</p>
          </S.StatusOrder>
        );
      case TicketSaleStatus.CANCEL:
        return (
          <S.StatusOrder status={status}>
            <p>{t('user.sellTicketTab.cancelled')}</p>
          </S.StatusOrder>
        );
      default:
        return <></>;
    }
  };

  const renderButtonAction = () => {
    const status = item.status as TicketSaleStatus;

    switch (status) {
      case TicketSaleStatus.EXPIRED:
      case TicketSaleStatus.CANCEL:
      case TicketSaleStatus.PENDING:
      case TicketSaleStatus.IS_LISTING:
        return (
          <S.BtnCancel
            className="btn-pay"
            onClick={() => {
              onShowCancelListing(item);
            }}
          >
            {t('user.cancelListing')}
          </S.BtnCancel>
        );
      case TicketSaleStatus.PAYMENT_COMPLETED:
        if (item?.deliveryMethods?.includes(DELIVERY_METHOD.PIN_TRANSACTION)) {
          return (
            <S.BtnSendPin
              className="btn-pay"
              onClick={() => onShowSendPin(item)}
            >
              {t('user.sendPin')}
            </S.BtnSendPin>
          );
        }

        if (item?.deliveryMethods?.includes(DELIVERY_METHOD.SELLER_SHIPMENT)) {
          return (
            <S.BtnSendPin
              className="btn-pay"
              onClick={() => onShowSendTicket(item)}
            >
              {t('user.sendTicket')}
            </S.BtnSendPin>
          );
        }

        return null;
      default:
        return null;
    }
  };

  const handleViewDetail = () => {
    if (hasViewDetail) {
      navigate(
        `${ROUTE_USER.USER_MY_TICKET_SALES}/${
          item.orderNumber || item.ticketNumber
        }`
      );
    }
  };

  return (
    <S.CardContainer>
      <div
        className={`order-status ${hasViewDetail ? 'pointer' : ''}`}
        onClick={handleViewDetail}
        aria-hidden="true"
      >
        <div className="order-date">
          <p>
            {t('user.ticketNumber')}: {item.ticketNumber || item.orderNumber}
          </p>
          <p>
            {t('user.registerDate')}:{' '}
            {dateTimeFormatString(item.registerDate, 'DD.MM.YYYY')}
          </p>
        </div>
        <div className="order-status">{renderStatus()}</div>
      </div>

      <div
        className={`information-detail ${hasViewDetail ? 'pointer' : ''}`}
        onClick={handleViewDetail}
        aria-hidden="true"
      >
        <div className="image-wrap">
          {item?.event?.coverImage ? (
            <img src={item?.event?.coverImage} alt={item.event.name} />
          ) : (
            <img src={notImage} alt={item.event.name} />
          )}
        </div>

        <div className="details">
          <Typography>{item.event.performer}</Typography>
          <H5 className="title">{item.event.name}</H5>
          <Typography className="stadium">{item.event.place}</Typography>
          <div className="showTime">
            {!xs && <Calendar size="20" color={theme.colors.primary500} />}

            <span>
              {t('onsiteTicket.performerDate')}:{' '}
              {dateTimeFormatString(
                item.event.performanceDate,
                'YYYY.MM.DD (ddd) hh:mm A'
              )}
            </span>
          </div>
          <Typography className="seat-position">
            {t('user.seatPosition')}: {item?.event?.ticket?.seatPosition}
          </Typography>
          <div className="quantity">
            <Typography>
              {t('user.quantity')}:{' '}
              <span>{item?.event?.ticket?.seatQuantity}</span>
            </Typography>
            <Typography>
              <span>
                KRW: {currencyFormat(item?.event?.ticket?.unitPrice || 0)}
              </span>
            </Typography>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="ticket-type">
          <H6>
            {item?.deliveryMethods?.map((method: string) => (
              <div key={method}>{t(`HTTP_STATUS.${method}`)}</div>
            ))}
          </H6>
        </div>
        <div className="order-total">
          <div className="row">
            <Typography>{t('user.totalOrder')} </Typography>
            <span>KRW {currencyFormat(item?.totalPrice)}</span>
          </div>
        </div>
      </div>
      <div className="btn-wrap">{renderButtonAction()}</div>
    </S.CardContainer>
  );
};

export default CardOrder;
